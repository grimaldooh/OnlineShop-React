// src/app/page.js
'use client';

import { useEffect, useState } from 'react';
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
  console.log(items); 

  // Fetch products when the component mounts
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const itemsToDisplay = filteredItems.length > 0 ? filteredItems : items;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate the products to display based on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = itemsToDisplay.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate the total number of pages
  const totalPages = Math.ceil(itemsToDisplay.length / itemsPerPage);

  // Function to change the page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="mt-8">
        <SearchBar />
      </div>

      <div className="grid gap-4 grid-cols-4 w-full max-w-screen-xl p-4 rounded-lg shadow-lg bg-black bg-opacity-50">
        {currentItems.map((product, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <Card data={product} />
          </div>
        ))}
      </div>

      {/* Pagination buttons */}
      <div className="flex justify-center mt-8">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <CheckOutSideMenu />
      <ProductDetail />
    </div>
  );
}
