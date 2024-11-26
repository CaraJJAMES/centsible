import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WelcomeStep from './steps/WelcomeStep';
import ProfileStep from './steps/ProfileStep';
import IncomeStep from './steps/IncomeStep';
import ExpensesStep from './steps/ExpensesStep';
import GoalsStep from './steps/GoalsStep';
import SocialStep from './steps/SocialStep';
import CompletionStep from './steps/CompletionStep';

export type OnboardingData = {
  name: string;
  email: string;
  monthlyIncome: number;
  paymentFrequency: 'weekly' | 'biweekly' | 'monthly';
  fixedExpenses: Array<{ category: string; amount: number }>;
  savingsGoal: number;
  riskTolerance: 'low' | 'medium' | 'high';
  socialPreferences: {
    shareProgress: boolean;
    joinGroups: boolean;
    competitiveMode: boolean;
  };
};

interface OnboardingFlowProps {
  onComplete: () => void;
}

const STEPS = [
  'welcome',
  'profile',
  'income',
  'expenses',
  'goals',
  'social',
  'completion',
] as const;

type Step = typeof STEPS[number];

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState<Step>('welcome');
  const [onboardingData, setOnboardingData] = useState<Partial<OnboardingData>>({});

  const handleNext = (stepData: Partial<OnboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...stepData }));
    const currentIndex = STEPS.indexOf(currentStep);
    if (currentIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[currentIndex + 1]);
    }
    if (currentStep === 'completion') {
      onComplete();
    }
  };

  const handleBack = () => {
    const currentIndex = STEPS.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(STEPS[currentIndex - 1]);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'welcome':
        return <WelcomeStep onNext={() => handleNext({})} />;
      case 'profile':
        return (
          <ProfileStep
            onNext={handleNext}
            onBack={handleBack}
            initialData={onboardingData}
          />
        );
      case 'income':
        return (
          <IncomeStep
            onNext={handleNext}
            onBack={handleBack}
            initialData={onboardingData}
          />
        );
      case 'expenses':
        return (
          <ExpensesStep
            onNext={handleNext}
            onBack={handleBack}
            initialData={onboardingData}
          />
        );
      case 'goals':
        return (
          <GoalsStep
            onNext={handleNext}
            onBack={handleBack}
            initialData={onboardingData}
          />
        );
      case 'social':
        return (
          <SocialStep
            onNext={handleNext}
            onBack={handleBack}
            initialData={onboardingData}
          />
        );
      case 'completion':
        return <CompletionStep data={onboardingData} onComplete={onComplete} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {STEPS.map((step, index) => (
              <div
                key={step}
                className={`w-8 h-8 rounded-full flex items-center justify-center
                  ${
                    STEPS.indexOf(currentStep) >= index
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-purple-500 rounded-full transition-all duration-500"
              style={{
                width: `${
                  ((STEPS.indexOf(currentStep) + 1) / STEPS.length) * 100
                }%`,
              }}
            />
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}