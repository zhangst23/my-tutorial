import React from 'react'
import reqwest from 'reqwest'
import {Link} from 'react-router'
import Subheader from 'material-ui/Subheader'
import { List, ListItem, MakeSelectable } from 'material-ui/List'
import { Step, Stepper, StepLabel, StepContent, StepButton } from 'material-ui/Stepper'
const StepMenu = React.createClass({
	getInitialState:function(){
		return {
			stepIndex:0,
		}
	},
	componentDidMount:function(){
		this.props.getCategory();
	},
	componentDidUpdate:function(){
		var stepContent = document.querySelectorAll('.stepContent>div');
		for(var i=0;i<stepContent.length;i++){
			stepContent[i].style.height = 'auto';
		}
	},
	handleSetIndex:function(num){
		this.setState({
			stepIndex:num
		})
	},
	genarateStep:function(key,titles,num){
		return(
			<Step
				key = {num}
			>
				<StepButton
					onClick = {()=>{this.handleSetIndex(num)}}
				>
				{key}
				</StepButton>
				<StepContent
					className = 'stepContent'
				>
					<List>
					{
						titles.map(function(title){
							return <Link to = {'/article/'+title}>
								<ListItem key={title}>{title}</ListItem>
							</Link>
						})
					}
					</List>
				</StepContent>
			</Step>
		);
	},
	render:function(){
		var cont = [];
		var i = 0;
		var data = this.props.category;
		for(var i=0; i<data.length; i++){
			cont.push(this.genarateStep(data[i].category,data[i].titles,i));
		}
		return (
			<div>
				<Subheader>最近的文章</Subheader>
				<Stepper
					activeStep = {this.state.stepIndex}
					orientation = 'vertical'
					linear = {false}
				>
				{cont}
				</Stepper>
			</div>
		)
	}
})

export default StepMenu;







