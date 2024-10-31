// src/app/myOrder/page.js
"use client";

import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

export default function MyOrder() {
  const currentOrder = useSelector((state) => state.shop.currentOrder);
  const [isProductListOpen, setIsProductListOpen] = useState(true);

  console.log(currentOrder);

  const toggleProductList = () => {
    setIsProductListOpen(!isProductListOpen);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Order Details</h2>
      {currentOrder.products && currentOrder.products.length > 0 ? (
        <div>
          <p className="mb-4 text-lg">
            <strong>Date:</strong> {currentOrder.date}
          </p>
          <p className="mb-4 text-lg">
            <strong>Total Price:</strong> ${Number(currentOrder.totalPrice).toFixed(2)}
          </p>
          <button
            onClick={toggleProductList}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 mb-4"
          >
            {isProductListOpen ? "Hide Products" : "Show Products"}
          </button>
          {isProductListOpen && (
            <ul className="space-y-4">
              {currentOrder.products.map((product) => (
                <li key={product.id} className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-20 h-20 object-cover rounded-lg mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
                    <p className="text-sm text-gray-600">Category: {product.category}</p>
                    <div className="flex items-center">
                      <StarIcon className="w-5 h-5 text-yellow-400" />
                      <span className="ml-1 text-sm text-gray-600">{product.rating.rate} ({product.rating.count} reviews)</span>
                    </div>
                    <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                  </div>
                  <div className="text-lg font-medium text-gray-800">${product.price}</div>
                </li>
              ))}
            </ul>
          )}
          <Link href="/shipping">
            <div className="flex justify-end">
              <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Proceed to Shipping and Payment
              </button>
            </div>
          </Link>
        </div>
      ) : (
        <p>No products found in this order.</p>
      )}
    </div>
  );
}
