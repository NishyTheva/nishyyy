import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function CountryDetails() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/alpha/${code}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch country');
        return res.json();
      })
      .then((data) => setCountry(data[0]))
      .catch((err) => {
        console.error("Error fetching country details:", err);
        setError('Could not load country details.');
      });
  }, [code]);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  if (!country) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-blue-600 animate-pulse">Loading country details...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto mt-12 px-6 py-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg animate-fadeIn relative"
    >
      {/* Close Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-sm"
      >
        Close
      </button>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-blue-800 dark:text-yellow-300 tracking-tight">
          {country.name.common}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Country Code: {country.cca3}
        </p>
      </div>

      {/* Flag */}
      <div className="flex justify-center mb-10">
        {country.flags?.svg ? (
          <img
            src={country.flags.svg}
            alt={`${country.name.common} flag`}
            className="w-60 h-40 rounded-xl border border-gray-300 shadow-md object-cover"
          />
        ) : (
          <div className="w-60 h-40 flex items-center justify-center bg-gray-100 text-gray-500 rounded-xl">
            No Flag Available
          </div>
        )}
      </div>

      {/* Info Grid */}
      <div className="grid sm:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300 text-lg">
        <div><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</div>
        <div><strong>Region:</strong> {country.region || 'N/A'}</div>
        <div><strong>Subregion:</strong> {country.subregion || 'N/A'}</div>
        <div><strong>Population:</strong> {country.population?.toLocaleString() || 'N/A'}</div>
        <div><strong>Area:</strong> {country.area?.toLocaleString()} km²</div>
        <div><strong>Timezones:</strong> {country.timezones?.join(', ') || 'N/A'}</div>
        <div><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</div>
      </div>

      {/* Buttons */}
      {country.latlng && (
        <div className="flex justify-center flex-col sm:flex-row gap-4 mt-10">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${country.latlng[0]},${country.latlng[1]}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-md transition duration-200"
          >
            View on Map
          </a>
          <button
            className="inline-block text-center bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-2 rounded-full shadow-md transition duration-200"
          >
            Add to Favorites
          </button>
        </div>
      )}
    </motion.div>
  );
}

export default CountryDetails;
