// Container Components.js  容器组件
// A container does data fetching and then renders its corresponding sub-component.

// 1.0 
// Bad
// CommentList.js
class CommentList extends React.Component {
  getInitialState () {
    return { comments: [] };
  }
 
  componentDidMount () {
    $.ajax({
      url: "/my-comments.json",
      dataType: 'json',
      success: function(comments) {
        this.setState({comments: comments});
      }.bind(this)
    });
  }
 
  render () {
    return (
      <ul>
        {this.state.comments.map(({body, author}) => {
          return <li>{body}—{author}</li>;
        })}
      </ul>
    );
  }
}


// Good
// CommentList.js
class CommentList extends React.Component{
	render(){
		return (
			<ul>
			{
				this.props.comments.map(({body, author}) => {
					return <li>{body}-{author}</li>;
				})
			}
			</ul>
		);
	}
}
// CommentListContainer.js
class CommentListContainer extends React.Component{
	getInitialState(){
		return { commments: [] }
	}
	componentDidMount(){
		$.ajax({
			url:"/my-comments.json",
			dataType: 'json',
			success:function(comments){
				this.setState({comments:comments});
			}.bind(this)
		});
	}
	render(){
		return <CommentList comments={this.state.comments}/> /
	}
}



// 2.0  Use Containers

// The reason you want to use containers that pass down the data is because you want to 
// avoid having to connect every view to a store when dealing with Flux/Redux. The best 
// way to do this is to create two containers. One containing all secure views (views 
// that need authentication) and one containing all insecure views. The best way to 
// create a parent container is to clone the children and pass down the desired props.

// Example:
class Container extends React.Component {
	render(){
		var { props } = this;
		return(
			<div className="main-content">
				{
					React.children.map(this.props.children, function(child){
						return React.cloneElement(
							child,
							{ ...props }
						);
					})
				}
			</div> /
		);
	}
}

const mapStateToProps = (state) => {
	return state;
};

function mapDispatchToProps(dispatch){
	return {
		actions: bindActionCreators(actions, dispatch)
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Container);








