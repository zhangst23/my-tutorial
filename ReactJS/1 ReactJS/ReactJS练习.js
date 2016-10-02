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




//  NoteList 组件有两个 span 子节点，它们都可以通过 this.props.children 读取，
var NodeList = React.createClass({
	render: function(){
		return (
			<ol>
				{
					React.Children.map(this.props.children, function(child){
						return <li>{child}</li>;
					})
				}
			</ol>
		);
	}
});

ReactDOM.render(
	<NodeList>
		<span>Hello</span>
		<span>world</span>
	</NodeList>,  /
	document.body
);



// 上面代码是一个 LikeButton 组件，它的 getInitialState 方法用于定义初始状态，也就是一个对象，这个对象可以通过 this.state 属性读取。当用户点击组件，导致状态变化，this.setState 方法就修改状态值，每次修改以后，自动调用 this.render 方法，再次渲染组件。
//由于 this.props 和 this.state 都用于描述组件的特性，可能会产生混淆。一个简单的区分方法是，this.props 表示那些一旦定义，就不再改变的特性，而 this.state 是会随着用户互动而产生变化的特性。

var LikeButton = React.createClass({
	getInitialState: function(){
		return {liked: false};
	},
	handleClick: function(event){
		this.setState({liked: !this.state.liked});
	},
	render: function(){
		var text = this.state.liked ? 'like' : 'haven\'t liked';
		return (
			<p onClick={this.handleClick}>
				You {text} this. Click to toggle.
			</p> /
		);
	}
});

ReactDOM.render(
	<LikeButton />,
	document.getElementById('example')
);



//上面代码在hello组件加载以后，通过 componentDidMount 方法设置一个定时器，每隔100毫秒，就重新设置组件的透明度，从而引发重新渲染。

var Hello = React.createClass({
	getInitialState: function(){
		return {
			opacity: 1.0
		};
	},

	componentDidMount: function(){
		this.timer = setInterval(function(){
			var opacity = this.state.opacity;
			opacity -= .05;
			if (opacity < 0.1) {
				opacity = 1.0;
			}
			this.setState({
				opacity: opacity
			});
		}.bind(this), 100);
	},

	render: function(){
		return (
			<div style={{opacity: this.state.opacity}}>
				Hello {this.props.name}
			</div> /
		);
	}
});

ReactDOM.render(
	<Helloo name="world"/>,
	document.body
);




//十一、Ajax
//组件的数据来源，通常是通过 Ajax 请求从服务器获取，可以使用 componentDidMount 方法设置 Ajax 请求，等到请求成功，再用 this.setState 方法重新渲染 UI 

var UserGist = React.createClass({
	getInitialState: function(){
		return {
			username: '',
			lastGistUrl: ''
		};
	},

	componentDidMount: function(){
		$.get(this.props.source, function(result){
			var lastGist = result[0];
			if (this.isMounted()) {
				this.setState({
					username: lastGist.owner.login,
					lastGistUrl: lastGist.html_url
				});
			}
		}.bind(this));
	},

	render: function(){
		return (
			<div>
				{this.state.username} is last gist is
				<a href={this.state.lastGistUrl}>here</a>.
			</div>
		);
	}
});

ReactDOM.render(
	<UserGist source="https://api.github.com/users/octocat/gists" />,
	document.body
);


//上面代码使用 jQuery 完成 Ajax 请求，这是为了便于说明。React 本身没有任何依赖，完全可以不用jQuery，而使用其他库。
// 我们甚至可以把一个Promise对象传入组件


ReactDOM.render(
	<RepoList
		promise={$.getJSON('https://api.github.com/search/repositories?q=javascript&sort=starts')}
	/>,
	document.body
);


// 如果Promise对象正在抓取数据（pending状态），
// 组件显示"正在加载"；如果Promise对象报错（rejected状态），组件显示报错信息；
// 如果Promise对象抓取数据成功（fulfilled状态），组件显示获取的数据。

var RepoList = React.createClass({
	getInitialState: function(){
		return { loading: true, error: null, data: null };
	},

	componentDidMount(){
		this.props.promise.then(
			value => this.setState({loading: false, data: value}),
			error => this.setState({loading: false, error: error})
		);
	},

	render: function(){
		if (this.state.loading) {
			return <span>Loading....</span>;
		}
		else if (this.state.error !== null) {
			return <span>Error: {this.state.error.message}</span>
		}
		else {
			var repos = this.state.data.items;
			var repoList = repos.map(function(repo){
				return (
					<li>
						<a href={repo.html_url}>{repo.name}</a> ({repo.stargazers_count}) <br/> {repo.description}
					</li>
				);
			});
			return (
				<main>
					<h1>Most Popular JavaScript Projects in GitHub</h1>
					<ol>{repoList}</ol>
				</main>
			);
		}
	}
});
























