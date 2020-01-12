import React, { useEffect, useState } from 'react';
import jss from 'jss';

import { Subscription, Observable } from 'rxjs';
import { tap, concatMap } from 'rxjs/operators';

import Input from '../controls/Input';
import { getLocations } from '../client/foursquare';

const Header = props => {
  const [loading, setLoading] = useState(false);
  const [latLng, setLatLng] = useState('');
  const [location, setLocation] = useState('');
  const [query, setQuery] = useState('');
  const [initialLoad, setInitialLoad] = useState(true);

  const subscriptions = new Subscription();

  useEffect(() => {
    // When the app initially loads, use the current location to retrive venues
    if (initialLoad) {
      handleUseCurrentLocation();
      setInitialLoad(false);
    }

    // When the user is typing if the location is more than 3 letters, look for places
    if (location.length > 3) {
      handleSearchForLocation(null);
    }

    return () => {
      // Clean up any subscriptions when the component is destroyed to avoid memory leaks
      subscriptions.unsubscribe();
    };
  }, [location, query]);

  const styles = {
    sidebarContainer: `
      background-color: #7e6690;
      padding: 15px;
    `,
    formContainer: {
      display: 'grid',
      gridTemplateColumns: 'auto auto 120px 120px',
      gridGap: '10px',
      alignItems: 'flex-end',
      marginBottom: '10px',
    },
    button: {
      fontSize: '16px',
      fontWeight: 'bold',
      backgroundColor: '#b290cc',
      border: 'none',
      color: 'white',
      borderRadius: '4px',
      height: '45px',
      width: '100%',
      boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)',
      cursor: 'pointer',
      '&:hover': {
        boxShadow: 'none',
      },
      '&:disabled': {
        cursor: 'not-allowed',
        boxShadow: 'none',
        color: 'grey',
        backgroundColor: 'lightgrey'
      }
    },
    latLng: {
      color: 'lightgrey',
      fontSize: '12px',
      marginTop: '10px',
      '& p': {
        margin: '0',
      },
    },
    '@media (max-width: 550px)': {
      formContainer: {
        gridTemplateColumns: 'auto auto'
      }
    }
  };

  const { classes } = jss.createStyleSheet(styles).attach();

  const resetParameters = () => {
    setLocation('');
    setQuery('');
    props.onResult('');
  }

  const handleSetLocation = event => {
    setLocation(event.target.value);
  };

  const handleSetQuery = event => {
    setQuery(event.target.value);
  };

  const handleSearchForLocation = (event) => {
    if (event) {
      event.preventDefault();
    }

    if (location) {
      setLoading(true);
      subscriptions.add(
        getLocations({ near: location, query }).subscribe({
          next: res => {
            if (res.response.venues) {
              // Take lat/lng from Foursquare api and use to set latLng, as well as use full address
              setLatLng(`${res.response.geocode.feature.geometry.center.lat},${res.response.geocode.feature.geometry.center.lng}`);
              props.onResult(res.response.geocode.feature.displayName);
              props.onSearch(res.response.venues);
            } else {
              // If search retrieves no results, reset latLng, full address, and the venues
              setLatLng('');
              props.onResult('');
              props.onSearch([]);
            }
          },
          complete: () => setLoading(false)
        })
      );
    }
  };

  /**
   * Converts gelocation to Obseravble so it can handled synchronously with getLocation API
   */
  const getLocationObservable = () => {
    return new Observable(obs => {
      navigator.geolocation.getCurrentPosition(
        result => {
          obs.next(result),
            obs.complete()
        },
        error => {
          obs.error(error)
        }
      )
    })
  }

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      // Get location coordinates from geolocation api, set to state, then pass to Foursquare client to retrieve locations and set to context.
      subscriptions.add(
        getLocationObservable().pipe(
          tap(location => setLatLng(`${location.coords.latitude},${location.coords.longitude}`)),
          concatMap(location => getLocations({ ll: `${location.coords.latitude},${location.coords.longitude}` }))
        ).subscribe({
          next: res => props.onSearch(res.response.venues),
          complete: () => setLoading(false)
        })
      );
      // reset the manual search form fields
      resetParameters();
    }
  }

  return (
    <div className={classes.sidebarContainer}>
      <form className={classes.formContainer} onSubmit={handleSearchForLocation}>
        <Input
          label="Location (City, State)"
          type="text"
          placeholder="Search for a place..."
          value={location}
          onChange={handleSetLocation}
        />
        <Input
          label="Search"
          type="text"
          placeholder="What do you want to find?"
          value={query}
          onChange={handleSetQuery}
        />
        <input
          className={classes.button}
          type="submit"
          value="Search"
          disabled={loading}
        />
        <button
          className={classes.button}
          onClick={handleUseCurrentLocation}
          disabled={loading}
        >
          Current Location
        </button>
      </form>

      <div>
        <div className={classes.latLng}>
          {navigator.geolocation ? <p>Current Location Latitude & Longitude: {latLng}</p> : <p>Geolocation not available</p>}
        </div>
      </div>

    </div>
  );
};

export default Header;
