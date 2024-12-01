'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface AnalysisResponse {
  image_url: string;
  analysis: {
    is_vehicle: boolean;
    damage_detected: boolean;
    confidence_score: number;
    damage_details: { name: string; confidence: number }[];
    damage_related_text: string[];
    all_labels: { name: string; confidence: number; parents: string[] }[];
  };
}

export default function CarImageAnalysis() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch(
        'http://localhost:8000/analysis/analyze-car',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAnalysis(data);
    } catch (error) {
      console.error('Error analyzing image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='space-y-4'>
      <div>
        <input
          type='file'
          accept='image/*'
          onChange={handleFileSelect}
          className='mb-4'
        />
        <Button onClick={handleAnalyze} disabled={!selectedFile || loading}>
          {loading ? 'Analyzing...' : 'Analyze Image'}
        </Button>
      </div>

      {analysis && (
        <Card className='p-4'>
          <h3 className='font-bold mb-2'>Analysis Results</h3>
          <div className='space-y-2'>
            <p>
              Vehicle Detected: {analysis.analysis?.is_vehicle ? 'Yes' : 'No'}
            </p>
            <p>
              Damage Detected:{' '}
              {analysis.analysis?.damage_detected ? 'Yes' : 'No'}
            </p>
            <p>Confidence Score: {analysis.analysis?.confidence_score?.toFixed(2)}%</p>

            {analysis.analysis?.damage_details?.length > 0 && (
              <div>
                <h4 className='font-semibold'>Damage Details:</h4>
                <ul className='list-disc pl-5'>
                  {analysis.analysis?.damage_details?.map(
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

            {analysis.analysis?.damage_related_text?.length > 0 && (
              <div>
                <h4 className='font-semibold'>Detected Damage-Related Text:</h4>
                <ul className='list-disc pl-5'>
                  {analysis.analysis?.damage_related_text?.map(
                    (text: string, index: number) => (
                      <li key={index}>{text}</li>
                    )
                  )}
                </ul>
              </div>
            )}

            <div>
              <h4 className='font-semibold'>All Detected Labels:</h4>
              <ul className='list-disc pl-5'>
                {analysis.analysis?.all_labels?.map(
                  (label: any, index: number) => (
                    <li key={index}>
                      {label.name} ({label.confidence.toFixed(2)}%)
                      {label.parents.length > 0 && (
                        <span className='text-gray-500'>
                          {' '}
                          - Related to: {label.parents.join(', ')}
                        </span>
                      )}
                    </li>
                  )
                )}
              </ul>
            </div>

            {analysis.image_url && (
              <img
                src={analysis.image_url}
                alt='Analyzed car'
                className='mt-4 max-w-md rounded-lg'
              />
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
