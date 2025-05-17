import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import bgImage from "./assets/Nishyyyyyy.png";
import { toast } from "react-hot-toast";

function Login({ setUser }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const saved = JSON.parse(localStorage.getItem("credentials"));
    if (saved && saved.name === name && saved.password === password) {
      localStorage.setItem("user", name);
      localStorage.setItem("avatar", saved.avatar || "");
      setUser(name);
      toast.success(`Welcome back, ${name}!`);
      setTimeout(() => navigate("/"), 1000);
    } else {
      toast.error("Invalid name or password!");
    }
  };

  return (
    <div className="h-screen w-screen bg-[#0f172a] text-white flex items-center justify-center">
      <div className="flex h-[90%] w-[90%] max-w-6xl rounded-xl shadow-2xl overflow-hidden bg-[#1e293b]">
        {/* Left Side Image */}
        <div className="w-1/2 hidden md:block">
          <img
            src={bgImage}
            alt="Background"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-10 py-8">
          <h2 className="text-3xl font-bold text-purple-400 mb-6">
            Login to Country Explorer
          </h2>

          <input
            type="text"
            placeholder="Username"
            className="w-full mb-4 px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-6 px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full py-2 rounded bg-purple-600 hover:bg-purple-700 transition text-white font-semibold"
          >
            Login
          </button>

          <p className="text-sm mt-6 text-center text-gray-300">
            Don’t have a passport?{" "}
            <Link
              to="/register"
              className="text-purple-400 hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
