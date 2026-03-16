import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">DarCamp</h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/home" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/profile" className="hover:underline">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/keranjang" className="hover:underline">
              Keranjang
            </Link>
          </li>
          <li>
            <Link to="/loginpage" className="hover:underline">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
