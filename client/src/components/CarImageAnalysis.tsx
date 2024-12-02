'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CloudArrowUpIcon, DocumentMagnifyingGlassIcon, ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

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
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

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
      const response = await fetch('http://localhost:8000/analysis/analyze-car', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setAnalysis(data);
    } catch (error) {
      console.error('Error analyzing image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with View History Button */}
        <div className="text-center mb-12 relative">
          <Link
            href="/analysis-dashboard"
            className="absolute right-0 top-0 inline-flex items-center px-4 py-2 bg-white text-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 font-serif group"
          >
            <span>View History</span>
            <ArrowRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>

          <h1 className="text-4xl font-serif font-bold mb-4 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">
            Car Damage Analysis
          </h1>
          <p className="text-lg text-gray-600 font-serif">
            Upload a photo of your vehicle for instant damage assessment
          </p>
        </div>

        {/* Upload Section */}
        <Card className="p-8 mb-8 bg-white shadow-xl rounded-2xl">
          <div
            className={`relative border-2 border-dashed rounded-xl p-8 text-center ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer"
            >
              <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-lg font-serif text-gray-700 mb-2">
                {selectedFile ? selectedFile.name : 'Drag and drop your image here, or click to select'}
              </p>
              <p className="text-sm text-gray-500 font-serif">
                PNG, JPG up to 10MB
              </p>
            </label>
          </div>

          <Button
            onClick={handleAnalyze}
            disabled={!selectedFile || loading}
            className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-serif text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <DocumentMagnifyingGlassIcon className="animate-spin -ml-1 mr-3 h-5 w-5" />
                Analyzing...
              </span>
            ) : (
              'Analyze Image'
            )}
          </Button>
        </Card>

        {/* Analysis Results */}
        {analysis && (
          <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <h2 className="text-2xl font-serif font-semibold text-gray-900">Analysis Results</h2>
            </div>

            <div className="p-8 space-y-6">
              {/* Status Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center">
                    {analysis.analysis.is_vehicle ? (
                      <CheckCircleIcon className="h-8 w-8 text-green-500 mr-3" />
                    ) : (
                      <ExclamationTriangleIcon className="h-8 w-8 text-yellow-500 mr-3" />
                    )}
                    <div>
                      <h3 className="font-serif font-semibold text-gray-900">Vehicle Detection</h3>
                      <p className="text-gray-600 font-serif">
                        {analysis.analysis.is_vehicle ? 'Vehicle detected' : 'No vehicle detected'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center">
                    {analysis.analysis.damage_detected ? (
                      <ExclamationTriangleIcon className="h-8 w-8 text-red-500 mr-3" />
                    ) : (
                      <CheckCircleIcon className="h-8 w-8 text-green-500 mr-3" />
                    )}
                    <div>
                      <h3 className="font-serif font-semibold text-gray-900">Damage Assessment</h3>
                      <p className="text-gray-600 font-serif">
                        {analysis.analysis.damage_detected ? 'Damage detected' : 'No damage detected'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Confidence Score */}
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="font-serif font-semibold text-gray-900 mb-2">Analysis Confidence</h3>
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                    <div
                      style={{ width: `${analysis.analysis.confidence_score}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                    ></div>
                  </div>
                  <p className="text-right mt-1 text-sm text-gray-600 font-serif">
                    {analysis.analysis.confidence_score.toFixed(2)}%
                  </p>
                </div>
              </div>

              {/* Damage Details */}
              {analysis.analysis.damage_details.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-serif font-semibold text-gray-900 mb-4">Damage Details</h3>
                  <div className="space-y-3">
                    {analysis.analysis.damage_details.map((damage, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="font-serif text-gray-700">{damage.name}</span>
                        <span className="font-serif text-gray-500">
                          {damage.confidence.toFixed(2)}% confidence
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Image Preview */}
              {analysis.image_url && (
                <div className="mt-6">
                  <img
                    src={analysis.image_url}
                    alt="Analyzed car"
                    className="w-full rounded-xl shadow-lg"
                  />
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
