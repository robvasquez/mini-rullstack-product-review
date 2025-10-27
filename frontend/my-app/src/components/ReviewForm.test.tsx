import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReviewForm from './ReviewForm';
import { ProductProvider } from '../context/ProductContext';

jest.mock('../services/api');

describe('ReviewForm', () => {
  it('renders the form', () => {
    render(<ProductProvider><ReviewForm productId={1} /></ProductProvider>);
    expect(screen.getByText('Add a Review')).toBeInTheDocument();
  });
});
