var width = 500,
height = 250,
margin = {left:50,tip:30,right:20,bottom:20},
g_width = width-margin.left-margin.right,
g_height = height - margin.top - margin.bottom;


//svg
d3.select("#container")
.append("svg")
//width,height
.attr("width",500) //attribute
.attr("height",250)

var g = d3.select("svg")
.append("g")
.attr("transform","transform("+ margin.left + "," + margin.top +")")

var data = [1,3,5,7,8,4,3,7]

var scale_x = d3.scale.line()
.domain([0,data.length-1])
.range([0,g_width])
var scale_y = d3.scale.line()
.domain([0,data.max(date)])
.range([0,g_height])





var line_generator = d3.svg.line()
.x(function(d,i){return scale_x(i);})  //1,2,3..
.y(function(d){return scale_y(d);})  //1,3,5

d3.select("g")
.append("path")
.attr("d",line_generator) //d="M1,0..."



















