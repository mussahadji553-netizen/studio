'use client';

import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';
import { users } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function LoginPage() {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const [loginEmail, setLoginEmail] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const user = users.find((u) => u.email.toLowerCase() === loginEmail.toLowerCase());
    if (user) {
      if (user.status === 'approved') {
        auth?.login(user.email, user.name, user.status);
        router.push('/');
      } else {
        setError('Your account registration is still pending approval.');
      }
    } else {
      setError('No user found with this email. Please register first.');
    }
  };
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    // In a real app, you would call an API to create the user.
    // Here we just simulate it.
    console.log(`New registration: ${regName}, ${regEmail}`);
    auth?.login(regEmail, regName, 'pending');
    setSuccess('Registration successful! Your account is pending admin approval.');
    setTimeout(() => router.push('/'), 2000);
  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Tabs defaultValue="login" className="w-full max-w-md">
        <div className="flex justify-center mb-4">
            <Trophy className="h-10 w-10 text-primary" />
        </div>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-headline">Welcome Back</CardTitle>
              <CardDescription>Enter your email to access your account.</CardDescription>
            </CardHeader>
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input id="login-email" type="email" placeholder="john.doe@example.com" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                </div>
                 {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Login Failed</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
              </CardContent>
              <CardFooter>
                <Button className="w-full" type="submit">Login</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        <TabsContent value="register">
          <Card>
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-headline">Create an Account</CardTitle>
              <CardDescription>Join our community to get access to VIP tips.</CardDescription>
            </CardHeader>
            <form onSubmit={handleRegister}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                    <Label htmlFor="register-name">Full Name</Label>
                    <Input id="register-name" placeholder="John Doe" value={regName} onChange={e => setRegName(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input id="register-email" type="email" placeholder="john.doe@example.com" value={regEmail} onChange={e => setRegEmail(e.target.value)} required />
                    </div>
                     {success && (
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>Success</AlertTitle>
                          <AlertDescription>{success}</AlertDescription>
                        </Alert>
                    )}
                </CardContent>
                <CardFooter>
                    <Button className="w-full" type="submit">Register</Button>
                </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
