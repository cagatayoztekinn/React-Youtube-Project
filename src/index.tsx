import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route  } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'

//import page
import App from './App';
import Video from './Video';

const router =
<Router>

<Route path="/" exact component={App}></Route>
<Route path="/video/:id" exact component={Video}></Route>
</Router>
ReactDOM.render(
  router,
  document.getElementById('root')
);

reportWebVitals();
