// React Supports ES6 Classes教程.js

class HelloWorld extends React.Component {
	constructor(props){
		super(props);
		this.state = { count: props.initialCount };
	}
	handleClick(){
		this.setState({ count: this.state.count + 1 });
	}
	render(){
		return <div>
			<p>Hello {this.props.name}: {this.state.count}!</p>
			<button onClick={this.handleClick.bind(this)}>Click Me</button>
		</div>;
	}
}

HelloWorld.propTypes = {
	name: React.PropTypes.string.isRequired,
	initialCount: React.PropTypes.number
};
HelloWorld.defaultProps = {
	name: "Javascript",
	initialCount: 0
};

React.render(<HelloWorld />, document.body);









