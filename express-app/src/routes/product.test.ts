import request from 'supertest';
import express from 'express';
import productRoutes from './product';

const app = express();
app.use(express.json());
app.use('/products', productRoutes);

describe('Product Routes', () => {
  it('should return all products', async () => {
    const response = await request(app).get('/products').expect(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should return a product by id', async () => {
    const response = await request(app).get('/products/1').expect(200);
    expect(response.body).toHaveProperty('id', 1);
  });

  it('should add a review', async () => {
    const review = { reviewer: 'Test', rating: 5, comment: 'Great product!' };
    const response = await request(app)
      .post('/products/1/reviews')
      .send(review)
      .expect(201);
    expect(response.body).toMatchObject(review);
  });
});
