import React from 'react';
import { getAllCategories } from '../utils/categories';

interface CategorySelectProps {
  type: 'income' | 'expense';
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function CategorySelect({ type, value, onChange, className = '' }: CategorySelectProps) {
  const categories = getAllCategories(type);

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 
        focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none 
        appearance-none ${className}`}
    >
      <option value="">Select category</option>
      {categories.map(category => (
        <option key={category.id} value={category.id}>
          {category.emoji} {category.name}
        </option>
      ))}
    </select>
  );
}