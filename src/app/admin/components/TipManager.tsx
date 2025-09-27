'use client';

import { useState, useTransition } from 'react';
import { historyTips as initialHistoryTips } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { addTip, updateTipStatus } from '../actions';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import type { Tip } from '@/lib/types';


export function TipManager() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [historyTips, setHistoryTips] = useState<Tip[]>(initialHistoryTips);

  const handleAddTip = async (formData: FormData) => {
    startTransition(async () => {
      const result = await addTip(formData);
      if (result.success) {
        toast({ title: "Success", description: result.message });
        // Here you would typically reset the form
      } else {
        toast({ variant: "destructive", title: "Error", description: result.message });
      }
    });
  };
  
  const handleUpdateStatus = (tipId: string, status: 'win' | 'lost') => {
      startTransition(async () => {
        const result = await updateTipStatus(tipId, status);
        if (result.success) {
            setHistoryTips(historyTips.map(t => t.id === tipId ? {...t, status} : t));
            toast({ title: "Success", description: result.message });
        } else {
            toast({ variant: "destructive", title: "Error", description: result.message });
        }
      });
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Post a New Tip</CardTitle>
          <CardDescription>Create a new bet slip for the free or VIP section.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleAddTip} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Tip Title</Label>
              <Input id="title" name="title" placeholder="e.g., Daily Double" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select name="category" defaultValue="free" required>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Free Tip</SelectItem>
                  <SelectItem value="vip">VIP Tip</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="predictions">Predictions</Label>
              <Textarea
                id="predictions"
                name="predictions"
                placeholder="Enter predictions, one per line. Format: Match;Pick;Odds&#10;e.g., Man City vs Arsenal;Man City to Win;1.85"
                rows={4}
                required
              />
            </div>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Post Tip
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Manage History</CardTitle>
            <CardDescription>Update the status of past tips.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Tip</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className='text-right'>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {historyTips.map(tip => (
                        <TableRow key={tip.id}>
                            <TableCell>
                                <p className='font-medium'>{tip.title}</p>
                                <p className='text-sm text-muted-foreground'>{new Date(tip.date).toLocaleDateString()}</p>
                            </TableCell>
                            <TableCell>
                                <Badge variant={tip.status === 'win' ? 'default' : tip.status === 'lost' ? 'destructive': 'secondary'}
                                       className={tip.status === 'win' ? 'bg-green-500' : ''}>
                                    {tip.status?.toUpperCase()}
                                </Badge>
                            </TableCell>
                            <TableCell className='text-right'>
                                <div className='flex gap-2 justify-end'>
                                    <Button size="sm" variant="outline" className='text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700' onClick={() => handleUpdateStatus(tip.id, 'win')} disabled={isPending}>Win</Button>
                                    <Button size="sm" variant="outline" className='text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700' onClick={() => handleUpdateStatus(tip.id, 'lost')} disabled={isPending}>Lost</Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
