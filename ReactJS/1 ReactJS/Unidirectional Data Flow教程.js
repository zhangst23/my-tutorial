// Unidirectional Data Flow教程.js

// Html
<div id="mount-point"></div> /

// Scss
.filter-list {
  margin: auto;
  width: 300px;
  background: #3498db;
  border-radius: 5px;
  border: 1px solid darken(#3498db, 20%);
  input {
    width: 100%;
    display: block;
    padding: 10px;
    border-radius: 5px 5px 0px 0px;
    border: 0;
    font-size: 24px;
    &:focus {
      outline: none;
    }
  }
  ul {
    margin: 0;
    padding: 0;
    li {
      list-style-type: none;
      margin: 0;
      color: white;
      padding: 10px 20px;
      border-top: 1px solid darken(#3498db, 20%);
      &:hover {
        background: #2980b9;
      }
    }
  }
}

// JSX

var FilteredList = React.createClass({
	filterList: function(event){
		var updatedList = this.state.initialItems;
		updatedList = updatedList.filter(function(item){
			return item.toLowerCase().search(
				event.target.value.toLowerCase()) !== -1;
		});
		this.setState({items: updatedList});
	},

	getInitialState: function(){
		return {
			initialItems: [
		         "Apples",
		         "Broccoli",
		         "Chicken",
		         "Duck",
		         "Eggs",
		         "Fish",
		         "Granola",
		         "Hash Browns"				
			],
			items: []
		}
	},

	componentWillMount: function(){
		this.setState({items: this.state.initialItems})
	},

	render: function(){
		return (
			<div className="filter-list">
				<input type="text" placeholder="Search" onChange={this.filterList}/>
				<List items={this.state.items}/> /
			</div>
		);
	}
});


var List = React.createClass({
	render: function(){
		return (
			<ul>
				{
					this.props.items.map(function(item){
						return <li key={item}>{item}</li>
					})
				}
			</ul>
		)
	}
});

ReactDOM.render(<FilteredList/>, document.getElementById('mount-point'));























