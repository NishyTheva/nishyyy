import React from 'react';
import { motion } from 'framer-motion';

function CountryCard({ country, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className="cursor-pointer bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300 p-5 flex flex-col items-center text-center"
    >
      {/* Flag */}
      {country.flags?.svg ? (
        <img
          src={country.flags.svg}
          alt={`${country.name.common} flag`}
          className="w-24 h-16 object-cover rounded-md shadow mb-4 border border-gray-300"
          loading="lazy"
        />
      ) : (
        <div className="w-24 h-16 flex items-center justify-center bg-gray-200 text-gray-500 rounded-md mb-4">
          No Flag
        </div>
      )}

      {/* Country Name */}
      <h3 className="text-lg font-semibold text-blue-700 dark:text-yellow-300 truncate">
        {country.name.common}
      </h3>

      {/* Basic Info */}
      <div className="mt-2 text-sm text-gray-600 dark:text-gray-300 space-y-1">
        <p>
          <span className="font-medium">Capital:</span>{' '}
          {country.capital?.[0] || 'N/A'}
        </p>
        <p>
          <span className="font-medium">Region:</span>{' '}
          {country.region || 'N/A'}
        </p>
      </div>
    </motion.div>
  );
}

export default CountryCard;
