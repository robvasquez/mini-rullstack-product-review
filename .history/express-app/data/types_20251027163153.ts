interface Product {
    id: number;
    name: string;
    reviews: Review[];
}
    
interface Review {
    id: number;
    productId: number;
    rating: number;
    comment: string;
}