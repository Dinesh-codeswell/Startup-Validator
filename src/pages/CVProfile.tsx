
import React from 'react';
import Header from '@/components/Header';
import ApplicantProfileForm from '@/components/ApplicantProfileForm';

const CVProfile = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ApplicantProfileForm />
      </main>
    </div>
  );
};

export default CVProfile;
