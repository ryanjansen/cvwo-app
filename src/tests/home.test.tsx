import React from 'react';
import { expect } from 'chai';

import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Home from '../components/Home';

it('renders and displays', async () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>,
  );

  expect(screen.getByText(/Get Things Done/)).to.exist;
});
