import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { database } from '../firebaseConfig'; 
import { ref, get } from 'firebase/database';

const DetailProduk = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = ref(database, `/produk/${id}`);
        const snapshot = await get(productRef);
        if (snapshot.exists()) {
          setProduct(snapshot.val());
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <h2 className="text-center text-gray-500">Loading...</h2>;
  }

  if (!product) {
    return <h2 className="text-center text-red-500">Produk tidak ditemukan</h2>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gambar Produk */}
        <div>
          <img src={product.image} alt={product.name} className="w-full h-80 object-cover rounded-md shadow-md" />
        </div>

        {/* Informasi Produk */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-gray-500 mt-1">{product.category}</p>
            <p className="text-green-600 font-bold text-2xl mt-4">Rp {product.price.toLocaleString()}</p>
            <p className="text-gray-600 mt-4">{product.description}</p>
          </div>

          {/* Tombol Aksi */}
          <div className="mt-6 flex gap-4">
            <button className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 transition">
              Sewa Sekarang
            </button>
            <Link to="/katalog" className="px-6 py-3 bg-gray-300 text-gray-700 font-bold rounded-lg shadow-md hover:bg-gray-400 transition">
              Kembali
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduk;
