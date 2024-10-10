// src/app/page.js
'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, setCurrentCategory } from '../../store/slices/shopSlice';
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

  const itemsToDisplay = filteredItems.length > 0 ? filteredItems : items;

  

  return (
    <div>

      <SearchBar />
      <div className='grid gap-4 grid-cols-4 w-full max-w-screen-xl'>
        {itemsToDisplay.map((product, index) => (
          <Card key={index} data={product} />
        ))}
      </div>
      <ProductDetail />
    </div>
  );
}
