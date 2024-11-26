import React from 'react';
import { PiggyBank, TrendingUp, Calendar, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { useTransactions } from '../../context/TransactionContext';

export default function OverviewPage() {
  const { transactions, totalBalance, monthlyIncome, monthlyExpenses } = useTransactions();
  
  return (
    <div className="space-y-6">
      {/* Quick Stats Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600">Total Balance</h3>
            <PiggyBank className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-gray-800">{formatCurrency(totalBalance)}</p>
          <div className="mt-2 flex items-center space-x-1">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-green-600 text-sm">+12.5% this month</span>
          </div>
        </div>

        <div className="bg-green-50/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-green-100">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-green-700">Monthly Income</h3>
            <ArrowUpCircle className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-800">{formatCurrency(monthlyIncome)}</p>
          <p className="mt-2 text-sm text-green-600">
            Last month: {formatCurrency(monthlyIncome - 500)}
          </p>
        </div>

        <div className="bg-rose-50/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-rose-100">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-rose-700">Monthly Expenses</h3>
            <ArrowDownCircle className="w-5 h-5 text-rose-500" />
          </div>
          <p className="text-2xl font-bold text-rose-800">{formatCurrency(monthlyExpenses)}</p>
          <p className="mt-2 text-sm text-rose-600">
            Budget: {formatCurrency(monthlyIncome * 0.8)}
          </p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Recent Transactions</h2>
          <Calendar className="w-5 h-5 text-purple-500" />
        </div>
        <div className="space-y-4">
          {transactions.slice(0, 5).map(transaction => (
            <div 
              key={transaction.id}
              className="flex items-center justify-between p-3 rounded-xl
                hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{transaction.emoji}</div>
                <div>
                  <div className="font-medium text-gray-800">{transaction.category}</div>
                  <div className="text-sm text-gray-500">{transaction.description}</div>
                </div>
              </div>
              <div className={`font-medium ${
                transaction.type === 'income' ? 'text-green-600' : 'text-rose-600'
              }`}>
                {transaction.type === 'income' ? '+' : '-'}
                {formatCurrency(transaction.amount)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}