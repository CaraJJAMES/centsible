import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  emoji: string;
  date: string;
  description: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (newTx: Omit<Transaction, 'id' | 'date'>) => {
    const transaction: Transaction = {
      ...newTx,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
    };
    setTransactions(prev => [transaction, ...prev]);
  };

  const totalBalance = transactions.reduce((acc, tx) => {
    return acc + (tx.type === 'income' ? tx.amount : -tx.amount);
  }, 0);

  const monthlyIncome = transactions
    .filter(tx => tx.type === 'income')
    .reduce((acc, tx) => acc + tx.amount, 0);

  const monthlyExpenses = transactions
    .filter(tx => tx.type === 'expense')
    .reduce((acc, tx) => acc + tx.amount, 0);

  return (
    <TransactionContext.Provider 
      value={{ 
        transactions, 
        addTransaction, 
        totalBalance,
        monthlyIncome,
        monthlyExpenses,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
}