'use client'

import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'
import LoginImage from "../assets/login-page-img.png";
import { LoginFormData, FormErrors, validateForm } from '../lib/validateForm';

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: ""
  })
  const [errors, setErrors] = useState<FormErrors>({})

  function handleLoginSubmit(e: React.FormEvent) {
    e.preventDefault();

    const err = validateForm(formData, "login");
    setErrors(err);
    if (Object.keys(err).length === 0) {
      console.log("Submitted!!");
        setFormData({
        email: "",
        password: ""
      })
      setErrors({});
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000] px-4">
      <form
        onSubmit={handleLoginSubmit}
        className="w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl p-8 space-y-6 animate-fadeIn"
      >
        <h2 className="text-3xl font-bold text-center text-lavender-200">Welcome Back</h2>
        <p className="text-center text-sm text-purple-300">Log in to continue</p>

        <div className="flex justify-center">
          <Image
            src={LoginImage}
            alt="Login Image"
            height={150}
            width={150}
            className="rounded-full shadow-lg ring-2 ring-lavender-300"
          />
        </div>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({
              ...formData,
              email: e.target.value
            })}
            className="w-full px-4 py-3 bg-gray-800 text-white placeholder-purple-300 border border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          {errors.email && <p className="text-red-400">{errors.email}</p>}

          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({
              ...formData,
              password: e.target.value
            })}
            className="w-full px-4 py-3 bg-gray-800 text-white placeholder-purple-300 border border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          {errors.password && <p className="text-red-400">{errors.password}</p>}

        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition"
        >
          Log In
        </button>

        <p className="text-center text-sm text-purple-300">
          Don’t have an account?{' '}
          <Link href="/register" className="text-purple-200 font-medium hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  )
}
