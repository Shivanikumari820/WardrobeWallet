import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Custom toast style for project colors
const toastStyle = {
  borderRadius: '12px',
  fontWeight: 500,
  fontSize: '1rem',
  boxShadow: '0 2px 16px 0 rgba(80,80,180,0.08)',
};

const ToastProvider = ({ children }) => {
  return (
    <>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastStyle={toastStyle}
        toastClassName={(context) =>
          context?.type === "success"
            ? "bg-yellow-400 text-gray-900"
            : context?.type === "error"
            ? "bg-blue-600 text-white"
            : "bg-indigo-100 text-gray-900"
        }
        bodyClassName="flex items-center"
        progressClassName="bg-indigo-500"
      />
    </>
  );
};

export default ToastProvider;
