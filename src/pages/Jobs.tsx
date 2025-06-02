
import React from 'react';
import Header from '@/components/Header';
import JobPostings from '@/components/JobPostings';

const Jobs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <JobPostings />
      </main>
    </div>
  );
};

export default Jobs;
