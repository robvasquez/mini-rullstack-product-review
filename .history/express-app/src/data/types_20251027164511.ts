export interface Product {
    id: number;
    name: string;
    reviews: Review[];
}
    
export interface Review {
    id: number;
    reviewer: string;
    rating: number;
    comment: string;
}