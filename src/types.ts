export interface CatStaff {
  id: string;
  name: string;
  role: string;
  avatar: string;
  specialty: string;
  bgColor: string;
}

export interface VenueRoom {
  id: string;
  name: string;
  title: string;
  description: string;
  images: string[];
  features: string[];
  slogan: string;
}

export interface BoardGameEvent {
  id: string;
  title: string;
  badge: string;
  badgeBg: string;
  time: string;
  price: string;
  description: string;
  theme?: string;
  rating?: number;
  tags: string[];
  imageUrl: string;
}

export interface MahjongRule {
  id: string;
  title: string;
  fans: number;
  description: string;
  example: string;
}

export interface PrintingShowcase {
  id: string;
  title: string;
  category: 'insert' | 'model' | 'accessory';
  description: string;
  imageUrl: string;
  specs?: string;
}
