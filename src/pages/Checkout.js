import { useState, useEffect } from "react";
import { auth, database } from "../firebaseConfig";
import { ref, onValue, set } from "firebase/database";
import { Link } from "react-router-dom";

const Checkout = () => {
  const [keranjang, setKeranjang] = useState([]);
  const [totalHarga, setTotalHarga] = useState(0);

  useEffect(() => {
    const user = auth.currentUser; // Ambil user yang sedang login
    if (!user) {
      alert("Anda perlu login terlebih dahulu!");
      return;
    }

    const keranjangRef = ref(database, `/keranjang/${user.uid}`); // Ambil data keranjang berdasarkan UID
    onValue(keranjangRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const items = Object.entries(data).map(([id, item]) => ({ id, ...item }));
        setKeranjang(items);
        setTotalHarga(
          items.reduce((total, item) => total + item.price * item.quantity, 0)
        );
      } else {
        setKeranjang([]);
      }
    });
  }, []);

  const handleCheckout = () => {
    const user = auth.currentUser;
    if (!user) {
      alert("Anda perlu login terlebih dahulu!");
      return;
    }

    const checkoutData = {
      keranjang,
      totalHarga,
      status: "Menunggu Pembayaran", // Status default
      userId: user.uid,
    };

    const checkoutRef = ref(database, `/checkout/${user.uid}`);
    set(checkoutRef, checkoutData).then(() => {
      alert("Checkout berhasil! Terima kasih telah berbelanja.");
      // Hapus data keranjang setelah checkout
      set(ref(database, `/keranjang/${user.uid}`), null);
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Halaman Checkout</h1>

      <div className="max-w-4xl mx-auto bg-white p-6 shadow-md rounded">
        {keranjang.length === 0 ? (
          <p className="text-center text-gray-600">Keranjang Anda kosong.</p>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Rincian Pesanan</h2>
              <ul>
                {keranjang.map((item) => (
                  <li key={item.id} className="flex justify-between py-2">
                    <span>{item.name} x {item.quantity}</span>
                    <span>Rp {item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between mb-6">
              <span className="font-semibold">Total Harga:</span>
              <span className="text-xl font-semibold">Rp {totalHarga.toLocaleString()}</span>
            </div>

            <div className="flex justify-between">
              <button
                onClick={handleCheckout}
                className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Checkout
              </button>
              <Link
                to="/keranjang"
                className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Kembali ke Keranjang
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
