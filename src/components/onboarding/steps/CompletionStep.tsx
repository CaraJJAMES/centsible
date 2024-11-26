import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import Confetti from 'react-confetti';
import { OnboardingData } from '../OnboardingFlow';
import { formatCurrency } from '../../../utils/formatters';

interface CompletionStepProps {
  data: Partial<OnboardingData>;
}

export default function CompletionStep({ data }: CompletionStepProps) {
  const monthlyExpenses = data.fixedExpenses?.reduce(
    (sum, expense) => sum + expense.amount,
    0
  ) || 0;

  const savingsGoal = data.savingsGoal || 0;
  const monthlyIncome = data.monthlyIncome || 0;
  const disposableIncome = monthlyIncome - monthlyExpenses - savingsGoal;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
      <Confetti numberOfPieces={200} recycle={false} />
      
      <div className="text-center mb-8">
        <Sparkles className="w-16 h-16 text-purple-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          You're All Set, {data.name}! 🎉
        </h2>
        <p className="text-gray-600">
          Here's your personalized financial snapshot
        </p>
      </div>

      <div className="space-y-6">
        {/* Monthly Overview */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 rounded-xl text-center">
            <div className="text-sm text-green-600">Monthly Income</div>
            <div className="font-bold text-green-700">
              {formatCurrency(monthlyIncome)}
            </div>
          </div>

          <div className="p-4 bg-purple-50 rounded-xl text-center">
            <div className="text-sm text-purple-600">Fixed Expenses</div>
            <div className="font-bold text-purple-700">
              {formatCurrency(monthlyExpenses)}
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-xl text-center">
            <div className="text-sm text-blue-600">Savings Goal</div>
            <div className="font-bold text-blue-700">
              {formatCurrency(savingsGoal)}
            </div>
          </div>
        </div>

        {/* Disposable Income */}
        <div className="p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl">
          <div className="text-center">
            <div className="text-sm font-medium text-gray-600">
              Monthly Disposable Income
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {formatCurrency(disposableIncome)}
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="space-y-3">
          <h3 className="font-medium text-gray-800">Your Next Steps:</h3>
          <div className="space-y-2">
            <div className="p-3 bg-purple-50 rounded-lg text-purple-700">
              ✨ Set up your first savings goal
            </div>
            <div className="p-3 bg-purple-50 rounded-lg text-purple-700">
              📱 Track your first expense
            </div>
            <div className="p-3 bg-purple-50 rounded-lg text-purple-700">
              🤝 Join a money-saving group
            </div>
          </div>
        </div>

        <button
          onClick={() => window.location.reload()} // In a real app, this would navigate to the dashboard
          className="w-full bg-purple-500 text-white py-4 rounded-xl font-medium
            transform transition-all duration-200 
            hover:bg-purple-600 hover:shadow-lg 
            active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-300
            flex items-center justify-center gap-2"
        >
          <span>Start Your Journey</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}