import React from "react";
import { BrowserRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import logo from './assets/logo.png';
import { Home, CreatePost } from "./pages";
import ThemeToggle from "./components/Themetoggle";
import { FiPlus } from 'react-icons/fi';

const App = () => {
  const location = useLocation();
  const isCreatePage = location.pathname === "/Create-Post"; 

  return (
    <>
      <header className="w-full px-2 flex justify-between items-center bg-[#121212] shadow-sm pr-0 pt-2 border-b border-gray-800">
        <div className="flex items-center gap-2 w-full">
          <img src={logo} alt="Logo" className="w-[130px] max-w-none h-auto animate-fadeInLeft" />
          <h1 className="text-7xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            AI Image Generator
          </h1>
        </div>
        <div className="absolute top-4 right-4 z-50">
          <ThemeToggle />
        </div>
      </header>

      {!isCreatePage && (
        <div className="flex justify-end px-4 py-2 bg-[#f9fafe] dark:bg-gray-800">
          <Link to="/Create-Post">
            <button className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 transition-all duration-300">
              <FiPlus className="text-xl" />
              <span className="hidden sm:inline">Create</span>
            </button>
          </Link>
        </div>
      )}
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] dark:bg-gray-800 dark:text-white min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Create-Post" element={<CreatePost />} />
        </Routes>
      </main>
    </>
  );
};

const WrappedApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default WrappedApp;
