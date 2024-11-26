import React, { useState } from 'react';
import { PiggyBank, ArrowRight, ArrowLeft, DollarSign } from 'lucide-react';
import { OnboardingData } from '../OnboardingFlow';

interface IncomeStepProps {
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  initialData: Partial<OnboardingData>;
}

export default function IncomeStep({
  onNext,
  onBack,
  initialData,
}: IncomeStepProps) {
  const [formData, setFormData] = useState({
    monthlyIncome: initialData.monthlyIncome || '',
    paymentFrequency: initialData.paymentFrequency || 'monthly',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({
      monthlyIncome: Number(formData.monthlyIncome),
      paymentFrequency: formData.paymentFrequency as 'weekly' | 'biweekly' | 'monthly',
    });
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
      <div className="text-center mb-8">
        <PiggyBank className="w-16 h-16 text-purple-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Let's Talk Income
        </h2>
        <p className="text-gray-600">
          Understanding your income helps us create a personalized plan for you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly Income
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={formData.monthlyIncome}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  monthlyIncome: e.target.value,
                }))
              }
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-purple-50 border border-purple-100 
                focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How often do you get paid?
          </label>
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: 'weekly', label: 'Weekly' },
              { value: 'biweekly', label: 'Bi-weekly' },
              { value: 'monthly', label: 'Monthly' },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    paymentFrequency: option.value,
                  }))
                }
                className={`p-4 rounded-xl text-center transition-all ${
                  formData.paymentFrequency === option.value
                    ? 'bg-purple-100 ring-2 ring-purple-400 text-purple-700'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-600'
                }`}
              >
                {option.label}
              </button>
            ))}
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