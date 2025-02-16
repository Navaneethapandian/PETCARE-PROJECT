import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdPets } from "react-icons/md";

export const Header = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="bg-white text-black">
        <div className="flex items-center justify-between p-4">
  
          <Link to="/" className="flex items-center">
            <MdPets className="w-20" />
          </Link>

     
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-black focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>


          <div className="hidden lg:flex space-x-4">
            <Link
              to="/home"
              className="hover:bg-gray-300 hover:text-black px-4 py-2 rounded font-semibold"
            >
              Home
            </Link>
            <Link
              to="/adopt"
              className="hover:bg-gray-300 hover:text-black px-4 py-2 rounded font-semibold"
            >
              Adopt
            </Link>
            <Link
              to="/getinvolved"
              className="hover:bg-gray-300 hover:text-black px-4 py-2 rounded font-semibold"
            >
              Get Involved
            </Link>
            <Link
              to="/blogs"
              className="hover:bg-gray-300 hover:text-black px-4 py-2 rounded font-semibold"
            >
              Blog
            </Link>
            <Link
              to="/about"
              className="hover:bg-gray-300 hover:text-black px-4 py-2 rounded font-semibold"
            >
              About Us
            </Link>
            <Link
              to="/myaccount"
              className="hover:bg-gray-300 hover:text-black px-4 py-2 rounded font-semibold"
            >
              Account
            </Link>
          </div>

        
          <div>
            <Link
              to="/ContactUs"
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-400 font-semibold"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </nav>
{/* 
Mobile response */}
      <div
        className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
        id="mobile-menu"
      >
        <div className="flex flex-col items-center py-4 space-y-4 bg-gray-800">
          <Link
            to="/home"
            className="hover:bg-gray-700 hover:text-white px-4 py-2 rounded font-semibold text-white"
          >
            Home
          </Link>
          <Link
            to="/adopt"
            className="hover:bg-gray-700 hover:text-white px-4 py-2 rounded font-semibold text-white"
          >
            Adopt
          </Link>
          <Link
            to="/get-involved"
            className="hover:bg-gray-700 hover:text-white px-4 py-2 rounded font-semibold text-white"
          >
            Get Involved
          </Link>
          <Link
            to="/blogs"
            className="hover:bg-gray-700 hover:text-white px-4 py-2 rounded font-semibold text-white"
          >
            Blog
          </Link>
          <Link
            to="/about"
            className="hover:bg-gray-700 hover:text-white px-4 py-2 rounded font-semibold text-white"
          >
            About Us
          </Link>
          <Link
            to="/account"
            className="hover:bg-gray-700 hover:text-white px-4 py-2 rounded font-semibold text-white"
          >
            Account
          </Link>
          <Link
            to="/ContactUs"
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-600 font-semibold"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </>
  );
};
