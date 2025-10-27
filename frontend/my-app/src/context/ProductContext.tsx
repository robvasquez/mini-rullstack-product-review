import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Product, NewReview } from '../types';
import { productService } from '../services/api';

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  addReviewToProduct: (productId: number, review: NewReview) => Promise<void>;
  submitting: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, []);

  const addReviewToProduct = useCallback(async (productId: number, review: NewReview) => {
    setSubmitting(true);
    setError(null);
    try {
      await productService.addReview(productId, review);
      // Refresh the specific product or all products
      await fetchProducts();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add review');
      throw err; // Re-throw so the component can handle it
    } finally {
      setSubmitting(false);
    }
  }, [fetchProducts]);

  const value: ProductContextType = {
    products,
    loading,
    error,
    fetchProducts,
    addReviewToProduct,
    submitting,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};
