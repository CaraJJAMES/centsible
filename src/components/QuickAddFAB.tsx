import React, { useState } from 'react';
import { Plus, X, ArrowDownCircle, ArrowUpCircle, Calendar, DollarSign, FileText } from 'lucide-react';
import { useTransactions } from '../context/TransactionContext';
import { formatCurrency } from '../utils/formatters';
import CategorySelect from './CategorySelect';
import { CATEGORIES } from '../utils/categories';

interface QuickAddFormData {
  amount: string;
  category: string;
  description: string;
  date: string;
}

export default function QuickAddFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeType, setActiveType] = useState<'income' | 'expense' | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<QuickAddFormData>({
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const { addTransaction } = useTransactions();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeType || !formData.amount || !formData.category) return;

    const categoryData = CATEGORIES[activeType].find(c => c.id === formData.category);
    if (!categoryData) return;

    addTransaction({
      type: activeType,
      amount: parseFloat(formData.amount),
      category: categoryData.name,
      description: formData.description,
      emoji: categoryData.emoji,
    });

    setFormData({
      amount: '',
      category: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
    });
    setActiveType(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative">
      {/* Quick Add Menu */}
      {isOpen && !activeType && (
        <div className="absolute bottom-[calc(100%+1rem)] right-0 animate-fade-in">
          <div className="flex flex-col items-end space-y-4">
            <button
              onClick={() => setActiveType('income')}
              className="flex items-center space-x-2 bg-emerald-500 text-white px-4 py-2 rounded-lg
                shadow-lg hover:bg-emerald-600 transition-colors"
            >
              <ArrowUpCircle className="w-5 h-5" />
              <span>Income</span>
            </button>
            <button
              onClick={() => setActiveType('expense')}
              className="flex items-center space-x-2 bg-rose-500 text-white px-4 py-2 rounded-lg
                shadow-lg hover:bg-rose-600 transition-colors"
            >
              <ArrowDownCircle className="w-5 h-5" />
              <span>Expense</span>
            </button>
          </div>
        </div>
      )}

      {/* Quick Add Form */}
      {isOpen && activeType && (
        <div className="absolute bottom-[calc(100%+1rem)] right-0 w-96 bg-white rounded-2xl shadow-2xl 
          animate-fade-in border border-gray-100 overflow-hidden"
        >
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Amount
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  name="amount"
                  step="0.01"
                  required
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 
                    focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <div className="relative">
                {formData.category && (
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl">
                    {CATEGORIES[activeType].find(c => c.id === formData.category)?.emoji}
                  </span>
                )}
                <CategorySelect
                  type={activeType}
                  value={formData.category}
                  onChange={(value) => handleChange({ 
                    target: { name: 'category', value } 
                  } as React.ChangeEvent<HTMLSelectElement>)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 
                    focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none
                    min-h-[80px]"
                  placeholder="Add some details..."
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 
                    focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-500 text-white py-3 rounded-xl font-medium
                transform transition-all duration-200 
                hover:bg-purple-600 hover:shadow-lg 
                active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-300"
            >
              Add {activeType === 'income' ? 'Income' : 'Expense'}
            </button>
          </form>
        </div>
      )}

      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg
          transition-all duration-300 flex items-center justify-center
          ${isOpen ? 'bg-red-500 rotate-45' : 'bg-purple-500 hover:bg-purple-600'}`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Plus className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed bottom-24 right-6 bg-green-500 text-white px-6 py-3 
          rounded-xl shadow-lg animate-fade-in"
        >
          Successfully added! ✨
        </div>
      )}
    </div>
  );
}