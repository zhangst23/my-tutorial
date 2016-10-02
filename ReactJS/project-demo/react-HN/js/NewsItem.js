var $ = require('jquery');
var moment = require('moment');
var React = require('react');
var url = require('url');

var NewsItem = React.createClass({
	getCommentLink: function(){
		var commentText = 'discuss';
		if (this.props.item.kids && this.props.item.kids.length) {
			commentText = this.props.item.kids.length + ' comments';
		}

		return (
			<a href={'https://news.ycombinator.com/item?id=' + this.props.item.id}>{commentText}</a>
		);
	},

	getDomain: function(){
		return url.parse(this.props.item.url).hostname;
	},

	getRank: function(){
		return (
			<div class="newsItem-rank">
				{this.props.rank}.
			</div>
		);
	},

	getSubtext: function(){
		return (
			<div class="newsItem-subtext">
				{this.props.item.score} points by <a href={'https://news.ycombinator.com/user?id=' + this.props.item.by}>{this.props.item.by}</a> {moment.utc(this.props.item.time * 1000).fromNow()} | {this.getCommentLink()}
			</div>
		);
	},

	getTitle: function(){
		return (
			<div className="newsItem-title">
				<a href="" className="newsItem-titleLink" href={this.props.item.url}>{this.props.item.title}</a>
				<span className="newsItem-domain">
					({this.getDomain()})
				</span>
			</div>
		);
	},

	getVote: function(){
		return (
			
		);
	},

	render: function(){
		return (
			<div className="newsItem">
				{this.getRank()}
				{this.getVote}
				<div className="newsItem-itemText">
					{this.getTitle()}
					{this.getSubtext()}
				</div>
			</div>
		);
	}
});



module.exports = NewsItem;