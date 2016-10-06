ES6 和 ES5 的区别.js


// 1.0 模块的定义
//ES5
var Feed = React.createClass({});
//ES6
class Feed extends Component {

}


// 2.0 引入导出
// ES5 引入
var Story = require('./Story');
// ES6 引入
import Story from './Story.js';

// ES5 导出
module.exports = Feed;
// ES6 导出
export default Feed;


// 3.0 初始化状态
var Feed = React.createClass({
	getInitialState(){
		return {
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2
			}),
			loaded: false,
			isAnimating: true,
			isRefreshing: false
		};
	}
});

//ES6
class Feed extends Component {
	constructor(props){
		super(props);
		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => !== row2
			}),
			loaded: false,
			isAnimating: true,
			isRefreshing: false
		}
	}
}

// 4.0 this绑定
// ES5 
var Feed = React.createClass({
	//直接使用this.props属性
	renderStories(story){
		return (
			<Story story={story} navigator={this.props.navigator}></Story> /
		);
	}

	render(){
		return (
			<ListView 
				testID={"Feed Screen"}
				dataSource={this.state.dataSource}
				renderRow={this.renderStories}
				.../> 
		)
	}
})

// ES6
class Feed extends Component {
	//构造器直接绑定方法
	constructor(props){
		super(props);
		this.renderStories = this.renderStories.bind(this);
	}
}

class Feed extends Component {
	//调用时，绑定this.
	render(){
		return (
			<ListView
				testID={"Feed Screen"}
				dataSource={this.state.dataSource}
				renderRow={(story) => this.renderStories(story)}
			.../>
		)
	}
}

class Feed extends Component {
	//使用时，绑定this
	render(){
		renturn (
	      <ListView
	        testID={"Feed Screen"}
	        dataSource={this.state.dataSource}
	        renderRow={this.renderStories.bind(this)}
	        .../>			
		)
	}
}

// 注意绑定this失败, 会发生未定义错误, 即undefined is not an object.

// 5.0 省略冒号，关键字和分号
// ES5
var Photo = React.createClass({
	handleDoubleTap: function(e) {...},
	render: function() {...},
});

// ES6
class Photo extends React.Component {
	handleDoubleTap(e) {...}
	render() {...}
}


// Template1：hello,XXX 输出。 ES5 ES6
//ES5
<div id="example">
	<script>
		React.render(
			<h1>Hello, world!</h1>,
			document.getElementById('example')
		);
	</script>


// Es6
import React,{Component} from 'react';
class HelloMessage extends Component{
	constructor(){
		super();
	}
	render(){
		return <h1>Hello {this.props.name}</h1>;  /
	}
}

class Output extends Component{
	constructor(){
		super();
	}
	render(){
		return(
			<div>
				<HelloMessage name="John" />
			</div>  /
		)
	}
}


// Template2：数组遍历显示。 ES5 ES6
//ES5
<script>
	var names = ['Alice', 'Emily', 'Kate'];
	React.render(
		<div>
			{
				names.map((name)=>return <div>Hello, {name}!</div>;);
			}
		</div>,
		document.getElementById('example')
	);
</script> /
<script>
	var arr = [
		<h1>Hello world!</h1>
		<h2>React is awesome</h2>
	];
	React.render(
		<div>{arr}</div>,
		document.getElementById('example')
	);
</script> 
//ES6
class RepeatArray extends Component{
	constructor(){
		super();
	}
	render(){
		var arr = [
			<h1>Hello world!</h1>
			<h2>React is awesome</h2>
		];
		var names = ['Alice', 'Emily', 'Kate'];
		return (
			<div>
			{arr}
			{
				names.map((name) => {return <div>Hello, {name}!</div>;} )
			}
			</div>
		);
	}
}
export default RepeatArray;


// Template3：ol和li的实现。 ES5 ES6
//ES5
var NotesList = React.createClass({
	render: function(){
		return (
			<ol>
				{
					this.props.children.map(function(child){
						return <li>{child}</li>
					})
				}
			</ol>
		);
	}
});

React.render(
	<NoteList>
		<span>hello</span>
		<span>world</span>
	</NoteList>, /
	document.body
);
//ES6
class RepeatLi extends Component{
	render(){
		return (
			<ol>
				{
					this.props.children.map((child) => {return <li>{child}</li>})
				}
			</ol>
		);
	}
}
class RepeatArray extends Component {
	constructor(){
		super();
	}
	render(){
		return (
			<div>
				<RepeatLi>
					<span>hello</span>
					<span>world</span>
				</RepeatLi>
			</div>
		);
	}
}
export default RepeatArray;


// Template4：Click 事件。 ES5 ES6
//ES5
var MyComponent = React.createClass({
	handleClick: function(){
		React.findDOMNode(this.refs.myTextInput).focus();
	},
	render: function(){
	  return (
		<div>
			<input type="text" ref="myTextInput" />
			<input type="button" value="Focus the text input" onClick={this.handleClick} />
		</div>
	  );
	}
});
React.render(
	<MyComponent />,
	document.getElementById('example')
);
//ES6
class FocusText extends Component{
	handleClick(){
		React.findDOMNode(this.refs.myText).focus();
	}
	render(){
		return(
			<div>
				<input type="text" ref="myText" />
				<input type="button" value="Focus the text input" onClick={this.handleClick.bind(this)} />
			</div>
		);
	}
}
class RepeatArray extends Component{
	constructor(){
		super();
	}
	render(){
		return (
			<div>
				<FocusText />
			</div> /
		);
	}
}
export default RepeatArray;


// Template5：State的用法，以toggle显示文字为例。 ES5 ES6
//ES5
var LikeButton = React.createClass({
	getInitialState: function(){
		return {liked: false};
	},
	handleClick: function(event){
		this.setState({liked: !this.state.liked});
	},
	render: function(){
		var text = this.state.liked? 'like' : 'haven\'t liked';
		return (
			<p onClick={this.handleClick}>
				You {text} this. Click to toggle.
			</p> /
		);
	}
});
React.render(
	<LikeButton />,
	document.getElementById('example')
);
//ES6
class StatusUse extends Component{
	constructor(){
		super();
		this.state={
			like:true
		}
	}
	handleClick(){
		this.setState({like:!this.state.like});
	}
	render(){
		var text = this.state.like?'Like':"Unlike";
		return (
			<div>
				<p onClick={this.handleClick.bind(this)}>
					You {text} this.Click the toggle;
				</p>
			</div>
		);
	}
}
class RepeatArray extends Component{
	constructor(){
		super();
	}
	render(){
		return(
			<div>
			<StateUse />
			</div> /
		);
	}
}
export default RepeatArray;



// Template6：onChange事件，以及变量值的同步。 ES5 ES6
//ES5
var Input = React.createClass({
	getInitialState: function(){
		return {value: 'Hello!'};
	},
	handleChange: function(event){
		this.setState({value: event.target.value});
	},
	render: function(){
		var value = this.state.value;
		return (
			<div>
				<input type="text" value={value} onChange={this.handleChange} />
				<p>{value}</p>
			</div> /
		);
	}
});
React.render(<Input/>, document.body);

// ES6
class AsyncText extends Component{
	constructor(){
		super();
		this.state={
			value:'Hello!'
		}
	}
	handleChange(e){
		this.setState({vaule:e.target.value});
	}
	render(){
		var value = this.state.value;
		return (
			<div>
				<input type="text" value={value} onChange={this.handleChange.bind(this)} />
				<p>{value}</p>
			</div> /
		);
	}
}
class RepeatArray extends Component{
	constructor(){
		super();
	}
	render(
		return (
			<AsyncText />
			</div>
		);
	)
}
export default RepeatArray;



// Template6：定时任务事件的嵌入。 ES5 ES6
//ES5

      var Hello = React.createClass({
        getInitialState: function () {
          return {
            opacity: 1.0
          };
        },

        componentDidMount: function () {
          this.timer = setInterval(function () {
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

        render: function () {
          return (
            <div style={{opacity: this.state.opacity}}>
              Hello {this.props.name}
            </div> /
          );
        }
      });

      React.render(
        <Hello name="world"/>,
        document.body
      );

//　　ES6

class OpacityWord extends Component{
  constructor(){
    super();
    this.state={
      opacity:1.0
    }
  }
  componentWillMount(){
    let time  =  setInterval(()=>{
      let opacity = this.state.opacity;
      opacity -= 0.5;
      if (opacity<0.1) {
        opacity=1.0;
      }
      this.setState({opacity:opacity});
    }.bind(this),100);
  }
  render(){
    return (
      <div style={{ opacity:this.state.opacity }}>
        Hello, {this.props.name}!
      </div> /
    );
  }

}

class RepeatArray extends Component{
  constructor() {
    super();
  }
  render(){
    return (
      <div>
       <OpacityWord />
      </div> /
    );
  }
}
export default RepeatArray;



// Template8： 从服务端获取数据。 ES5 ES6
//ES5

var UserGist = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      lastGistUrl: ''
    };
  },

  componentDidMount: function() {
    $.get(this.props.source, function(result) {
      var lastGist = result[0];

        this.setState({
          username: lastGist.owner.login,
          lastGistUrl: lastGist.html_url
        });

    }.bind(this));
  },

  render: function() {
    return (
      <div>
        {this.state.username}s last gist is
         <a href={this.state.lastGistUrl}>here</a>.
      </div>
    );
  }
});

React.render(
  <UserGist source="https://api.github.com/users/octocat/gists" />,
  document.body
);


//　　ES6

class UserGist extends Component{
  constructor(){
    super();
    this.state={
      username:'',
      lastGistUrl:''
    }
  }
  componentWillMount(){
    $.get(this.props.source, function(result) {
      var lastGist = result[0];
      //if (this.isMounted()) {
        this.setState({
          username: lastGist.owner.login,
          lastGistUrl: lastGist.html_url
        });
      //}
    }.bind(this));
  }
  render(){
    return(
      <div>
        {this.state.username} ..
        <a href={this.state.lastGistUrl} >here</a>
      </div>
    );
  }
}
class RepeatArray extends Component{
  constructor() {
    super();
  }
  render(){
    return (
      <div>
      <UserGist source="https://api.github.com/users/octocat/gists" />
      </div> /
    );
  }
}
export default RepeatArray;











