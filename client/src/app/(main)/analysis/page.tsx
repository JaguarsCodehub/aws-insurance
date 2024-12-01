import CarImageAnalysis from '@/components/CarImageAnalysis';

export default function AnalysisPage() {
  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Car Damage Analysis</h1>
      <CarImageAnalysis />
    </div>
  );
}
