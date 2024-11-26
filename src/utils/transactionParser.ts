import { CATEGORIES, getCategoryByKeyword } from './categories';

interface ParsedTransaction {
  type: 'income' | 'expense';
  amount: number;
  category: string;
  emoji: string;
  description: string;
  date?: string;
}

const INCOME_KEYWORDS = ['received', 'earned', 'got paid', 'salary', 'income', 'payment', 'bonus'];
const EXPENSE_KEYWORDS = ['spent', 'bought', 'paid', 'purchased', 'cost'];

export function parseTransaction(text: string): ParsedTransaction | null {
  const lowerText = text.toLowerCase();
  
  // Extract amount using regex
  const amountMatch = text.match(/£?\s*\d+(\.\d{2})?/);
  if (!amountMatch) return null;
  
  const amount = parseFloat(amountMatch[0].replace('£', ''));
  if (isNaN(amount)) return null;

  // Determine transaction type
  const isIncome = INCOME_KEYWORDS.some(keyword => lowerText.includes(keyword));
  const isExpense = EXPENSE_KEYWORDS.some(keyword => lowerText.includes(keyword));
  
  if (!isIncome && !isExpense) return null;
  
  const type = isIncome ? 'income' : 'expense';
  
  // Find matching category
  const matchedCategory = getCategoryByKeyword(type, lowerText);

  // Extract date if present (assuming format like "on DATE" or "for DATE")
  const dateMatch = text.match(/(?:on|for)\s+(\d{4}-\d{2}-\d{2})/);
  const date = dateMatch ? dateMatch[1] : undefined;

  return {
    type,
    amount,
    category: matchedCategory.name,
    emoji: matchedCategory.emoji,
    description: text,
    date,
  };
}