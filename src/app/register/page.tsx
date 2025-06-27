'use client'

import React, { useState } from 'react'
import RegisterImage from "../assets/register-page-img.png";
import Image from 'next/image';
import Link from 'next/link';
import { RegisterFormData, FormErrors, validateForm } from '../lib/validateForm';

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    email: "",
    password: ""
  })
  const [error, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState<boolean>(false);

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData(prev => (
      {
        ...prev,
        [name]: value
      }
    ))
  }

  function handleRegisterSubmit(e: React.FormEvent) {
    e.preventDefault();

    const err = validateForm(formData, "register");
    setErrors(err);

    if (Object.keys(err).length === 0) {
      console.log("Form submitted!");
      setFormData({
        username: "",
        email: "",
        password: ""
      })
      setErrors({});
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false)
      }, 3000)
    }

  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0] px-4">
      <form
        onSubmit={handleRegisterSubmit}
        className="w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl p-8 space-y-6 animate-fadeIn"
      >
        <h2 className="text-3xl font-bold text-center text-lavender-200">Create Account</h2>

        <p className="text-center text-sm text-purple-300">Start your journey</p>

        <div className="flex justify-center">
          <Image
            src={RegisterImage}
            alt="Register Teddy"
            height={150}
            width={150}
            className="rounded-full shadow-lg ring-2 ring-lavender-300"
          />
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={handleFormChange}
            name='username'
            className="w-full px-4 py-3 bg-gray-800 text-white placeholder-purple-300 border border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          {error.username && <p className="text-red-400">{error.username}</p>}

          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleFormChange}
            name='email'
            className="w-full px-4 py-3 bg-gray-800 text-white placeholder-purple-300 border border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          {error.email && <p className="text-red-400">{error.email}</p>}

          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleFormChange}
            name='password'
            className="w-full px-4 py-3 bg-gray-800 text-white placeholder-purple-300 border border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          {error.password && <p className="text-red-400">{error.password}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={success}
        >
          Sign Up
        </button>

        <p className="text-center text-sm text-purple-300">
          Already have an account?{' '}
          <Link href="/login" className="text-purple-200 font-medium hover:underline">
            Log In
          </Link>
        </p>

        {success && (
          <p className="text-green-400 text-center font-medium">
            Registered Successfully!
          </p>
        )}
      </form>
    </div>

  )
}
