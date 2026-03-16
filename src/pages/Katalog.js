import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, database } from '../firebaseConfig';
import { ref, set, get, onValue } from 'firebase/database';

const Katalog = () => {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const categories = ['Semua', 'Tenda', 'Sleeping Bag', 'Carrier', 'Peralatan Masak', 'Matras'];

  // Ambil data produk dari Firebase
  useEffect(() => {
    const fetchProducts = () => {
      const productsRef = ref(database, '/produk');
      onValue(productsRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const productsArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setProducts(productsArray);
        } else {
          setProducts([]);
        }
        setLoading(false);
      });
    };

    fetchProducts();
  }, []);

  // Fungsi Tambah ke Keranjang
  const addToKeranjang = async (item) => {
    const user = auth.currentUser;
    if (!user) {
      alert('Anda perlu login terlebih dahulu!');
      return;
    }

    const itemRef = ref(database, `/keranjang/${user.uid}/${item.id}`);
    const snapshot = await get(itemRef);

    if (snapshot.exists()) {
      const existingItem = snapshot.val();
      set(itemRef, { ...existingItem, quantity: existingItem.quantity + 1 });
    } else {
      set(itemRef, { ...item, quantity: 1 });
    }

    alert(`${item.name} telah ditambahkan ke keranjang!`);
  };

  const goToDetail = (id) => {
    navigate(`/product/${id}`);
  };

  if (loading) {
    return <h2 className="text-center text-gray-500">Loading...</h2>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-6">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Katalog Alat Camping</h1>
        <p className="text-lg text-gray-600 mt-2">Temukan alat yang Anda butuhkan untuk petualangan seru!</p>
      </header>

      {/* Kategori Filter */}
      <div className="flex justify-center mb-6">
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Tombol Keranjang */}
      <div className="flex justify-center mb-6">
        <Link 
          to="/keranjang"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition font-semibold"
        >
          🛒 Lihat Keranjang
        </Link>
      </div>

      {/* Daftar Produk */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products
            .filter((item) => selectedCategory === 'Semua' || item.category === selectedCategory)
            .map((item) => (
              <div 
                key={item.id}
                className="border border-gray-200 rounded-lg shadow-md p-4 bg-white text-center transform hover:scale-105 transition cursor-pointer"
                onClick={() => goToDetail(item.id)}
              >
                <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-md mb-4 shadow-sm" />
                <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                <p className="text-green-600 font-semibold text-lg mb-4">Rp {item.price.toLocaleString()}</p>
                
                {/* Tombol Sewa */}
                <button 
                  onClick={(e) => { e.stopPropagation(); addToKeranjang(item); }}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition font-semibold"
                >
                  + Sewa
                </button>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Katalog;
