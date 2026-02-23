"use client";

import { useState } from 'react';
import ApiKeyForm from '@/components/gemini-keyscope/api-key-form';
import Dashboard from '@/components/gemini-keyscope/dashboard';

export default function Home() {
  const [apiKey, setApiKey] = useState<string | null>(null);

  const handleValidationSuccess = (key: string) => {
    setApiKey(key);
  };

  const handleReset = () => {
    setApiKey(null);
  };

  return (
    <main className="min-h-screen w-full bg-background transition-all duration-500">
      {!apiKey ? (
        <div className="flex h-screen items-center justify-center p-4">
          <ApiKeyForm onValidate={handleValidationSuccess} />
        </div>
      ) : (
        <Dashboard apiKey={apiKey} onReset={handleReset} />
      )}
    </main>
  );
}
