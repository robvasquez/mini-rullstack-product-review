import { Product, Review } from "./types";

export const products: Product[] = [
    {
        id: 1,
        name: "Product A",
        reviews: [
            { reviewer: 'jon1', rating: 5, comment: "Excellent1!" },
            { reviewer: 'jon2', rating: 4, comment: "Excellent4!" },
            { reviewer: 'jon3', rating: 5, comment: "Excellent5!" },
        ]
    },
    {
        id: 2,
        name: "Product B",
        reviews: [
            { reviewer: 'jon1', rating: 5, comment: "Excellent1!" },
            { reviewer: 'jon2', rating: 4, comment: "Excellent4!" },
            { reviewer: 'jon3', rating: 5, comment: "Excellent5!" },
        ]
    }
];