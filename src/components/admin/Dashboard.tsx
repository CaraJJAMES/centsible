import React, { useState } from 'react';
import { Users, CreditCard, TrendingUp, DollarSign, Settings, Search } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import UserManagement from './UserManagement';
import SubscriptionManagement from './SubscriptionManagement';
import ContentManagement from './ContentManagement';
import SecuritySettings from './SecuritySettings';

function QuickStat({ title, value, change, icon: Icon, trend }: any) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
        <Icon className="w-8 h-8 text-purple-500" />
      </div>
      <div className={`mt-2 text-sm ${
        trend === 'up' ? 'text-green-600' : 'text-red-600'
      }`}>
        {change} from last month
      </div>
    </div>
  );
}

function Overview() {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <QuickStat
          title="Total Users"
          value="2,547"
          change="+12.5%"
          icon={Users}
          trend="up"
        />
        <QuickStat
          title="Active Subscriptions"
          value="1,345"
          change="+7.2%"
          icon={CreditCard}
          trend="up"
        />
        <QuickStat
          title="MRR"
          value={formatCurrency(45750)}
          change="+15.3%"
          icon={DollarSign}
          trend="up"
        />
        <QuickStat
          title="Churn Rate"
          value="2.4%"
          change="-0.5%"
          icon={TrendingUp}
          trend="down"
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { action: 'New user signup', time: '2 minutes ago' },
            { action: 'Subscription upgraded', time: '15 minutes ago' },
            { action: 'Support ticket resolved', time: '1 hour ago' },
            { action: 'New feature enabled', time: '2 hours ago' },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
            >
              <span className="text-gray-800">{activity.action}</span>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagement />;
      case 'subscriptions':
        return <SubscriptionManagement />;
      case 'content':
        return <ContentManagement />;
      case 'security':
        return <SecuritySettings />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Admin Portal</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-200"
                />
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="px-6">
          <nav className="flex space-x-4">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'users', label: 'User Management' },
              { id: 'subscriptions', label: 'Subscriptions' },
              { id: 'content', label: 'Content' },
              { id: 'security', label: 'Security' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {renderContent()}
      </main>
    </div>
  );
}