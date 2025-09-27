'use client';

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Trophy } from 'lucide-react';
import Link from 'next/link';

export default function WelcomePage() {
  const auth = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    // Redirect to the main app if user is already logged in and approved
    if (auth?.user?.status === 'approved') {
      router.replace('/home');
    }
  }, [auth, router]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background text-center p-4">
      <div className="flex flex-col items-center gap-6">
        <Trophy className="h-16 w-16 text-primary" />
        <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl md:text-6xl">
          Welcome to BetPro Advisor
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Your expert source for daily betting tips. Please login or register to continue.
        </p>
        <div className="flex gap-4">
          <Button asChild size="lg">
            <Link href="/login">Login / Register</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
