import React, { useState } from 'react';
import { Bot, MessageCircle, X } from 'lucide-react';
import AIAssistant from './AIAssistant';
import QuickAddFAB from './QuickAddFAB';
import OverviewPage from './pages/OverviewPage';
import ExpensesPage from './pages/ExpensesPage';
import GoalsPage from './pages/GoalsPage';
import InsightsPage from './pages/InsightsPage';
import SocialPage from './pages/SocialPage';
import UserProfile from './UserProfile';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'expenses', label: 'Expenses' },
    { id: 'goals', label: 'Goals' },
    { id: 'insights', label: 'Insights' },
    { id: 'social', label: 'Social' },
    { id: 'profile', label: 'Profile' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewPage />;
      case 'expenses':
        return <ExpensesPage />;
      case 'goals':
        return <GoalsPage />;
      case 'insights':
        return <InsightsPage />;
      case 'social':
        return <SocialPage />;
      case 'profile':
        return <UserProfile />;
      default:
        return <OverviewPage />;
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Bot className="w-8 h-8 text-purple-500" />
              <span className="ml-2 text-xl font-bold text-gray-800">
                <span className="text-purple-600">FUND</span>amental
              </span>
            </div>
            <div className="flex space-x-1 md:space-x-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition-all
                    ${activeTab === tab.id
                      ? 'bg-purple-100 text-purple-700 scale-105'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 min-h-[calc(100vh-4rem)]">
        <div className="animate-fade-in">
          {renderContent()}
        </div>
      </main>

      {/* Action Buttons Container */}
      <div className="fixed bottom-6 right-6 flex flex-col items-end space-y-4 z-50">
        {/* Quick Add FAB */}
        <QuickAddFAB />

        {/* Chat Button */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-12 h-12 bg-purple-500 text-white rounded-full 
            shadow-lg hover:bg-purple-600 transition-all hover:scale-110
            active:scale-95 flex items-center justify-center"
          aria-label={isChatOpen ? 'Close chat' : 'Open chat'}
        >
          {isChatOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <MessageCircle className="w-5 h-5" />
          )}
        </button>

        {/* Chat Window */}
        {isChatOpen && (
          <div className="fixed bottom-24 right-0 w-[calc(100vw-2rem)] md:w-96 h-[60vh] 
            max-h-[600px] bg-white rounded-2xl shadow-2xl animate-fade-in 
            border border-gray-100 overflow-hidden mx-4 md:mx-6"
          >
            <AIAssistant onClose={() => setIsChatOpen(false)} />
          </div>
        )}
      </div>
    </div>
  );
}