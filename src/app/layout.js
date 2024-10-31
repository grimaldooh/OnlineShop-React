// src/app/layout.js
"use client";
import "./globals.css";
import Navbar from "../components/Navbar";


import ReduxProvider from '../components/ReduxProvider';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>

        <Navbar />
        <div className="flex flex-col items-center mt-20 bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen w-full">
              {children}
         </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
