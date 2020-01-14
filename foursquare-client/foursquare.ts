import { Observable } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, catchError } from 'rxjs/operators';

interface LocationOptions {
  ll?: string;
  near?: string;
  query?: string;
}

interface VenueResponse {
  meta: {
    code: number;
    requestId: string;
  };
  response: Venues;
}

interface Venues {
  venues: VenuesResult[];
}

interface VenuesResult {
  id: string;
  name: string;
  location: Location;
  categories: Category[];
  referralId: string;
  hasPerk: boolean;
}

interface Location {
  address: string;
  crossStreet: string;
  lat: string;
  long: string;
  labeledLatLngs: any[];
  distance: number;
  postalCode: string;
  cc: string;
  city: string;
  state: string;
  country: string;
  formattedAddress: string[];
}

interface Category {
  id: string;
  name: string;
  pluralName: string;
  shortName: string;
  icon: {
    prefix: string;
    suffix: string;
  };
  primary: boolean;
}

const baseUrl = 'https://api.foursquare.com/v2/venues/search';
const apiParams = {
  client_id: process.env.CLIENT_KEY,
  client_secret: process.env.SECRET_KEY,
  v: '20200112',
};

const createUrlwithParams: (url: string, options: { [key: string]: any }) => string = (
  url: string,
  options: { [key: string]: any }
): string => {
  const params: string = new URLSearchParams({ ...apiParams, ...options }).toString();
  return `${url}?${params}`;
};

/**
 * Call to retrieve places of interest based on the options provided
 * @param {LocationOptions} options the query parameters for the API, can pass a longitude and latitude, city name, or a searchterm
 */
const getLocations: (options: LocationOptions) => Observable<VenueResponse> = (
  options: LocationOptions
): Observable<VenueResponse> => {
  const url: string = createUrlwithParams(baseUrl, options);
  return fromFetch(url).pipe(
    switchMap(response => response.json()),
    catchError(err => err)
  ) as Observable<VenueResponse>;
}

const foursquare = {
  getLocations
}

export default foursquare;


