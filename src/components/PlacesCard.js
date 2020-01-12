import React from 'react';
import jss from 'jss';

const PlacesCard = props => {
  const styles = {
    placesCardContainer: {
      padding: '15px',
      marginBottom: '10px',
      borderRadius: '4px',
      boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)',
    },
  };

  const { classes } = jss.createStyleSheet(styles).attach();

  return (
    <div className={classes.placesCardContainer}>
      <h3>{props.venue.name}</h3>
      {
        <p>
          {props.venue.location.address
            ? `${props.venue.location.address} ${props.venue.location.city}, ${props.venue.location.state}`
            : 'No location available'}
        </p>
      }
    </div>
  );
};

export default PlacesCard;
