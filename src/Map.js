import React from 'react';

import GoogleMapReact from 'google-map-react';

const MapBox = () => {
  return (
    <div>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCVn7j1rX2JCXpd9VocEGwouiRJSXPbnIk' /*process.env.GOOGLE_KEY*/ }}
        defaultCenter={{ lat: 43.451091, lng: -80.513588 }}
        defaultZoom={17}
      >
      </GoogleMapReact>
    </div>
  )
}

export default MapBox;