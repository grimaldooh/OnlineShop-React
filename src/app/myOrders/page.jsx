// src/app/myOrders/page.js
"use client";

import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function MyOrders() {
  const allOrders = useSelector((state) => state.shop.allOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isProductListOpen, setIsProductListOpen] = useState(false);

  const toggleProductList = () => {
    setIsProductListOpen(!isProductListOpen);
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsProductListOpen(true);
  };

  return (
    <div className="border border-gray-200 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-2">My Orders</h2>
      {allOrders.length > 0 ? (
        allOrders.map((order, index) => (
          <div key={index} className="border border-gray-300 p-4 rounded mb-4">
            <p className="mb-2"><strong>Order Date:</strong> {order.date}</p>
            <p className="mb-2"><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>
            <button
              onClick={() => handleViewDetails(order)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              View Order Details
            </button>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}

      {selectedOrder && isProductListOpen && (
        <div className="border border-gray-300 p-4 rounded mt-4">
          <h3 className="text-md font-semibold mb-2">Products in Order:</h3>
          <ul className="list-disc list-inside">
            {selectedOrder.products.map((product) => (
              <li key={product.id} className="mb-2">
                <div>
                  <strong>{product.title}</strong> - ${product.price.toFixed(2)}
                </div>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-16 h-16 object-cover mt-2"
                />
              </li>
            ))}
          </ul>
          <button
            onClick={() => setIsProductListOpen(false)}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Close Details
          </button>
        </div>
      )}
    </div>
  );
}
