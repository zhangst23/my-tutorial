var $ = require('jquery');
var React = require('react');

var NewsItem = React.createClass({

	getCommentLink: function(){
		var commentText = 'discuss';
		if (this.props.item.kids && this.props.item.kids.length) {
			commentText = this.props.item.kids.length + ' comments ';
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
			<div class="newsItem-title">
				<a href="{this.props.item.url}" class="newsItem-titleLink">{this.props.item.title}</a>
				<span class="newsItem-domain">({this.getDomain()})</span>
			</div>
		);
	},


	getVote: function(){
		return (
			<div class="newsItem-vote">
				<a href={'https://news.ycombinator.com/vote?for=' + this.props.item.id + '&dir=up&whence=news'}>
					<img src="../img/grayarrow2x.gif" width="10"/>
				</a>
			</div>
		);
	},



	render:function () {
		return (
			<div className="NewsItem">
				{this.getRank()}
				{this.getVote()}
				<div class="newsItem-itemText">
					{this.getTitle()}
					{this.getSubtext()}
				</div>
			</div>
		);
	}
});

module.exports = NewsItem;