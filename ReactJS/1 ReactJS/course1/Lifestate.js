var Hello = React.createClass({

	getInitialState: function(){
		alert('init');
		return {
			opacity: 1.0,
			fontSize: '12px'
		};
	},
	render: function(){
		return <div style={{opacity: this.state.opacity, fontSize: this.state.fontSize}}>{this.props.name}</div>;
	},
	componentWillMount:function(){
		alert('will');
	},
	componentDidMount: function(){
		alert('did');

		var _self = this;
		window.setTimeout(function(){
			this.setState({
				opacity: 0.5,
				fontSize: '44px'
			});
		}.bind(this),1000);
	}

})

React.render(<Hello name="World"/>,
document.getElementById('container'));

function test(){
	this.x = 1;
}

var 0 = new test();

//apply  call bind









