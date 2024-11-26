import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ToggleLeft, PoundSterling, TrendingUp, AlertTriangle, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import BudgetAllocation from '../BudgetAllocation';

const FIXED_EXPENSES = [
  { category: 'Rent', amount: 1200, emoji: '🏠' },
  { category: 'Utilities', amount: 150, emoji: '💡' },
  { category: 'Internet', amount: 45, emoji: '🌐' },
  { category: 'Insurance', amount: 80, emoji: '🛡️' },
];

const FLEXIBLE_EXPENSES = [
  { category: 'Groceries', amount: 400, budget: 450, emoji: '🛒' },
  { category: 'Dining Out', amount: 200, budget: 250, emoji: '🍽️' },
  { category: 'Entertainment', amount: 150, budget: 200, emoji: '🎭' },
  { category: 'Shopping', amount: 300, budget: 300, emoji: '🛍️' },
];

const MONTHLY_DATA = [
  { name: 'Jan', fixed: 1475, flexible: 1050, income: 3000 },
  { name: 'Feb', fixed: 1475, flexible: 980, income: 3000 },
  { name: 'Mar', fixed: 1475, flexible: 1150, income: 3200 },
  { name: 'Apr', fixed: 1475, flexible: 890, income: 3200 },
  { name: 'May', fixed: 1475, flexible: 1020, income: 3200 },
  { name: 'Jun', fixed: 1475, flexible: 950, income: 3200 },
];

const SPENDING_BREAKDOWN = [
  { name: 'Housing', value: 1200, color: '#8b5cf6' },
  { name: 'Food', value: 600, color: '#ec4899' },
  { name: 'Transport', value: 300, color: '#3b82f6' },
  { name: 'Entertainment', value: 200, color: '#10b981' },
  { name: 'Shopping', value: 400, color: '#f59e0b' },
];

const DAILY_SPENDING = [
  { day: 'Mon', amount: 45 },
  { day: 'Tue', amount: 30 },
  { day: 'Wed', amount: 65 },
  { day: 'Thu', amount: 25 },
  { day: 'Fri', amount: 85 },
  { day: 'Sat', amount: 120 },
  { day: 'Sun', amount: 50 },
];

export default function ExpensesPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'budget'>('overview');

  const totalIncome = 3200;
  const totalExpenses = FIXED_EXPENSES.reduce((sum, exp) => sum + exp.amount, 0) +
    FLEXIBLE_EXPENSES.reduce((sum, exp) => sum + exp.amount, 0);
  const savingsRate = ((totalIncome - totalExpenses) / totalIncome) * 100;

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex space-x-4">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-6 py-3 rounded-xl font-medium transition-all ${
            activeTab === 'overview'
              ? 'bg-purple-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('budget')}
          className={`px-6 py-3 rounded-xl font-medium transition-all ${
            activeTab === 'budget'
              ? 'bg-purple-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Budget Allocation
        </button>
      </div>

      {activeTab === 'overview' ? (
        <>
          {/* Quick Stats */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-600">Monthly Income</h3>
                <ArrowUpCircle className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{formatCurrency(totalIncome)}</p>
              <p className="text-green-600 text-sm mt-1">+6.7% from last month</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-600">Total Expenses</h3>
                <ArrowDownCircle className="w-5 h-5 text-rose-500" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{formatCurrency(totalExpenses)}</p>
              <p className="text-rose-600 text-sm mt-1">-2.3% from last month</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-600">Savings Rate</h3>
                <TrendingUp className="w-5 h-5 text-purple-500" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{savingsRate.toFixed(1)}%</p>
              <p className="text-purple-600 text-sm mt-1">Target: 20%</p>
            </div>
          </div>

          {/* Income vs Expenses Trend */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Income vs Expenses Trend</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={MONTHLY_DATA}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{ backgroundColor: 'white', borderRadius: '0.5rem' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="income" 
                    name="Income"
                    stroke="#10b981" 
                    strokeWidth={2}
                    dot={{ fill: '#10b981' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="fixed" 
                    name="Fixed Expenses"
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    dot={{ fill: '#8b5cf6' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="flexible" 
                    name="Flexible Expenses"
                    stroke="#ec4899" 
                    strokeWidth={2}
                    dot={{ fill: '#ec4899' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Spending Breakdown and Daily Spending */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Spending Breakdown */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Spending Breakdown</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={SPENDING_BREAKDOWN}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {SPENDING_BREAKDOWN.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => formatCurrency(value)}
                      contentStyle={{ backgroundColor: 'white', borderRadius: '0.5rem' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {SPENDING_BREAKDOWN.map((category) => (
                  <div key={category.name} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-sm text-gray-600">{category.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Spending */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Daily Spending</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={DAILY_SPENDING}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number) => formatCurrency(value)}
                      contentStyle={{ backgroundColor: 'white', borderRadius: '0.5rem' }}
                    />
                    <Bar 
                      dataKey="amount" 
                      fill="#8b5cf6"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Budget Alerts */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Budget Alerts</h2>
              <AlertTriangle className="w-5 h-5 text-amber-500" />
            </div>
            <div className="space-y-4">
              {FLEXIBLE_EXPENSES.map((expense) => {
                const percentage = (expense.amount / expense.budget) * 100;
                const isOverBudget = percentage > 90;

                return isOverBudget ? (
                  <div 
                    key={expense.category}
                    className={`p-4 rounded-xl ${
                      percentage >= 100 
                        ? 'bg-red-50 text-red-800' 
                        : 'bg-amber-50 text-amber-800'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl">{expense.emoji}</span>
                      <span className="font-medium">{expense.category}</span>
                    </div>
                    <div className="text-sm">
                      {percentage >= 100 
                        ? `Over budget by ${formatCurrency(expense.amount - expense.budget)}`
                        : `Close to budget limit (${percentage.toFixed(1)}%)`
                      }
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        </>
      ) : (
        <BudgetAllocation />
      )}
    </div>
  );
}