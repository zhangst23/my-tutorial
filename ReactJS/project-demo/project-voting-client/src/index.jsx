import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import App from './components/App';
import Voting from './components/Voting';


const pair = ['Trainspotting','28 Days Later'];


ReactDOM.render(
	<Voting pair={pair} hasVoted="Trainspotting" />,
	document.getElementById('app')
)


const routes = <Route component={App}>
	<Route path="/results" component={Results} />
	<Route path="/" component={Voting} />
</Route>;

ReactDOM.render(
	<Router history={hashHistory}>{routes}</Router>,
	document.getElementById('app')
);












