'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
    <div className='container mx-auto p-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {/* Analysis List */}
        <div>
          <h2 className='text-xl font-bold mb-4'>Car Damage Analyses</h2>
          <Button onClick={fetchAnalyses} disabled={loading} className='mb-4'>
            {loading ? 'Loading...' : 'Refresh'}
          </Button>

          <div className='space-y-4'>
            {analyses.map((analysis) => (
              <Card
                key={analysis.analysis_id}
                className='p-4 cursor-pointer hover:shadow-lg transition-shadow'
                onClick={() => viewAnalysisDetails(analysis.analysis_id)}
              >
                <div className='flex items-center space-x-4'>
                  <img
                    src={analysis.image_url}
                    alt='Car'
                    className='w-24 h-24 object-cover rounded'
                  />
                  <div>
                    <p className='font-semibold'>
                      Analysis ID: {analysis.analysis_id.slice(0, 8)}...
                    </p>
                    <p className='text-sm text-gray-500'>
                      Date: {new Date(analysis.timestamp).toLocaleString()}
                    </p>
                    <p
                      className={`text-sm ${
                        analysis.damage_detected
                          ? 'text-red-500'
                          : 'text-green-500'
                      }`}
                    >
                      Damage Detected: {analysis.damage_detected ? 'Yes' : 'No'}
                    </p>
                    <p className='text-sm'>
                      Confidence: {analysis.confidence_score.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Analysis Details */}
        <div>
          <h2 className='text-xl font-bold mb-4'>Analysis Details</h2>
          {selectedAnalysis ? (
            <Card className='p-4'>
              <img
                src={selectedAnalysis.image_url}
                alt='Car'
                className='w-full max-h-96 object-cover rounded mb-4'
              />
              <div className='space-y-2'>
                <p>Analysis ID: {selectedAnalysis.analysis_id}</p>
                <p>
                  Date: {new Date(selectedAnalysis.timestamp).toLocaleString()}
                </p>
                <p>
                  Damage Detected:{' '}
                  {selectedAnalysis.damage_detected ? 'Yes' : 'No'}
                </p>
                <p>
                  Confidence Score:{' '}
                  {selectedAnalysis.confidence_score.toFixed(2)}%
                </p>

                {selectedAnalysis.analysis_results.damage_details?.length >
                  0 && (
                  <div>
                    <h3 className='font-semibold'>Damage Details:</h3>
                    <ul className='list-disc pl-5'>
                      {selectedAnalysis.analysis_results.damage_details.map(
                        (damage: any, index: number) => (
                          <li key={index}>
                            {damage.name} (Confidence:{' '}
                            {damage.confidence.toFixed(2)}%)
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </Card>
          ) : (
            <p className='text-gray-500'>Select an analysis to view details</p>
          )}
        </div>
      </div>

      {/* New Analysis Section */}
      <div className='mt-8'>
        <h2 className='text-xl font-bold mb-4'>New Analysis</h2>
        <CarImageAnalysis onAnalysisComplete={fetchAnalyses} />
      </div>
    </div>
  );
}
