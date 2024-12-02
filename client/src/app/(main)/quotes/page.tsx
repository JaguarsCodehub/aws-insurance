'use client';

import { useState } from 'react';

export default function QuoteForm() {
  const [formData, setFormData] = useState({
    carMake: '',
    carModel: '',
    year: '',
    registrationNumber: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [quote, setQuote] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8000/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setQuote(data.premium);
    } catch (err) {
      setError('Failed to generate quote');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="relative py-24 px-6 sm:py-32 lg:px-8">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-y-0 w-full h-full bg-gradient-to-br from-blue-50 via-white to-gray-50 opacity-50" />
        </div>

        <div className="relative max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif font-bold mb-4 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">
              Get Your Car Insurance Quote
            </h1>
            <p className="text-lg text-gray-600 font-serif">
              Enter your vehicle details below for an instant quote
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-serif font-medium text-gray-700 mb-2">
                    Car Make
                  </label>
                  <input
                    type="text"
                    name="carMake"
                    value={formData.carMake}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-serif"
                    required
                    placeholder="e.g., BMW, Mercedes, Toyota"
                  />
                </div>

                <div>
                  <label className="block text-sm font-serif font-medium text-gray-700 mb-2">
                    Car Model
                  </label>
                  <input
                    type="text"
                    name="carModel"
                    value={formData.carModel}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-serif"
                    required
                    placeholder="e.g., 3 Series, C-Class, Camry"
                  />
                </div>

                <div>
                  <label className="block text-sm font-serif font-medium text-gray-700 mb-2">
                    Year
                  </label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    min="1900"
                    max="2024"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-serif"
                    required
                    placeholder="e.g., 2020"
                  />
                </div>

                <div>
                  <label className="block text-sm font-serif font-medium text-gray-700 mb-2">
                    Registration Number
                  </label>
                  <input
                    type="text"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-serif"
                    required
                    placeholder="e.g., ABC123"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl px-6 py-4 font-serif font-medium text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Calculating...
                  </span>
                ) : (
                  'Get Quote'
                )}
              </button>
            </form>

            {error && (
              <div className="p-4 bg-red-50 border-t border-red-100">
                <p className="text-red-600 font-serif text-center">{error}</p>
              </div>
            )}

            {quote && (
              <div className="p-8 bg-gradient-to-br from-blue-50 to-gray-50 border-t border-gray-100">
                <div className="text-center">
                  <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Your Quote</h2>
                  <p className="text-4xl font-serif font-bold text-blue-600">£{quote}</p>
                  <p className="mt-2 text-gray-600 font-serif">Estimated annual premium</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
