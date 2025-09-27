import { Tip, Prediction } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, Trophy, Goal, BarChart } from 'lucide-react';

interface BetSlipCardProps {
  tip: Tip;
}

const categoryIcons: { [key: string]: React.ReactNode } = {
  soccer: <Goal className="w-4 h-4 text-muted-foreground" />,
  tennis: <Trophy className="w-4 h-4 text-muted-foreground" />,
  default: <BarChart className="w-4 h-4 text-muted-foreground" />,
};

export function BetSlipCard({ tip }: BetSlipCardProps) {
  const totalOdds = tip.predictions.reduce((acc, pred) => acc * pred.odds, 1);

  const getStatusBadge = (status: 'win' | 'lost' | 'pending' | undefined) => {
    if (!status) return null;
    switch (status) {
      case 'win':
        return <Badge className="bg-green-500 text-white">WIN</Badge>;
      case 'lost':
        return <Badge variant="destructive">LOST</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="flex flex-col h-full transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                 <CardTitle className="font-headline text-xl">{tip.title}</CardTitle>
                 <CardDescription className="flex items-center gap-2 pt-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(tip.date).toLocaleDateString()}</span>
                </CardDescription>
            </div>
            {getStatusBadge(tip.status)}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-4">
          {tip.predictions.map((prediction, index) => (
            <li key={index}>
              <div className="flex justify-between items-center text-sm">
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{prediction.match}</p>
                  <p className="text-muted-foreground">Pick: {prediction.pick}</p>
                </div>
                <Badge variant="secondary" className="font-mono text-base">{prediction.odds.toFixed(2)}</Badge>
              </div>
              {index < tip.predictions.length - 1 && <Separator className="mt-4" />}
            </li>
          ))}
        </ul>
      </CardContent>
      {tip.predictions.length > 1 && (
         <CardFooter className="bg-muted/50 p-4 rounded-b-lg">
            <div className="flex justify-between items-center w-full">
                <span className="text-sm font-semibold text-muted-foreground">Total Odds</span>
                <span className="text-lg font-bold font-mono text-primary">{totalOdds.toFixed(2)}</span>
            </div>
         </CardFooter>
      )}
    </Card>
  );
}
