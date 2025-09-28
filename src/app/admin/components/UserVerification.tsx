'use client';

import { useState, useTransition } from 'react';
import { users as initialUsers } from '@/lib/data';
import type { User } from '@/lib/types';
import { analyzeUserForVerification, approveUser, removeUser } from '../actions';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X, Bot, Loader2, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type AIAnalysis = {
    summary: string;
    isApproved: boolean;
}

export function UserVerification() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isAnalysisLoading, setAnalysisLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AIAnalysis | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const pendingUsers = users.filter((user) => user.status === 'pending');
  const approvedUsers = users.filter((user) => user.status === 'approved');

  const handleViewDetails = (user: User) => {
    setSelectedUser(user);
    setAnalysisResult(null); // Reset previous analysis
  };

  const handleAnalyze = async () => {
    if (!selectedUser) return;
    setAnalysisLoading(true);
    try {
      const result = await analyzeUserForVerification({
        userName: selectedUser.name,
        userPhone: selectedUser.phone,
        registrationDetails: selectedUser.registrationDetails,
      });
      setAnalysisResult(result);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "AI Analysis Failed",
        description: "Could not get analysis from the AI model.",
      });
    } finally {
      setAnalysisLoading(false);
    }
  };

  const handleApprove = (userId: string) => {
    startTransition(async () => {
      const result = await approveUser(userId);
      if (result.success) {
        setUsers(users.map(u => u.id === userId ? {...u, status: 'approved'} : u));
        toast({ title: "Success", description: result.message });
        if(selectedUser?.id === userId) {
            setSelectedUser(null);
        }
      } else {
        toast({ variant: "destructive", title: "Error", description: result.message });
      }
    });
  };
  
  const handleRemove = (userId: string) => {
    startTransition(async () => {
        if(confirm('Are you sure you want to remove this user? This action cannot be undone.')) {
            const result = await removeUser(userId);
            if (result.success) {
                setUsers(users.filter(u => u.id !== userId));
                toast({ title: "Success", description: result.message });
            } else {
                toast({ variant: "destructive", title: "Error", description: result.message });
            }
        }
    });
  }

  const getUserAvatar = (index: number) => {
    return PlaceHolderImages[index % PlaceHolderImages.length] || PlaceHolderImages[0];
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Pending Approval</CardTitle>
          <CardDescription>Review and approve new user registrations.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead className="hidden md:table-cell">Registration Details</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingUsers.length > 0 ? (
                pendingUsers.map((user, index) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={getUserAvatar(index).imageUrl} data-ai-hint={getUserAvatar(index).imageHint}/>
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.phone}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell max-w-xs truncate">{user.registrationDetails}</TableCell>
                    <TableCell className="text-right">
                      <div className='flex gap-2 justify-end'>
                        <Button variant="outline" size="sm" onClick={() => handleViewDetails(user)}>
                          View & Analyze
                        </Button>
                        <Button size="sm" onClick={() => handleApprove(user.id)} disabled={isPending}>
                            {isPending ? <Loader2 className="animate-spin w-4 h-4"/> : <Check className="w-4 h-4" />}
                            <span className="ml-2 hidden sm:inline">Approve</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    No pending users.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Approved Users</CardTitle>
          <CardDescription>List of all users with access to VIP content.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                {approvedUsers.map((user, index) => (
                    <TableRow key={user.id}>
                        <TableCell>
                            <div className="flex items-center gap-3">
                                <Avatar>
                                <AvatarImage src={getUserAvatar(index + pendingUsers.length).imageUrl} data-ai-hint={getUserAvatar(index + pendingUsers.length).imageHint} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-muted-foreground">{user.phone}</p>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell className="text-right">
                            <Button variant="destructive" size="sm" onClick={() => handleRemove(user.id)} disabled={isPending}>
                                <Trash2 className="w-4 h-4" />
                                <span className="ml-2 hidden sm:inline">Remove</span>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedUser && (
        <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
              <DialogDescription>Review user information and use AI to check for red flags.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Phone:</strong> {selectedUser.phone}</p>
              <p><strong>Details:</strong> {selectedUser.registrationDetails}</p>
            </div>
            
            {analysisResult && (
                <Card className={analysisResult.isApproved ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base"><Bot className="w-5 h-5"/> AI Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p className="text-sm">{analysisResult.summary}</p>
                        <Badge variant={analysisResult.isApproved ? "default" : "destructive"} className={analysisResult.isApproved ? "bg-green-600 hover:bg-green-700" : ""}>
                            {analysisResult.isApproved ? "Recommended for Approval" : "Review Recommended"}
                        </Badge>
                    </CardContent>
                </Card>
            )}

            <DialogFooter className="sm:justify-between gap-2">
                <Button onClick={handleAnalyze} disabled={isAnalysisLoading}>
                {isAnalysisLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Bot className="mr-2 h-4 w-4" />
                )}
                Analyze with AI
              </Button>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => setSelectedUser(null)}>
                    Close
                </Button>
                <Button onClick={() => handleApprove(selectedUser.id)} disabled={isPending}>
                    {isPending ? <Loader2 className="animate-spin w-4 h-4"/> : <Check className="w-4 h-4" />}
                    <span className='ml-2'>Approve</span>
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
