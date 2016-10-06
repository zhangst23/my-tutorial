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

<Link to='/search' className='browse-all'>or Browse All</Link> /


// Search.jsx
const React = require('react')
const data = require('../public/data')
const Search = () => (
	<div className='container'>
	{data.shows.map((show) =>(
		<h3>{show.title}</h3>
		))}
	</div>
)

module.exports = Search

// Search.jsx
const React = require('react')
const data = require('../public/data')
const Search = () => (
	<div className='container'>
	{data.shows.map((show) =>(
		<div className="show">
			<img src={'/public/img/posters/${show.poster}'} className="show-img"/>
			<div className="show-text">
				<h3 className="show-title">{show.title}</h3>
				<h4 className="show-year">({show.year})</h4>
				<p className="show-description">{show.description}</p>
			</div>
		</div>
		))}
	</div>
)

module.exports = Search



// ShowCard.jsx
const React = require('react')

const ShowCard = (props) => (
  <div className='show-card'>
    <img src={`/public/img/posters/${props.show.poster}`} className='show-card-img' />
    <div className='show-card-text'>
      <h3 className='show-card-title'>{props.show.title}</h3>
      <h4 className='show-card-year'>({props.show.year})</h4>
      <p className='show-card-description'>{props.show.description}</p>
    </div>
  </div> /
)

module.exports = ShowCard

// Search.jsx

const React = require('react')
const ShowCard = require('./ShowCard')
const data = require('../public/data')

const Search = () => (
	<div className="container">
		<div className="shows">
			{data.shows.map((show, index) => (
				<ShowCard show={show} key={index} id={key} />
			))}
		</div>
	</div> /
)

module.exports = Search

// 修改 ShowCard
const React = require('react')

const ShowCard = (props) => (
  <div className='show-card'>
    <img src={`/public/img/posters/${props.poster}`} className='show-card-img' />
    <div className='show-card-text'>
      <h3 className='show-card-title'>{props.title}</h3>
      <h4 className='show-card-year'>({props.year})</h4>
      <p className='show-card-description'>{props.description}</p>
    </div>
  </div> /
)


ShowCard.propTypes = {
	year: React.PropTypes.string.isRequired,
	poster: React.PropTypes.string.isRequired,
	description: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    id: React.PropTypes.number.isRequired
}

module.exports = ShowCard


// Layout.jsx

const React = require('react')

const Layout = (props) => (
	<div className="app-container">
		{props.children}
	</div> /
)

module.exports = Layout


// In ClientApp, pull in the IndexRoute component from react-router and make a nested route in your component.
const React = require('react')
const ReactDOM = require('react-dom')
const Landing = require('./Landing')
const Search = require('./Search')
const Layout = require('./Layout')
const ReactRouter = require('react-router')
const { Router, Route, hashHistory, IndexRoute } = ReactRouter

const App = () => (
  <Router history={hashHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={Landing} /> /
      <Route path='/search' component={Search} /> /
    </Route>
  </Router>
)

ReactDOM.render(<App/>, document.getElementById('app'))

// 6.0 Details.jsx
const React = require('react')

class Details extends React.Component {
	render(){
		return (
			<div className="container">
				<h1>lolhi</h1>
			</div>
		)
	}
}
module.exports = Details

// In ClientApp.jsx, put your new route:
const Details = require('./Details')

<Route path='/details/:id' component={Details} /> /


// 7.0 Redux  , Create Store.jsx
const redux = require('redux')
const reactRedux = require('react-redux')
const data = require('../publc/data')

const SET_SEARCH_TERM = 'setSearchTerm'

const initialState = {
	searchTerm: '',
	shows: data.shows
}

const reducer = (state = {searchTerm: ''} action) => {
	switch (action.type){
		case SET_SEARCH_TERM:
			Object.assign(newState, state, {searchTerm: action.value})
			return newState
		default:
			return state
	}
}

const store = redux.createStore(reducer)

const mapStateToProps = (state) => ({ searchTerm: state.searchTerm })
const mapDispatchToProps = (dispatch) => {
	return {
		setSearchTerm: (term) => {
			dispatch({type: SET_SEARCH_TERM, value: term})
		}
	}
}

const connector = reactRedux.connect(mapStateToProps, mapDispatchToProps)

module.exports = { connector, store }



// Let’s do some connecting with ClientApp.jsx
const Store = require('./Store')
const { store } = Store
const reactRedux = require('react-redux')
const { Provider } = reactRedux

ReactDOM.render(
	(
		<Provider store={store}>
			<App/>
		</Provider> /
	),
	document.getElementById('app')
)


//  Landing.jsx
const Store = require('./Store')
const { connector } = Store

constructor(props){
	super(props)

	this.handleTermEvent = this.handleTermEvent.bind(this)
	this.goToSearch = this.goToSearch.bind(this)
}
handleTermEvent(e){
	console.log(e.target.value)
	this.props.setSearchTerm(e.target.value)
}
goToSearch(e){
	hashHistory.push('search')
	e.preventDefault()
}

<form onSubmit={this.goToSearch}>
	<input type="text" onChange={this.handleTermEvent} className='search' value={this.props.searchTerm} placeholder='Search' />
</form> /

Landing.propTypes = {
	setSearchTerm: React.ProTypes.func,
	searchTerm: React.PropTypes.string
}

module.exports = connector(Landing)





// 8.0 React Lifecycle Methods and AJAX with React
const axios = require('axios')

constructor(props){
	super(props)

	this.state = {
		omdbData: {}
	}
}

componentDidMount (){
	console.log('here', this.props.shows[this.props.params.id].imdbID)
	axios.get('http://wwwomdbapi.com/?i=${this.props.shows[this.props.params.id].imdbID}')
		.then((response) => {
			this.setState({omdbData: response.data})
		})
		.catch((error) => {
			console.error('axios error', error)
		})
}

let rating
if (this.state.omdbData.imdbRating) {
	rating = <h3 className='video-rating'>{this.state.omdvData.imdbRating}</h3>
}

{rating}























