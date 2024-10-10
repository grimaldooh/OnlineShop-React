// components/CheckOutSideMenu.js

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { XCircleIcon } from '@heroicons/react/24/solid';
import OrderCard from './OrderCards';
import { closeCheckOut, removeProductFromCart, completeCheckout } from '../../store/slices/shopSlice';
import Link from 'next/link';

function CheckOutSideMenu() {
  const dispatch = useDispatch();
  const { cartProducts, isCheckOutOpen } = useSelector((state) => state.shop);

  const handleDelete = (id) => {
    dispatch(removeProductFromCart(id));
  };

  const totalPrice = (products) => {
    return products.reduce((sum, product) => sum + product.price, 0);
}

  const handleCheckout = () => {
    const orderToAdd = {
      date: new Date().toLocaleDateString(),
      products: cartProducts,
      totalProducts: cartProducts.length,
      totalPrice: totalPrice(cartProducts),
    };

    dispatch(completeCheckout(orderToAdd));
  };

  return (
    <aside className={`${isCheckOutOpen ? 'flex' : 'hidden'} w-[360px] h-[calc(100vh-80px)] top-[68px] flex-col fixed right-0 border border-black rounded-lg bg-white`}>
      <div className='flex justify-between item-center p-6'>
        <h2 className='font-medium text-xl'>My Order</h2>
        <div onClick={() => dispatch(closeCheckOut())} className='cursor-pointer'>
          <XCircleIcon className='size-6' />
        </div>
      </div>
      <div className='px-6 overflow-y-scroll flex-1'>
        {cartProducts.map((product) => (
          <OrderCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            imageUrl={product.image}
            handleDelete={handleDelete}
          />
        ))}
      </div>
      <div className='px-6 mb-6'>
        <p className='flex justify-between items-center'>
          <span className='font-light'>Total:</span>
          <span className='font-medium text-2xl'>${totalPrice(cartProducts)}</span>
        </p>
        <Link href='/myOrder'>
          <button className='w-full bg-black py-3 text-white' onClick={handleCheckout}>
            Checkout
          </button>
        </Link>
      </div>
    </aside>
  );
}

export default CheckOutSideMenu;
