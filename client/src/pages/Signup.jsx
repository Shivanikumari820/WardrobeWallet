import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { showSuccessToast, showErrorToast } from '../utils/toast'
import oldclothesImg from '../assets/oldclothes.png'
// Make sure ToastContainer is rendered in your App.jsx or index.jsx
// import { ToastContainer } from 'react-toastify';
// <ToastContainer /> should be present in your main component

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', address: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://cloth2cash.onrender.com/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        showSuccessToast('Signup successful! Redirecting to profile...');
        
        setTimeout(() => {
          window.location.href = '/profile';
        }, 2000);
      } else {
        showErrorToast(data.message || 'Signup failed');
        setError(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      showErrorToast('Network error. Please try again.');
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image with Blur */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${oldclothesImg})`,
          filter: 'blur(4px)',
          zIndex: 0
        }}
      ></div>
      {/* Overlay for dimming */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>
      {/* Signup Form */}
      <form 
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md bg-white/40 backdrop-blur-xl rounded-3xl shadow-2xl p-10 flex flex-col gap-7 border border-white/50"
      >
        <div className="flex flex-col items-center mb-2">
          {/* <div className="text-4xl mb-2 text-blue-500">📝</div> */}
          <h2 className="text-3xl font-bold text-gray-800 mb-1">Sign Up</h2>
          <p className="text-gray-700 text-base">Create your account to get started.</p>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Name"
          className="px-4 py-3 rounded-xl bg-white/80 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-gray-800 placeholder-gray-400 text-lg shadow-sm transition-all"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="Email"
          className="px-4 py-3 rounded-xl bg-white/80 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-gray-800 placeholder-gray-400 text-lg shadow-sm transition-all"
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          placeholder="Password"
          className="px-4 py-3 rounded-xl bg-white/80 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-gray-800 placeholder-gray-400 text-lg shadow-sm transition-all"
        />
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
          placeholder="Phone Number"
          className="px-4 py-3 rounded-xl bg-white/80 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-gray-800 placeholder-gray-400 text-lg shadow-sm transition-all"
        />
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          required
          placeholder="Address"
          className="px-4 py-3 rounded-xl bg-white/80 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-gray-800 placeholder-gray-400 text-lg shadow-sm transition-all"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold py-3 rounded-xl shadow-lg hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all text-lg mt-2 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
        <div className="text-center mt-3">
          <span className="text-gray-600">Already have an account?</span>{' '}
          <button type="button" onClick={() => navigate('/login')} className="text-blue-600 font-semibold hover:underline bg-transparent border-0 p-0 m-0 align-baseline cursor-pointer">Login</button>
        </div>
      </form>
    </div>
  )
}

export default Signup