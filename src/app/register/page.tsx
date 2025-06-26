'use client'

import React, { useState } from 'react'

type RegisterFormData = {
  username: string,
  email: string,
  password: string
}
type FormErrors = {
  username?: string,
  email?: string
  password?: string
}

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validateForm(formData);
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

  function validateForm(data: RegisterFormData): FormErrors {
    const errors: FormErrors = {};
    if (data.username.length < 6) {
      errors.username = "Username must have more than 6 chracters."
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = "Email is not valid."
    }
    if (data.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    return errors;
  }



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 animate-fadeIn"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">Create Account</h2>
        <p className="text-center text-sm text-gray-500">Join the community today</p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={handleFormChange}
            name='username'
            className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {
            error.username && <p className='text-red-600'>{error.username}</p>
          }
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleFormChange}
            name='email'
            className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {
            error.email && <p className='text-red-600'>{error.email}</p>
          }
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleFormChange}
            name='password'
            className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {
            error.password && <p className='text-red-600'>{error.password}</p>
          }
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={success}
        >
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 font-medium hover:underline">
            Log In
          </a>
        </p>
        {success && (
          <p className="text-green-600 text-center font-medium">
            Registered Successfully!
          </p>
        )}
      </form>
    </div>
  )
}
