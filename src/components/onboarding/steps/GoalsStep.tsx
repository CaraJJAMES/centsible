import React, { useState } from 'react';
import { Target, ArrowRight, ArrowLeft, TrendingUp, Shield } from 'lucide-react';
import { OnboardingData } from '../OnboardingFlow';

interface GoalsStepProps {
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  initialData: Partial<OnboardingData>;
}

export default function GoalsStep({
  onNext,
  onBack,
  initialData,
}: GoalsStepProps) {
  const [formData, setFormData] = useState({
    savingsGoal: initialData.savingsGoal || '',
    riskTolerance: initialData.riskTolerance || 'medium',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({
      savingsGoal: Number(formData.savingsGoal),
      riskTolerance: formData.riskTolerance as 'low' | 'medium' | 'high',
    });
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
      <div className="text-center mb-8">
        <Target className="w-16 h-16 text-purple-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Set Your Goals
        </h2>
        <p className="text-gray-600">
          Let's define what success looks like for you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly Savings Goal
          </label>
          <div className="relative">
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={formData.savingsGoal}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  savingsGoal: e.target.value,
                }))
              }
              className="w-full px-4 py-3 rounded-xl bg-purple-50 border border-purple-100 
                focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
              placeholder="How much would you like to save each month?"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            What's your approach to financial risk?
          </label>
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                value: 'low',
                label: 'Conservative',
                icon: Shield,
                description: 'Safety first',
              },
              {
                value: 'medium',
                label: 'Balanced',
                icon: Target,
                description: 'Middle ground',
              },
              {
                value: 'high',
                label: 'Aggressive',
                icon: TrendingUp,
                description: 'High risk, high reward',
              },
            ].map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      riskTolerance: option.value,
                    }))
                  }
                  className={`p-4 rounded-xl text-center transition-all ${
                    formData.riskTolerance === option.value
                      ? 'bg-purple-100 ring-2 ring-purple-400'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                  <div className="font-medium text-gray-800">
                    {option.label}
                  </div>
                  <div className="text-sm text-gray-600">
                    {option.description}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-xl 
              transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          <button
            type="submit"
            className="px-6 py-3 bg-purple-500 text-white rounded-xl 
              hover:bg-purple-600 transition-colors flex items-center gap-2"
          >
            <span>Continue</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}