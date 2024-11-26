import React from 'react';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import { TrendingUp, PieChart as PieChartIcon, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

const SPENDING_TRENDS = [
  { month: 'Jan', amount: 2500 },
  { month: 'Feb', amount: 2300 },
  { month: 'Mar', amount: 2800 },
  { month: 'Apr', amount: 2400 },
  { month: 'May', amount: 2600 },
  { month: 'Jun', amount: 2200 },
];

const CATEGORY_BREAKDOWN = [
  { name: 'Housing', value: 1200, color: '#8b5cf6' },
  { name: 'Food', value: 500, color: '#ec4899' },
  { name: 'Transport', value: 300, color: '#3b82f6' },
  { name: 'Entertainment', value: 200, color: '#10b981' },
  { name: 'Shopping', value: 400, color: '#f59e0b' },
];

const SAVINGS_RATE = [
  { month: 'Jan', rate: 15 },
  { month: 'Feb', rate: 18 },
  { month: 'Mar', rate: 22 },
  { month: 'Apr', rate: 20 },
  { month: 'May', rate: 25 },
  { month: 'Jun', rate: 28 },
];

export default function InsightsPage() {
  return (
    <div className="space-y-6">
      {/* Spending Trends */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Spending Trends</h2>
          <TrendingUp className="w-5 h-5 text-purple-500" />
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={SPENDING_TRENDS}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{ backgroundColor: 'white', borderRadius: '0.5rem' }}
              />
              <Area 
                type="monotone" 
                dataKey="amount" 
                stroke="#8b5cf6" 
                fill="#8b5cf6" 
                fillOpacity={0.2} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Spending by Category</h2>
            <PieChartIcon className="w-5 h-5 text-purple-500" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CATEGORY_BREAKDOWN}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {CATEGORY_BREAKDOWN.map((entry, index) => (
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
            {CATEGORY_BREAKDOWN.map((category) => (
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

        {/* Savings Rate */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Savings Rate</h2>
            <ArrowUpCircle className="w-5 h-5 text-green-500" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={SAVINGS_RATE}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis unit="%" />
                <Tooltip 
                  formatter={(value: number) => `${value}%`}
                  contentStyle={{ backgroundColor: 'white', borderRadius: '0.5rem' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ fill: '#10b981' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600">Biggest Expense</h3>
            <ArrowUpCircle className="w-5 h-5 text-rose-500" />
          </div>
          <p className="text-2xl font-bold text-gray-800">Rent</p>
          <p className="text-rose-600 font-medium">{formatCurrency(1200)}</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600">Monthly Savings</h3>
            <ArrowUpCircle className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-800">{formatCurrency(650)}</p>
          <p className="text-green-600 font-medium">+15% from last month</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600">Budget Status</h3>
            <TrendingUp className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-gray-800">On Track</p>
          <p className="text-purple-600 font-medium">80% of budget used</p>
        </div>
      </div>
    </div>
  );
}