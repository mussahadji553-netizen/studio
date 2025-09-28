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

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="24px"
        height="24px"
        {...props}
      >
        <path
          fill="#FFC107"
          d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
        />
        <path
          fill="#FF3D00"
          d="M6.306,14.691l6.06,4.701C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
        />
        <path
          fill="#4CAF50"
          d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.651-3.356-11.303-8H6.393v4.981C9.743,39.69,16.425,44,24,44z"
        />
        <path
          fill="#1976D2"
          d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.012,35.24,44,30.027,44,24C44,22.659,43.862,21.35,43.611,20.083z"
        />
      </svg>
    );
  }

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

  const handleGoogleSignIn = () => {
    // This would be the place to integrate Firebase Google Sign-In
    // For now, we'll simulate a login.
    const googleUser = { name: 'Google User', phone: '+19876543210', status: 'approved' as const };
    auth?.login(googleUser.phone, googleUser.name, googleUser.status);
    router.push('/home');
  }

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
                <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} type="button">
                  <GoogleIcon className="mr-2" />
                  Sign in with Google
                </Button>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
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
