import React, { useState } from 'react';
import { Shield, Lock, Mail } from 'lucide-react';

interface AdminLoginPageProps {
  onLogin: () => void;
}

export default function AdminLoginPage({ onLogin }: AdminLoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // In a real app, this would validate against your backend
      if (email === 'admin@fundamental.com' && password === 'admin123') {
        onLogin();
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Failed to login');
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Shield className="w-16 h-16 text-purple-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Portal</h1>
          <p className="text-gray-600">Access the business backend</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 
                      focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
                    placeholder="admin@fundamental.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 
                      focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                className="w-full bg-purple-500 text-white py-3 rounded-xl font-medium
                  transform transition-all duration-200 
                  hover:bg-purple-600 hover:shadow-lg 
                  active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-300"
              >
                Access Admin Portal
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}