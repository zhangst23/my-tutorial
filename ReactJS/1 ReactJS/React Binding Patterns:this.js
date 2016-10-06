// React Binding Patterns:this.js

// 1.Use React.createClass
onChange = {this.handleChange}

// 2.Bind in Render
onChange = {this.handleChange.bind(this)}

// 3.Use Arrow Function in Render
onChange = { e => this.handleChange(e)}

// 4.Bind in Constructor
constructor(props){
	super(props);
	this.handleChange = this.handleChange.bind(this);
}

// 5.Use Arrow Function in Class Property
handleChange = () => {
  // call this function from render 
  // and this.whatever in here works fine.
}








