import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldUser, Eye, EyeOff } from 'lucide-react'

const AdminLogin = () => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const [showPass, setShowPass] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email === 'sumanqaj9876@gmail.com' && pass === 'suman') {
      setError('')
      localStorage.setItem("isAdmin", "true")
      navigate('/dashboard')
    } else {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Hero background */}
      <div className="absolute inset-0 w-full h-full z-0">
        {/* Background Image with Blur */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/src/assets/oldclothes.png')`,
            filter: 'blur(3px)',
            transform: 'scale(1.1)',
          }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>
      {/* Login Card */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="max-w-md w-full mx-auto p-12 border border-gray-200 rounded-2xl bg-white shadow-lg min-h-[440px]">
          <div className="flex items-center justify-center mb-6">
            <ShieldUser size={32} color="#4f46e5" className="mr-2" />
            <h2 className="m-0 font-semibold text-2xl text-gray-900">Admin Login</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="font-medium text-gray-700 mb-1 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-base outline-none focus:ring-2 focus:ring-primary focus:border-primary transition mb-1"
                required
              />
            </div>
            <div className="mb-5 relative">
              <label className="font-medium text-gray-700 mb-1 block">Password</label>
              <input
                type={showPass ? "text" : "password"}
                value={pass}
                onChange={e => setPass(e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md text-base outline-none focus:ring-2 focus:ring-primary focus:border-primary transition mb-1"
                required
              />
              <span
                className="absolute right-3 top-9 -translate-y-1/2 cursor-pointer text-gray-500 mt-3"
                onClick={() => setShowPass(v => !v)}
                tabIndex={0}
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            {error && (
              <div className="text-pink-600 mb-4 font-medium">{error}</div>
            )}
            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-green-600 to-emerald-600  hover:bg-green-900 text-white rounded-md font-semibold text-lg"
            >
              Login
            </button>
            <div className="mt-4 text-center text-gray-500 text-sm ">
              <div>
                <span className="font-medium">Email:</span> sumanqaj9876@gmail.com
              </div>
              <div>
                <span className="font-medium">Pass:</span> suman
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin