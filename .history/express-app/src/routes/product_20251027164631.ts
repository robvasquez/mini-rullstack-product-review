import express, { Request, Response} from 'express'
import { products } from '../data/product'
import { Review } from '../data/types';
const router = express.Router();

router.get('/products', (req: Request, res: Response) => {
    res.json(products);
});

router.post('/products', (req: Request, res: Response) => {
    const newProduct = req.body;
    products.push(newProduct);
    res.status(201).json(newProduct);
});

router.get('/products/:id', (req: Request, res: Response) => {
    const productId = parseInt(req.params.id, 10);
    const product = products.find(p => p.id === productId);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
});

router.post('/products/:id/reviews', (req: Request, res: Response) => {
    const productId = parseInt(req.params.id, 10);
    const product = products.find(p => p.id === productId);


    if (product) {
        const newReview = req.body as Review;
       
        product.reviews.push(newReview);
        res.status(201).json(newReview);
    } else {
        res.status(404).send('Product not found');0
    }
});

export default router;
