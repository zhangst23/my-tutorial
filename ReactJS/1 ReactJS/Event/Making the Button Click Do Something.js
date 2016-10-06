// Making the Button Click Do Something.js
var CounterParent = React.createClass({
	getInitialState: function(){
		return {
			count: 0
		};
	},
	increase: function(e){
		this.setState({
			count: this.state.count + 1
		});
	},
	render: function(){
     var backgroundStyle = {
        padding: 50,
        backgroundColor: "#FFC53A",
        width: 250,
        height: 100,
        borderRadius: 10,
        textAlign: "center"
      };
 
      var buttonStyle = {
        fontSize: "1em",
        width: 30,
        height: 30,
        fontFamily: "sans-serif",
        color: "#333",
        fontWeight: "bold",
        lineHeight: "3px"
      };
		return (
			<div>
				<Counter style={backgroundStyle} /> /
				<button onClick={this.increase} style={buttonStyle}>+</button> 
			</div>
		);
	}
});


// Doing Stuff With Event Properties
increase: function(e){
	var currentCount = this.state.count;

	if (e.shiftKey) {
		currentCount += 10;
	} else {
		currentCount += 1;
	} 

	this.setState({
		count: currentCount
	});
},


// You Can't Directly Listen to Events on Components  你不能直接监听组件的事件
var CounterParent = React.createClass({
	getInitialState: function(){
		return {
			count: 0
		};
	},
	increase: function(){
		this.setState({
			count: this.state.count + 1
		});
	},
	render: function(){
		return (
			<div>
				<Counter display={this.state.count}/> /
				// <PlusButton onClick={this.increase}/>  这个是错误的
				<PlusButton clickHandler={this.increase}/>

			</div>
		);
	}
});



var PlusButton = React.createClass({
	render: function(){
		return (
			// <button> + </button> 这个是错误的
			<button onClick={this.props.clickHandler}>
				+
			</button>

		);
	}
});



















