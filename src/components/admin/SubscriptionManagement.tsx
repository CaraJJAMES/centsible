import React from 'react';
import { CreditCard, DollarSign, TrendingUp, Users } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export default function SubscriptionManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Subscription Management</h2>
        <p className="text-gray-600">Monitor and manage user subscriptions</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Subscriptions</p>
              <p className="text-2xl font-bold text-gray-800">1,245</p>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
          <div className="mt-2 text-sm text-green-600">
            +5.2% from last month
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Monthly Revenue</p>
              <p className="text-2xl font-bold text-gray-800">{formatCurrency(45750)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-purple-500" />
          </div>
          <div className="mt-2 text-sm text-green-600">
            +8.3% from last month
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Avg. Subscription Value</p>
              <p className="text-2xl font-bold text-gray-800">{formatCurrency(35)}</p>
            </div>
            <CreditCard className="w-8 h-8 text-purple-500" />
          </div>
          <div className="mt-2 text-sm text-green-600">
            +2.1% from last month
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Churn Rate</p>
              <p className="text-2xl font-bold text-gray-800">2.4%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-500" />
          </div>
          <div className="mt-2 text-sm text-red-600">
            +0.3% from last month
          </div>
        </div>
      </div>

      {/* Subscription Plans */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Subscription Plans</h3>
        <div className="space-y-4">
          {[
            { name: 'Basic Plan', price: 9.99, users: 450, growth: '+12%' },
            { name: 'Pro Plan', price: 19.99, users: 680, growth: '+18%' },
            { name: 'Enterprise Plan', price: 49.99, users: 115, growth: '+5%' },
          ].map((plan) => (
            <div
              key={plan.name}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
            >
              <div>
                <div className="font-medium text-gray-800">{plan.name}</div>
                <div className="text-sm text-gray-600">
                  {plan.users} active users
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-purple-600">
                  {formatCurrency(plan.price)}/mo
                </div>
                <div className="text-sm text-green-600">{plan.growth}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}