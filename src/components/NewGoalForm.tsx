import React, { useState } from 'react';
import { Target, Calendar, PiggyBank, X } from 'lucide-react';
import { useGoals } from '../context/GoalContext';

interface NewGoalFormProps {
  onClose: () => void;
}

const GOAL_CATEGORIES = [
  { id: 'savings', name: 'Savings', emoji: '💰' },
  { id: 'purchase', name: 'Purchase', emoji: '🛍️' },
  { id: 'debt', name: 'Debt Repayment', emoji: '💳' },
  { id: 'investment', name: 'Investment', emoji: '📈' },
  { id: 'education', name: 'Education', emoji: '📚' },
  { id: 'travel', name: 'Travel', emoji: '✈️' },
  { id: 'home', name: 'Home', emoji: '🏠' },
  { id: 'other', name: 'Other', emoji: '🎯' },
];

const COLORS = [
  '#8b5cf6', '#ec4899', '#3b82f6', '#10b981', 
  '#f59e0b', '#ef4444', '#6366f1', '#14b8a6'
];

export default function NewGoalForm({ onClose }: NewGoalFormProps) {
  const { addGoal } = useGoals();
  const [formData, setFormData] = useState({
    name: '',
    target: '',
    deadline: '',
    category: '',
    color: COLORS[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedCategory = GOAL_CATEGORIES.find(cat => cat.id === formData.category);
    if (!selectedCategory) return;

    addGoal({
      name: formData.name,
      target: parseFloat(formData.target),
      current: 0,
      deadline: formData.deadline,
      emoji: selectedCategory.emoji,
      category: formData.category,
      color: formData.color,
    });

    onClose();
  };

  return (
    <div className="bg-white rounded-2xl p-6 w-full max-w-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Create New Goal</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Goal Name
          </label>
          <div className="relative">
            <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 
                focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
              placeholder="e.g., Dream Vacation"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Amount
          </label>
          <div className="relative">
            <PiggyBank className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={formData.target}
              onChange={(e) => setFormData({ ...formData, target: e.target.value })}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 
                focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            required
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 
              focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
          >
            <option value="">Select a category</option>
            {GOAL_CATEGORIES.map(category => (
              <option key={category.id} value={category.id}>
                {category.emoji} {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              required
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 
                focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Color Theme
          </label>
          <div className="flex flex-wrap gap-2">
            {COLORS.map(color => (
              <button
                key={color}
                type="button"
                onClick={() => setFormData({ ...formData, color })}
                className={`w-8 h-8 rounded-full transition-transform ${
                  formData.color === color ? 'scale-125 ring-2 ring-purple-300' : ''
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 
              transition-colors"
          >
            Create Goal
          </button>
        </div>
      </form>
    </div>
  );
}