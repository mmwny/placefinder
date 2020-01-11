import { Observable } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, catchError } from 'rxjs/operators';

interface LocationOptions {
  near?: string,
  radius?: number,
  searchTerm?: string
}

interface VenueResponse {
  meta: {
    code: number,
    requestId: string
  };
  response: Venues;
}

interface Venues {
  venues: VenueResult[]
}

interface DetailOptions {
  id: string
}

interface VenueResult {
  id: string;
  name: string;
  location: Location,
  categories: Category[],
  venuePage: { id: string };
}

interface Location {
  address: string;
  crossStreet: string;
  lat: string;
  long: string;
  labeledLatLngs: any[],
  distance: number;
  postalCode: string;
  cc: string;
  city: string;
  state: string;
  country: string;
  formattedAddress: string[]
}

interface Category {
  id: string;
  name: string;
  pluralName: string;
  shortName: string;
  icon: {
    prefix: string;
    suffix: string
  };
  primary: boolean
}

const baseUrl = 'https://api.foursquare.com/v2/venues';
const apiParams = {
  client_id: process.env.CLIENT_KEY,
  client_secret: process.env.SECRET_KEY,
  v: '20200112'
};

const createUrlwithParams = (url: string, options: { [key: string]: any }): string => {
  const params: string = new URLSearchParams({ ...apiParams, ...options }).toString();
  return `${url}?${params}`;
};

/**
 * Call to retrieve places of interest based on the options provided
 * @param {LocationOptions} options the query parameters for the API, can pass a longitude and latitude, city name, radius, or a searchterm
 */
export const getLocations = (options: LocationOptions): Observable<Response> => {
  const url: string = createUrlwithParams(`${baseUrl}/search`, options);
  return fromFetch(url).pipe(
    switchMap(response => response.json()),
    catchError(err => err)
  );
}

/**
 * Call to retrieve the details for a single place of interest
 * @param { id: string } options the id of the venue to fetch details from
 */
export const getDetails = (options: DetailOptions): Observable<Response> => {
  const url: string = createUrlwithParams(baseUrl, options);
  return fromFetch(url).pipe(
    switchMap(response => response.json()),
    catchError(err => err)
  );
}
