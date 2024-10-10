"use client";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { setCurrentCategory, setFilteredItems} from '@/store/slices/shopSlice';
import { ShoppingBagIcon } from '@heroicons/react/24/solid'


export default function Navbar() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.shop.items);

  const cartProducts = useSelector((state) => state.shop.cartProducts);
  const activeStyle = "underline underline-offset-8";
  const currentCategory = useSelector((state) => state.shop.currentCategory);


  useEffect(() => {
    if (currentCategory) {
        const categoryMapping = {
            clothes: ["women's clothing", "men's clothing"],
            electronics: ["electronics"],
            furnitures: [], // Assuming no mapping for "furnitures"
            toys: [] // Assuming no mapping for "toys"
        };

        const mappedCategories = categoryMapping[currentCategory.toLowerCase()] || [];
        const filteredByCategory = items.filter(item => mappedCategories.includes(item.category.toLowerCase()));
        
        dispatch(setFilteredItems(filteredByCategory));
        console.log(filteredByCategory);
    } else {
        dispatch(setFilteredItems(items));
    }
}, [currentCategory, items, dispatch]);

  const handleCategoryClick = (category) => {
    dispatch(setCurrentCategory(category));
  };

  return (
    <nav className='flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light'>
        <ul className='flex items-center gap-3'>
            <li className='font-semibold text-lg'>
                <Link href="/">Shopi</Link>
            </li>
            <li>
                <Link href="/" className={activeStyle}>All</Link>
            </li>
            <li>
                <Link href="/" onClick={() => handleCategoryClick("clothes")} className={activeStyle}>Clothes</Link>
            </li>
            <li>
                <Link href="/" onClick={() => handleCategoryClick("electronics")} className={activeStyle}>Electronics</Link>
            </li>
            <li>
                <Link href="/" onClick={() => handleCategoryClick("furnitures")} className={activeStyle}>Furnitures</Link>
            </li>
            <li>
                <Link href="/" onClick={() => handleCategoryClick("toys")} className={activeStyle}>Toys</Link>
            </li>
            <li>
                <Link href="/">Other</Link>
            </li>
        </ul>
        <ul className='flex items-center gap-3'>
            <li className='font-semibold text-lg'>
                <Link href="/myOrder">My order</Link>
            </li>
            <li className='font-semibold text-lg'>
                <Link href="/myOrders">My Orders</Link>
            </li>
            <li className='font-semibold text-lg'>
                <Link href="/myAccount">My Account</Link>
            </li>
            <li className='font-semibold text-lg'>
                <Link href="/signIn">Sign In</Link>
            </li>
            <li className='flex justify-center items-center'>
                <ShoppingBagIcon className='size-6'/>
                <div>{cartProducts.length}</div>
            </li>
        </ul>
    </nav>
  );
}
