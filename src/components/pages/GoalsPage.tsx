import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Target, Plus, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { useGoals } from '../../context/GoalContext';
import NewGoalForm from '../NewGoalForm';

export default function GoalsPage() {
  const { goals, deleteGoal, updateGoal } = useGoals();
  const [showNewGoalForm, setShowNewGoalForm] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const pieData = goals.map(goal => ({
    name: goal.name,
    value: (goal.current / goal.target) * 100,
    color: goal.color,
  }));

  const handleContribution = (goalId: string, amount: string) => {
    const value = parseFloat(amount);
    if (!isNaN(value) && value > 0) {
      updateGoal(goalId, value);
      setSelectedGoal(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Goals Overview */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Goals Progress</h2>
          <button
            onClick={() => setShowNewGoalForm(true)}
            className="p-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 
              transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span>New Goal</span>
          </button>
        </div>

        {goals.length > 0 ? (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            No goals yet. Click the button above to create your first goal!
          </div>
        )}
      </div>

      {/* Individual Goals */}
      <div className="grid gap-6 md:grid-cols-2">
        {goals.map((goal) => (
          <div 
            key={goal.id}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{goal.emoji}</span>
                <h3 className="font-semibold text-gray-800">{goal.name}</h3>
              </div>
              <button
                onClick={() => deleteGoal(goal.id)}
                className="p-2 hover:bg-red-100 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5 text-red-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Progress</span>
                <span>{((goal.current / goal.target) * 100).toFixed(1)}%</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-500"
                  style={{ 
                    width: `${(goal.current / goal.target) * 100}%`,
                    backgroundColor: goal.color
                  }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  Current: <span className="font-medium">{formatCurrency(goal.current)}</span>
                </span>
                <span className="text-purple-600 font-medium">
                  Goal: {formatCurrency(goal.target)}
                </span>
              </div>

              {selectedGoal === goal.id ? (
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Amount"
                    className="flex-1 px-3 py-2 rounded-lg border border-gray-200 
                      focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleContribution(goal.id, (e.target as HTMLInputElement).value);
                      }
                    }}
                  />
                  <button
                    onClick={() => setSelectedGoal(null)}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSelectedGoal(goal.id)}
                  className="w-full py-2 bg-purple-100 text-purple-700 rounded-lg 
                    hover:bg-purple-200 transition-colors font-medium"
                >
                  Add Progress
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* New Goal Modal */}
      {showNewGoalForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <NewGoalForm onClose={() => setShowNewGoalForm(false)} />
        </div>
      )}
    </div>
  );
}