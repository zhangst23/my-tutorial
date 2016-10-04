import React from 'react';
import Header from './Header'

// 1. State
export default class Layout extends React.Component {
	constructor(){
		super();
		this.state = {name:"Bob"}
	},
	render(){
		setTimeout(() => {
			This.setState({name: "Will"});
		}, 1000)
		return (
			<div>
				{this.state.name}
			</div> /
		);
	}
}




// 2. Props

export default class Layout extends React.Componnet {
	constructor(){
		super();
		this.state = {title : "Welcome",}
	},

	render(){
		setTimeout(() => {
			This.setState({title: "Welcome Bob."});
		}, 2000)

		return (
			<div>
				<Header title={this.state.title}/>
				<Header title={"other title"}/>
			</div> /
		)
	}
}



// 3. Event


export default class Layout extends React.Componnet {
	constructor(){
		super();
		this.state = {title : "Welcome",}
	},

	changeTitle(){
		this.setState({title});
	}

	render(){

		return (
			<div>
				<Header changeTitle={this.changeTitle.bind(this)} title={this.state.title} />
			</div> 
		)
	}
}

// Header.js
import React from "react";
import Title from "./Header/Title";
export default class Header extends React Component {
	handleChange(e){
		const title = e.target.value;
		this.props.changeTitle(title);
	}

	render(){
		return (
			<div>
				<Title title={this.props.title} /> /
				<input value={this.props.title} onChange={this.handleChange.bind(this)} /> 
			</div> 
		); 
	}
}
































