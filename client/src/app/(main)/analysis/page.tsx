import CarImageAnalysis from '@/components/CarImageAnalysis';
import Link from 'next/link';
import { CloudArrowUpIcon, DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function AnalysisPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header with Navigation Buttons */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-serif font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">
              Car Damage Analysis
            </h1>
            <div className="flex space-x-4">
              <Link
                href="/analysis"
                className="inline-flex items-center px-6 py-3 bg-white text-gray-700 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 font-serif group"
              >
                <CloudArrowUpIcon className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                <span>New Analysis</span>
              </Link>
              <Link
                href="/analysis-dashboard"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:shadow-xl hover:bg-blue-700 transition-all duration-200 font-serif group"
              >
                <DocumentMagnifyingGlassIcon className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                <span>View History</span>
              </Link>
            </div>
          </div>
          <p className="text-lg text-gray-600 font-serif">
            Upload and analyze your vehicle photos for instant damage assessment
          </p>
        </div>

        {/* Main Content */}
        <CarImageAnalysis />
      </div>
    </div>
  );
}
