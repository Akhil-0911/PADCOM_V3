import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const stats = [
    { name: 'Total Analyses', value: '1,234' },
    { name: 'Brain Tumor Scans', value: '856' },
    { name: 'Pneumonia Scans', value: '378' },
    { name: 'Success Rate', value: '98.5%' },
  ];

  const recentAnalyses = [
    {
      id: 1,
      type: 'Brain Tumor',
      date: '2024-01-15',
      result: 'Negative',
      confidence: '98.2%',
    },
    {
      id: 2,
      type: 'Pneumonia',
      date: '2024-01-15',
      result: 'Positive',
      confidence: '95.7%',
    },
    // Add more recent analyses as needed
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="space-x-4">
          <Link
            to="/brain-tumor"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-medical-primary hover:bg-medical-dark"
          >
            New Brain Scan
          </Link>
          <Link
            to="/pneumonia"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-medical-primary hover:bg-medical-dark"
          >
            New Chest X-Ray
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                {stat.name}
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-medical-primary">
                {stat.value}
              </dd>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">Recent Analyses</h2>
        </div>
        <div className="border-t border-gray-200">
          <ul role="list" className="divide-y divide-gray-200">
            {recentAnalyses.map((analysis) => (
              <li key={analysis.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center ${
                          analysis.result === 'Positive'
                            ? 'bg-medical-error/20 text-medical-error'
                            : 'bg-medical-success/20 text-medical-success'
                        }`}
                      >
                        {analysis.result === 'Positive' ? '!' : '✓'}
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900">
                        {analysis.type} Analysis
                      </h3>
                      <p className="text-sm text-gray-500">{analysis.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        analysis.result === 'Positive'
                          ? 'bg-medical-error/10 text-medical-error'
                          : 'bg-medical-success/10 text-medical-success'
                      }`}
                    >
                      {analysis.result}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">
                      {analysis.confidence}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 