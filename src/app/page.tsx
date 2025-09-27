'use client';

import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { freeTips, vipTips, historyTips } from '@/lib/data';
import { BetSlipCard } from '@/components/BetSlipCard';
import { Header } from '@/components/Header';
import { VipAccessMessage } from '@/components/VipAccessMessage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  const auth = useContext(AuthContext);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 px-4 py-6 md:px-6 lg:py-8">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex flex-col items-center text-center mb-8">
            <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl md:text-6xl">
              Welcome to BetPro Advisor
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Your expert source for daily betting tips. Explore our free, VIP, and historical predictions.
            </p>
          </div>

          <Tabs defaultValue="free" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-muted/50 backdrop-blur-sm">
              <TabsTrigger value="free">Free Tips</TabsTrigger>
              <TabsTrigger value="vip" className="relative">
                VIP Tips
                <Badge variant="destructive" className="absolute -top-2 -right-2 bg-accent text-accent-foreground scale-90">PRO</Badge>
              </TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            
            <Separator className="my-4" />

            <ScrollArea className="h-[calc(100vh-20rem)]">
              <div className="pr-4">
                <TabsContent value="free">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {freeTips.map((tip) => (
                      <BetSlipCard key={tip.id} tip={tip} />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="vip">
                  {auth?.user?.status === 'approved' ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {vipTips.map((tip) => (
                        <BetSlipCard key={tip.id} tip={tip} />
                      ))}
                    </div>
                  ) : (
                    <VipAccessMessage status={auth?.user?.status || 'guest'} />
                  )}
                </TabsContent>
                <TabsContent value="history">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {historyTips.map((tip) => (
                      <BetSlipCard key={tip.id} tip={tip} />
                    ))}
                  </div>
                </TabsContent>
              </div>
            </ScrollArea>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
