var _ = require('lodash');
var NewsHeader = require('./NewsHeader');
var NewsItem = require('./NewsItem');
var React = require('react');

var NewList = React.createClass({
	getMore: function(){
		return (
			<div className="newsList-more">
				<a href="http://news.ycombinator.com/news?p=2" className="newsList-moreLink">More</a>
			</div>
		);
	},

	render: function(){
		return (
			<div className="newsList">
				<NewsHeader/>
				<div className="newsList-items">
					{_(this.props.items).map(function(item, index){
						return <NewsItem key={item.id} item={item} rank={index + 1}/>;
					}.bind(this)).value()}
				</div>
				{this.getMore()}
			</div>
		);
	}
});

module.exports = NewsList;









