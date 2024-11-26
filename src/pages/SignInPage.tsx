import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Shield, ArrowLeft } from 'lucide-react';

interface SignInPageProps {
  onSignIn: () => void;
  onSignUp: () => void;
}

export default function SignInPage({ onSignIn, onSignUp }: SignInPageProps) {
  const [step, setStep] = useState<'credentials' | 'verification'>('credentials');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');

  // In a real app, this would be handled by your backend
  const sendVerificationCode = async (email: string) => {
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log(`Verification code sent to ${email}`);
        resolve();
      }, 1000);
    });
  };

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // In a real app, validate credentials with your backend
      await sendVerificationCode(formData.email);
      setStep('verification');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  const handleVerificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // In a real app, validate the verification code with your backend
    if (verificationCode.length === 6) {
      onSignIn();
    } else {
      setError('Invalid verification code');
    }
  };

  const handleResendCode = async () => {
    setError('');
    await sendVerificationCode(formData.email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back to <span className="text-purple-600">FUND</span>amental
          </h1>
          <p className="text-gray-600">
            {step === 'credentials' 
              ? 'Sign in to continue your journey'
              : 'Verify your identity'}
          </p>
        </div>

        {step === 'credentials' ? (
          <form onSubmit={handleCredentialsSubmit} className="space-y-6">
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
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, email: e.target.value }))
                      }
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 
                        focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
                      placeholder="your@email.com"
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
                      value={formData.password}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
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
                    active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-300
                    flex items-center justify-center gap-2"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <button
                    onClick={onSignUp}
                    className="text-purple-600 font-medium hover:text-purple-700"
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerificationSubmit} className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
              <div className="space-y-6">
                <div className="text-center">
                  <Shield className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Two-Step Verification
                  </h2>
                  <p className="text-gray-600 text-sm">
                    We've sent a verification code to {formData.email}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 
                      focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none
                      text-center text-2xl tracking-widest"
                    placeholder="000000"
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                <div className="flex flex-col gap-3">
                  <button
                    type="submit"
                    className="w-full bg-purple-500 text-white py-3 rounded-xl font-medium
                      transform transition-all duration-200 
                      hover:bg-purple-600 hover:shadow-lg 
                      active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-300
                      flex items-center justify-center gap-2"
                  >
                    <span>Verify & Sign In</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep('credentials')}
                    className="w-full bg-gray-100 text-gray-600 py-3 rounded-xl font-medium
                      transform transition-all duration-200 
                      hover:bg-gray-200
                      active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-300
                      flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back</span>
                  </button>
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleResendCode}
                    className="text-purple-600 text-sm hover:text-purple-700"
                  >
                    Resend verification code
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}