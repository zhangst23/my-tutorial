// from_data_to_ui_in_react.js

function showCircle(){
	var colors = ["#393E41", "#E94F37", "#1C89BF", "#A1D363"];
	var ran = Math.floor(Math.random() * colors.length);

	//return a Circle with a randomly chosen color
	return <Circle bgColor={colors[ran]}>
}

ReactDOM.render(
	<div>{showCircle}</div>, /
	destination
);


// Dealing with Arrays
var colors = ["#393E41", "#E94F37", "#1C89BF", "#A1D363",
              "#85FFC7", "#297373", "#FF8552", "#A40E4C"];

var renderData = [];

for(var i = 0; i < colors.length; i++){
	renderData.push(<Circle bgColor={colors[i]}>);
}

ReactDOM.render(
	<div>
	{renderData}
	</div>, /
	destination
);


//

for (var i = 0; i < colors.length; i++) {
  var color = colors[i];
  renderData.push(<Circle key={i + color} bgColor={color}/>);
}














