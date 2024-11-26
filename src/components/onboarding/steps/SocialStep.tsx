import React, { useState } from 'react';
import { Users, ArrowRight, ArrowLeft, Trophy, Lock } from 'lucide-react';
import { OnboardingData } from '../OnboardingFlow';

interface SocialStepProps {
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  initialData: Partial<OnboardingData>;
}

export default function SocialStep({
  onNext,
  onBack,
  initialData,
}: SocialStepProps) {
  const [preferences, setPreferences] = useState({
    shareProgress: initialData.socialPreferences?.shareProgress ?? true,
    joinGroups: initialData.socialPreferences?.joinGroups ?? true,
    competitiveMode: initialData.socialPreferences?.competitiveMode ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ socialPreferences: preferences });
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
      <div className="text-center mb-8">
        <Users className="w-16 h-16 text-purple-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Join the Community
        </h2>
        <p className="text-gray-600">
          Success is better when shared! Choose how you want to interact with
          others.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="p-4 bg-purple-50 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-800">Share Progress</div>
                <div className="text-sm text-gray-600">
                  Let others see your financial journey
                </div>
              </div>
              <button
                type="button"
                onClick={() =>
                  setPreferences((prev) => ({
                    ...prev,
                    shareProgress: !prev.shareProgress,
                  }))
                }
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  preferences.shareProgress ? 'bg-purple-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                    preferences.shareProgress ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="p-4 bg-purple-50 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-800">Join Groups</div>
                <div className="text-sm text-gray-600">
                  Connect with people sharing similar financial goals
                </div>
              </div>
              <button
                type="button"
                onClick={() =>
                  setPreferences((prev) => ({
                    ...prev,
                    joinGroups: !prev.joinGroups,
                  }))
                }
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  preferences.joinGroups ? 'bg-purple-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                    preferences.joinGroups ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="p-4 bg-purple-50 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-800">Competitive Mode</div>
                <div className="text-sm text-gray-600">
                  Participate in challenges and leaderboards
                </div>
              </div>
              <button
                type="button"
                onClick={() =>
                  setPreferences((prev) => ({
                    ...prev,
                    competitiveMode: !prev.competitiveMode,
                  }))
                }
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  preferences.competitiveMode ? 'bg-purple-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                    preferences.competitiveMode ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 bg-green-50 rounded-xl">
          <div className="flex items-center space-x-3">
            <Lock className="w-5 h-5 text-green-600" />
            <div className="text-sm text-green-600">
              Your privacy is important! You can always change these settings
              later.
            </div>
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