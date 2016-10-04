// react-route练习.js
// Create a new file called Search.jsx. In Search.jsx put:
const React = require('react')
const shows = require('../public/data')

const Search = () => (
	<h1>Search!</h1>  /
)

module.exports = Search

// Put in ClientApp
const React = require('react')
const ReactDOM = require('react-dom')
const Landing = require('./Landing')
const Search = require('./Search')
const ReactRouter = require('react-router')
const { Router, Route, hashHistory } = ReactRouter

const App = () => (
	<Router history={hashHistory}>
		<Route path='/' component={Landing} /> /
		<Route path='/search' component={Search} /> 
	</Router> 
)

ReactDOM.render(<App/>, document.getElementById('app'))


// 或者换成Link
const ReactRouter = require('react-router')
const { Link } = ReactRouter

<Link to='/search' className='browse-all'>or Browse All</Link>



















