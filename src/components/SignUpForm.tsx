import React, { useState } from 'react';
import { Mail, Lock, Sparkles } from 'lucide-react';

interface SignUpFormProps {
  onSignUp: () => void;
  onSignIn: () => void;
}

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpForm({ onSignUp, onSignIn }: SignUpFormProps) {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    onSignUp();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8 animate-fade-in">
        <Sparkles className="inline-block w-12 h-12 text-purple-500 mb-2" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          <span className="text-purple-600">FUND</span>amental
        </h1>
        <p className="text-gray-600">Start your journey to financial freedom</p>
      </div>

      <form 
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl animate-fade-in"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2 font-medium" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 
                  focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 
                  focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 
                  focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-2 animate-fade-in">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-3 rounded-xl font-medium
              transform transition-all duration-200 
              hover:bg-purple-600 hover:shadow-lg 
              active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-300"
          >
            Create Account
          </button>

          <div className="text-center text-gray-600">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onSignIn}
              className="text-purple-600 font-medium hover:text-purple-700"
            >
              Sign In
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}