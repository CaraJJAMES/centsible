import React from 'react';
import { FileText, Edit, Trash2 } from 'lucide-react';

export default function ContentManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Content Management</h2>
        <p className="text-gray-600">Manage app content and resources</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="space-y-4">
          {[
            { title: 'Financial Tips', type: 'Article', status: 'Published', date: '2024-02-15' },
            { title: 'Budgeting Guide', type: 'Guide', status: 'Draft', date: '2024-02-14' },
            { title: 'Investment Basics', type: 'Course', status: 'Published', date: '2024-02-10' },
          ].map((content) => (
            <div
              key={content.title}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
            >
              <div className="flex items-center space-x-4">
                <FileText className="w-6 h-6 text-purple-500" />
                <div>
                  <div className="font-medium text-gray-800">{content.title}</div>
                  <div className="text-sm text-gray-600">
                    {content.type} • {content.date}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  content.status === 'Published'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {content.status}
                </span>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Edit className="w-4 h-4 text-gray-500" />
                </button>
                <button className="p-1 hover:bg-red-100 rounded">
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}