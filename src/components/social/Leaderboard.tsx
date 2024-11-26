import React from 'react';
import { Trophy, TrendingUp, PiggyBank, Target } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  savingsRate: number;
  totalSaved: number;
  streak: number;
  rank: number;
}

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: '1',
    name: 'Sophie Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    savingsRate: 35,
    totalSaved: 2500,
    streak: 12,
    rank: 1,
  },
  {
    id: '2',
    name: 'Alex Rivera',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    savingsRate: 28,
    totalSaved: 1800,
    streak: 8,
    rank: 2,
  },
  {
    id: '3',
    name: 'Taylor Kim',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    savingsRate: 25,
    totalSaved: 1500,
    streak: 6,
    rank: 3,
  },
];

const RANK_COLORS = {
  1: 'bg-yellow-500',
  2: 'bg-gray-400',
  3: 'bg-amber-600',
};

export default function Leaderboard() {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Trophy className="w-6 h-6 text-purple-500" />
          <h2 className="text-xl font-semibold text-gray-800">Leaderboard</h2>
        </div>
        <select className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg 
          hover:bg-purple-200 transition-colors text-sm font-medium border-none 
          focus:ring-2 focus:ring-purple-300 outline-none"
        >
          <option value="savings">Savings Rate</option>
          <option value="streak">Longest Streak</option>
          <option value="total">Total Saved</option>
        </select>
      </div>

      <div className="space-y-4">
        {MOCK_LEADERBOARD.map(entry => (
          <div 
            key={entry.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
          >
            {/* Rank & Avatar */}
            <div className="flex items-center space-x-4">
              <div className={`w-8 h-8 rounded-full ${RANK_COLORS[entry.rank as keyof typeof RANK_COLORS] || 'bg-purple-500'} 
                flex items-center justify-center text-white font-bold`}
              >
                {entry.rank}
              </div>
              <img 
                src={entry.avatar} 
                alt={entry.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium text-gray-800">{entry.name}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <PiggyBank className="w-4 h-4" />
                  <span>{entry.savingsRate}% savings rate</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="text-right">
              <div className="text-lg font-medium text-purple-600">
                {formatCurrency(entry.totalSaved)}
              </div>
              <div className="text-sm text-gray-600">
                {entry.streak} week streak 🔥
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Your Position */}
      <div className="mt-6 p-4 bg-purple-50 rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 rounded-full bg-purple-200 
              flex items-center justify-center text-purple-700 font-bold"
            >
              5
            </div>
            <div>
              <div className="font-medium text-gray-800">Your Position</div>
              <div className="text-sm text-purple-600">Top 25%</div>
            </div>
          </div>
          <button className="px-4 py-2 bg-purple-500 text-white rounded-lg 
            hover:bg-purple-600 transition-colors text-sm font-medium
            flex items-center space-x-2"
          >
            <Target className="w-4 h-4" />
            <span>Set New Goal</span>
          </button>
        </div>
      </div>
    </div>
  );
}