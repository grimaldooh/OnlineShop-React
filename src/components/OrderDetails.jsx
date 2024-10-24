import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNewProductToShow} from '../store/slices/shopSlice';
import { useRouter } from 'next/navigation';

const OrderDetails = ({ selectedOrder, isProductListOpen, setIsProductListOpen, setProductToShow }) => {
  const [isShippingInfoOpen, setIsShippingInfoOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();



  const showProduct = (product) => {
    dispatch(setNewProductToShow(product));
    router.push(`/product/${product.id}`);

  };

  return (
    selectedOrder && isProductListOpen && (
      <div className="border border-gray-300 p-6 rounded-lg mt-6 bg-white shadow-lg">
        <div className="border border-gray-300 p-4 rounded mb-4">
          <p className="mb-2"><strong>Order Date:</strong> {new Date(selectedOrder.date).toLocaleDateString()}</p>
          <p className="mb-2"><strong>Total Price:</strong> ${selectedOrder.totalPrice.toFixed(2)}</p>
        </div>
        <h3 className="text-lg font-bold mb-4 text-gray-800">Products in Order</h3>
        <ul className="space-y-4">
          {selectedOrder.products.map((product) => (
            <li key={product.id} className="flex items-center space-x-4">
              <img
                onClick={() => showProduct(product)}
                src={product.image}
                alt={product.title}
                className="w-20 h-20 object-cover rounded-lg shadow-md"
              />
              <div className="flex-1">
                <div className="text-gray-900 font-semibold text-lg">{product.title}</div>
                <div className="text-gray-600">${product.price.toFixed(2)}</div>
                <div className="text-gray-600">Quantity: {product.quantity}</div>
              </div>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setIsShippingInfoOpen(!isShippingInfoOpen)}
          className="mt-6 w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
        >
          {isShippingInfoOpen ? 'Hide Shipping Info' : 'Show Shipping Info'}
        </button>
        {isShippingInfoOpen && selectedOrder.shippingInfo && (
          <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
            <h4 className="text-lg font-bold mb-2 text-gray-800">Shipping Information</h4>
            <p className="mb-2"><strong>Name:</strong> {selectedOrder.shippingInfo.name}</p>
            <p className="mb-2"><strong>Address:</strong> {selectedOrder.shippingInfo.address}</p>
            <p className="mb-2"><strong>City:</strong> {selectedOrder.shippingInfo.city}</p>
            <p className="mb-2"><strong>Card Number:</strong> {selectedOrder.shippingInfo.cardNumber}</p>
          </div>
        )}
        <button
          onClick={() => setIsProductListOpen(false)}
          className="mt-6 w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition duration-300"
        >
          Close Details
        </button>
      </div>
    )
  );
};

export default OrderDetails;