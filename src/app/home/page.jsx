// src/app/page.js
'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/slices/shopSlice';
import Card from '../../components/utilidades/Card';
import ProductDetail from '../../components/utilidades/ProductDetail';
import SearchBar from '../../components/utilidades/SearchBar';
import Navbar from '../../components/Navbar';

export default function Home() {
  const dispatch = useDispatch();
  const { items, filteredItems, currentCategory, status } = useSelector(state => state.shop);

  // Fetch products when the component mounts
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Refresh the page on first load
  

  const itemsToDisplay = filteredItems.length > 0 ? filteredItems : items;

  return (
    <div>
      <SearchBar />
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full max-w-screen-xl mx-auto p-6 bg-black bg-opacity-30 rounded-lg shadow-lg">        
        {itemsToDisplay.map((product, index) => (
          <Card key={index} data={product} />
        ))}
      </div>
      <ProductDetail />
    </div>
  );
}
