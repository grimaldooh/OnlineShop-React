// components/CheckOutSideMenu.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { XCircleIcon } from '@heroicons/react/24/solid';
import OrderCard from './OrderCards';
import { closeCheckOut, removeProductFromCart, completeCheckout, updateProductQuantity } from '../../store/slices/shopSlice';
import Link from 'next/link';

function CheckOutSideMenu() {
  const dispatch = useDispatch();
  const { cartProducts, isCheckOutOpen } = useSelector((state) => state.shop);
  console.log(isCheckOutOpen);

  const handleDelete = (id) => {
    dispatch(removeProductFromCart(id));
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity === 0) {
      dispatch(removeProductFromCart(id));
    } else {
      dispatch(updateProductQuantity({ id, quantity }));
    }
  };

  const totalPrice = (products) => {
    return products.reduce((sum, product) => sum + product.price * product.quantity, 0).toFixed(2);
  };

  const handleCheckout = () => {
    const orderToAdd = {
      date: new Date().toLocaleDateString(),
      products: cartProducts,
      totalProducts: cartProducts.reduce((sum, product) => sum + product.quantity, 0),
      totalPrice: totalPrice(cartProducts),
    };

    dispatch(completeCheckout(orderToAdd));
  };

  return (
    <aside className={`${isCheckOutOpen ? 'flex' : 'hidden'} w-[360px] h-[calc(100vh-80px)] top-[68px] flex-col fixed right-0 border border-gray-300 rounded-lg bg-white shadow-lg`}>
      <div className='flex justify-between items-center p-6 bg-gray-100 rounded-t-lg'>
        <h2 className='font-semibold text-xl text-gray-800'>My Order</h2>
        <div onClick={() => dispatch(closeCheckOut())} className='cursor-pointer'>
          <XCircleIcon className='w-6 h-6 text-gray-600 hover:text-gray-800 transition duration-200' />
        </div>
      </div>
      <div className='px-6 py-4 overflow-y-scroll flex-1'>
        {cartProducts.length > 0 ? (
          cartProducts.map((product) => (
            <OrderCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              imageUrl={product.image}
              quantity={product.quantity}
              handleDelete={handleDelete}
              handleQuantityChange={handleQuantityChange}
            />
          ))
        ) : (
          <p className='text-center text-gray-500'>Your cart is empty.</p>
        )}
      </div>
      <div className='px-6 py-4 bg-gray-100 rounded-b-lg'>
        <p className='flex justify-between items-center mb-4'>
          <span className='font-light text-gray-600'>Total:</span>
          <span className='font-medium text-2xl text-gray-800'>${totalPrice(cartProducts)}</span>
        </p>
        <Link href='/myOrder'>
          <button className='w-full bg-blue-600 py-3 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300' onClick={handleCheckout}>
            Checkout
          </button>
        </Link>
      </div>
    </aside>
  );
}

export default CheckOutSideMenu;