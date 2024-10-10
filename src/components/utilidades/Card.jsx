import { useDispatch, useSelector } from 'react-redux';
import { PlusCircleIcon, CheckIcon } from '@heroicons/react/24/solid';
import { openDetailProduct, setProductToShow, addProductToCart, openCheckOut, closeDetailProduct } from '../../store/slices/shopSlice';

function Card({ data }) {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.shop.cartProducts);

  const showProduct = (product) => {
    dispatch(openDetailProduct());
    dispatch(setProductToShow(product));
  };

  const addProduct = (e, product) => {
    e.stopPropagation();
    dispatch(addProductToCart(product));
    dispatch(openCheckOut());
    dispatch(closeDetailProduct());
  };

  const renderIcon = (id) => {
    const isInCart = cartProducts.some((product) => product.id === id);

    if (isInCart) {
      return (
        <div className='absolute top-0 right-0 flex justify-center items-center bg-black w-6 h-6 rounded-full m-2 p-1'>
          <CheckIcon className='size-6 text-emerald-400' />
        </div>
      );
    } else {
      return (
        <div
          className='absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1 cursor-pointer'
          onClick={(e) => addProduct(e, data)}
        >
          <PlusCircleIcon className='size-6' />
        </div>
      );
    }
  };

  return (
    <div className='bg-white cursor w-56 h-60 rounded-lg' onClick={() => showProduct(data)}>
     <figure className='relative mb-2 w-full h-4/5'>
          <span className='absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5'>{data.category.name}</span>
          <img  className='w-full h-full object-cover rounded-lg' src={data.image} alt={data.title} />
          {renderIcon(data.id)}
     </figure>
     <p className='flex justify-between'>
          <span className='text-sm font-light'>{data.title}</span>
          <span className='text-lg font-medium'>${data.price}</span>
     </p>
    </div>
  );
}

export default Card;
