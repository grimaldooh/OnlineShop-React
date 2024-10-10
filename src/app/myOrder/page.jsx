// src/app/myOrder/page.js
"use client";

import { useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';

export default function MyOrder() {
    const currentOrder = useSelector((state) => state.shop.currentOrder);
    const [isProductListOpen, setIsProductListOpen] = useState(false);

    const toggleProductList = () => {
        setIsProductListOpen(!isProductListOpen);
    };

    return (
      <div className="border border-gray-200 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-2">Order Details</h2>
        {currentOrder.products && currentOrder.products.length > 0 ? (
          <div>
            <p className="mb-2">
              <strong>Date:</strong> {currentOrder.date}
            </p>
            <p className="mb-2">
              <strong>Total Price:</strong> $
              {currentOrder.totalPrice.toFixed(2)}
            </p>
            <button
              onClick={toggleProductList}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {isProductListOpen ? "Hide Products" : "Show Products"}
            </button>

            {isProductListOpen && (
              <div className="mt-4">
                <h3 className="text-md font-semibold mb-2">
                  Products in Order:
                </h3>
                <ul className="list-disc list-inside">
                  {currentOrder.products.map((product) => (
                    <li key={product.id} className="mb-2">
                      <div>
                        <strong>{product.title}</strong> - $
                        {product.price.toFixed(2)}
                      </div>
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-16 h-16 object-cover mt-2"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <Link href="/shipping">
              <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Proceed to Shipping and Payment
              </button>
            </Link>
          </div>
        ) : (
          <p>No current order available.</p>
        )}
      </div>
    );
}
