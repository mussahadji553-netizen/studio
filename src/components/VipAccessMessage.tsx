import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, MessageCircle } from 'lucide-react';

interface VipAccessMessageProps {
  status: 'pending' | 'guest';
}

export function VipAccessMessage({ status }: VipAccessMessageProps) {
  const title = status === 'pending' ? 'Access Pending' : 'Join VIP';
  const description =
    status === 'pending'
      ? 'Your account is currently awaiting admin approval. We appreciate your patience.'
      : 'You need to be an approved member to view VIP tips. Pay for a subscription to get started.';

  return (
    <div className="flex items-center justify-center py-12">
      <Card className="w-full max-w-lg text-center shadow-xl border-accent">
        <CardHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/20">
            <Lock className="h-6 w-6 text-accent" />
          </div>
          <CardTitle className="mt-4 font-headline text-2xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
            {status !== 'pending' && (
                 <div className="text-left bg-muted/50 rounded-lg p-4 mb-6 space-y-4">
                    <div>
                        <h4 className='font-bold text-center mb-4'>Chagua Kifurushi</h4>
                        <div className='flex justify-between items-center'>
                            <p className="font-semibold">Mwezi (Siku 30)</p>
                            <p className="font-bold text-primary">T.SHL 50,000</p>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className="font-semibold">Wiki (Siku 7)</p>
                            <p className="font-bold text-primary">T.SHL 15,000</p>
                        </div>
                    </div>
                    <div className='border-t pt-4 mt-4'>
                        <h4 className='font-bold text-center mb-2'>Njia ya Malipo</h4>
                        <p className='text-center font-semibold'>AIRTEL MONEY</p>
                        <p className='text-center'>Lipa Namba: <span className='font-bold text-primary'>132228577</span></p>
                    </div>
                </div>
            )}
          <p className="text-muted-foreground mb-4">
            UKISHA LIPIA NJOO WHATSAPP NA SCREENSHOT YA MUHAMALA
          </p>
          <Button asChild className="bg-green-500 hover:bg-green-600 text-white">
            <Link href="https://wa.me/255682666363" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" />
              Wasiliana Nasi WhatsApp
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
