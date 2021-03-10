import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Button from '.';

const clickHandler = jest.fn();

beforeEach(() => {
  render(<Button text="test" onClick={clickHandler} />);
});

describe('Button', () => {
  it('should render correctly', () => {
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('should call a function when clicked', () => {
    const button = screen.getByText('test');
    fireEvent.click(button);
    expect(clickHandler).toBeCalled();
  });
});
