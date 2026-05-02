import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CustomizedInput from './CustomizedInput';

describe('CustomizedInput', () => {
  it('renders input with correct label', () => {
    render(<CustomizedInput name="email" type="email" label="Email Address" />);
    
    // MUI TextField renders the label text
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
  });

  it('renders input with correct type', () => {
    render(<CustomizedInput name="password" type="password" label="Password" />);
    
    // Get the actual input element
    const input = screen.getByLabelText(/Password/i);
    expect(input).toHaveAttribute('type', 'password');
    expect(input).toHaveAttribute('name', 'password');
  });
});
