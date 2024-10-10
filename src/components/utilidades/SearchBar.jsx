import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchItem, filterItems } from '../../store/slices/shopSlice';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    dispatch(setSearchItem(value)); // Actualiza el estado de búsqueda en Redux
    dispatch(filterItems()); // Filtra los ítems basados en el término de búsqueda actual
  };

  const handleSearch = () => {
    dispatch(filterItems());
  };

  return (
    <div className="flex items-center mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search..."
        className="flex-1 p-2 border border-gray-300 rounded-md"
      />
      <button
        onClick={handleSearch}
        className="ml-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
