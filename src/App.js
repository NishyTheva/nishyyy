// -- Code starts here --
import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom';
import CountryCard from './CountryCard';
import CountryDetails from './CountryDetails';
import Favorites from './Favorites';
import Login from './Login';
import Register from './Register';
import { Toaster } from 'react-hot-toast';
import Header from './Header';
import Footer from './Footer';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [region, setRegion] = useState('');
  const [language, setLanguage] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [avatar, setAvatar] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (!localStorage.getItem('hasLoadedBefore')) {
      localStorage.removeItem('user');
      localStorage.setItem('hasLoadedBefore', 'true');
    }
    const creds = JSON.parse(localStorage.getItem('credentials'));
    if (creds?.avatar) setAvatar(creds.avatar);
  }, []);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const filteredCountries = countries
    .filter((c) => c.name.common.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
    .filter((c) => region === '' || c.region === region)
    .filter((c) => {
      if (!language) return true;
      const langs = Object.values(c.languages || {});
      return langs.some((l) => l.toLowerCase().includes(language.toLowerCase()));
    });

  const sortedCountries = [...filteredCountries].sort((a, b) => {
    const nameA = a.name.common.toLowerCase();
    const nameB = b.name.common.toLowerCase();
    return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
  });

  const finalCountries = countryCode
    ? sortedCountries.filter((c) => c.cca3.toLowerCase().includes(countryCode.toLowerCase()))
    : sortedCountries;

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('hasLoadedBefore');
    setUser(null);
    navigate('/login');
  };

  const addFavorite = (country) => {
    if (!favorites.find((fav) => fav.cca3 === country.cca3)) {
      setFavorites([...favorites, country]);
    }
  };

  const removeFavorite = (country) => {
    setFavorites(favorites.filter((fav) => fav.cca3 !== country.cca3));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <>
      <Header />
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-tr from-blue-100 to-white'}`}>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/favorites" element={<Favorites favorites={favorites} removeFavorite={removeFavorite} user={user} />} />
          <Route path="/country/:code" element={<CountryDetails />} />
          <Route
            path="/"
            element={
              !user ? (
                <Navigate to="/login" />
              ) : (
                <div className="max-w-screen-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md my-10 relative">
                  <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                    <div className="flex items-center space-x-4">
                      {avatar && (
                        <img
                          src={avatar}
                          alt="User avatar"
                          className="w-10 h-10 rounded-full object-cover border-2 border-blue-500 shadow-md"
                        />
                      )}
                      <h1 className="text-2xl font-semibold text-blue-700 dark:text-white">
                        Hello, {user}! Unlock the beauty of every nation.
                      </h1>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:gap-4 items-center">
                      <Link to="/favorites" className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded shadow text-sm transition">
                        Favorites
                      </Link>
                      <button onClick={toggleDarkMode} className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded shadow text-sm transition">
                        {darkMode ? "Light" : "Dark"}
                      </button>
                      <button onClick={handleLogout} className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded shadow text-sm transition">
                        Logout
                      </button>
                    </div>
                  </div>

                  {/* Search & Filters */}
                  <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 mb-6">
                    <input type="text" placeholder="Search countries..." className="border px-4 py-2 rounded shadow-sm w-full sm:w-44 dark:bg-gray-700 dark:border-gray-600" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <select value={region} onChange={(e) => setRegion(e.target.value)} className="border px-4 py-2 rounded shadow-sm w-full sm:w-40 dark:bg-gray-700 dark:border-gray-600">
                      <option value="">All Regions</option>
                      <option value="Africa">Africa</option>
                      <option value="Americas">Americas</option>
                      <option value="Asia">Asia</option>
                      <option value="Europe">Europe</option>
                      <option value="Oceania">Oceania</option>
                    </select>
                    <select value={language} onChange={(e) => setLanguage(e.target.value)} className="border px-4 py-2 rounded shadow-sm w-full sm:w-44 dark:bg-gray-700 dark:border-gray-600">
                      <option value="">All Languages</option>
                      <option value="english">English</option>
                      <option value="french">French</option>
                      <option value="spanish">Spanish</option>
                      <option value="arabic">Arabic</option>
                      <option value="chinese">Chinese</option>
                      <option value="hindi">Hindi</option>
                      <option value="german">German</option>
                      <option value="portuguese">Portuguese</option>
                      <option value="russian">Russian</option>
                      <option value="japanese">Japanese</option>
                    </select>
                    <input type="text" placeholder="Search by code (e.g. LKA)" className="border px-4 py-2 rounded shadow-sm w-full sm:w-44 dark:bg-gray-700 dark:border-gray-600" value={countryCode} onChange={(e) => setCountryCode(e.target.value)} />
                    <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="border px-4 py-2 rounded shadow-sm w-full sm:w-40 dark:bg-gray-700 dark:border-gray-600">
                      <option value="asc">Ascending</option>
                      <option value="desc">Descending</option>
                    </select>
                  </div>

                  {/* Country Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {loading ? (
                      Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="text-center text-lg text-gray-500 dark:text-gray-400 font-medium animate-pulse">
                          Loading...
                        </div>
                      ))
                    ) : finalCountries.length === 0 ? (
                      <div className="text-center col-span-full text-red-500 dark:text-red-300 text-lg font-semibold">
                        No countries match your search.
                      </div>
                    ) : (
                      finalCountries.map((country) => (
                        <div key={country.cca3} onClick={() => setSelectedCountry(country)}>
                          <CountryCard country={country} />
                        </div>
                      ))
                    )}
                  </div>

                  {/* Modal */}
                  {selectedCountry && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-2xl w-full relative animate-fadeIn">
                        <button
                          onClick={() => setSelectedCountry(null)}
                          className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white rounded-full px-4 py-1 text-xs font-semibold shadow-sm transition"
                        >
                          Close
                        </button>

                        <h2 className="text-3xl font-bold text-center mb-6 text-blue-700 dark:text-white">{selectedCountry.name.common}</h2>
                        <img src={selectedCountry.flags.svg} alt={`${selectedCountry.name.common} flag`} className="mx-auto mb-6 rounded shadow-lg w-48 h-32 object-cover" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300 text-lg">
                          <p><strong>Capital:</strong> {selectedCountry.capital?.[0] || 'N/A'}</p>
                          <p><strong>Region:</strong> {selectedCountry.region}</p>
                          <p><strong>Subregion:</strong> {selectedCountry.subregion || 'N/A'}</p>
                          <p><strong>Population:</strong> {selectedCountry.population.toLocaleString()}</p>
                          <p><strong>Area:</strong> {selectedCountry.area?.toLocaleString()} km²</p>
                          <p><strong>Timezones:</strong> {selectedCountry.timezones?.join(', ')}</p>
                          <p><strong>Languages:</strong> {Object.values(selectedCountry.languages || {}).join(", ")}</p>
                        </div>

                        {selectedCountry.latlng && (
                          <div className="text-center mt-6">
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${selectedCountry.latlng[0]},${selectedCountry.latlng[1]}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full shadow-lg transition"
                            >
                              View on Map
                            </a>
                          </div>
                        )}

                        <div className="text-center mt-4">
                          <button
                            onClick={() => {
                              addFavorite(selectedCountry);
                              setSelectedCountry(null);
                            }}
                            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-white px-5 py-2 rounded-full shadow-lg transition mt-4"
                          >
                            Add to Favorites
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            }
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
