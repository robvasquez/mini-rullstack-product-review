export interface Review {
  reviewer: string;
  rating: number;
  comment: string;
}

export interface Product {
  id: number;
  name: string;
  reviews: Review[];
}

export interface NewReview {
  reviewer: string;
  rating: number;
  comment: string;
}

export interface ValidationErrors {
  reviewer?: string;
  rating?: string;
  comment?: string;
}
