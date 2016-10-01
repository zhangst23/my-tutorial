var _ = require('loadsh');
var $ = require('jquery');
var React = require('react');

var NewsHeader = React.createClass({
	getLogin: function(){
		return (
			<div className="newsHeader-login">
				<a href="https://news.ycombinator.com/login?whence=news" className="NewsHeader-textLink">login</a>
			</div>
		);
	},

	getLogo: function(){
		return (
			<div className="newsHeader-Logo">
				<a href="https://www.ycombinator.com"><img src="../img/y18.gif"></a>
			</div>
		);
	},



	getNav: function(){
		var navLinks = [
			{
				name: 'new',
				url: 'newest'
			},
			{
				name: 'comments',
				url: 'newcomments'
			},
			{
				name: 'show',
				url: 'show'
			},
			{
				name: 'ask',
				url: 'ask'
			},
			{
				name: 'jobs',
				url: 'jobs'
			},
			{
				name: 'submit',
				url: 'submit'
			}
		];

		return (
			<div className="newsHeader-nav">
				{_(nanLinks).map(function(navLink){
					return (
						<a key={navLink.url} className="newsHeader-navLink newsHeader-textLink" href={'https://news.ycombinator.com/' + navLink.url}>
							{navLink.name}
						</a>
					);
				}).value()}
			</div>
		);
	},


	getTitle: function(){
		return (
			<div className="newsHeader-title">
				<a href="https://news.ycombinator.com" className="newsHeader-textLink">Hacker News</a>
			</div>
		)
	}


	render: function(){
		return (
			<div className="newsHeader">
				{this.getLogo()}
				{this.getTitle()}
				{this.getNav()}
				{this.getLogin()}
			</div>
		);
	}
});


module.exports = NewsHeader;