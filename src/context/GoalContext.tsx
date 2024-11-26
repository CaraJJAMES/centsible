import React, { createContext, useContext, useState } from 'react';

export interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: string;
  emoji: string;
  category: string;
  color: string;
}

interface GoalContextType {
  goals: Goal[];
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  updateGoal: (id: string, amount: number) => void;
  deleteGoal: (id: string) => void;
}

const GoalContext = createContext<GoalContextType | undefined>(undefined);

const INITIAL_GOALS: Goal[] = [
  { 
    id: '1', 
    name: 'Emergency Fund',
    target: 10000,
    current: 5000,
    deadline: '2024-12-31',
    emoji: '🏦',
    category: 'savings',
    color: '#8b5cf6'
  },
  { 
    id: '2', 
    name: 'New Car',
    target: 15000,
    current: 3000,
    deadline: '2024-06-30',
    emoji: '🚗',
    category: 'purchase',
    color: '#ec4899'
  },
];

export function GoalProvider({ children }: { children: React.ReactNode }) {
  const [goals, setGoals] = useState<Goal[]>(INITIAL_GOALS);

  const addGoal = (newGoal: Omit<Goal, 'id'>) => {
    const goal: Goal = {
      ...newGoal,
      id: Date.now().toString(),
    };
    setGoals(prev => [...prev, goal]);
  };

  const updateGoal = (id: string, amount: number) => {
    setGoals(prev => prev.map(goal => {
      if (goal.id === id) {
        return {
          ...goal,
          current: Math.min(goal.target, goal.current + amount)
        };
      }
      return goal;
    }));
  };

  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  return (
    <GoalContext.Provider value={{ goals, addGoal, updateGoal, deleteGoal }}>
      {children}
    </GoalContext.Provider>
  );
}

export function useGoals() {
  const context = useContext(GoalContext);
  if (context === undefined) {
    throw new Error('useGoals must be used within a GoalProvider');
  }
  return context;
}