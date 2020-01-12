import { Observable } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, catchError } from 'rxjs/operators';
import { LocationOptions, VenueResponse } from './types';

const baseUrl = 'https://api.foursquare.com/v2/venues/search';
const apiParams = {
  client_id: process.env.CLIENT_KEY,
  client_secret: process.env.SECRET_KEY,
  v: '20200112',
};

const createUrlwithParams = (url: string, options: { [key: string]: any }): string => {
  const params: string = new URLSearchParams({ ...apiParams, ...options }).toString();
  return `${url}?${params}`;
};

/**
 * Call to retrieve places of interest based on the options provided
 * @param {LocationOptions} options the query parameters for the API, can pass a longitude and latitude, city name, radius, or a searchterm
 */
export const getLocations = (options: LocationOptions): Observable<VenueResponse> => {
  const url: string = createUrlwithParams(baseUrl, options);
  return fromFetch(url).pipe(
    switchMap(response => response.json()),
    catchError(err => err)
  ) as Observable<VenueResponse>;
};
