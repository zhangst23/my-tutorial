ReactJS练习.js

//
var HelloWorld = React.createClass({
	getInitialState:function(){
		return{
			backgroundColor:'#FFFFFF'
		}
	},
	handleWheel:function(event){
		var newColor = (parseInt(this.state.backgroundColor.substr(1),16) + event.deltaY * 997).toString(16);
		newColor = '#' + newColor.substr(newColor.length - 6).toUpperCase();
		this.setState({
			backgroundColor:newColor
		})
	},
	render:function(){
		console.log(this.state)
		return<div onWheel={this.handleWheel} style={this.state}>
		<p>Hello,World</p>
		</div>;
	},
});
React.render(<HelloWorld></HelloWorld>,document.body);   /


//
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var TodoList = React.createClass({
	getInitialState: function(){
		return {items:['hello', 'world', 'click', 'me']};
	},
	handleAdd: function(){
		var newItems = this.state.items.concat([prompt('Enter some text')]);
		this.setState({items: newItems});
	}.
	handleRemove: function(){
		var newItems = this.state.items;
		newItems.splice(i, 1);
		this.setState({items: newItems});
	},
	render:function(){
		var items = this.state.items.map(function(item, i){
			return (
				<div key={item} onClick={this.handleRemove.bind(this, i)}>{item}</div>
			);
		}.bind(this));
		return (
			<div>
			<button onClick={this.handleAdd}>Add Item</button>
			<ReactCSSTransitionGroup transitionName="example">{items}</ReactCSSTransitionGroup>
			</div>
		);
	}

});
React.render(<TodoList></TodoList>,document.body);  /

//
var Positioner = React.createClass({
	getInitialState:function(){
		return{
			position:0
		};
	},

	resolveSetTimeout:function(){
		if (this.state.position < this.props.position) {
			this.setState({
				position:this.state.position + 1
			});
		}
	},

	componentDidUpdate:function(){
		if (this.props.position) {
			setTimeout(this.resolveSetTimeout,this.props.timeoutMs);
		}
	},

	render:function(){
		var divStyle = {
			marginLeft:this.state.position
		};
		return<div style={divStyle}>This	will animate!</div>
	}
})

React.render(<Positioner></Positioner>,document.body);
React.render(<Positioner position={100} timeoutMs={10}></Positioner>,document.body); /


//
setTimeout(function(){
	console.log('Yay!');
},1000);
//
var wait1000 = new Promise(function(resolve, reject){
	setTimeout(resolve,1000);
}).then(function(){
	console.log('Yay!');
});

//
var wait1000 = new Promise((resolve, reject)=>{
	setTimeout(resolve, 1000);
}).then(()=>{
	console.log('Yay!');
});
//
setTimeout(function(){
	console.log('Yay!');
	setTimeout(function(){
		console.log('Wheeyee!');
	},1000)
},1000);
//
var wait1000 = ()=> new Promise((resolve, reject)=> {setTimeout(resolve, 1000)});
wait1000()
	.then(function(){
		console.log('Yay!')
		return wait1000()
	})
	.then(function(){
		console.log('Wheeyee!')
	});

//
var MyForm = React.create.createClass({
	submitHandler:function(event){
		event.preventDefault();
		var helloTo = React.findDOMNode(this.refs.helloTo).value;
		alert(helloTo);
	},
	render:function(){
		return <form onSubmit={this.submitHandler}>
			<input 
				ref="helloTo"
				type="text"
				defaultValue="Hello World!"/>
			<br/>
			<button type="submit">Speak</button>
		</form>
	}
});
React.render(<MyForm></MyForm>,document.body); /



//
var MyForm = React.createClass({
	getInitiaState:function(){
		return{
			username:"",
			gender:"man",
			checked:true
		};
	},
	handleUsernameChange:function(event){
		this.setStaet({
			username:event.target.value
		});
	},
	handleGenderChange:function(event){
		this.setState({
			username:event.target.value
		});
	},
	handleCheckboxChange:function(event){
		this.setState({
			checked:event.target.checked
		});
	},
	submitHandle:function(event){
		event.preventDefault();
		console.log(this.state);
	},
	render:function(){
		return <form onSubmit={this.submitHandle}>
			<label htmlFor="username">请输入用户名:</label>
			<input id="username" type="text" value={this.state.username} onChange={this.handleUsernameChange}/>
			<br/>
			<select  value={this.state.gender} onChange={this.handleGenderChange}>
				<option value="man">男</option>
				<option value="woman">女</option>
			</select>
			<br />
			<label htmlFor="checkbox">同意用户协议</label>
			<input type="checkbox" id="checkbox" value="agree" checked={this.state.checked} onChange={this.handleCheckboxChange}/>
			<button type="submit">注册</button>

		</form>;
	}
});

React.render(<MyForm></MyForm>,document.body) /

//
var data = [
	{author: "Pete Hunt", text:"This is one comment"},
	{author: "Jordan Walke", text: "This is another comment"}
];

var CommentBox = React.createClass({
	getInitialState: function(){
		return {data: []};
	},
	loadCommentsFromServer: function(){
		$.ajax({
			url:this.props.url,
			dataType: 'json',
			success: function(data){
				this.setState({data:data});
			}.bind(this),
			error: function(xhr,status,err){
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	componentDidMount: function(){
		this.loadCommentsFromServer();
		setInterval(this.loadCommentsFromServer, this.props.pollInterval)
	},
	render:function(){
		return(
			<div className="commentBox">
				<CommentList data={this.state.data}/> /
			</div> /
		);
	}
});

var CommentList = React.createClass({
	render:function(){
		var commentNodes = this.props.data.map(function(comment){
			return(
				<Comment author={comment.author}>{comment.text}</Comment> /
			);
		});
		return(
			<div className="commentList">{commentNodes}</div> /
		);
	}
});
React.render(
	<CommentBox url="comments.json" pollInterval={2000}/>, /
	document.getElementById('content')
);

//
var CommentForm = React.createClass({
	handleSubmit: function(e){
		e.preventDefault();
		var author = this.refs.author.getDOMNode().value.trim();
		var text = this.refs.text.getDOMNode().value.trim();
		if (!text || !author) {
			return;
		}
		this.refs.author.getDOMNode().value-'';
		this.refs.text.getDOMNode().value='';
		this.props.onCommentSubmit({author: author, text: text});
		return;
	},
	render: function(){
		return(
			<form className="commentForm">
				<input type="text" placeholder="Your name"/>
				<input type="text" placeholder="Say something..."/>
				<input type="submit" value="Post"/>
			</form> /
		);
	}
});
var CommentBox = React.createClass({
	handleCommentSubmit:function(comment){
		$.ajax({
			url:this.props.url,
			dataType:'json',
			type: 'POST',
			data: comment,
			success: function(data){
				this.setState({data:data});
			}.bind(this),
			error:function(xhr, status, err){
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	render:function(){
		return(
			<div className="commentBox">
				<h1>Comments</h1>
				<CommentList data={this.state.data} />
				<CommentForm onCommentSubmit={this.handleCommentSubmit} />
			</div>
		);
	}
});


//


1.0 
FilterableProductTable
	SearchBar
	ProductTable
		ProductCategoryRow
		ProductRow

2.0
var ProductCategoryRow = React.createClass({
	render: function(){
		return (<tr><th colSpan="2">{this.props.category}</th></tr>)
	}
});

var ProductRow = React.createClass({
	render: function(){
		var name = this.props.product.stocked?
		this.props.product.name : 
		<span style={{color: 'red'}}>
		{this.props.product.name}
		</span>; / 
		return (
		<tr><td>{name}</td><td>{this.props.product.price}</td></tr> /
		)
	}
})


var ProductTable = React.createClass({
	render: function(){
		var rows = [];
		var lastCategory = null;
		this.props.products.forEach(function(product){
			if (product.category !== lastCategory) {
				rows.push(<ProductCategoryRow category={product.category} key={product.category}/>)  /
			}
			rows.push(<ProductRow product={product} key={product.name} />);  /
			lastCategory = product.category;
		});
		return (
		<table><thead><tr><th>Name</th><th>Price</th></tr></thead></table>
		<tbody>{rows}</tbody>
		);
	}
});


var SearchBar = React.createClass({
	render: function(){
		return(
			<form action="">
				<input type="text" placeholder="Search..."/>
				<p>
					<input type="checkbox"/>
					{' '}
					Only show products in stock
				</p>
			</form>
		)
	}
})

var FilterableProductTable = React.createClass({
	render:function(){
		return(
			<div>
				</SearchBar> /
				<ProductTable products={this.props.proudcts} />
			</div>
		)
	}
});

var PRODUCTS = [
{category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
{category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
{category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
{category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
{category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
{category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'},
]


ReactDOM.render(
	<FilterableProductTable products={PRODUCTS} />, /
	document.getElementById('container')
)

























