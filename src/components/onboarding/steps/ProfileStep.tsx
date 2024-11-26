import React, { useState } from 'react';
import { User, ArrowRight, ArrowLeft } from 'lucide-react';
import { OnboardingData } from '../OnboardingFlow';

interface ProfileStepProps {
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  initialData: Partial<OnboardingData>;
}

export default function ProfileStep({
  onNext,
  onBack,
  initialData,
}: ProfileStepProps) {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    email: initialData.email || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
      <div className="text-center mb-8">
        <User className="w-16 h-16 text-purple-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Let's Get to Know You
        </h2>
        <p className="text-gray-600">
          First things first, what should we call you?
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Name
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full px-4 py-3 rounded-xl bg-purple-50 border border-purple-100 
              focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            className="w-full px-4 py-3 rounded-xl bg-purple-50 border border-purple-100 
              focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
            placeholder="john@example.com"
          />
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