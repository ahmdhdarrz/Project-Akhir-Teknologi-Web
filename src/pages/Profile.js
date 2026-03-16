// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import { database, auth } from '../firebaseConfig';
import { ref, get, set } from 'firebase/database';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userData, setUserData] = useState({ name: '', email: '', phone: '' });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = ref(database, `users/${user.uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          setUserData(snapshot.val());
        }
      }
    };
    fetchUserData();
  }, []);

  const handleSave = () => {
    const user = auth.currentUser;
    if (user) {
      set(ref(database, `users/${user.uid}`), userData);
      setIsEditing(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/loginpage');
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Profil Pengguna</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Nama</label>
          <input
            type="text"
            className="w-full p-2 border rounded mt-1"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            disabled={!isEditing}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded mt-1 bg-gray-100"
            value={userData.email}
            disabled={!isEditing}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Nomor HP</label>
          <input
            type="text"
            className="w-full p-2 border rounded mt-1"
            value={userData.phone}
            onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
            disabled={!isEditing}
          />
        </div>
        {isEditing ? (
          <button
            onClick={handleSave}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Simpan
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
          >
            Edit Profil
          </button>
        )}
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded mt-4 hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
