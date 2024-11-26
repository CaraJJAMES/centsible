import React, { useState, useEffect } from 'react';
import { DollarSign, Plus, Save, X } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

interface BudgetCategory {
  id: string;
  name: string;
  percentage: number;
  color: string;
  emoji: string;
}

interface FixedExpense {
  id: string;
  name: string;
  amount: number;
  emoji: string;
}

export default function BudgetAllocation() {
  const [monthlyIncome, setMonthlyIncome] = useState(3000);
  const [categories, setCategories] = useState<BudgetCategory[]>([
    { id: 'needs', name: 'Needs', percentage: 50, color: '#8b5cf6', emoji: '🏠' },
    { id: 'desires', name: 'Desires', percentage: 20, color: '#ec4899', emoji: '🎮' },
    { id: 'savings', name: 'Savings', percentage: 20, color: '#10b981', emoji: '💰' },
    { id: 'goals', name: 'Goals', percentage: 10, color: '#f59e0b', emoji: '🎯' },
  ]);

  const [fixedExpenses, setFixedExpenses] = useState<FixedExpense[]>([
    { id: '1', name: 'Rent', amount: 1200, emoji: '🏠' },
    { id: '2', name: 'Utilities', amount: 150, emoji: '💡' },
    { id: '3', name: 'Internet', amount: 45, emoji: '🌐' },
  ]);

  const [draggedCategory, setDraggedCategory] = useState<string | null>(null);
  const [showNewExpenseForm, setShowNewExpenseForm] = useState(false);
  const [newExpense, setNewExpense] = useState({ name: '', amount: '', emoji: '📝' });

  // Handle percentage adjustment during drag
  const handleDrag = (categoryId: string, newPercentage: number) => {
    if (newPercentage < 0 || newPercentage > 100) return;

    const oldCategory = categories.find(c => c.id === categoryId);
    if (!oldCategory) return;

    const percentageDiff = newPercentage - oldCategory.percentage;
    const otherCategories = categories.filter(c => c.id !== categoryId);
    
    // Distribute the difference proportionally among other categories
    const totalOtherPercentage = otherCategories.reduce((sum, c) => sum + c.percentage, 0);
    const updatedCategories = otherCategories.map(category => ({
      ...category,
      percentage: Math.max(0, Math.min(100, 
        category.percentage - (percentageDiff * (category.percentage / totalOtherPercentage))
      ))
    }));

    setCategories([
      ...updatedCategories,
      { ...oldCategory, percentage: newPercentage }
    ].sort((a, b) => b.percentage - a.percentage));
  };

  const addFixedExpense = () => {
    if (!newExpense.name || !newExpense.amount) return;

    setFixedExpenses([
      ...fixedExpenses,
      {
        id: Date.now().toString(),
        name: newExpense.name,
        amount: parseFloat(newExpense.amount),
        emoji: newExpense.emoji,
      }
    ]);

    setNewExpense({ name: '', amount: '', emoji: '📝' });
    setShowNewExpenseForm(false);
  };

  const removeFixedExpense = (id: string) => {
    setFixedExpenses(fixedExpenses.filter(expense => expense.id !== id));
  };

  const totalFixedExpenses = fixedExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remainingIncome = monthlyIncome - totalFixedExpenses;

  return (
    <div className="space-y-6">
      {/* Monthly Income Input */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Monthly Income</h2>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="number"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(Number(e.target.value))}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-purple-50 border border-purple-100 
              focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
          />
        </div>
      </div>

      {/* Fixed Expenses */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Fixed Expenses</h2>
          <button
            onClick={() => setShowNewExpenseForm(true)}
            className="p-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 
              transition-all hover:scale-105 active:scale-95"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {fixedExpenses.map(expense => (
            <div key={expense.id} 
              className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{expense.emoji}</span>
                <span className="font-medium text-gray-800">{expense.name}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="font-medium text-purple-600">
                  {formatCurrency(expense.amount)}
                </span>
                <button
                  onClick={() => removeFixedExpense(expense.id)}
                  className="p-1 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {showNewExpenseForm && (
          <div className="mt-4 p-4 bg-purple-50 rounded-xl">
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Expense name"
                value={newExpense.name}
                onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border focus:border-purple-400 
                  focus:ring-2 focus:ring-purple-200 outline-none"
              />
              <input
                type="number"
                placeholder="Amount"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border focus:border-purple-400 
                  focus:ring-2 focus:ring-purple-200 outline-none"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowNewExpenseForm(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addFixedExpense}
                  className="px-4 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 
                    transition-colors"
                >
                  Add Expense
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 p-4 bg-purple-100 rounded-xl">
          <div className="flex justify-between text-sm">
            <span>Total Fixed Expenses:</span>
            <span className="font-semibold">{formatCurrency(totalFixedExpenses)}</span>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span>Remaining for Allocation:</span>
            <span className="font-semibold">{formatCurrency(remainingIncome)}</span>
          </div>
        </div>
      </div>

      {/* Budget Allocation */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Budget Allocation</h2>
        
        <div className="space-y-6">
          {/* Visual Budget Bar */}
          <div className="h-8 bg-gray-100 rounded-full overflow-hidden flex">
            {categories.map(category => (
              <div
                key={category.id}
                style={{ 
                  width: `${category.percentage}%`,
                  backgroundColor: category.color,
                }}
                className="transition-all duration-300"
              />
            ))}
          </div>

          {/* Category Controls */}
          <div className="space-y-4">
            {categories.map(category => (
              <div key={category.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{category.emoji}</span>
                    <span className="font-medium text-gray-800">{category.name}</span>
                  </div>
                  <span className="font-medium" style={{ color: category.color }}>
                    {formatCurrency(remainingIncome * (category.percentage / 100))}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={category.percentage}
                  onChange={(e) => handleDrag(category.id, Number(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{ 
                    backgroundColor: '#e5e7eb',
                    backgroundImage: `linear-gradient(${category.color}, ${category.color})`,
                    backgroundSize: `${category.percentage}% 100%`,
                    backgroundRepeat: 'no-repeat'
                  }}
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>0%</span>
                  <span>{category.percentage.toFixed(1)}%</span>
                  <span>100%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}