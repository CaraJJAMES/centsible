import React, { useState } from 'react';
import { Target, Calendar, PiggyBank, Trophy, Sparkles } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

interface GoalData {
  name: string;
  amount: string;
  saved: string;
  deadline: string;
}

const ACHIEVEMENT_MESSAGES = [
  "Well look at you, *actually* saving money! Are you sure you're not a financial wizard? 🎩✨",
  "Goal achieved! Now, don't blow it on useless stuff 🎯",
  "Look who's adulting like a pro! Time to set an even bigger goal? 🚀",
  "You've done it! Your bank account is doing a happy dance! 💃",
];

export default function GoalForm() {
  const [goalData, setGoalData] = useState<GoalData>({
    name: '',
    amount: '',
    saved: '0',
    deadline: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGoalData(prev => ({ ...prev, [name]: value }));
  };

  const handleSavedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newSaved = value;
    setGoalData(prev => ({ ...prev, saved: newSaved }));

    // Check if goal is reached
    if (Number(value) >= Number(goalData.amount)) {
      const randomMessage = ACHIEVEMENT_MESSAGES[Math.floor(Math.random() * ACHIEVEMENT_MESSAGES.length)];
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    }
  };

  const calculateProgress = () => {
    const savedAmount = Number(goalData.saved);
    const targetAmount = Number(goalData.amount);
    return targetAmount > 0 ? (savedAmount / targetAmount) * 100 : 0;
  };

  const progress = calculateProgress();
  const progressColor = progress >= 100 ? 'bg-green-400' : 'bg-purple-400';

  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <Target className="inline-block w-12 h-12 text-purple-500 mb-2" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Set Your Goal</h1>
          <p className="text-gray-600">Dream big, save bigger! 🎯</p>
        </div>

        <form 
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl animate-fade-in space-y-6"
        >
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Goal Name
            </label>
            <div className="relative">
              <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="name"
                required
                value={goalData.name}
                onChange={handleChange}
                placeholder="New Gaming Console"
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-pink-50 border border-pink-100 
                  focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none
                  font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Target Amount
            </label>
            <div className="relative">
              <PiggyBank className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                name="amount"
                step="0.01"
                required
                value={goalData.amount}
                onChange={handleChange}
                placeholder="500.00"
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-purple-50 border border-purple-100 
                  focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Deadline
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="date"
                name="deadline"
                required
                value={goalData.deadline}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-blue-50 border border-blue-100 
                  focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
              />
            </div>
          </div>

          {isSubmitted && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Amount Saved
                </label>
                <div className="relative">
                  <PiggyBank className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    name="saved"
                    step="0.01"
                    value={goalData.saved}
                    onChange={handleSavedChange}
                    placeholder="0.00"
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-green-50 border border-green-100 
                      focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Progress</span>
                  <span>{progress.toFixed(1)}%</span>
                </div>
                <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${progressColor} transition-all duration-500 ease-out`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>£{Number(goalData.saved).toFixed(2)}</span>
                  <span>£{Number(goalData.amount).toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {!isSubmitted && (
            <button
              type="submit"
              className="w-full bg-purple-500 text-white py-3 rounded-xl font-medium
                transform transition-all duration-200 
                hover:bg-purple-600 hover:shadow-lg 
                active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-300"
            >
              Set Goal
            </button>
          )}
        </form>

        {showSuccess && (
          <div className="fixed bottom-4 left-4 right-4 bg-green-500 text-white p-4 rounded-xl 
            shadow-lg animate-fade-in text-center"
          >
            <div className="flex items-center justify-center gap-2">
              <Trophy className="w-6 h-6" />
              <span>{ACHIEVEMENT_MESSAGES[Math.floor(Math.random() * ACHIEVEMENT_MESSAGES.length)]}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}