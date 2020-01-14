"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_1 = require("rxjs/fetch");
const operators_1 = require("rxjs/operators");
const baseUrl = 'https://api.foursquare.com/v2/venues/search';
const apiParams = {
    client_id: process.env.CLIENT_KEY,
    client_secret: process.env.SECRET_KEY,
    v: '20200112',
};
const createUrlwithParams = (url, options) => {
    const params = new URLSearchParams(Object.assign(Object.assign({}, apiParams), options)).toString();
    return `${url}?${params}`;
};
/**
 * Call to retrieve places of interest based on the options provided
 * @param {LocationOptions} options the query parameters for the API, can pass a longitude and latitude, city name, or a searchterm
 */
const getLocations = (options) => {
    const url = createUrlwithParams(baseUrl, options);
    return fetch_1.fromFetch(url).pipe(operators_1.switchMap(response => response.json()), operators_1.catchError(err => err));
};
const foursquare = {
    getLocations
};
exports.default = foursquare;
