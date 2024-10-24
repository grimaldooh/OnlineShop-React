"use client";

import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { setProductToShow } from '../../../store/slices/shopSlice';
import axios from 'axios'; // Usaremos Axios para las solicitudes

export default function ProductPage() {
  const { productToShow, items } = useSelector(state => state.shop);
  const userId = localStorage.getItem('userId');
  console.log(userId); // Esto imprimirá el userId almacenado en local storage
  const router = useRouter();
  const dispatch = useDispatch();
  
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);
  const [canComment, setCanComment] = useState(false); // Control para verificar si el usuario puede comentar
  const [relatedProducts, setRelatedProducts] = useState([]);


  const showProduct = (product) => {
    dispatch(setProductToShow(product));
    router.push(`/product/${product.id}`);

  };

  useEffect(() => {
    if (!productToShow) {
      router.push("/"); // Redirigir si no hay producto seleccionado
    }

    // Obtener comentarios relacionados al producto

    if (productToShow) {
      const fetchComments = async () => {
        console.log(productToShow.id);
        if (!productToShow.id) return;
        const response = await axios.get(
          `/api/comments?productId=${productToShow.id}`
        );
        setComments(response.data);
      };

      fetchComments();
    }

    // Verificar si el usuario puede comentar
    console.log(productToShow.id);
    console.log(userId);
    if (productToShow.id && userId !== 0) {
      console.log(productToShow.id);
      console.log(userId);
      const verifyUserOrder = async () => {
        const response = await axios.get(
          `/api/users/productUser?userId=${userId}&productId=${productToShow.id}`
        );
        console.log(response.data);
        setCanComment(response.data.canComment);
      };
      verifyUserOrder();
    }

    setRelatedProducts(
      items.filter(
        (product) =>
          product.category === productToShow.category &&
          product.id !== productToShow.id
      )
    );

  }, [productToShow, userId, router]);

  const handleCommentSubmit = async () => {
    if (newComment.trim() === '' || rating === 0) {
      alert('Por favor, añade un comentario y selecciona una calificación.');
      return;
    }

    // Enviar comentario a la API
    const response = await axios.post('/api/comments', {
      opinion: newComment,
      rating,
      userName: 'User', // Aquí podrías obtener el nombre del usuario desde el estado
      productId: productToShow.id
    });

    setComments([...comments, response.data]); // Añadir nuevo comentario a la lista
    setNewComment(''); // Limpiar el comentario
    setRating(0); // Reiniciar rating
  };

  // Función para renderizar estrellas basadas en el rating
  const renderStars = (rating) => {
    if (!rating) return null;
    console.log(rating)
    const fullStars = Math.floor(rating.rate);
    const halfStar = rating.rate % 1 !== 0;
    const starsArray = Array(5).fill(0).map((_, index) => (
      <span key={index} className={index < fullStars ? 'text-yellow-500' : 'text-gray-300'}>
        ★
      </span>
    ));
    return (
      <div>
        {starsArray}
        <span className="ml-2 text-sm text-gray-600">({rating.count} reviews)</span>
      </div>
    );
  };

//   const relatedProducts = items.filter(
//     product => product.category === productToShow.category && product.id !== productToShow.id
//   );

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Información del producto */}
      <div className="flex flex-col md:flex-row items-start border-b pb-6 mb-6">
        <img
          src={productToShow.image}
          alt={productToShow.title}
          className="w-full md:w-1/2 h-auto object-cover rounded-md mb-4 md:mb-0 md:mr-6"
        />
        <div className="flex flex-col justify-between">
          <h1 className="text-2xl font-bold mb-2">{productToShow.title}</h1>
          <p className="text-lg text-gray-700 mb-4">{productToShow.description}</p>
          <p className="text-xl font-semibold mb-2">${productToShow.price}</p>
          <div className="mb-4">{renderStars(productToShow.rating)}</div>
        </div>
      </div>

      {/* Sección de comentarios */}
      <div>
        <h2 className="text-xl font-bold mb-4">Comentarios</h2>
        {comments.map((comment, index) => (
          <div key={index} className="border p-4 rounded-md mb-2 shadow-sm">
            <p className="font-bold">{comment.userName}</p>
            <div className="mb-2">{renderStars({ rate: comment.rating, count: 0 })}</div>
            <p>{comment.opinion}</p>
          </div>
        ))}

        {canComment ? (
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Añadir comentario</h3>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escribe tu opinión"
              className="w-full border rounded-md p-2 mt-2"
            />
            <div className="mt-2">
              <label className="mr-2">Rating: </label>
              <input
                type="number"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                min="1"
                max="5"
                className="border p-1 rounded-md"
              />
            </div>
            <button
              onClick={handleCommentSubmit}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              Enviar comentario
            </button>
          </div>
        ) : (
          <p className="text-gray-600">Debes haber comprado este producto para dejar un comentario.</p>
        )}
      </div>

      {/* Productos relacionados */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Productos Relacionados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {relatedProducts.length > 0 ? (
            relatedProducts.map(product => (
              <div onClick={() => showProduct(product)} key={product.id} className="border p-4 rounded-md shadow hover:shadow-lg transition duration-300">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover mb-2 rounded-md"
                />
                <h3 className="text-md font-semibold mb-1">{product.title}</h3>
                <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
                <div className="mt-2">{renderStars(product.rating)}</div>
              </div>
            ))
          ) : (
            <p>No hay productos relacionados disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
}
