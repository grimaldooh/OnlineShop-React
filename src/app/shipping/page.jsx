// src/app/shipping/page.js
'use client';   
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Shipping() {

  const userId = localStorage.getItem('userId');

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const currentOrder = useSelector((state) => state.shop.currentOrder);
  console.log(currentOrder);


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones simples
    if (!/^\d{16}$/.test(cardNumber)) {
      alert("El número de tarjeta debe tener 16 dígitos.");
      return;
    }
    if (!/^\d{3}$/.test(cvv)) {
      alert("El CVV debe tener 3 dígitos.");
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(expirationDate)) {
      alert("La fecha de expiración debe tener el formato MM/AA.");
      return;
    }

    // Aquí puedes manejar la lógica para enviar la información de envío y pago
    console.log('Shipping Info:', { name, address, city, paymentMethod, cardNumber, expirationDate, cvv });
    console.log('Order Info:', currentOrder);

    try {
      const response = await fetch('/api/orders/saveOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          currentOrder: currentOrder, // Usar el currentOrder del estado de Redux
          shippingInfo: {
            name,
            address,
            city,
          },
          paymentInfo: {
            paymentMethod,
            cardNumber,
            expirationDate,
            cvv,
          },
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Orden guardada con éxito:', result);
        setSuccessMessage('¡Compra realizada con éxito! Gracias por su pedido.');
      } else {
        throw new Error('Error en la respuesta del servidor');
      }
    } catch (error) {
      console.error('Error al enviar la orden:', error);
      alert('Hubo un error al procesar tu orden. Por favor intenta de nuevo.');
    }
    
    // Mostrar mensaje de éxito
    setSuccessMessage('¡Compra realizada con éxito! Gracias por su pedido.');
  };

  return (
    <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white mt-8">
      <h2 className="text-2xl font-bold mb-4">Shipping and Payment Information</h2>
      
      {successMessage ? (
        <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded relative mb-4">
          <strong>{successMessage}</strong>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="mb-2">
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded w-full p-2 mt-1"
              required
            />
          </label>
          <label className="mb-2">
            Address:
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border border-gray-300 rounded w-full p-2 mt-1"
              required
            />
          </label>
          <label className="mb-2">
            City:
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border border-gray-300 rounded w-full p-2 mt-1"
              required
            />
          </label>
          <label className="mb-2">
            Payment Method:
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="border border-gray-300 rounded w-full p-2 mt-1"
              required
            >
              <option value="credit">Credit Card</option>
              <option value="paypal">PayPal</option>
            </select>
          </label>

          <h3 className="text-lg font-bold mt-4">Payment Details</h3>
          <label className="mb-2">
            Card Number:
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="border border-gray-300 rounded w-full p-2 mt-1"
              maxLength={16}
              required
            />
          </label>
          <label className="mb-2">
            Expiration Date (MM/YY):
            <input
              type="text"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              className="border border-gray-300 rounded w-full p-2 mt-1"
              placeholder="MM/YY"
              required
            />
          </label>
          <label className="mb-2">
            CVV:
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="border border-gray-300 rounded w-full p-2 mt-1"
              maxLength={3}
              required
            />
          </label>
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
