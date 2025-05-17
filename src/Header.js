import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header = ({ darkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const linkClasses = (path) =>
    `transition-all duration-300 font-medium ${
      location.pathname === path
        ? 'text-yellow-300 underline underline-offset-4'
        : 'text-white hover:text-yellow-300'
    }`;

  return (
    <motion.header
      className={`bg-gradient-to-r from-blue-700 to-indigo-700 shadow-md sticky top-0 z-50 ${
        darkMode ? 'text-white' : 'text-white'
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-xl sm:text-2xl font-extrabold tracking-wide text-white"
        >
          Country Explorer
        </Link>

        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link to="/" className={linkClasses('/')}>Home</Link>
          <Link to="/favorites" className={linkClasses('/favorites')}>Favorites</Link>
          <a
            href="https://www.google.com/maps"
            target="_blank"
            rel="noreferrer"
            className="text-white hover:text-yellow-300 transition duration-200"
          >
            Explore Maps
          </a>
        </nav>

        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none transition-transform duration-200 text-white"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-blue-700 px-4 pb-4 text-white"
        >
          <div className="flex flex-col gap-3 text-sm font-medium">
            <Link to="/" onClick={() => setMenuOpen(false)} className={linkClasses('/')}>Home</Link>
            <Link to="/favorites" onClick={() => setMenuOpen(false)} className={linkClasses('/favorites')}>Favorites</Link>
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-yellow-300 transition"
            >
              Explore Maps
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;
