React为什么要用immutable.js.js

// 以下是父组件代码。。负责输入name 和 age 然后循环显示name 和 age
export default class extends Component {
	constructor(props){
		super(props)
		this.state={
			name:"",
			age:"",
			persons:[]
		}
	}
	render(){
		const {name,age,persons} = this.state
		return (
			<div>
				<span>姓名:</span><input value={name} name="name" onChange={this._handleChange.bind(this)}><input/>
				<span>年龄:</span><input value={age} name="age" onChange={this._handleChange.bind(this)}><input/>
				<input type="button" onClick={this._handleChange.bind(this)} value="确认"/><input/>
				{
					persons.map((person,index)=>(
						<Person key={index} name={person.name} age={person.age}></Person>
					)
				}
			</div>
		)
	}
	_handleChange(event){
		this.setState({[event.target.name]:event.target.value})
	}
	_handleClick(){
		const {name,age} = this.state
		this.setState({
			name:"",
			age:"",
			persons:this.state.persons.concat([{name:name,age:age}])
		})
	}
}

// 以下是子组建代码单纯的显示name和age而已
class Person extends Component {
	componentWillReceiveProps(newProps){
		console.log('我新的props的name是${newProps.name},age是${newProps.age}.我以前的props的name是${this.props.name},age是${this.props.age}是我要re-render了');

	}
	render(){
		const {name,age} = this.props;

			return (
				<div>
					<span>姓名：</span>
					<span>{name}</span>
					<span>age:</span>
					<span>{age}</span>
				</div> /
			)
	}
}



//要re-render这么多次。。父组件一re-render,子组件就跟着re-render啊。。那么多么浪费性能，
//方法一：好。。PureRenderMixin出场
import pureRender from "pure-render-decorator"

//方法二：es7的 Decorators语法

class PersonOrigin extends Component{
	render(){
		console.log("我re-render了");
		const {name, age} = this.props;

		return(
			<div>
	          <span>姓名:</span>
	          <span>{name}</span>
	          <span> age:</span>
	          <span>{age}</span>	
          	</div>		 /
		)
	}
}

const Person = pureRender(PersonOrigin)


















