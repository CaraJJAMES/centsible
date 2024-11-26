import React, { useState } from 'react';
import { TransactionProvider } from './context/TransactionContext';
import { GoalProvider } from './context/GoalContext';
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './components/admin/Dashboard';
import OnboardingFlow from './components/onboarding/OnboardingFlow';
import Dashboard from './components/Dashboard';

type Page = 'landing' | 'signin' | 'signup' | 'onboarding' | 'dashboard' | 'admin-login' | 'admin-dashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSignIn = () => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleStartOnboarding = () => {
    setCurrentPage('onboarding');
  };

  const handleAdminLogin = () => {
    setCurrentPage('admin-dashboard');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return (
          <div>
            <LandingPage 
              onGetStarted={() => setCurrentPage('signup')} 
              onSignIn={() => setCurrentPage('signin')} 
            />
            <div className="fixed bottom-4 right-4">
              <button
                onClick={() => setCurrentPage('admin-login')}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 
                  transition-colors text-sm"
              >
                Admin Portal
              </button>
            </div>
          </div>
        );
      case 'signin':
        return <SignInPage onSignIn={handleSignIn} onSignUp={() => setCurrentPage('signup')} />;
      case 'signup':
        return <SignUpPage onSignUp={handleStartOnboarding} onSignIn={() => setCurrentPage('signin')} />;
      case 'onboarding':
        return (
          <TransactionProvider>
            <GoalProvider>
              <OnboardingFlow onComplete={handleSignIn} />
            </GoalProvider>
          </TransactionProvider>
        );
      case 'dashboard':
        return (
          <TransactionProvider>
            <GoalProvider>
              <Dashboard />
            </GoalProvider>
          </TransactionProvider>
        );
      case 'admin-login':
        return <AdminLoginPage onLogin={handleAdminLogin} />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      default:
        return <LandingPage onGetStarted={() => setCurrentPage('signup')} onSignIn={() => setCurrentPage('signin')} />;
    }
  };

  return <div className="min-h-screen gradient-bg">{renderPage()}</div>;
}