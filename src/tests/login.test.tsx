import React from 'react';
import { expect } from 'chai';

import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Login from '../components/Login';

it('renders and displays', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>,
  );

  expect(screen.getAllByText(/Login/)).to.exist
});
