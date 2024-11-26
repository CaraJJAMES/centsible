import React from 'react';
import SignUpForm from '../components/SignUpForm';

interface SignUpPageProps {
  onSignUp: () => void;
  onSignIn: () => void;
}

export default function SignUpPage({ onSignUp, onSignIn }: SignUpPageProps) {
  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <SignUpForm onSignUp={onSignUp} onSignIn={onSignIn} />
      </div>
    </div>
  );
}