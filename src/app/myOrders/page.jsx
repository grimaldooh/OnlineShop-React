"use client";

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import OrderDetails from '../../components/OrderDetails';

export default function MyOrders() {
  const [allOrders, setAllOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isProductListOpen, setIsProductListOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      // Realizar la petición para obtener las órdenes del usuario
      const fetchOrders = async () => {
        try {
          const response = await fetch(`/api/orders/saveOrder?userId=${userId}`);
          if (!response.ok) {
            throw new Error('No hay órdenes disponibles.');
          }
          const orders = await response.json();
          setAllOrders(orders);
          console.log('Órdenes obtenidas:', orders); // Para verificar que se están obteniendo correctamente
        } catch (error) {
          console.error('Error:', error);
          setError("No hay órdenes disponibles.");
        } finally {
          setLoading(false);
        }
      };

      fetchOrders();
    }
  }, [userId]);

  const toggleProductList = () => {
    setIsProductListOpen(!isProductListOpen);
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsProductListOpen(true);
  };

  // Renderizado del mensaje de error
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">My Orders</h2>
      {loading && <p className="text-gray-600">Cargando órdenes...</p>}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      {allOrders.length === 0 && !loading && !error && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Aviso:</strong>
          <span className="block sm:inline"> No hay órdenes disponibles.</span>
        </div>
      )}
      {/* Renderizado de las órdenes */}
      {allOrders.length > 0 && (
        <ul className="space-y-4">
          {allOrders.map((order, index) => (
            <li key={index} className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md">
              <div key={index} className="border border-gray-300 p-4 rounded mb-4">
                <p className="mb-2"><strong>Order Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                <p className="mb-2"><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>
                <button
                  onClick={() => handleViewDetails(order)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  View Order Details
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <OrderDetails 
        selectedOrder={selectedOrder} 
        isProductListOpen={isProductListOpen} 
        setIsProductListOpen={setIsProductListOpen} 
      />
    </div>
  );
}
