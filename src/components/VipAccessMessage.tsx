'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, MessageCircle } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

export function VipAccessMessage() {
  const auth = useContext(AuthContext);
  const status = auth?.user?.status || 'guest';

  const title = status === 'pending' ? 'Uanachama Unasubiri' : 'Jiunge na VIP';
  const description =
    status === 'pending'
      ? 'Akaunti yako inasubiri kuthibitishwa na msimamizi. Tunashukuru kwa uvumilivu wako.'
      : 'Tafadhali jisajili na ulipe ada ya uanachama ili kupata tips za VIP.';

  const handleWhatsAppClick = () => {
    const message = "Nimetuma malipo, naomba kuthibitishwa. Jina langu ni [Jina Lako] na namba yangu ni [Namba Yako].";
    const whatsappUrl = `https://wa.me/255682666363?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

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
            {status === 'pending' ? (
                 <div className="text-left bg-muted/50 rounded-lg p-4 mb-6 space-y-2">
                    <p className='text-center'>Asante kwa kujisajili! Malipo yako yanathibitishwa. Ukiidhinishwa, utapata uwezo wa kuona tips za VIP hapa.</p>
                </div>
            ) : (
                 <div className="text-left bg-muted/50 rounded-lg p-4 mb-6 space-y-4">
                    <div>
                        <h4 className='font-bold text-center mb-4'>Chagua Kifurushi</h4>
                        <div className='flex justify-between items-center'>
                            <p className="font-semibold">MWEZI (Siku 30)</p>
                            <p className="font-bold text-primary">T.SHL 50,000</p>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className="font-semibold">WIKI (Siku 7)</p>
                            <p className="font-bold text-primary">T.SHL 15,000</p>
                        </div>
                    </div>
                    <div className='border-t pt-4 mt-4'>
                        <h4 className='font-bold text-center mb-2'>Njia ya Malipo</h4>
                        <p className='text-center font-semibold'>AIRTEL MONEY</p>
                        <p className='text-center'>Lipa Namba: <span className='font-bold text-primary'>132228277</span></p>
                        <p className='text-center'>Jina: <span className='font-bold'>MUSSA HAJI</span></p>
                    </div>
                </div>
            )}
          <p className="text-muted-foreground mb-4">
             KISHA TUMA WHATSAPP JINA LAKO, NAMBA YAKO NA SCREENSHOT YA MUHAMALA
          </p>
          <Button onClick={handleWhatsAppClick} className="bg-green-500 hover:bg-green-600 text-white">
              <MessageCircle className="mr-2 h-4 w-4" />
              Tuma Uthibitisho WhatsApp
          </Button>
          {status === 'guest' && (
            <div className="mt-4">
                <Button asChild variant="link">
                    <Link href="/login">Tayari unayo akaunti? Ingia hapa</Link>
                </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
