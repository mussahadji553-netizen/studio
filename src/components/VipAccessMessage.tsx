import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, MessageCircle } from 'lucide-react';

interface VipAccessMessageProps {
  status: 'pending' | 'guest';
}

export function VipAccessMessage({ status }: VipAccessMessageProps) {
  const title = status === 'pending' ? 'Access Pending' : 'Exclusive Content';
  const description =
    status === 'pending'
      ? 'Your account is currently awaiting admin approval. We appreciate your patience.'
      : 'You need to be an approved member to view VIP tips. Register or log in to get started.';

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
          <p className="text-muted-foreground mb-4">
            For faster approval or any questions, please contact us.
          </p>
          <p className="text-lg font-semibold mb-4">"weka ujumbe wako"</p>
          <Button asChild className="bg-green-500 hover:bg-green-600 text-white">
            <Link href="https://wa.me/255682666363" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" />
              Contact on WhatsApp
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
