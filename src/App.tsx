
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Index from '@/pages/Index';
import AuthPage from '@/pages/AuthPage';
import Ideas from '@/pages/Ideas';
import SubmitIdea from '@/pages/SubmitIdea';
import Explore from '@/pages/Explore';
import Jobs from '@/pages/Jobs';
import CVProfile from '@/pages/CVProfile';
import Feedback from '@/pages/Feedback';
import NotFound from '@/pages/NotFound';
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Toaster } from '@/components/ui/toaster';
import RealTimeNotificationsProvider from '@/components/RealTimeNotificationsProvider';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <RealTimeNotificationsProvider>
            <div className="min-h-screen bg-background">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route 
                  path="/ideas" 
                  element={
                    <ProtectedRoute>
                      <Ideas />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/submit" 
                  element={
                    <ProtectedRoute>
                      <SubmitIdea />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/explore" 
                  element={
                    <ProtectedRoute>
                      <Explore />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/jobs" 
                  element={
                    <ProtectedRoute>
                      <Jobs />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/cv-profile" 
                  element={
                    <ProtectedRoute>
                      <CVProfile />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/feedback" 
                  element={
                    <ProtectedRoute>
                      <Feedback />
                    </ProtectedRoute>
                  } 
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
            </div>
          </RealTimeNotificationsProvider>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
