import React from 'react';
import { Coffee, ShoppingBag, Film, Utensils, Music2, Train, Home, Plus } from 'lucide-react';

interface CategoryIconProps {
  category: string;
  className?: string;
}

const iconMap: Record<string, React.ComponentType> = {
  food: Utensils,
  shopping: ShoppingBag,
  entertainment: Film,
  transport: Train,
  home: Home,
  other: Plus,
};

export default function CategoryIcon({ category, className = '' }: CategoryIconProps) {
  const Icon = iconMap[category] || Plus;
  return <Icon className={className} />;
}