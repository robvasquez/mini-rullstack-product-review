export interface Product {
    id: number;
    name: string;
    reviews: Review[];
}
    
export interface Review {
    id: number;
    rating: number;
    comment: string;
}