import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import PlacesCard from '../components/PlacesCard';

afterEach(cleanup);

const mockVenue = {
  id: '1234',
  name: 'Fake Venue',
  location: {
    address: 'Fake St.',
    city: 'Toronto',
    state: 'CA',
  },
};

test('PlacesCardComponent with address', () => {
  const { getByText } = render(<PlacesCard venue={mockVenue} />);

  expect(getByText('Fake Venue')).toBeInTheDocument();
});

test('PlacesCardComponent without address', () => {
  const mockVenueNoAddress = {
    id: '1234',
    name: 'Another Fake Venue',
    location: {},
  };
  const { getByText } = render(<PlacesCard venue={mockVenueNoAddress} />);

  expect(getByText('No location available')).toBeInTheDocument();
});

test('PlacesCardComponent snapshot', () => {
  const { container } = render(<PlacesCard venue={mockVenue} />);

  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      class="placesCardContainer-0-0-3"
    >
      <h3>
        Fake Venue
      </h3>
      <p>
        Fake St. Toronto, CA
      </p>
    </div>
  `);
});
