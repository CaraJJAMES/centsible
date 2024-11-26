import React, { useState } from 'react';
import { Users, UserPlus, Shield, Trophy, TrendingUp, Settings, Bell, X } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

interface Friend {
  id: string;
  name: string;
  avatar: string;
  savingsRate: number;
  totalSaved: number;
  streak: number;
  lastActive: string;
}

interface PrivacySettings {
  showSavingsRate: boolean;
  showGoals: boolean;
  showTransactions: boolean;
  showNetWorth: boolean;
}

const MOCK_FRIENDS: Friend[] = [
  {
    id: '1',
    name: 'Sophie Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    savingsRate: 35,
    totalSaved: 2500,
    streak: 12,
    lastActive: '2h ago',
  },
  {
    id: '2',
    name: 'Alex Rivera',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    savingsRate: 28,
    totalSaved: 1800,
    streak: 8,
    lastActive: '5h ago',
  },
  {
    id: '3',
    name: 'Taylor Kim',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    savingsRate: 25,
    totalSaved: 1500,
    streak: 6,
    lastActive: '1d ago',
  },
];

export default function FriendsList() {
  const [showPrivacySettings, setShowPrivacySettings] = useState(false);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    showSavingsRate: true,
    showGoals: true,
    showTransactions: false,
    showNetWorth: false,
  });
  const [friends, setFriends] = useState<Friend[]>(MOCK_FRIENDS);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddFriend = (email: string) => {
    // In a real app, this would send an invitation
    setShowAddFriend(false);
  };

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Friends Overview */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Users className="w-6 h-6 text-purple-500" />
            <h2 className="text-xl font-semibold text-gray-800">Your Money Squad</h2>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowPrivacySettings(true)}
              className="p-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 
                transition-all hover:scale-105 active:scale-95"
              aria-label="Privacy Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setShowAddFriend(true)}
              className="p-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 
                transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <UserPlus className="w-5 h-5" />
              <span>Add Friend</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search friends..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-gray-200 
              focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
          />
        </div>

        {/* Friend Cards */}
        <div className="space-y-4">
          {filteredFriends.map(friend => (
            <div 
              key={friend.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl
                hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <img 
                  src={friend.avatar}
                  alt={friend.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium text-gray-800">{friend.name}</h3>
                  <div className="text-sm text-gray-600">Last active: {friend.lastActive}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-purple-600">
                  {friend.savingsRate}% savings rate
                </div>
                <div className="text-sm text-gray-600">
                  {friend.streak} day streak 🔥
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Friend Modal */}
        {showAddFriend && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md m-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Add Friend</h3>
                <button
                  onClick={() => setShowAddFriend(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const email = (form.elements.namedItem('email') as HTMLInputElement).value;
                handleAddFriend(email);
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Friend's Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="friend@example.com"
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 
                        focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setShowAddFriend(false)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 
                        transition-colors"
                    >
                      Send Invitation
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Privacy Settings Modal */}
        {showPrivacySettings && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md m-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Privacy Settings</h3>
                <button
                  onClick={() => setShowPrivacySettings(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {Object.entries(privacySettings).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <div className="font-medium text-gray-800">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </div>
                      <div className="text-sm text-gray-600">
                        Share this information with your friends
                      </div>
                    </div>
                    <button
                      onClick={() => setPrivacySettings(prev => ({
                        ...prev,
                        [key]: !prev[key as keyof PrivacySettings]
                      }))}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        value ? 'bg-purple-500' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                        value ? 'translate-x-7' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}