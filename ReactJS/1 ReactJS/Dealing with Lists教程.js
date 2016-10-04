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
			</div>
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
	<HelloWorld names={speakers} />,
	document.body
);
























