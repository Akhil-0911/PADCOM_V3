import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

interface AnalysisResult {
  result: 'Positive' | 'Negative';
  confidence: number;
  affectedAreas?: {
    region: string;
    severity: 'Mild' | 'Moderate' | 'Severe';
  }[];
}

const PneumoniaAnalysis: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setResult(null);
      setError(null);
      
      try {
        setIsAnalyzing(true);
        const formData = new FormData();
        formData.append('image', file);

        const response = await axios.post('/api/analyze/pneumonia', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setResult(response.data);
      } catch (err: any) {
        const errorMessage = err.response 
          ? `Server error: ${err.response.status} - ${err.response.statusText}`
          : err.message === 'Network Error'
          ? 'Cannot connect to the backend server. Please make sure it is running.'
          : 'Error analyzing image. Please try again.';
        setError(errorMessage);
        console.error('Analysis error:', err);
      } finally {
        setIsAnalyzing(false);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
    multiple: false,
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-medical-primary">Pneumonia Analysis</h1>
      </div>

      <div className="bg-white shadow sm:rounded-lg transform transition-all hover:shadow-lg">
        <div className="px-4 py-5 sm:p-6">
          <div
            {...getRootProps()}
            className={`mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md transition-colors duration-200 ${
              isDragActive
                ? 'border-medical-primary bg-medical-light scale-105'
                : 'border-gray-300 hover:border-medical-primary hover:bg-medical-light/50'
            }`}
          >
            <div className="space-y-1 text-center">
              <input {...getInputProps()} />
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer rounded-md font-medium text-medical-primary hover:text-medical-dark">
                  <span>Upload a file</span>
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 10MB</p>
            </div>
          </div>

          {selectedImage && (
            <div className="mt-6 animate-scale-in">
              <img
                src={selectedImage}
                alt="Selected chest X-ray"
                className="max-h-96 w-full object-contain rounded-lg shadow-md transition-transform hover:scale-[1.02]"
              />
            </div>
          )}

          {isAnalyzing && (
            <div className="mt-4 animate-fade-in">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-medical-primary" />
                <span className="ml-2 text-medical-primary animate-pulse">
                  Analyzing image...
                </span>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 bg-red-50 p-4 rounded-md animate-slide-in">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {result && (
            <div className="mt-6 animate-scale-in">
              <div
                className={`rounded-md p-4 transform transition-all hover:scale-[1.01] ${
                  result.result === 'Positive'
                    ? 'bg-red-50 hover:bg-red-100'
                    : 'bg-green-50 hover:bg-green-100'
                }`}
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    {result.result === 'Positive' ? (
                      <svg
                        className="h-5 w-5 text-red-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5 text-green-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="ml-3">
                    <h3
                      className={`text-sm font-medium ${
                        result.result === 'Positive'
                          ? 'text-red-800'
                          : 'text-green-800'
                      }`}
                    >
                      {result.result === 'Positive'
                        ? 'Pneumonia Detected'
                        : 'No Pneumonia Detected'}
                    </h3>
                    <div className="mt-2 text-sm">
                      <p
                        className={
                          result.result === 'Positive'
                            ? 'text-red-700'
                            : 'text-green-700'
                        }
                      >
                        Confidence: {(result.confidence * 100).toFixed(2)}%
                      </p>
                      {result.affectedAreas && result.affectedAreas.length > 0 && (
                        <div className="mt-2 animate-slide-in">
                          <p className="text-gray-700 font-medium">
                            Affected Areas:
                          </p>
                          <ul className="mt-1 list-disc list-inside space-y-1">
                            {result.affectedAreas.map((area, index) => (
                              <li 
                                key={index} 
                                className="text-gray-600 transform transition-all hover:translate-x-1"
                              >
                                {area.region} - {area.severity} severity
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PneumoniaAnalysis; 