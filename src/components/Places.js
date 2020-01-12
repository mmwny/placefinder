import React from 'react';
import jss from 'jss';

import PlacesCard from './PlacesCard';
import VenueContext from './VenueContext';

const Places = () => {
  const styles = {
    placesContainer: {
      backgroundColor: 'white',
      color: 'grey',
      padding: '15px',
      '& h3': {
        margin: '0'
      },
      '& p': {
        fontSize: '14px',
        margin: '0 0 8px 0'
      }
    },
    noPlacesContainer: {
      textAlign: 'center',
    },
  };

  const { classes } = jss.createStyleSheet(styles).attach();

  return (
    <div className={classes.placesContainer}>
      <VenueContext.Consumer>
        {context => context.address ? (<p>Currently viewing for {context.address}</p>) : null}
      </VenueContext.Consumer>
      <VenueContext.Consumer>
        {context => {
          if (context && context.venues && context.venues.length) {
            return context.venues.map(venue => {
              return <PlacesCard key={venue.id} venue={venue} />;
            });
          } else {
            return (
              <div className={classes.noPlacesContainer}>
                <h2>No Places found</h2>
                <p>Please try searching again!</p>
              </div>
            );
          }
        }}
      </VenueContext.Consumer>
    </div>
  );
};

export default Places;
