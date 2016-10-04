//1.0  Passing a list to a Child Component教程.js
// Parent Component
var FriendsContainer = React.createClass({
	getInitialState: function(){
		return {
			name: 'Tyler McGinnis',
			friends: ['zhang','xiao','dong']
		}
	},
	render: function(){
		<div> 
			<h3>Name: {this.state.name}</h3> /
			<ShowList names={this.state.friends} />
		</div>
	}
});

// Child Component
var ShowList = React.createClass({
	render: function(){
		var listItems = this.props.names.map(function(friend){
			return <li>{friend}</li> /
		});
		return (
			<div>
				<h3>Friends</h3> /
				<ul>{listItems}</ul>
			</div> 
		)
	}
});



//2.0 Passing a List to a Child Component with a Setter Method
var FriendsContainer = React.createClass({
	getInitialState: function(){

	},
	addFriend: function(friend){

	},
	render: function(){
		return (

		)
	}
});

var AddFriend = React.createClass({
	getInitialState: function(){

	},
	updateNewFriend: function(e){

	},
	handleAddNew: function(){

	},
	render: function(){
		return (

		)
	}
});

var ShowList = React.createClass({
	render: function(){

	}
});























