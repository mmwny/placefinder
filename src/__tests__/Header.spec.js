import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import App from '../App';
import Header from '../components/Header';

import foursquare from '../client/foursquare';
import { of } from 'rxjs';

afterEach(cleanup);

foursquare.getLocations = jest.fn().mockImplementation(() => {
  return of({
    meta: {},
    response: {
      venues: [
        {
          id: 'p123',
          name: 'Place',
          location: {
            address: '123 Street',
            city: 'Toronto',
            state: 'CA',
          },
        },
      ],
      geocode: {
        feature: {
          geometry: {
            center: { lat: 123, lng: -124 },
          },
          displayName: 'Name to display',
        },
      },
    },
  });
});

const changeHandler = jest.fn().mockImplementation(() => {
  return '';
});

const props = {
  onSearch: changeHandler,
  onResult: changeHandler,
};

const mockGeolocation = {
  getCurrentPosition: jest.fn().mockImplementationOnce(success =>
    Promise.resolve(
      success({
        coords: {
          latitude: 51.1,
          longitude: 45.3,
        },
      })
    )
  ),
};
global.navigator.geolocation = mockGeolocation;

test('HeaderComponent click to call handleUseCurrentLocation and use geolocation', () => {
  const { getByText, queryByText } = render(<App />);

  fireEvent.click(getByText('Current Location'));
  expect(getByText('Place')).toBeInTheDocument();

  expect(queryByText('Currently viewing for Name to display')).not.toBeInTheDocument();
});

test('HeaderComponent UI Test', () => {
  const { getByText, getByPlaceholderText } = render(<Header {...props} />);

  expect(getByPlaceholderText('Search for a place...')).toBeInTheDocument();
  expect(getByPlaceholderText('What do you want to find?')).toBeInTheDocument();
  expect(getByText('Current Location')).toBeInTheDocument();
  expect(getByText('Current Location Latitude & Longitude:')).toBeInTheDocument();
});

test('HeaderComponent setLocation', () => {
  const { getByPlaceholderText } = render(<Header {...props} />);

  const input = getByPlaceholderText('Search for a place...');
  fireEvent.change(input, { target: { value: 'ab' } });
  expect(input.value).toEqual('ab');
  expect(foursquare.getLocations).toHaveBeenCalledTimes(1);
});

test('HeaderComponent setQuery and call api', () => {
  const { getByPlaceholderText, getByText } = render(<App />);

  const input = getByPlaceholderText('Search for a place...');
  fireEvent.change(input, { target: { value: 'ABCD' } });
  expect(input.value).toEqual('ABCD');
  expect(foursquare.getLocations).toHaveBeenCalledWith({ near: 'ABCD', query: '' });

  const queryInput = getByPlaceholderText('What do you want to find?');
  fireEvent.change(queryInput, { target: { value: 'Pizza' } });
  expect(queryInput.value).toEqual('Pizza');
  expect(foursquare.getLocations).toHaveBeenCalledWith({ near: 'ABCD', query: 'Pizza' });

  expect(getByText('Currently viewing for Name to display')).toBeInTheDocument();
  expect(getByText('Place')).toBeInTheDocument();
});

test('HeaderComponent setLocation and call api', () => {
  const { getByPlaceholderText, getByText } = render(<App />);

  const input = getByPlaceholderText('Search for a place...');
  fireEvent.change(input, { target: { value: 'Kitchener' } });

  expect(input.value).toEqual('Kitchener');
  expect(foursquare.getLocations).toHaveBeenCalledWith({ near: 'Kitchener', query: '' });
  expect(getByText('Currently viewing for Name to display')).toBeInTheDocument();
  expect(getByText('Place')).toBeInTheDocument();
});

test('HeaderComponent setLocation and call api receive no results', () => {
  const { getByPlaceholderText, queryByText } = render(<App />);

  foursquare.getLocations = jest.fn().mockImplementationOnce(() => {
    return of({ meta: {}, response: {} });
  });

  const input = getByPlaceholderText('Search for a place...');
  fireEvent.change(input, { target: { value: 'Kitchener' } });

  expect(input.value).toEqual('Kitchener');
  expect(foursquare.getLocations).toHaveBeenCalledWith({ near: 'Kitchener', query: '' });
  expect(queryByText('Currently viewing for Name to display')).not.toBeInTheDocument();
  expect(queryByText('Place')).not.toBeInTheDocument();
});

test('HeaderComponent snapshot', () => {
  const { container } = render(<Header {...props} />);
  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      class="sidebarContainer-0-0-275"
    >
      <form
        class="formContainer-0-0-276"
      >
        <div>
          <label
            class="label-0-0-279"
            for="Location (City, State)"
          >
            <p>
              Location (City, State)
            </p>
            <input
              class="input-0-0-280"
              id="input-location(city, state)"
              name="Location (City, State)"
              placeholder="Search for a place..."
              type="text"
              value=""
            />
          </label>
        </div>
        <div>
          <label
            class="label-0-0-281"
            for="Search"
          >
            <p>
              Search
            </p>
            <input
              class="input-0-0-282"
              id="input-search"
              name="Search"
              placeholder="What do you want to find?"
              type="text"
              value=""
            />
          </label>
        </div>
        <button
          class="button-0-0-277"
          disabled=""
        >
          Current Location
        </button>
      </form>
      <div>
        <div
          class="latLng-0-0-278"
        >
          <p>
            Current Location Latitude & Longitude: 
            
          </p>
        </div>
      </div>
    </div>
  `);
});
