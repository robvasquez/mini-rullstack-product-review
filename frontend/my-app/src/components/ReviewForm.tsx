import React, { useState } from 'react';
import { NewReview, ValidationErrors } from '../types';
import { useProducts } from '../context/ProductContext';
import { Box, TextField, Button, Alert, Typography, Rating, FormControl, FormLabel, FormHelperText } from '@mui/material';

interface ReviewFormProps {
  productId: number;
  onSuccess?: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId, onSuccess }) => {
  const { addReviewToProduct, submitting } = useProducts();
  const [formData, setFormData] = useState<NewReview>({
    reviewer: '',
    rating: 5,
    comment: '',
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.reviewer.trim()) {
      newErrors.reviewer = 'Reviewer name is required';
    } else if (formData.reviewer.trim().length < 2) {
      newErrors.reviewer = 'Reviewer name must be at least 2 characters';
    }

    if (formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = 'Rating must be between 1 and 5';
    }

    if (!formData.comment.trim()) {
      newErrors.comment = 'Comment is required';
    } else if (formData.comment.trim().length < 10) {
      newErrors.comment = 'Comment must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);

    if (!validateForm()) {
      return;
    }

    try {
      await addReviewToProduct(productId, formData);
      setSubmitSuccess(true);
      setFormData({ reviewer: '', rating: 5, comment: '' });
      setErrors({});
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to submit review');
    }
  };

  const handleChange = (field: keyof NewReview, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 1, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Add a Review
      </Typography>

      {submitSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Review submitted successfully!
        </Alert>
      )}

      {submitError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {submitError}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Your Name"
        value={formData.reviewer}
        onChange={(e) => handleChange('reviewer', e.target.value)}
        disabled={submitting}
        error={!!errors.reviewer}
        helperText={errors.reviewer}
        margin="normal"
      />

      <FormControl fullWidth margin="normal" error={!!errors.rating}>
        <FormLabel>Rating</FormLabel>
        <Rating
          value={formData.rating}
          onChange={(e, value) => handleChange('rating', value || 1)}
          disabled={submitting}
          size="large"
        />
        {errors.rating && <FormHelperText>{errors.rating}</FormHelperText>}
      </FormControl>

      <TextField
        fullWidth
        label="Comment"
        multiline
        rows={4}
        value={formData.comment}
        onChange={(e) => handleChange('comment', e.target.value)}
        disabled={submitting}
        error={!!errors.comment}
        helperText={errors.comment}
        margin="normal"
        placeholder="Share your thoughts about this product..."
      />

      <Button
        type="submit"
        variant="contained"
        color="success"
        disabled={submitting}
        sx={{ mt: 2 }}
      >
        {submitting ? 'Submitting...' : 'Submit Review'}
      </Button>
    </Box>
  );
};

export default ReviewForm;
