import React from 'react';
import CountryCard from './CountryCard';

function Favorites({ favorites, removeFavorite, user }) {
  return (
    <div className="max-w-screen-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg my-10 animate-fadeIn">
      <h2 className="text-3xl font-bold text-center text-blue-700 dark:text-white mb-6">
        {user}'s Favorite Countries
      </h2>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 text-lg">
          No favorites added yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((country, index) => (
            <div key={index} className="relative group">
              <CountryCard
                country={country}
                onClick={() => window.location.href = `/country/${country.cca3}`}
              />
              <button
                onClick={() => removeFavorite(country)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-xs shadow-md transition duration-300"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
