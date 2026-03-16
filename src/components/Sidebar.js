import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-1/5 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-lg font-bold mb-4">Menu</h2>
      <ul className="space-y-2">
        <li>            
          <Link to="/home" className="block px-4 py-2 hover:bg-gray-700 rounded">
            Home
          </Link>
        </li>
        <li>
          <Link to="/katalog" className="block px-4 py-2 hover:bg-gray-700 rounded">
            Katalog
          </Link>
        </li>
        <li>
          <Link to="/contact" className="block px-4 py-2 hover:bg-gray-700 rounded">
            Kontak
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
