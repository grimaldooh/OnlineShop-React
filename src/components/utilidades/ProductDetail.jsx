import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { closeDetailProduct } from '../../store/slices/shopSlice';

function ProductDetail() {
  const dispatch = useDispatch();
  
  // Selector para obtener el estado del detalle del producto
  const isProductDetailOpen = useSelector((state) => state.shop.isProductDetailOpen);
  const productToShow = useSelector((state) => state.shop.productToShow);

  return (
    <aside className={`${isProductDetailOpen ? 'flex' : 'hidden'} w-[360px] h-[calc(100vh-80px)] top-[68px] flex-col fixed right-0 border border-black rounded-lg bg-white`}>
      <div className='flex justify-between items-center p-6'>
        <h2 className='font-medium text-xl'>Detail</h2>
        <div onClick={() => dispatch(closeDetailProduct())} className='cursor-pointer'>
          <XCircleIcon className='size-6' />
        </div>
      </div>
      <figure>
        <img className='w-full h-full rounded-lg' src={productToShow.image} alt={productToShow.title} />
      </figure>
      <p className='flex flex-col p-6'>
        <span className='font-medium text-2xl mb-2'>${productToShow.price}</span>
        <span className='font-medium text-md'>{productToShow.title}</span>
        <span className='font-light text-sm'>{productToShow.description}</span>
      </p>
    </aside>
  );
}

export default ProductDetail;
