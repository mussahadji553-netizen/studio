'use client';

import { useContext, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, AlertCircle, Loader2, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { registerNewUser } from '../admin/actions';
import { users } from '@/lib/data';

export default function LoginPage() {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Login state
  const [loginPhone, setLoginPhone] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Register state
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regError, setRegError] = useState<string | null>(null);
  const [regSuccess, setRegSuccess] = useState<string | null>(null);


  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const user = users.find((u) => u.phone === loginPhone);
    if (user) {
      auth?.login(user.phone, user.name, user.status);
      if (user.status === 'approved') {
        router.push('/home');
      } else {
         router.push('/home'); // Go to home to see VIP message
      }
    } else {
      setLoginError('No user found with this phone number. Please register first.');
    }
  };
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError(null);
    setRegSuccess(null);
    
    startTransition(async () => {
        const result = await registerNewUser(regName, regPhone);
        if (result.success && result.user) {
            auth?.login(result.user.phone, result.user.name, result.user.status);
            setRegSuccess(result.message);
            // Redirect after a delay to show the success message
            setTimeout(() => router.push('/home'), 2000);
        } else {
            setRegError(result.message);
        }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Tabs defaultValue="register" className="w-full max-w-md">
        <div className="flex justify-center mb-4">
            <Trophy className="h-10 w-10 text-primary" />
        </div>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register for VIP</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-headline">Welcome Back</CardTitle>
              <CardDescription>Enter your phone number to check your VIP status.</CardDescription>
            </CardHeader>
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-phone">Phone Number</Label>
                  <Input id="login-phone" type="tel" placeholder="+255 123 456 789" value={loginPhone} onChange={(e) => setLoginPhone(e.target.value)} required />
                </div>
                 {loginError && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Login Failed</AlertTitle>
                      <AlertDescription>{loginError}</AlertDescription>
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
              <CardTitle className="text-2xl font-headline">Register for VIP</CardTitle>
              <CardDescription>Follow payment instructions after registering.</CardDescription>
            </CardHeader>
            <form onSubmit={handleRegister}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-name">Full Name</Label>
                      <Input id="register-name" placeholder="John Doe" value={regName} onChange={e => setRegName(e.target.value)} required disabled={isPending}/>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-phone">Phone Number</Label>
                      <Input id="register-phone" type="tel" placeholder="+255 123 456 789" value={regPhone} onChange={e => setRegPhone(e.target.value)} required disabled={isPending}/>
                    </div>
                     {regSuccess && (
                        <Alert>
                          <CheckCircle className="h-4 w-4" />
                          <AlertTitle>Success!</AlertTitle>
                          <AlertDescription>{regSuccess}</AlertDescription>
                        </Alert>
                    )}
                    {regError && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Registration Failed</AlertTitle>
                            <AlertDescription>{regError}</AlertDescription>
                        </Alert>
                    )}
                </CardContent>
                <CardFooter>
                    <Button className="w-full" type="submit" disabled={isPending}>
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Register
                    </Button>
                </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
