import React, { useState } from 'react';
import { ApiSettings } from '../types';

interface ApiSettingsPanelProps {
  settings: ApiSettings;
  onSave: (settings: ApiSettings) => void;
}

const ApiSettingsPanel: React.FC<ApiSettingsPanelProps> = ({ settings, onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localSettings, setLocalSettings] = useState(settings);

  const handleChange = (key: keyof ApiSettings, value: any) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    onSave(newSettings);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition-colors"
        title="API Settings"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute bottom-12 left-0 w-80 bg-white border border-gray-200 shadow-xl rounded-lg p-4 animate-fade-in text-left">
          <h4 className="font-bold text-gray-900 mb-3 border-b pb-2">Developer Settings</h4>
          
          <div className="mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={localSettings.useMock}
                onChange={(e) => handleChange('useMock', e.target.checked)}
                className="rounded text-brand-600 focus:ring-brand-500 h-4 w-4"
              />
              <span className="text-sm font-medium text-gray-700">Use Mock API</span>
            </label>
            <p className="text-xs text-gray-500 mt-1 pl-6">
              When enabled, runs entirely in browser with simulated delays.
            </p>
          </div>

          {!localSettings.useMock && (
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">API Base URL</label>
              <input
                type="text"
                value={localSettings.baseUrl}
                onChange={(e) => handleChange('baseUrl', e.target.value)}
                placeholder="https://api.example.com"
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-brand-500 focus:ring-brand-500 text-sm p-2 border"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ApiSettingsPanel;
