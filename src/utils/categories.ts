// Predefined categories with emojis for easy tagging
export const CATEGORIES = {
  income: [
    { id: 'salary', name: 'Salary', emoji: '💰', keywords: ['salary', 'wage', 'paycheck'] },
    { id: 'freelance', name: 'Freelance', emoji: '💻', keywords: ['freelance', 'contract', 'gig'] },
    { id: 'investments', name: 'Investments', emoji: '📈', keywords: ['dividend', 'stock', 'crypto'] },
    { id: 'gifts', name: 'Gifts', emoji: '🎁', keywords: ['gift', 'present'] },
    { id: 'rental', name: 'Rental', emoji: '🏠', keywords: ['rent', 'property'] },
    { id: 'other_income', name: 'Other', emoji: '💎', keywords: ['other'] },
  ],
  expense: [
    { id: 'housing', name: 'Housing', emoji: '🏠', keywords: ['rent', 'mortgage'] },
    { id: 'utilities', name: 'Utilities', emoji: '💡', keywords: ['electric', 'water', 'gas'] },
    { id: 'food', name: 'Food', emoji: '🍔', keywords: ['grocery', 'restaurant'] },
    { id: 'transport', name: 'Transport', emoji: '🚗', keywords: ['uber', 'bus', 'fuel'] },
    { id: 'shopping', name: 'Shopping', emoji: '🛍️', keywords: ['clothes', 'retail'] },
    { id: 'health', name: 'Health', emoji: '⚕️', keywords: ['medical', 'fitness'] },
    { id: 'fun', name: 'Fun', emoji: '🎮', keywords: ['entertainment', 'movie'] },
    { id: 'education', name: 'Education', emoji: '📚', keywords: ['course', 'books'] },
    { id: 'travel', name: 'Travel', emoji: '✈️', keywords: ['holiday', 'vacation'] },
    { id: 'subscriptions', name: 'Subscriptions', emoji: '📱', keywords: ['netflix', 'spotify'] },
    { id: 'pets', name: 'Pets', emoji: '🐾', keywords: ['vet', 'pet food'] },
    { id: 'beauty', name: 'Beauty', emoji: '💅', keywords: ['salon', 'spa'] },
    { id: 'gifts_given', name: 'Gifts', emoji: '🎁', keywords: ['present', 'donation'] },
    { id: 'other_expense', name: 'Other', emoji: '📦', keywords: ['misc', 'other'] },
  ]
};

export function getCategoryByKeyword(type: 'income' | 'expense', keyword: string) {
  const categories = CATEGORIES[type];
  return categories.find(cat => 
    cat.keywords.some(k => keyword.toLowerCase().includes(k))
  ) || (type === 'income' ? CATEGORIES.income[5] : CATEGORIES.expense[13]); // Default to "Other"
}

export function getAllCategories(type: 'income' | 'expense') {
  return CATEGORIES[type];
}