import React, { useState } from 'react';
import { Product } from '../types';
import ReviewForm from './ReviewForm';
import { Card, CardContent, Typography, Box, Button, Divider, Rating, Stack } from '@mui/material';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);

  const averageRating = product.reviews.length > 0
    ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
    : 0;

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {product.name}
        </Typography>

        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <Rating value={averageRating} readOnly precision={0.1} />
          <Typography variant="body2" color="text.secondary">
            {product.reviews.length > 0
              ? `${averageRating.toFixed(1)} (${product.reviews.length} reviews)`
              : 'No ratings yet'}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Reviews
        </Typography>

        {product.reviews.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            No reviews yet. Be the first to review!
          </Typography>
        ) : (
          <Stack spacing={2} sx={{ mb: 2 }}>
            {product.reviews.map((review, index) => (
              <Box key={index} sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {review.reviewer}
                  </Typography>
                  <Rating value={review.rating} readOnly size="small" />
                </Box>
                <Typography variant="body2">{review.comment}</Typography>
              </Box>
            ))}
          </Stack>
        )}

        <Box mt={2}>
          {!showReviewForm ? (
            <Button
              variant="contained"
              onClick={() => setShowReviewForm(true)}
            >
              Write a Review
            </Button>
          ) : (
            <>
              <ReviewForm
                productId={product.id}
                onSuccess={() => setShowReviewForm(false)}
              />
              <Button
                variant="outlined"
                color="error"
                onClick={() => setShowReviewForm(false)}
                sx={{ mt: 1 }}
              >
                Cancel
              </Button>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
