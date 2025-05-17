import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import OnboardImage from "./assets/Nishyyyyyy.png";

const schema = yup.object().shape({
  name: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Minimum 8 characters")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Include at least one symbol")
    .matches(/\d/, "Include at least one number"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
  country: yup.string().required("Select your country"),
  terms: yup.bool().oneOf([true], "You must accept the terms"),
});

const countries = [
  "Select your country", "Argentina", "Australia", "Brazil", "Canada", "China", "Denmark", "Egypt",
  "France", "Germany", "India", "Indonesia", "Italy", "Japan", "Kenya", "Mexico", "Netherlands",
  "New Zealand", "Norway", "Pakistan", "Russia", "Saudi Arabia", "South Africa", "South Korea",
  "Spain", "Sri Lanka", "Sweden", "Switzerland", "Thailand", "Turkey", "UAE", "UK", "USA", "Vietnam"
];

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [showPassword, setShowPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarBase64, setAvatarBase64] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setAvatarBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    const credentials = {
      name: data.name,
      password: data.password,
      avatar: avatarBase64 || "",
    };

    localStorage.setItem("credentials", JSON.stringify(credentials));
    localStorage.setItem("avatar", avatarBase64 || "");

    toast.success("Registration successful!", {
      style: {
        borderRadius: "10px",
        background: "#4f46e5",
        color: "#fff",
        fontWeight: "bold",
      },
    });

    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-12 font-sans"
    >
      <div className="flex w-full max-w-5xl bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
        {/* Left image */}
        <div
          className="hidden md:flex w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url(${OnboardImage})` }}
        ></div>

        {/* Right form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full md:w-1/2 p-10 space-y-5 text-white"
        >
          <h2 className="text-2xl font-bold text-center text-purple-400">
            Country Explorer – Get Your Passport
          </h2>

          {/* Full Name */}
          <div>
            <input
              type="text"
              {...register("name")}
              placeholder="Full Name"
              className="w-full bg-gray-700 text-white border border-gray-600 px-4 py-2 rounded"
            />
            <p className="text-red-400 text-sm mt-1">{errors.name?.message}</p>
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              {...register("email")}
              placeholder="Email"
              className="w-full bg-gray-700 text-white border border-gray-600 px-4 py-2 rounded"
            />
            <p className="text-red-400 text-sm mt-1">{errors.email?.message}</p>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="Password"
              className="w-full bg-gray-700 text-white border border-gray-600 px-4 py-2 rounded pr-20"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-sm text-purple-300 hover:text-purple-100"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
            <p className="text-red-400 text-sm mt-1">{errors.password?.message}</p>
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="Confirm Password"
              className="w-full bg-gray-700 text-white border border-gray-600 px-4 py-2 rounded"
            />
            <p className="text-red-400 text-sm mt-1">
              {errors.confirmPassword?.message}
            </p>
          </div>

          {/* Country */}
          <div>
            <select
              {...register("country")}
              className="w-full bg-gray-700 text-white border border-gray-600 px-4 py-2 rounded"
            >
              {countries.map((c, i) => (
                <option key={i} value={c === "Select your country" ? "" : c}>
                  {c}
                </option>
              ))}
            </select>
            <p className="text-red-400 text-sm mt-1">{errors.country?.message}</p>
          </div>

          {/* Upload */}
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm file:bg-purple-600 file:text-white file:px-4 file:py-1 file:rounded file:border-none bg-gray-700 text-white border border-gray-600 px-2 py-2 rounded"
            />
          </div>

          {avatarPreview && (
            <div className="text-center">
              <img
                src={avatarPreview}
                alt="avatar"
                className="w-20 h-20 rounded-full mx-auto border-2 border-purple-500 shadow-sm object-cover"
              />
            </div>
          )}

          {/* Terms */}
          <div className="flex items-center space-x-2">
            <input type="checkbox" {...register("terms")} />
            <label className="text-sm">I accept the Terms and Conditions</label>
          </div>
          <p className="text-red-400 text-sm mt-1">{errors.terms?.message}</p>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded"
          >
            Register
          </button>

          <p className="text-sm text-center mt-2">
            Already have a passport?{" "}
            <a href="/login" className="text-purple-400 underline hover:text-purple-200">
              Login here
            </a>
          </p>
        </form>
      </div>
    </motion.div>
  );
};

export default Register;
