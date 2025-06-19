
export interface Property {
  id: string;
  title: string;
  description: string;
  type: 'house' | 'room' | 'seat';
  price: number;
  location: string;
  area: number; // in sq ft
  amenities: string[];
  images: string[];
  ownerId: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  available: boolean;
  createdAt: string;
}

export interface SearchFilters {
  query: string;
  type: string;
  location: string;
  minPrice: number;
  maxPrice: number;
  minArea: number;
  maxArea: number;
  sortBy: 'price' | 'area' | 'date';
  sortOrder: 'asc' | 'desc';
}

export interface Reservation {
  id: string;
  propertyId: string;
  userId: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}
