var speakers = ['Scott Hanselman', 'John Papa', 'Scott Guthrie','Michele Bustamante', 'Dan Wahlin', 'Debora Kurata', 'Zoiner Tejada', 'Scott Allen', 'Elijah Manor', 'Ward Bell', 'Todd Anglin', 'Saron Yitbare', 'Scott Hunter'];


var HelloWorld = React.createClass({
	getInitialState(){ return this.props; },
	render: function(){
		return (
			<div>
				<ul>
					{this.state.names.map(function(name){
						return <li>{name}</li>;
					})}
				</ul>
				<button onClick={this.handleSort}>Sort</button>
				<button onClick={this.handleScott}>Scott</button>
			</div> /
		);
	},
	handleSort(){
		this.setState({ names: this.state.names.sort() });
	},
	handleScott(){
		var scotts = this.state.names.filter(function(name){
			return name.indexOf('Scott') > -1;
		});
		this.setState({ names: scotts });
	}
});

React.render(
	<HelloWorld names={speakers} />, /
	document.body
);



//

var Letter = React.createClass({
	var letterStyle = {
		padding: 10,
		margin: 10,
		backgroundColor: this.props.bgcolor,
		color: "#333",
		display: "inline-block",
		fontFamily: "monospace",
		fontSize: "32",
		textAlign: "center"
	};

	render: function(){
		return (
			<div>{this.props.children}</div> /
		)
	}
})

var destination = document.querySelector("#container");

ReactDOM.render(
	<div>
		<Letter>A</Letter>
		<Letter>B</Letter>
		<Letter>C</Letter>
		<Letter>D</Letter>
		<Letter>F</Letter>
	</div>,
	destination
);





















