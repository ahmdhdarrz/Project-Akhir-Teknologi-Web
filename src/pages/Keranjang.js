import { auth, database } from "../firebaseConfig";
import { ref, onValue, set, remove } from "firebase/database";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Keranjang = () => {
  const [keranjang, setKeranjang] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        const keranjangRef = ref(database, `/keranjang/${user.uid}`);
        onValue(keranjangRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setKeranjang(Object.entries(data).map(([id, item]) => ({ id, ...item })));
          } else {
            setKeranjang([]);
          }
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const tambahJumlah = (id, jumlahSekarang) => {
    if (user) {
      set(ref(database, `/keranjang/${user.uid}/${id}/quantity`), jumlahSekarang + 1);
    }
  };

  const kurangJumlah = (id, jumlahSekarang) => {
    if (user) {
      if (jumlahSekarang > 1) {
        set(ref(database, `/keranjang/${user.uid}/${id}/quantity`), jumlahSekarang - 1);
      } else {
        remove(ref(database, `/keranjang/${user.uid}/${id}`));
      }
    }
  };

  const hapusItem = (id) => {
    if (user) {
      remove(ref(database, `/keranjang/${user.uid}/${id}`));
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Keranjang Anda</h1>

      <div className="text-center mb-6">
        <Link to="/katalog" className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Kembali ke Katalog
        </Link>
      </div>

      {keranjang.length === 0 ? (
        <p className="text-center text-gray-600">Keranjang kosong</p>
      ) : (
        <div className="max-w-4xl mx-auto bg-white p-6 shadow-md rounded">
          {keranjang.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b py-4">
              <div className="flex items-center">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover mr-4" />
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-green-600 font-semibold">Rp {item.price.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center">
                <button onClick={() => kurangJumlah(item.id, item.quantity)} className="px-3 py-1 bg-red-500 text-white rounded">
                  -
                </button>
                <span className="px-4">{item.quantity}</span>
                <button onClick={() => tambahJumlah(item.id, item.quantity)} className="px-3 py-1 bg-green-500 text-white rounded">
                  +
                </button>
              </div>

              <button onClick={() => hapusItem(item.id)} className="px-4 py-2 bg-gray-500 text-white rounded">
                Hapus
              </button>
            </div>
          ))}
          {/* Tombol Checkout */}
          <div className="text-center mt-6">
            <Link to="/checkout" className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Lanjutkan ke Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Keranjang;
