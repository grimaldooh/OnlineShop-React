// src/app/page.js
'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, setCurrentCategory } from '../store/slices/shopSlice';
import Card from '../components/utilidades/Card';
import ProductDetail from '../components/utilidades/ProductDetail';
import SearchBar from '../components/utilidades/SearchBar';
import CheckOutSideMenu from '../components/utilidades/CheckOutSideMenu';
import Navbar from '../components/Navbar';


export default function Home() {
  const dispatch = useDispatch();
  const { items, filteredItems, currentCategory, status } = useSelector(state => state.shop);

  // Fetch products when the component mounts
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const itemsToDisplay = filteredItems.length > 0 ? filteredItems : items;

  return (
    <div>
      
      <SearchBar />

      <div className="grid gap-4 grid-cols-4 w-full max-w-screen-xl p-4 bg-gray-100 rounded-lg shadow-lg">
        {itemsToDisplay.map((product, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <Card data={product} />
          </div>
        ))}
      </div>
      <CheckOutSideMenu />
      <ProductDetail />
    </div>
  );
}
