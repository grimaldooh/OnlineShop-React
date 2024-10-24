import { useDispatch, useSelector } from 'react-redux';
import { PlusCircleIcon, CheckIcon, StarIcon } from '@heroicons/react/24/solid';
import { openDetailProduct, setProductToShow, addProductToCart, openCheckOut, closeDetailProduct } from '../../store/slices/shopSlice';
import { useRouter } from 'next/navigation';

function Card({ data }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.shop.cartProducts);

  const showProduct = (product) => {
    dispatch(openDetailProduct());
    dispatch(setProductToShow(product));
    router.push(`/product/${product.id}`);
  };

  const addProduct = (e, product) => {
    e.stopPropagation();
    console.log(product);
    dispatch(addProductToCart(product));
    dispatch(openCheckOut());
    dispatch(closeDetailProduct());
  };

  const renderIcon = (id) => {
    const isInCart = cartProducts.some((product) => product.id === id);

    if (isInCart) {
      return (
        <div className='absolute top-0 right-0 flex justify-center items-center bg-black w-8 h-8 rounded-full m-2 p-1'>
          <CheckIcon className='w-6 h-6 text-emerald-400' />
        </div>
      );
    } else {
      return (
        <div
          className='absolute top-0 right-0 flex justify-center items-center bg-white w-8 h-8 rounded-full m-2 p-1 cursor-pointer'
          onClick={(e) => addProduct(e, data)}
        >
          <PlusCircleIcon className='w-6 h-6 text-gray-800' />
        </div>
      );
    }
  };

  return (
    <div className='bg-white cursor-pointer w-64 h-96 rounded-lg shadow-lg overflow-hidden' onClick={() => showProduct(data)}>
      <figure className='relative mb-2 w-full h-48'>
        <span className='absolute bottom-0 left-0 bg-white/80 rounded-lg text-black text-xs m-2 px-3 py-0.5'>{data.category}</span>
        <img className='w-full h-full object-cover' src={data.image} alt={data.title} />
        {renderIcon(data.id)}
      </figure>
      <div className='p-4 flex flex-col justify-between h-48'>
        <div>
          <h3 className='text-lg font-semibold text-gray-800 mb-1'>{data.title}</h3>
          <div className='flex items-center mb-2'>
            <StarIcon className='w-5 h-5 text-yellow-400' />
            <span className='ml-1 text-sm text-gray-600'>{data.rating.rate} ({data.rating.count} reviews)</span>
          </div>
        </div>
        <div className='flex justify-between items-center mt-auto'>
          <span className='text-lg font-medium text-gray-800'>${data.price}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;