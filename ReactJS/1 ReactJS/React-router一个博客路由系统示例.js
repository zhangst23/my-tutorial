// 一个简单的示例

// 现在，我们通过一个简易的博客系统示例来解释刚刚遇到的疑问，它包含了查看文章归档、文章详细、登录、退出以及权限校验几个功能，


import React from 'react';
import { render, findDOMNode } from 'react-dom';
import { Router, Route, Link, IndexRoute, Redirect } from 'react-router';
import { createHistory, createHashHistory, useBasename } from 'history';

//此处用于添加根路径
const history = useBasename(createHashHistory)({
	queryKey: '_key',
	basename: '/blog-app',
});

React.render((
	<Router history={history}>
		<Route path="/" component={BlogApp}>
			<IndexRoute component={SignIn}/>
			<Route path="signIn" component={SignIn}/>
			<Route path="signOut" component={SignOut}/>
			<Redirect from="/archives" to="/archives/posts"/>
			<Route onEnter={requireAuth} path="archives" component={Archives}>
				<Route path="posts" components={{
					original: Original,
					reproduce: Reproduce,
				}}/>
			</Route> /
			<Route path="article/:id" component={Article}/>
			<Route path="about" component={About}/>
		</Router>
	</Router>
), document.getElementById('example'));


//一个博客路由系统全部代码

var React = window.React;
var ReactRouter = window.ReactRouter;
var History = window.History;

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var Redirect = ReactRouter.Redirect;
var IndexRoute = ReactRouter.IndexRoute;
var createHistory = History.createHistory;
var useBasename = History.useBasename;

var BlogApp = React.createClass({
  render: function() {
    var pathname = this.props.location.pathname;
    return (
      <div className="blog-app">
        <ul>
          <li><Link activeClassName="active" to="/archives">Archives</Link></li>
          <li><Link activeClassName="active" to="/about">About</Link></li>
          <li><Link activeClassName="active" to="/signIn">Sign in</Link></li>
          <li><Link activeClassName="active" to="/signOut">Sign out</Link></li>
        </ul>
        {React.cloneElement(this.props.children || <div/>, { key: pathname })}
      </div>
    )
  }
})

var About = React.createClass({
  render: function() {
    return (
      <div className="about">
        <h1>About author</h1>
      </div>
    )
  }
})

var Archives = React.createClass({
  render: function() {
    return (
      <div>
        原创：<br/>
        {this.props.original}
        转载：<br/>
        {this.props.reproduce}
      </div>
    )
  }
});

var Original = React.createClass({
  render: function() {
    return (
      <div className="archives">
        <ul>
          {window.blogData.slice(0, 4).map(function(item, index) {
            return <li key={index}>
              <Link
                to={`/article/${index}`}
                query={{type: 'Original'}}
                state={{title: item.title}}
              >
                {item.title}
              </Link>
            </li>
          })}
        </ul>
      </div>
    )
  }
});

var Reproduce = React.createClass({
  render: function() {
    return (
      <div className="archives">
        <ul>
          {window.blogData.slice(4, 8).map(function(item, index) {
            return <li key={index}>
              <Link
                to={`/article/${index}`}
                query={{type: 'Reproduce'}}
                state={{title: item.title}}
                hash='#hash'
              >
                {item.title}
              </Link>
            </li>
          })}
        </ul>
      </div>
    )
  }
});

var Article = React.createClass({
  render: function() {
    var id = this.props.params.id
    var location = this.props.location
    return (
      <div className="article">
        <h2>{location.state.title}</h2>
        <br/><br/>
        这是文档归档 {location.query.type} 类目下的第 {++id} 篇文章，欢迎你的访问！
      </div>
    )
  }
});

var SignIn = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var email = React.findDOMNode(this.refs.name).value
    var pass = React.findDOMNode(this.refs.pass).value
    if (pass !== 'password') {
      return;
    }
    localStorage.setItem('login', 'true')

    var location = this.props.location;

    if (location.state && location.state.nextPathname) {
      this.props.history.replaceState(null, location.state.nextPathname)
    } else {
      this.props.history.replaceState(null, '/about')
    }
  },

  render: function() {
    if (hasLogin()) {
      return <p>你已经登录系统！<Link to="/signOut">点此退出</Link></p>
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <label><input ref="name" /></label><br/>
        <label><input ref="pass" /></label> (password)<br />
        <button type="submit">登录</button>
      </form>
    )
  }
})
var SignOut = React.createClass({
  componentDidMount: function() {
    localStorage.setItem('login', 'false')
  },

  render: function() {
    return <p>已经退出！</p>
  }
})

function hasLogin() {
  return localStorage.getItem('login') === 'true';
}

function requireAuth(nextState, replaceState) {
  if (!hasLogin()) {
    replaceState({ nextPathname: nextState.location.pathname }, '/signIn')
  }
}

React.render((
  <Router>
    <Route path="/" component={BlogApp}>
      <IndexRoute component={SignIn}/>
      <Route path="signIn" component={SignIn}/>
      <Route path="signOut" component={SignOut}/>
      <Redirect from="/archives" to="/archives/posts"/>
      <Route onEnter={requireAuth} path="/archives" component={Archives}>
        <Route path="posts" components={{
          original: Original,
          reproduce: Reproduce,
        }}/>
      </Route>
      <Route path="article/:id" component={Article} />
      <Route path="about" component={About} />
    </Route>
  </Router>
), document.getElementById('example'))







