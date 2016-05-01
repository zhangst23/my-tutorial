var apples = 5, pears = 10;

var piecesOfFruit = apples + pears;

var piecesForEachPerson = piecesOfFruit / 3;

var pageHeader = document.getElementById('page-header');

getElementsByTagName
getElementsByClassName

var pageHeader = document.querySelector('#header');
var buttons = document.querySelectorAll(.btn);

2. Events and Callbacks
var handleClick = function (events){
	// do something
}
var button = document.querySelector('#big-button');
button.addEventListener('click', handleClick);


3. Ajax
var req = new XMLHttpRequest();
req.onload = function(event){...};
req.open('get', 'some-file.txt', true);
req.send();


4. Scope

// python
var a = 10;

if(a > 5){
	var b = 5;
}
var c = a + b;  // wouldn't work!


4.1. Function scope

var doSomething = function(){
	var a = 10;
};

doSomething();
console.log(a);  // a is undefined


// js
var a = 10;

if(a > 5){
	var b = 5;
}
var c = a + b;   // c is 15

4.2  Child scopes

var doSomething = function(){
	var a = 10;
	var doSomethingElse = function(){
		console.log(a);  // a is 10
	};
	doSomethingElse();
};

doSomething();


5 jQuery

$('.btn').click(function(){
	// do something
})

5.1 jQuery.Ajax

$.ajax({
	url: '/data.json',
	method: 'GET',
	success: function(data){
		console.log(data);
	}
})


$.get('/data.json', function (data){
	console.log(data);
})

$.get('/data.json', function(data){
	console.log(data);
}).fail(function(){
	// uh oh, something went wrong
})

$.post('/save', { username: 'tom' }, function(data){
	console.log(data);
}).fail(function(){
	//
})

$.ajax({
	url: '/save',
	method: 'POST',
	data: { username: 'tom' },
	success: function(data){
		console.log(data);
	},
	error: function(){
		//
	}
})
















