import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '.';

beforeEach(() => render(<Home />));

describe('Home Page', () => {
  it('should render correctly', () => {
    const element = screen.getByText('');
    expect(element).toBeInTheDocument();
  });
});
