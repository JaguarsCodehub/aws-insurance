'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowPathIcon, ChevronRightIcon, ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import CarImageAnalysis from './CarImageAnalysis';

interface Analysis {
  analysis_id: string;
  image_url: string;
  timestamp: string;
  damage_detected: boolean;
  confidence_score: number;
  analysis_results: any;
}

export default function AnalysisDashboard() {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState<Analysis | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const fetchAnalyses = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/analysis/analyses');
      const data = await response.json();
      setAnalyses(data);
    } catch (error) {
      console.error('Error fetching analyses:', error);
    } finally {
      setLoading(false);
    }
  };

  const viewAnalysisDetails = async (analysisId: string) => {
    try {
      const response = await fetch(
        `http://localhost:8000/analysis/analysis/${analysisId}`
      );
      const data = await response.json();
      setSelectedAnalysis(data);
    } catch (error) {
      console.error('Error fetching analysis details:', error);
    }
  };

  useEffect(() => {
    fetchAnalyses();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-serif font-bold mb-4 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">
            Analysis Dashboard
          </h1>
          <p className="text-lg text-gray-600 font-serif">
            View and manage your vehicle damage analysis history
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Analysis List */}
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif font-semibold text-gray-900">Analysis History</h2>
              <Button
                onClick={fetchAnalyses}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 bg-white text-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 font-serif"
              >
                <ArrowPathIcon className={`h-5 w-5 mr-2 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Loading...' : 'Refresh'}
              </Button>
            </div>

            <div className="space-y-4">
              {analyses.map((analysis) => (
                <Card
                  key={analysis.analysis_id}
                  className="p-6 cursor-pointer hover:shadow-xl transition-all duration-200 border border-gray-100"
                  onClick={() => viewAnalysisDetails(analysis.analysis_id)}
                >
                  <div className="flex items-center space-x-6">
                    <div className="relative w-32 h-32 flex-shrink-0">
                      <img
                        src={analysis.image_url}
                        alt="Car"
                        className="w-full h-full object-cover rounded-xl"
                      />
                      <div className={`absolute -top-2 -right-2 p-1.5 rounded-full ${analysis.damage_detected ? 'bg-red-100' : 'bg-green-100'
                        }`}>
                        {analysis.damage_detected ? (
                          <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
                        ) : (
                          <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-serif font-semibold text-gray-900">
                          Analysis #{analysis.analysis_id.slice(0, 8)}
                        </p>
                        <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-500 font-serif mt-1">
                        {new Date(analysis.timestamp).toLocaleString()}
                      </p>
                      <div className="mt-2">
                        <div className="relative pt-1">
                          <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                            <div
                              style={{ width: `${analysis.confidence_score}%` }}
                              className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${analysis.damage_detected ? 'bg-red-500' : 'bg-green-500'
                                }`}
                            />
                          </div>
                          <p className="text-right mt-1 text-sm text-gray-500 font-serif">
                            Confidence: {analysis.confidence_score.toFixed(2)}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Analysis Details */}
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-semibold text-gray-900">Analysis Details</h2>
            {selectedAnalysis ? (
              <Card className="p-6 border border-gray-100">
                <img
                  src={selectedAnalysis.image_url}
                  alt="Car"
                  className="w-full h-64 object-cover rounded-xl mb-6"
                />
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-sm text-gray-500 font-serif">Analysis ID</p>
                      <p className="font-serif font-semibold text-gray-900">
                        {selectedAnalysis.analysis_id}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-sm text-gray-500 font-serif">Date</p>
                      <p className="font-serif font-semibold text-gray-900">
                        {new Date(selectedAnalysis.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl ${selectedAnalysis.damage_detected ? 'bg-red-50' : 'bg-green-50'
                    }`}>
                    <div className="flex items-center">
                      {selectedAnalysis.damage_detected ? (
                        <ExclamationTriangleIcon className="h-6 w-6 text-red-500 mr-2" />
                      ) : (
                        <CheckCircleIcon className="h-6 w-6 text-green-500 mr-2" />
                      )}
                      <div>
                        <p className="font-serif font-semibold text-gray-900">
                          {selectedAnalysis.damage_detected ? 'Damage Detected' : 'No Damage Detected'}
                        </p>
                        <p className="text-sm text-gray-600 font-serif">
                          Confidence Score: {selectedAnalysis.confidence_score.toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  </div>

                  {selectedAnalysis.analysis_results.damage_details?.length > 0 && (
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <h3 className="font-serif font-semibold text-gray-900 mb-4">Damage Details</h3>
                      <div className="space-y-3">
                        {selectedAnalysis.analysis_results.damage_details.map(
                          (damage: any, index: number) => (
                            <div key={index} className="flex justify-between items-center">
                              <span className="font-serif text-gray-700">{damage.name}</span>
                              <span className="font-serif text-gray-500">
                                {damage.confidence.toFixed(2)}% confidence
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ) : (
              <div className="text-center p-12 bg-gray-50 rounded-xl">
                <p className="text-gray-500 font-serif">Select an analysis to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
