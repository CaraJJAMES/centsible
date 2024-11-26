import React, { useState } from 'react';
import { User, Settings, Bell } from 'lucide-react';

export default function UserProfile() {
  const [chatbotPersonality, setChatbotPersonality] = useState('sassy');
  const [roastIntensity, setRoastIntensity] = useState(50);
  const [motivationStyle, setMotivationStyle] = useState(50);
  const [sensitivityLevel, setSensitivityLevel] = useState(50);

  const personalities = [
    { id: 'sassy', name: 'The Sassy BFF', description: 'Playful and cheeky with a side of tough love' },
    { id: 'coach', name: 'The Snarky Coach', description: 'Tough love with a dry sense of humor' },
    { id: 'guru', name: 'Financial Guru', description: 'Wise but witty financial wisdom' },
    { id: 'blunt', name: 'Blunt Reality Check', description: 'No sugar coating, just facts with flair' },
  ];

  return (
    <div className="space-y-6">
      {/* Profile Overview */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-purple-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Your Profile</h2>
            <p className="text-gray-600">Customize your FUNDamental experience</p>
          </div>
        </div>
      </div>

      {/* Money Coach Personality */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Money Coach Personality</h3>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {personalities.map((personality) => (
              <button
                key={personality.id}
                onClick={() => setChatbotPersonality(personality.id)}
                className={`p-4 rounded-xl text-left transition-all ${
                  chatbotPersonality === personality.id
                    ? 'bg-purple-100 ring-2 ring-purple-400'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="font-medium text-gray-800">{personality.name}</div>
                <div className="text-sm text-gray-600">{personality.description}</div>
              </button>
            ))}
          </div>

          {/* Personality Sliders */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Roast Intensity</span>
                <span>{roastIntensity}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={roastIntensity}
                onChange={(e) => setRoastIntensity(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Motivation Style</span>
                <span>{motivationStyle}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={motivationStyle}
                onChange={(e) => setMotivationStyle(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Sensitivity Level</span>
                <span>{sensitivityLevel}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sensitivityLevel}
                onChange={(e) => setSensitivityLevel(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
          <Bell className="w-5 h-5 text-purple-500" />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <div className="font-medium text-gray-800">Spending Alerts</div>
              <div className="text-sm text-gray-600">Get notified when you're close to budget limits</div>
            </div>
            <button className="w-12 h-6 bg-purple-500 rounded-full relative">
              <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <div className="font-medium text-gray-800">Goal Updates</div>
              <div className="text-sm text-gray-600">Celebrate when you reach savings milestones</div>
            </div>
            <button className="w-12 h-6 bg-purple-500 rounded-full relative">
              <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}