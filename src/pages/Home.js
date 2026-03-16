// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import produkData from '../DataProduk';

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      {/* Logo Darcamp */}
      <div className="flex justify-center mb-6">
        <img src="/aset/logo-darcamp.png" alt="Darcamp Logo" className="w-40 h-auto" />
      </div>

      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">Penyewaan Alat Camping</h1>
        <p className="text-lg text-gray-600 mt-2">
          Temukan alat camping terbaik untuk petualanganmu! Sewa dengan mudah dan nikmati perjalanan alam tanpa repot.
        </p>
      </header>

      {/* Tentang Kami */}
      <section className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">Tentang Kami</h2>
        <p className="text-lg text-gray-700">
          Kami menyediakan berbagai perlengkapan camping berkualitas dengan harga terjangkau. 
          Dari tenda, sleeping bag, hingga peralatan masak – semuanya siap mendukung petualangan Anda di alam bebas!
        </p>
      </section>

      {/* Keunggulan Kami */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-8">Keunggulan Kami</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <img src="/aset/kualitas terbaik.jpg" alt="Kualitas Terbaik" className="w-30 h-21 object-contain mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900">Kualitas Terbaik</h3>
            <p className="text-gray-600">Semua perlengkapan dirawat dan dicek sebelum disewakan.</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <img src="/aset/harga terjangkau.jpg" alt="Harga Terjangkau" className="w-30 h-21 object-contain mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900">Harga Terjangkau</h3>
            <p className="text-gray-600">Sewa alat camping dengan harga bersahabat untuk semua kalangan.</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <img src="/aset/pelayanan mudah.png" alt="Pelayanan Mudah" className="w-30 h-21 object-contain mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900">Pelayanan Mudah</h3>
            <p className="text-gray-600">Pemesanan cepat, responsif, dan bisa diantar langsung.</p>
          </div>
        </div>
      </section>

      {/* Produk Populer */}
      <section>
        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-8">Alat Camping Terpopuler</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {produkData.map((produk) => (
            <div key={produk.id} className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300">
              <img src={produk.imageUrl} alt={produk.name} className="w-full h-48 object-contain" />
              <div className="p-5 text-center">
                <h3 className="text-2xl font-bold text-gray-900">{produk.name}</h3>
                <p className="text-lg text-red-500 font-semibold mt-2">{produk.price.toLocaleString()}</p>
                <Link to={`/product/${produk.id}`} className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Lihat Detail
                </Link>
              </div> 
            </div>
          ))}
        </div>
      </section>

      {/* CTA - Call to Action */}
      <section className="text-center mt-16">
        <h2 className="text-3xl font-semibold text-gray-900">Siap Berpetualang?</h2>
        <p className="text-lg text-gray-600 mt-2">Pesan alat camping sekarang dan nikmati perjalanan tanpa khawatir!</p>
        <Link to="/katalog" className="mt-4 inline-block px-6 py-3 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 transition">
          Sewa Sekarang
        </Link>
      </section>
    </div>
  );
};

export default Home;
