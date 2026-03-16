// src/App.js

import React, { useState } from 'react'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import Katalog from './pages/Katalog';
import Keranjang from './pages/Keranjang';
import Checkout from './pages/Checkout';
import Register from './pages/Register';
import Profile from './pages/Profile';
import DetailProduk from './pages/DetailProduk';



const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [keranjang, setKeranjang] = useState([]); // Ganti cart menjadi keranjang


  const handleLogin = () => {
    setIsLoggedIn(true); 
  };
  
// Fungsi untuk menambahkan item ke keranjang
const addToKeranjang = (item) => {
  setKeranjang((prevKeranjang) => {
    const itemExist = prevKeranjang.find(i => i.id === item.id);
    if (itemExist) {
      return prevKeranjang.map(i =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      return [...prevKeranjang, { ...item, quantity: 1 }];
    }
  });
};


const removeFromKeranjang = (itemId) => {
  setKeranjang((prevKeranjang) => prevKeranjang.filter(item => item.id !== itemId));
};

const increaseQuantity = (itemId) => {
  setKeranjang((prevKeranjang) =>
    prevKeranjang.map(item =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    )
  );
};

const decreaseQuantity = (itemId) => {
  setKeranjang((prevKeranjang) =>
    prevKeranjang
      .map(item =>
        item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter(item => item.quantity > 0) // Hapus item jika quantity = 0
  );
};

  return (
    <Router>
      <div className="flex">
        {/* Sidebar selalu terlihat */}
        <Sidebar />

        {/* Konten utama */}
        <div className="w-full">
          <Navbar /> {/* Navbar di semua halaman */}
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/katalog" element={<Katalog addToKeranjang={addToKeranjang} />} />
            <Route path="/loginpage" element={isLoggedIn ? <LoginPage /> : <LoginPage onLogin={handleLogin} />} />
            <Route path="/register" element={<Register onLogin={handleLogin} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/keranjang" element={<Keranjang keranjang={keranjang} removeFromKeranjang={removeFromKeranjang} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} />} />
            <Route path="/checkout" element={<Checkout />} /> 
            <Route path="/product/:id" element={<DetailProduk />} />
            </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
