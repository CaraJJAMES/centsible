import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import Confetti from 'react-confetti';

interface WelcomeStepProps {
  onNext: () => void;
}

export default function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl text-center">
      <Confetti numberOfPieces={100} recycle={false} />
      
      <Sparkles className="w-16 h-16 text-purple-500 mx-auto mb-6" />
      
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Welcome to <span className="text-purple-600">FUND</span>amental
      </h1>
      
      <p className="text-lg text-gray-600 mb-8">
        Ready to transform your relationship with money? Let's get you set up with
        a personalized financial journey that's actually fun! 🚀
      </p>

      <div className="space-y-6 mb-8">
        <div className="p-4 bg-purple-50 rounded-xl">
          <h3 className="font-medium text-purple-800 mb-2">What's in store?</h3>
          <ul className="text-left text-purple-600 space-y-2">
            <li>🎯 Set meaningful financial goals</li>
            <li>💰 Track expenses with style</li>
            <li>🤝 Join money-savvy communities</li>
            <li>🎮 Turn saving into a game</li>
          </ul>
        </div>

        <div className="p-4 bg-green-50 rounded-xl">
          <h3 className="font-medium text-green-800 mb-2">Quick Setup</h3>
          <p className="text-green-600">
            Just 5 minutes to set up your profile and start your journey to
            financial freedom!
          </p>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full bg-purple-500 text-white py-4 rounded-xl font-medium
          transform transition-all duration-200 
          hover:bg-purple-600 hover:shadow-lg 
          active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-300
          flex items-center justify-center gap-2"
      >
        <span>Let's Get Started</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}