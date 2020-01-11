import React from 'react';
import { render } from 'react-dom';
import jss from 'jss';
import preset from 'jss-preset-default';

import MapBox from './Map';
import Sidebar from './Sidebar';

jss.setup(preset());

const App = () => {
  return (
    <div>
      <Sidebar />
      <MapBox />
    </div>
  )
};

render(<App />, document.getElementById('root'));