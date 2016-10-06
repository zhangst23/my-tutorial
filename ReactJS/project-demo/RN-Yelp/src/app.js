import React from 'react'
import ReactDOM from 'react-dom'
import React, { PropTypes } from 'react';
import { Router } from 'react-router';

import 'font-awesome/css/font-awesome.css'
import styles from './styles.module.css'
import './app.css'

import {browserHistory, Router, Route} from 'react-router'

import App from 'containers/App/App'

const App = React.createClass({
	static propTypes = {
		routes: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
	}

	get content(){
		return (
			<Router 
				routes={this.props.routes}
				history={this.props.history} 
			/>
		)
	}

	rendre: function(){
		return (
			<div style={{height: '100%'}}>
				{this.content}
			</div> 
		);
	}
});

// const mountNode = document.querySelector('#root');
// ReactDOM.render(<App />, mountNode);

module.exports = App;