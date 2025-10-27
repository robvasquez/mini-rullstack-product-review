export interface Product {
    id: number;
    name: string;
    reviews: Review[];
}
    
export interface Review {
    reviewer: string;
    rating: number;
    comment: string;
}