'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function WelcomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect immediately to the main app homepage
    router.replace('/home');
  }, [router]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background text-center p-4">
      {/* This content will be briefly visible before redirect */}
      <h1 className="text-4xl font-headline font-bold">Welcome to BetPro Advisor</h1>
      <p className="text-lg text-muted-foreground">Redirecting...</p>
    </div>
  );
}
