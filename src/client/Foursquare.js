"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var fetch_1 = require("rxjs/fetch");
var operators_1 = require("rxjs/operators");
var baseUrl = 'https://api.foursquare.com/v2/venues/search';
var apiParams = {
    client_id: process.env.CLIENT_KEY,
    client_secret: process.env.SECRET_KEY,
    v: '20200112'
};
var createUrlwithParams = function (url, options) {
    var params = new URLSearchParams(__assign(__assign({}, apiParams), options)).toString();
    return url + "?" + params;
};
/**
 * Call to retrieve places of interest based on the options provided
 * @param {LocationOptions} options the query parameters for the API, can pass a longitude and latitude, city name, radius, or a searchterm
 */
exports.getLocations = function (options) {
    var url = createUrlwithParams(baseUrl, options);
    return fetch_1.fromFetch(url).pipe(operators_1.switchMap(function (response) { return response.json(); }), operators_1.catchError(function (err) { return err; }));
};
