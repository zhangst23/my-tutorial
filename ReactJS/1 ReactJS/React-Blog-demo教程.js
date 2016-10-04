import React from 'react';

class App extends React.Component({
	render: function(){
		return (
			<div>
				<Nav />
				<Header />
			</div> /
		)
	}
});

class Nav extends React.Component({
	render: function(){
		return (
			<ul class="nav nav-pills">
				<li role="presentation" className="active">Home</li>
				<li role="presentation">Profile</li>
				<li role="presentation">Messages</li>
			</ul>
		)
	}
});


// Header
class Header extends React.Component({
	render: function(){
		return(
			<h1 className="foo">Hello, World</h1> /
		)
	}
});

React.render(<App/>, document.querySelector("#main"));

// Blog Post
var Post = React.createClass({
	render:function(){
		return (
			<div className="blog-post">
				<h3 className="ptitle">{this.props.ptitle}<small>{this.props.date}</small></h3>
				<img src={this.props.pimg} className="thumbnail"/>
				<p>{this.props.postbody}</p> /
				<div className="callout callout-post">
					<ul className="menu simple">
						<li>Author: {this.props.author}</li>
						<li>Comments: {this.props.comments}</li>
						<li>Tags: {h.getTaggedName()}</li>
					</ul>
				</div>
			</div>
		)
	}
})


// 1.0  Now let’s build off of that to work with state a little.
// App
var App = React.createClass({
	getInitialState: function(){
		return {
			bgColor: "teal"
		};
	},
	handleColorChange: function(color){
		this.setState({bgColor: color});
	},

	updateBackgroundColor: function(){
		var body = document.querySelector('body')
		body.style.background = this.state.bgColor
	},

	componentDidMount: function(){
		this.updateBackgroundColor()
	},

	componentDidUpdata: function(){
		this.updateBackgroundColor()
	},

	render: function(){
		<div className="foo">
			<h1>Hello,World.</h1>
			<label>what color?
				<ColorPicker value={this.state.bgColor} onColorChange={this.handleColorChange}/>
			</label>
		</div>
	}
});

var ColorPicker = React.createClass({
	propTypes: {
		value: React.PropTypes.string.isRequired,
		onColorChange: React.PropTypes.func
	},
	handleChange: function(e){
		e.preventDefault();
		var color = e.target.value

		if (this.props.onColorChagne) 
			this.props.onColorChange(color);
	},
	render: function(){
		return (
			<select value={this.props.value} onChange={this.handleChange}>
				<option value="orangered">orangered</option>
				<option value="teal">teal</option>
				<option value="orange">orange</option>
				<option value="indigo">indigo</option>
				<option value="red">red</option>
			</select>
		)
	}
})

React.render(<App/>, document.querySelector('#main'));









