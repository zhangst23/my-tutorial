var Router = require('react-router').Router;
var Router = require('react-router').Router;
var hashHistory = require("react-router").hashHistory;

function routerChange(){
	console.log("change ")
}
ReactDOM.render(
	<Router onUpdate={routerChange} history={hashHistory}>
		<Route path="/" getConponent={function(nextState, cb){
			require.ensure([], (require) => {
				cb(null, require("./home/index"))
			})
		}}/>

		<Route path="/about" getComponent={function(nextState, cb){
			require.ensure([], (require) => {
				cb(null, require("./home/about"))
			})
		}} />
	</Router>,
	document.getElementById('app')
);




















