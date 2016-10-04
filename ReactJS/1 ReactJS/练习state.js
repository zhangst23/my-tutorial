var ClickApp = React.createClass({
	getInitialState:function(){
		return {
			clickCount: 0,
		},
		handleClick: function(){
			this.setState({
				clickCount: this.state.clickCount + 1,
			})
		},
		render: function(){
			return (
				<div>
					<h2>点击下面按钮</h2>
					<button onClick={this.handleClick}>点击我</button>
					<p>你一共点击了：{this.state.clickCount}</p>
				</div>
			)
		}
	})

	var clickComponent = React.render(
		<ClickApp />
		document.getElementById('app')
	)


// 4-internal-state.js
var ToggleText = React.createClass({
	getInitialState:function(){
		return {
			showDefault: true
		}
	},
	toggle:function(e){
		e.preventDefault();
		this.setState({ showDefault: !this.state.showDefault })
	},

	render: function(){
		var message = this.props.default;

		if (!this.state.showDefault) {
			message = this.props.alt;
		}

		return (
			<div>
				<h1>Hello {message}!</h1> /
				<a href="" onClick={this.toggle}>Toggle</a>
			</div>
		);
	}
});

ReactDOM.render(<ToggleText default="world" alt="Mars" />, document.getElementById('root'));



//3.0  5-combining-components.js

var ProductItem = React.createClass({
	render: function(){
		return (
			<tr>
				<td>{this.props.name}</td>
				<td>{this.props.price}</td>
			</tr> /
		);
	}
});

var ProductList = React.createClass({
	render: function(){
		var products = this.props.products.map(function(product, index){
			return (
				<ProductItem
					key={index}
					name={product.name}
					price={product.price}
				/>
			);
		});

		return (
			<table>{products}</table>
		);
	}
});


var products = [
	{ name:'Toast', price: 1499 },
	{ name:'Bacon', price: 1599 },
	{ name:'Coffee', price: 1699 }
];

ReactDOM.render(<ProductList products={products} />, document.getElementById('root'));




























