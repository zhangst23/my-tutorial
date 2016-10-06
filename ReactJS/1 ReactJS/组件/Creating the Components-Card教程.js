// Creating the Components-Card教程.js

//mostly-empty HTML page

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8"/>
	<title>More Components!</title>
  <script src="https://fb.me/react-15.1.0.js"></script>
  <script src="https://fb.me/react-dom-15.1.0.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.min.js"></script>
  <style>
  	#container {
  		padding: 50px;
  		background-color: #FFF;
  	}
  </style>
</head>
<body>
	<div id="container">
	  <div data-reactid=".0">
	    <div style="height:200px;
	                width:150px;
	                padding:0;
	                background-color:#FFF;
	                -webkit-filter:drop-shadow(0px 0px 5px #666);
	                filter:drop-shadow(0px 0px 5px #666);" 
	         data-reactid=".0.0">
	      <div style="height:150px;
	                  background-color:#FF6663;" 
	           data-reactid=".0.0.0"></div> /
	      <p style="font-family:sans-serif;
	                font-weight:bold;
	                padding:13px;
	                margin:0;" 
	         data-reactid=".0.0.1">#FF6663</p>
	    </div>
	  </div>
	</div>
	<script type="text/babel">
		ReactDOM.render(
			<div>

			</div>,
			document.querySelector("#container")
		);
	</script>
</body>
</html>


// Square
var Square = React.createClass({
	render: function(){
		return (

		);
	}
});

var Label = React.createClass({
	render: function(){
		return (

		);
	}
});

var Card = React.createClass({
	render: function(){
		return (
			<Square color={this.props.color}/>
			<Label color={this.props.color}/>
		);
	}
});


ReactDOM.render(
	<div>
		<Card color="#FFA737"/>
	</div>, /
	document.querySelector("#container")
);


//  Card.js
var Card = React.createClass({
	render: function(){
		var cardStyle = {
			height: 200,
			width: 150,
			padding: 0,
			backgroundColor: "#FFF",
			weikitFilter: "drop-shadow(0px 0px 5px #666)",
			filter: "drop-shadow(0px 0px 5px #666)"
		};
		return (
			<div style={cardStyle}>

			</div> /
		);
	}
});


// Square.js
var Square = React.createClass({
	render: function(){
		var squareStyle = {
			height: 150,
			// backgroundColor: "#FF6663"
			backgroundColor:this.props.color
		};
		return(
			<div style={squareStyle}>

			</div> /
		);
	}
});

// Label.js
var Label = React.createClass({
	render: function(){
		var labelStyle = {
			fontFamily:"sans-serif",
			fontWeight: "bold",
			padding: 13,
			margin: 0
		};

		return (
			// <p style={labelStyle}>#FF6663</p>
			<p style={labelStyle}>{this.props.color}</p> /
		);
	}
});


// 



// 














