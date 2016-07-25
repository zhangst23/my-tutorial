'use strict';

import React from 'react';
import {render} from 'react-dom';
import {Router, Route, Link} from 'react-router';

require('!style!css!sass!../sass/app.scss');

import Index from './index.jsx';
import Music from './music.jsx';
import Summary from './summary.jsx';
import Calendar from './calendar.jsx';

render((
	<Router>
		<Router name="Index" path="/" component={Index}></Router>
		<Router name="Music" path="/music" component={Music}></Router>
		<Router name="Summary" path="/summary" component={Summary}></Router>
		<Router name="Calendar" path="/calendar" component={Calendar}></Router>
	</Router>

),document.querySelector('#index'));