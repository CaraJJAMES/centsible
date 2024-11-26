import React from 'react';
import { Sparkles, ArrowRight, Shield, Target, Users, PiggyBank } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onSignIn: () => void;
}

export default function LandingPage({ onGetStarted, onSignIn }: LandingPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Sparkles className="w-8 h-8 text-purple-500" />
              <span className="ml-2 text-xl font-bold text-gray-800">
                <span className="text-purple-600">FUND</span>amental
              </span>
            </div>
            <button
              onClick={onSignIn}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-800 mb-6">
              Transform Your Spending Habits
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Take control of your finances with a personal money coach that makes
              budgeting fun and social.
            </p>
            <button
              onClick={onGetStarted}
              className="px-8 py-4 bg-purple-500 text-white rounded-xl font-medium
                transform transition-all duration-200 
                hover:bg-purple-600 hover:shadow-lg 
                active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-300
                flex items-center gap-2 mx-auto"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: PiggyBank,
                title: 'Smart Budgeting',
                description: 'Set and track your budgets with intelligent insights',
              },
              {
                icon: Target,
                title: 'Goal Setting',
                description: 'Create and achieve your financial goals step by step',
              },
              {
                icon: Users,
                title: 'Social Support',
                description: 'Join communities and share your progress',
              },
              {
                icon: Shield,
                title: 'Privacy First',
                description: 'Your financial data is always secure and private',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl"
              >
                <feature.icon className="w-12 h-12 text-purple-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
          <p>© 2024 FUNDamental. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}