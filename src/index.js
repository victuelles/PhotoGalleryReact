import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import WebFont from 'webfontloader';
import './components/library.css';
import './components/style.css';
import './components/responsive.css';
WebFont.load({
    google: {
      families: [
                'Cabin:400,500,700','Montserrat:400,500,700']
    }
  });
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
