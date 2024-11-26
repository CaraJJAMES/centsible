import React, { useState } from 'react';
import { Trophy, Target, Users, Calendar, TrendingUp, Plus, Star } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { format, addDays } from 'date-fns';
import Confetti from 'react-confetti';

// ... (previous interfaces)

interface ChallengeTemplate {
  id: string;
  title: string;
  description: string;
  type: 'savings' | 'streak' | 'reduction';
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  reward: string;
}

const CHALLENGE_TEMPLATES: ChallengeTemplate[] = [
  {
    id: 'no-spend',
    title: 'No-Spend Challenge',
    description: 'Avoid non-essential spending for a set period',
    type: 'streak',
    duration: 7,
    difficulty: 'medium',
    reward: 'Willpower Warrior Badge',
  },
  {
    id: 'savings-sprint',
    title: 'Savings Sprint',
    description: 'Save a specific amount in a short time',
    type: 'savings',
    duration: 14,
    difficulty: 'hard',
    reward: 'Speed Saver Badge',
  },
  // ... more templates
];

export default function GroupChallenges() {
  const [showNewChallenge, setShowNewChallenge] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState(false);

  const handleCreateChallenge = () => {
    // Implementation
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Trophy className="w-6 h-6 text-purple-500" />
          <h2 className="text-xl font-semibold text-gray-800">Active Challenges</h2>
        </div>
        <button
          onClick={() => setShowNewChallenge(true)}
          className="p-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 
            transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span>Create Challenge</span>
        </button>
      </div>

      {/* Challenge Creation Modal */}
      {showNewChallenge && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md m-4 space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Create New Challenge</h3>
            
            {/* Template Selection */}
            <div className="space-y-4">
              {CHALLENGE_TEMPLATES.map(template => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`w-full p-4 rounded-xl text-left transition-all ${
                    selectedTemplate === template.id
                      ? 'bg-purple-100 ring-2 ring-purple-400'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-800">{template.title}</div>
                      <div className="text-sm text-gray-600">{template.description}</div>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      template.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                      template.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {template.difficulty}
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
                    <span>{template.duration} days</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span>{template.reward}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowNewChallenge(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateChallenge}
                disabled={!selectedTemplate}
                className="px-4 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 
                  transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Challenge
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Existing Challenges */}
      <div className="space-y-6">
        {/* ... (existing challenge cards) */}
      </div>
    </div>
  );
}