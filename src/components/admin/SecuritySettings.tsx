import React from 'react';
import { Shield, Key, Bell, Lock } from 'lucide-react';

export default function SecuritySettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Security Settings</h2>
        <p className="text-gray-600">Manage security and authentication settings</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="space-y-6">
          {/* Two-Factor Authentication */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center space-x-4">
              <Shield className="w-6 h-6 text-purple-500" />
              <div>
                <div className="font-medium text-gray-800">Two-Factor Authentication</div>
                <div className="text-sm text-gray-600">
                  Add an extra layer of security to your account
                </div>
              </div>
            </div>
            <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 
              transition-colors"
            >
              Enable
            </button>
          </div>

          {/* API Keys */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center space-x-4">
              <Key className="w-6 h-6 text-purple-500" />
              <div>
                <div className="font-medium text-gray-800">API Keys</div>
                <div className="text-sm text-gray-600">
                  Manage API keys for external integrations
                </div>
              </div>
            </div>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 
              transition-colors"
            >
              Manage
            </button>
          </div>

          {/* Security Alerts */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center space-x-4">
              <Bell className="w-6 h-6 text-purple-500" />
              <div>
                <div className="font-medium text-gray-800">Security Alerts</div>
                <div className="text-sm text-gray-600">
                  Get notified about important security events
                </div>
              </div>
            </div>
            <button className="w-12 h-6 bg-purple-500 rounded-full relative">
              <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" />
            </button>
          </div>

          {/* Session Management */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center space-x-4">
              <Lock className="w-6 h-6 text-purple-500" />
              <div>
                <div className="font-medium text-gray-800">Active Sessions</div>
                <div className="text-sm text-gray-600">
                  Manage your active login sessions
                </div>
              </div>
            </div>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 
              transition-colors"
            >
              View All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}