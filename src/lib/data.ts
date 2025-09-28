import type { User, Tip } from './types';

export const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    phone: '+1234567890',
    status: 'approved',
    registrationDetails: 'Long-time follower on social media.',
  },
  {
    id: '2',
    name: 'Jane Smith',
    phone: '+255784123456',
    status: 'pending',
    registrationDetails: 'New user, interested in VIP access. Found via Google search.',
  },
  {
    id: '3',
    name: 'Sam Wilson',
    phone: '+254712345678',
    status: 'pending',
    registrationDetails: 'Referred by John Doe. Seems eager to start.',
  },
    {
    id: '4',
    name: 'Botty McBotface',
    phone: '12345',
    status: 'pending',
    registrationDetails: 'qwert_yuiop_asdfg_hjkl',
  },
];

const allTips: Tip[] = [
  {
    id: 'free1',
    title: 'Daily Double',
    category: 'free',
    status: 'pending',
    date: '2024-08-15',
    predictions: [
      { match: 'Man City vs. Arsenal', pick: 'Man City to Win', odds: 1.85 },
      { match: 'Bayern Munich vs. Dortmund', pick: 'Over 2.5 Goals', odds: 1.6 },
    ],
  },
  {
    id: 'free2',
    title: 'Underdog Special',
    category: 'free',
    status: 'pending',
    date: '2024-08-15',
    predictions: [{ match: 'Crystal Palace vs. West Ham', pick: 'Draw', odds: 3.4 }],
  },
  {
    id: 'vip1',
    title: 'VIP High Roller',
    category: 'vip',
    status: 'pending',
    date: '2024-0.8-15',
    predictions: [
      { match: 'Real Madrid vs. Barcelona', pick: 'Real Madrid -1.5', odds: 2.5 },
      { match: 'Juventus vs. Inter Milan', pick: 'Both Teams to Score', odds: 1.9 },
      { match: 'PSG vs. Lyon', pick: 'PSG to Win & Over 3.5', odds: 3.1 },
    ],
  },
  {
    id: 'vip2',
    title: 'Tennis Ace Accumulator',
    category: 'vip',
    status: 'pending',
    date: '2024-08-15',
    predictions: [
      { match: 'Alcaraz vs. Sinner', pick: 'Alcaraz 2-0', odds: 2.2 },
      { match: 'Swiatek vs. Sabalenka', pick: 'Over 21.5 Games', odds: 1.8 },
    ],
  },
  {
    id: 'hist1',
    title: 'Champions League Final',
    category: 'history',
    status: 'win',
    date: '2024-05-28',
    predictions: [
      { match: 'Liverpool vs. Real Madrid', pick: 'Real Madrid to Win', odds: 2.1 },
    ],
  },
  {
    id: 'hist2',
    title: 'Weekend Parlay',
    category: 'history',
    status: 'lost',
    date: '2024-08-10',
    predictions: [
      { match: 'Man Utd vs. Brighton', pick: 'Man Utd to Win', odds: 1.7 },
      { match: 'Chelsea vs. Everton', pick: 'Chelsea to Win', odds: 1.5 },
    ],
  },
  {
    id: 'hist3',
    title: 'Safe Bet Single',
    category: 'history',
    status: 'win',
    date: '2024-08-11',
    predictions: [
        { match: 'Ajax vs. PSV', pick: 'Over 2.5 Goals', odds: 1.55 }
    ]
  }
];

export const freeTips = allTips.filter(tip => tip.category === 'free');
export const vipTips = allTips.filter(tip => tip.category === 'vip');
export const historyTips = allTips.filter(tip => tip.category === 'history');
