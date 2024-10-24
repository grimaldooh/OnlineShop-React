"use client";

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { setCurrentCategory, setFilteredItems,openCheckOut } from '../store/slices/shopSlice';
import { ShoppingBagIcon } from '@heroicons/react/24/solid';
import { CloudArrowUpIcon } from '@heroicons/react/24/solid';

export default function Navbar() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.shop.items);
  const cartProducts = useSelector((state) => state.shop.cartProducts);
  const currentCategory = useSelector((state) => state.shop.currentCategory);
  const activeStyle = "underline underline-offset-8";

  
  const [userId, setUserId] = useState(null); // Local state to hold userId

  useEffect(() => {
    // Access localStorage inside useEffect to ensure it's available in client-side rendering
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(Number(storedUserId)); // Convert string to number
    } else {
      setUserId(0); // If no userId, set to 0 (not logged in)
    }
  }, );

  

  useEffect(() => {
    if (currentCategory) {
      const categoryMapping = {
        clothes: ["women's clothing", "men's clothing"],
        electronics: ["electronics"],
        furnitures: [],
        toys: [],
      };

      const mappedCategories = categoryMapping[currentCategory.toLowerCase()] || [];
      const filteredByCategory = items.filter((item) =>
        mappedCategories.includes(item.category.toLowerCase())
      );

      dispatch(setFilteredItems(filteredByCategory));
      console.log(filteredByCategory);
    } else {
      dispatch(setFilteredItems(items));
    }
  }, [currentCategory, items, dispatch]);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setUserId(0);
  }


  const handleCategoryClick = (category) => {
    dispatch(setCurrentCategory(category));
  };

  const handleCartClick = () => {
    dispatch(openCheckOut());

    console.log('cart clicked');
  }

  return (
    <nav className="flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light bg-white">
      <ul className="flex items-center gap-3">
        <li className="font-semibold text-lg flex items-center">
          
          <Link href="/">UnRealStore</Link>
          <CloudArrowUpIcon className="w-6 h-6 text-gray-800 ml-2 mr-4" />
        </li>
        <li>
          <Link href="/" className={activeStyle}>
            All
          </Link>
        </li>
        <li>
          <Link href="/" onClick={() => handleCategoryClick("clothes")} className={activeStyle}>
            Clothes
          </Link>
        </li>
        <li>
          <Link href="/" onClick={() => handleCategoryClick("electronics")} className={activeStyle}>
            Electronics
          </Link>
        </li>
        <li>
          <Link href="/" onClick={() => handleCategoryClick("furnitures")} className={activeStyle}>
            Furnitures
          </Link>
        </li>
        <li>
          <Link href="/" onClick={() => handleCategoryClick("toys")} className={activeStyle}>
            Toys
          </Link>
        </li>
        <li>
          <Link href="/">Other</Link>
        </li>
      </ul>

      <ul className="flex items-center gap-3">
        {userId !== 0 ? (
          <>
            <li className="font-semibold text-lg">
              <Link href="/myOrder">My order</Link>
            </li>
            <li className="font-semibold text-lg">
              <Link href="/myOrders">My Orders</Link>
            </li>
            <li className="font-semibold text-lg">
              <Link href="/myAccount">My Account</Link>
            </li>

            <li onClick={handleLogout} className="font-semibold text-lg text-red-500">
              <Link href="/login">Logout</Link>
            </li>
          </>
        ) : (
          <>
            <li className="font-semibold text-lg">
              <Link href="/login">Login In</Link>
            </li>
            <li className="font-semibold text-lg ">
              <Link href="/signup">Sign up</Link>
            </li>
          </>
        )}
        <li onClick={handleCartClick} className="flex justify-center items-center">
          <ShoppingBagIcon className="size-6" />
          <div>{cartProducts.length}</div>
        </li>
      </ul>
    </nav>
  );
}
