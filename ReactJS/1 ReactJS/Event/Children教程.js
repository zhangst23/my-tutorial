// Children教程.js

//menu.js
let items = [
	'Home',
	'Search',
	'About',
	'Contact'
]

render: function(){
	let menuIems = items.map(function(item, index){
		return <MenuItem key={index} name={item} /> /
	})
}

//...
render: function(){
	let activeMenu = this.state.activeMenu
	let menuItems = items.map(function(item, index){
		if (activeMenu === index) {
			return <MenuItem key={index} name={item} isActive={true} />
		}else{
			return <MenuItem key={index} name={item} />
		}
	})
	//...
}


























