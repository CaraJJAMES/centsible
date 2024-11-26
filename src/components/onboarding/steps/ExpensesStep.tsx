import React, { useState } from 'react';
import { Receipt, ArrowRight, ArrowLeft, Plus, X } from 'lucide-react';
import { OnboardingData } from '../OnboardingFlow';

interface ExpensesStepProps {
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  initialData: Partial<OnboardingData>;
}

const EXPENSE_CATEGORIES = [
  { id: 'rent', name: 'Rent/Mortgage', emoji: '🏠' },
  { id: 'utilities', name: 'Utilities', emoji: '💡' },
  { id: 'transport', name: 'Transport', emoji: '🚗' },
  { id: 'groceries', name: 'Groceries', emoji: '🛒' },
  { id: 'insurance', name: 'Insurance', emoji: '🛡️' },
  { id: 'internet', name: 'Internet', emoji: '🌐' },
  { id: 'phone', name: 'Phone', emoji: '📱' },
  { id: 'other', name: 'Other', emoji: '📦' },
];

export default function ExpensesStep({
  onNext,
  onBack,
  initialData,
}: ExpensesStepProps) {
  const [expenses, setExpenses] = useState<Array<{ category: string; amount: number }>>(
    initialData.fixedExpenses || []
  );
  const [newExpense, setNewExpense] = useState({ category: '', amount: '' });

  const handleAddExpense = () => {
    if (!newExpense.category || !newExpense.amount) return;

    setExpenses([
      ...expenses,
      { category: newExpense.category, amount: Number(newExpense.amount) },
    ]);
    setNewExpense({ category: '', amount: '' });
  };

  const handleRemoveExpense = (index: number) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ fixedExpenses: expenses });
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
      <div className="text-center mb-8">
        <Receipt className="w-16 h-16 text-purple-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Fixed Monthly Expenses
        </h2>
        <p className="text-gray-600">
          Let's add your regular monthly expenses to get a clear picture.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Add New Expense */}
        <div className="p-4 bg-purple-50 rounded-xl space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={newExpense.category}
                onChange={(e) =>
                  setNewExpense((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 rounded-xl bg-white border border-purple-100 
                  focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
              >
                <option value="">Select category</option>
                {EXPENSE_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.emoji} {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={newExpense.amount}
                onChange={(e) =>
                  setNewExpense((prev) => ({
                    ...prev,
                    amount: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 rounded-xl bg-white border border-purple-100 
                  focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
                placeholder="0.00"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddExpense}
            disabled={!newExpense.category || !newExpense.amount}
            className="w-full py-3 bg-purple-500 text-white rounded-xl font-medium
              transform transition-all duration-200 
              hover:bg-purple-600 hover:shadow-lg 
              active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-300
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Expense</span>
          </button>
        </div>

        {/* Expense List */}
        <div className="space-y-3">
          {expenses.map((expense, index) => {
            const category = EXPENSE_CATEGORIES.find(
              (cat) => cat.id === expense.category
            );
            return (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">
                    {category?.emoji || '📦'}
                  </span>
                  <span className="font-medium text-gray-800">
                    {category?.name || 'Other'}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="font-medium text-purple-600">
                    £{expense.amount.toFixed(2)}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveExpense(index)}
                    className="p-1 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            );
          })}
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