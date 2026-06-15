import React, { useState } from 'react'
import { Logo, Input, Button } from './index'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [toast, setToast] = useState(false);

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
    setError('')
  }

  const handleLogin = () => {
    const { email, password } = formData

    if (!email || !password) {
      setError('Please fill in all fields.')
      return
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    

    setToast(true);
    setTimeout(() => {
      setToast(false);
      navigate('/');
    }, 1500); // navigate after toast shows for 1.5s
  }
  const handleKeyDown = (e) => {
  if (e.key === "Enter") handleLogin(e);
};

  return (
    <>
    {toast && (
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 animate-fade-in z-99999">
        <div className="flex items-center gap-3 bg-white border border-green-200 shadow-lg rounded-xl px-5 py-3">
          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
            <svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-700">Login successful!</p>
        </div>
      </div>
    )}

    <div className='
      w-full sm:w-[80%] md:w-[60%] lg:w-1/2
      mx-auto
      my-[24px]
      px-6 sm:px-10 md:px-[50px]
      pt-10 pb-8
      bg-white rounded-sm shadow-md
    '>

      {/* Logo */}
      <div className='flex justify-center mb-2 cursor-pointer'>
        <Logo />
      </div>

      {/* Heading */}
      <h1 className='text-center text-xl sm:text-2xl font-bold mb-2'>
        Sign in to Your Account
      </h1>
      <p className="mt-2 text-center text-sm sm:text-base text-black/60">
        Don&apos;t have any account?&nbsp;
        <Link
          to="/signup"
          className="font-medium text-[#f85606] transition-all duration-200 hover:underline"
        >
          Sign Up
        </Link>
      </p>

      {/* Error */}
      {error && (
        <div className='mt-4 px-4 py-2 bg-red-50 border border-red-200 rounded-lg'>
          <p className='text-sm text-red-600 text-center'>{error}</p>
        </div>
      )}

      {/* Email */}
      <div className='mt-12 mb-8'>
        <Input
          floating
          label="Email"
          type="email"
          containerClassName="mb-4"
          value={formData.email}
          onChange={handleChange('email')}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Password */}
      <div className='mt-8 mb-14'>
        <Input
          floating
          label="Password"
          type="password"
          containerClassName="mb-4"
          value={formData.password}
          onChange={handleChange('password')}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Sign In Button */}
      <div className='mt-6'>
        <Button
          onClick={handleLogin}
          className='w-full bg-[#f85606] text-white py-2 rounded-md hover:bg-[#F05000] active:bg-[#DE4A00] active:scale-98 transition-all duration-200 mb-1'
        >
          Sign In
        </Button>
      </div>

    </div>
    </>
  )
}


export default Login