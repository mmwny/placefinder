export interface LocationOptions {
  ll?: string;
  near?: string;
  query?: string;
}

export interface VenueResponse {
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
