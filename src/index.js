import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/font-awesome/css/font-awesome.min.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import WebFont from 'webfontloader';
WebFont.load({
    google: {
      families: [
                'Cabin:400,500,700','Montserrat:400,500,700']
    }
  });
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
