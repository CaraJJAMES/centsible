import React from 'react';
import { Users, UserPlus, Lock, Globe, Trophy, Target } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

interface Group {
  id: string;
  name: string;
  type: 'private' | 'public';
  members: number;
  goal: number;
  progress: number;
  description: string;
}

const MOCK_GROUPS: Group[] = [
  {
    id: '1',
    name: 'Debt-Free Squad 2024',
    type: 'public',
    members: 15,
    goal: 50000,
    progress: 65,
    description: 'Supporting each other to crush debt and build wealth! 💪',
  },
  {
    id: '2',
    name: 'Travel Savings Crew',
    type: 'private',
    members: 5,
    goal: 10000,
    progress: 45,
    description: 'Saving up for our epic Europe trip! 🌍✈️',
  },
  {
    id: '3',
    name: 'Investment Club',
    type: 'public',
    members: 25,
    goal: 100000,
    progress: 30,
    description: 'Learning and growing our wealth together 📈',
  },
];

export default function GroupsList() {
  return (
    <div className="space-y-6">
      {/* Groups Overview */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Users className="w-6 h-6 text-purple-500" />
            <h2 className="text-xl font-semibold text-gray-800">Money Groups</h2>
          </div>
          <button className="p-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 
            transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <UserPlus className="w-5 h-5" />
            <span>Create Group</span>
          </button>
        </div>

        <div className="space-y-4">
          {MOCK_GROUPS.map(group => (
            <div key={group.id} className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-gray-800">{group.name}</h3>
                    {group.type === 'private' ? (
                      <Lock className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Globe className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{group.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-600">
                    {group.members} members
                  </div>
                  <div className="text-sm text-purple-600">
                    Goal: {formatCurrency(group.goal)}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-3">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{group.progress}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-500 transition-all duration-500"
                    style={{ width: `${group.progress}%` }}
                  />
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-800">
                    Top Saver
                  </div>
                  <div className="text-xs text-gray-600">Emily K.</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-800">
                    Active Challenge
                  </div>
                  <div className="text-xs text-gray-600">No-Spend Week</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-800">
                    Next Milestone
                  </div>
                  <div className="text-xs text-gray-600">{formatCurrency(5000)}</div>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg 
                  hover:bg-purple-200 transition-colors text-sm font-medium"
                >
                  View Group
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}