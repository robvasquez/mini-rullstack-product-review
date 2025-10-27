import { Product, NewReview } from '../types';

export const productService = {
  getAllProducts: async (): Promise<Product[]> => {
    const response = await fetch('/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  },

  getProductById: async (id: number): Promise<Product> => {
    const response = await fetch(`/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    return response.json();
  },

  addReview: async (productId: number, review: NewReview): Promise<NewReview> => {
    const response = await fetch(`/products/${productId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to add review');
    }

    return response.json();
  },
};
