export interface User {
  id: string;
  name: string;
  email: string;
  status: 'pending' | 'approved';
  registrationDetails: string;
}

export interface Prediction {
  match: string;
  pick: string;
  odds: number;
}

export interface Tip {
  id: string;
  title: string;
  category: 'free' | 'vip' | 'history';
  status?: 'win' | 'lost' | 'pending';
  predictions: Prediction[];
  date: string;
}
