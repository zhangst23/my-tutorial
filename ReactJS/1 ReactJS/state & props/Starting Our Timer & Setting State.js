// Starting Our Timer & Setting State.js

var LightningCounter = React.createClass({
	getInitialState: function(){
		return {
			strikes: 0
		};
	},
	timerTick: function(){
		this.setState({
			strikes: this.state.strikes + 100
		});
	}
	componentDidMount: function(){
		setInterval(this.timerTick, 1000);
	},
	render:function(){
		return (
			<h1>{this.state.strikes}</h1>
		);
	}
});