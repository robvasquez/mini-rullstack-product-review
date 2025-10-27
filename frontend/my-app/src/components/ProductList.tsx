import React, { useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from './ProductCard';
import { Container, Typography, CircularProgress, Box, Alert, Button } from '@mui/material';

const ProductList: React.FC = () => {
  const { products, loading, error, fetchProducts } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="400px">
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>Loading products...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" minHeight="400px" p={3}>
        <Box textAlign="center">
          <Alert severity="error" sx={{ mb: 2 }}>
            <Typography variant="h6">Error Loading Products</Typography>
            <Typography variant="body2">{error}</Typography>
          </Alert>
          <Button variant="contained" color="primary" onClick={fetchProducts}>
            Retry
          </Button>
        </Box>
      </Box>
    );
  }

  if (products.length === 0) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" minHeight="400px">
        <Typography variant="body1" color="text.secondary">No products available.</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" textAlign="center" gutterBottom>
        Products
      </Typography>
      <Box>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Box>
    </Container>
  );
};

export default ProductList;
