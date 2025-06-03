import React, { useState } from 'react';

interface SettingsState {
  notifications: boolean;
  darkMode: boolean;
  autoAnalysis: boolean;
  saveResults: boolean;
  confidenceThreshold: number;
}

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<SettingsState>({
    notifications: true,
    darkMode: false,
    autoAnalysis: true,
    saveResults: true,
    confidenceThreshold: 90,
  });

  const handleToggle = (setting: keyof SettingsState) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleThresholdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setSettings((prev) => ({
      ...prev,
      confidenceThreshold: value,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-6">
            {/* Notifications */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Notifications
                </h3>
                <p className="text-sm text-gray-500">
                  Receive notifications about analysis results
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('notifications')}
                className={`${
                  settings.notifications
                    ? 'bg-medical-primary'
                    : 'bg-gray-200'
                } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-medical-primary focus:ring-offset-2`}
              >
                <span
                  className={`${
                    settings.notifications ? 'translate-x-5' : 'translate-x-0'
                  } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                />
              </button>
            </div>

            {/* Dark Mode */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Dark Mode</h3>
                <p className="text-sm text-gray-500">
                  Enable dark mode for better visibility
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('darkMode')}
                className={`${
                  settings.darkMode ? 'bg-medical-primary' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-medical-primary focus:ring-offset-2`}
              >
                <span
                  className={`${
                    settings.darkMode ? 'translate-x-5' : 'translate-x-0'
                  } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                />
              </button>
            </div>

            {/* Auto Analysis */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Auto Analysis
                </h3>
                <p className="text-sm text-gray-500">
                  Automatically analyze images when uploaded
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('autoAnalysis')}
                className={`${
                  settings.autoAnalysis ? 'bg-medical-primary' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-medical-primary focus:ring-offset-2`}
              >
                <span
                  className={`${
                    settings.autoAnalysis ? 'translate-x-5' : 'translate-x-0'
                  } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                />
              </button>
            </div>

            {/* Save Results */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Save Results
                </h3>
                <p className="text-sm text-gray-500">
                  Save analysis results for future reference
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('saveResults')}
                className={`${
                  settings.saveResults ? 'bg-medical-primary' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-medical-primary focus:ring-offset-2`}
              >
                <span
                  className={`${
                    settings.saveResults ? 'translate-x-5' : 'translate-x-0'
                  } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                />
              </button>
            </div>

            {/* Confidence Threshold */}
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Confidence Threshold
              </h3>
              <p className="text-sm text-gray-500">
                Minimum confidence level for positive detection (%)
              </p>
              <div className="mt-2">
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={settings.confidenceThreshold}
                  onChange={handleThresholdChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-sm text-gray-600 mt-1">
                  Current: {settings.confidenceThreshold}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 