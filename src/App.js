import React, { useState } from 'react';
import { render } from 'react-dom';
import jss from 'jss';
import preset from 'jss-preset-default';

import Header from './components/Header';
import Places from './components/Places';
import VenueContext from './components/VenueContext';

jss.setup(preset());

const App = () => {
  const [venues, setVenues] = useState([]);
  const [fullAddress, setFullAddress] = useState('');

  const styles = {
    '@global': {
      html: {
        boxSizing: 'border-box',
      },
      '*': {
        boxSizing: 'inherit',
      },
      body: {
        fontFamily: 'sans-serif',
        fontSize: '16px',
        color: 'white',
        height: '100vh',
        width: '100vw',
        margin: '0',
        padding: '0',
      },
    },
  };

  jss.createStyleSheet(styles).attach();

  return (
    <React.StrictMode>
      <VenueContext.Provider value={{ venues, address: fullAddress }}>
        <div>
          <Header onSearch={setVenues} onResult={setFullAddress} />
          <Places />
        </div>
      </VenueContext.Provider >
    </React.StrictMode>
  );
};

render(<App />, document.getElementById('root'));
