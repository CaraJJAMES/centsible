import React, { useState } from 'react';
import { Calendar, Coffee, ShoppingBag, Film, Utensils, Music2, Train, Home, Plus, Upload, DollarSign } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';
import CategoryIcon from './CategoryIcon';

const CATEGORIES = [
  { id: 'food', label: 'Food & Drinks', icon: Utensils },
  { id: 'shopping', label: 'Shopping', icon: ShoppingBag },
  { id: 'entertainment', label: 'Entertainment', icon: Film },
  { id: 'transport', label: 'Transport', icon: Train },
  { id: 'home', label: 'Home', icon: Home },
  { id: 'other', label: 'Other', icon: Plus },
];

const SARCASTIC_MESSAGES: Record<string, string[]> = {
  food: [
    "Another coffee? Your bank account is crying right now ☕",
    "Eating out again? Your wallet needs a diet plan 🍽️",
  ],
  shopping: [
    "A new outfit? Let's hope it was *necessary* 👔",
    "Shopping therapy is expensive therapy 🛍️",
  ],
  entertainment: [
    "Fun isn't free, but your future self says hi 🎭",
    "Living your best life... at what cost? 🎬",
  ],
  transport: [
    "Going places... including broke 🚗",
    "The journey of a thousand miles begins with an expensive ride 🚅",
  ],
  home: [
    "Home sweet expensive home 🏠",
    "Making your space nice, making your wallet cry 🏡",
  ],
  other: [
    "Mystery spending... how intriguing 🤔",
    "Keeping us guessing where the money goes 💸",
  ],
};

interface ExpenseFormData {
  date: string;
  category: string;
  amount: string;
  description: string;
  receipt?: File;
}

export default function ExpenseForm() {
  const [formData, setFormData] = useState<ExpenseFormData>({
    date: new Date().toISOString().split('T')[0],
    category: '',
    amount: '',
    description: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [message, setMessage] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const category = formData.category || 'other';
    const messages = SARCASTIC_MESSAGES[category];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setMessage(randomMessage);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, receipt: file }));
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <DollarSign className="inline-block w-12 h-12 text-purple-500 mb-2" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Track Expense</h1>
          <p className="text-gray-600">Every penny counts... or does it? 💸</p>
        </div>

        <form 
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl animate-fade-in space-y-6"
        >
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
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
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-blue-50 border border-blue-100 
                  focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Category
            </label>
            <div className="relative">
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-green-50 border border-green-100 
                  focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none appearance-none"
              >
                <option value="">Select a category</option>
                {CATEGORIES.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
              <CategoryIcon 
                category={formData.category} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">
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
                placeholder="0.00"
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-purple-50 border border-purple-100 
                  focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Description
            </label>
            <textarea
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              placeholder="What did you spend on?"
              className="w-full p-4 rounded-xl bg-pink-50 border border-pink-100 
                focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none
                min-h-[100px]"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Receipt (optional)
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="receipt"
              />
              <label
                htmlFor="receipt"
                className="flex items-center justify-center w-full p-4 rounded-xl bg-yellow-50 
                  border-2 border-dashed border-yellow-200 hover:border-purple-400 
                  transition-colors cursor-pointer"
              >
                {previewUrl ? (
                  <img 
                    src={previewUrl} 
                    alt="Receipt preview" 
                    className="max-h-32 rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-500">
                    <Upload className="w-8 h-8 mb-2" />
                    <span>Click to upload receipt</span>
                  </div>
                )}
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-3 rounded-xl font-medium
              transform transition-all duration-200 
              hover:bg-purple-600 hover:shadow-lg 
              active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-300"
          >
            Track Expense
          </button>

          {isSubmitted && message && (
            <div className="fixed bottom-4 left-4 right-4 bg-purple-600 text-white p-4 rounded-xl 
              shadow-lg animate-fade-in text-center"
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}