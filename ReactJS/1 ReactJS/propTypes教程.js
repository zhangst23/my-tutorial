// propTypes教程.js

const ListOfNumbers = props => (
	<ol className={props.className}>
		{
			props.numbers.map(number => (
				<li>{number}</li>
			))
		}
	</ol>
);

ListOfNumbers.propTypes = {
	className: ReactPropTypes.string.isRequired,
	numbers: React.PropTypes.arrayOf(React.PropTypes.number)
};


//This has several benefits:
// It can catch bugs early, by preventing silly mistakes
// If you use isRequired, then you don't need to check for undefined or null as often
// It acts as documentation, saving readers from having to search through a component to find all the props that it needs


// PropType

// If you still don't check your properties, you should start 2016 with fixing this. It can save hours for you, believe me.

MyComponent.propTypes = {
	isLoading: PropTypes.bool.isRequired,
	items: ImmutablePropTypes.listOf(
		ImmutablePropTypes.containes({
			name: PropTypes.string.isRequired,
		})
	).isRequired
}


#########

// A pitfall of shouldComponentUpdate
import shallowCompare from 'react-addons-shallow-compare';

class Item extends React.Component {
	shouldComponentUpdate(nextProps, nextState){
		return shallowCompare(this, nextProps, nextState);
	}
	render(){
		return (
			<div>
				<p>{this.props.name}</p>
				<button onClick={this.props.onClick}>click</button> /
			</div>
		);
	}
}

<Item name="foo" onClick={() => console.log('click')} />














