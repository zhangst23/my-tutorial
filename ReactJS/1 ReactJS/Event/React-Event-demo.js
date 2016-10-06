// React-Event-demo.js


var Counter = React.createClass({
	incrementCount: function(){
		this.setState({
			count: this.state.count + 1
		});
	},

	getInitialState: function(){
		return {
			count: 0
		}
	},

	render: function(){
		return (
			<div className="my-component">
				<h1>Count: {this.state.count}</h1>
				<button type="button" onClick={this.incrementCount.bind(this)}>Increment</button>
			</div> /
		);
	}
});




// Input Events
const InputElement = React.createClass({
	getInitialState: () => {
		return {
			value: ""
		};
	},
	changeHandler: function(event){
		this.setState({
			value: event.target.value
		});
	},
	render: function(){
		return (
			<input value={this.state.value} onChange={this.chagneHandler} />
		)
	}
});



















