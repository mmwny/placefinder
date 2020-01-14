import React from 'react';
import { render, cleanup } from '@testing-library/react';

import Places from '../components/Places';
import VenueContext from '../components/VenueContext';

afterEach(cleanup);

test('PlacesComponent with venues', () => {
  const mockVenue = {
    id: '1234',
    name: 'Fake Venue',
    location: {
      address: 'Fake St.',
      city: 'Toronto',
      state: 'CA',
    },
  };

  const { getByText } = render(
    <VenueContext.Provider value={{ venues: [mockVenue], address: 'Test St.' }}>
      <Places />
    </VenueContext.Provider>
  );

  expect(getByText('Fake Venue')).toBeTruthy();
  expect(getByText('Currently viewing for Test St.')).toBeTruthy();
});

test('PlacesComponent without venues', () => {
  const { getByText } = render(
    <VenueContext.Provider value={{ venues: [], address: null }}>
      <Places />
    </VenueContext.Provider>
  );

  expect(getByText('No Places found')).toBeTruthy();
  expect(getByText('Please try searching again!')).toBeTruthy();
});

test('PlacesComponent snapshot', () => {
  const { container } = render(<Places />);

  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      class="placesContainer-0-0-6"
    >
      <div
        class="noPlacesContainer-0-0-7"
      >
        <h2>
          No Places found
        </h2>
        <p>
          Please try searching again!
        </p>
      </div>
    </div>
  `);
});
