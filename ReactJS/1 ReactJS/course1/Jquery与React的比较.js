Jquery与React的比较.js


// 1.0  Handle Change Event
// jquery
$("textarea").on("input", function(){

})
// ReactJS
React.createClass({
	handleChange: function(event){

	},
	render: function(){
		...
	}
})


// 2.0  Implementing State
//Event Handler
$(...).on(..., function(){

})
// jquery
$("button").prop(...)
// React.js
this.setState({...})

// 3.0 
var TweetBox = React.createClass({
	getInitialState: function(){
		return {
			text: ""
		};
	},
	handleChange:...
	render:...
});


// 4.0 字数倒计统计
// jquery
<textarea ...></textarea><br />
<span>140</span>
<button ...>Tweet</button>

// JS
$("textarea").on("input", function(){
	$("span").text(140 - $(this).val().length);
	...
})
// ReactJS
<span>{140 - this.state.length}</span> /


// 5.0  add photo button
// JQuery
$(".js-add-photo-button").on("click", function(){
	if ($(this).hasClass("is-on")) {
		$(this)
			.removeClass("is-on")
			.text("Add Photo");
		$("span").text(140 - $("textarea").val().length);
		if ($("textarea").val().length === 0) {
			$(".js-tweet-button").prop("disabled", true);
		}
	} else {
		$(this)
			.addClass("is-on")
			.text("Photo Added");
		$("span").text(140 - 23 - $("textarea").val().length);
		$(".js-tweet-button").prop("disabled", false);
	}
});

// ReactJS
var TweetBox = React.createClass({
	getInitialState: function(){
		return {
			text: "",
			photoAdded: false
		};
	},
	handleChange: function(event){
		this.setState({ text: event.target.value });
	},
	togglePhoto: function(event){
		this.setState({ photoAdded: !this.state.photoAdded });
	},
	remainingCharacters: function(){
		if (this.state.photoAdded) {
			return 140 - 23 - this.state.text.length;
		} else {
			return 140 - this.state.text.length;
		}
	},
	render: function(){
		return (
			<div className="well clearfix">
				<textarea className="form-control"
						  onChange={this.handleChange}></textarea>
				<span>{ this.remainingCharacters() }</span>
				<button className="btn btn-primary pull-right"
					disabled={this.state.text.length === 0 && !this.state.photoAdded}>Tweet</button>
				<button className="btn btn-default pull-right"
					onClick={this.togglePhoto}>
					{this.state.photoAdded ? "Photo Added" : "Add Photo"}
				</button>
			</div> /
		)
	}
})


// 6.0  多出字符要高亮

var TweetBox = React.createClass({
	getInitialState: function(){
		return {
			text: "",
			photoAdded: false
		};
	},
	handleChange: function(event){
		this.setState({ text: event.target.value });
	},
	togglePhoto: function(event){
		this.setState({ photoAdded: !this.state.photoAdded });
	},
	overflowAlert: function(){
		if (this.remainingCharacters() < 0) {
			if (this.state.photoAdded) {
				var beforeOverflowText = this.state.text.substring(140 - 23 - 10, 140 - 23);
				var overflowText = this.state.text.substring(140 - 23);
			} else {
				var beforeOverflowText = this.state.text.substring(140 - 10, 140);
				var overflowText = this.state.text.substring(140);
			}

			return (
				<div className="alert alert-warning">
					<strong>Oops! Too Long:</strong>
					<strong className="bg-danger">{overflowText}</strong>
				</div>
			);
		} else {
			return "";
		}
	},
	remainingCharacters: function(){
		if (this.state.photoAdded) {
			return 140 - 23 - this.state.text.length;
		} else {
			return 140 - this.state.text.length;
		}
	},
	render: function(){
		return (
			<div className="well clearfix">
				{ this.overflowAlert() }
				<textarea className="form-control"
						  onChange={this.handleChange}></textarea>
				<span>{ this.remainingCharacters() }</span>
				<button className="btn btn-primary pull-right"
					disabled={this.state.text.length === 0 && !this.state.photoAdded}>Tweet</button>
				<button className="btn btn-default pull-right"
					onClick={this.togglePhoto}>
					{this.state.photoAdded ? "Photo Added" : "Add Photo"}
				</button>
			</div> /
		);
	}
});


ReactDOM.render(
	<Tweetbox />,
	document.getElementById("container")
);

























