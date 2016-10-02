var ClickApp = React.createClass({
	getInitialState:function(){
		return {
			clickCount: 0,
		},
		handleClick: function(){
			this.setState({
				clickCount: this.state.clickCount + 1,
			})
		},
		render: function(){
			return (
				<div>
					<h2>点击下面按钮</h2>
					<button onClick={this.handleClick}>点击我</button>
					<p>你一共点击了：{this.state.clickCount}</p>
				</div>
			)
		}
	})

	var clickComponent = React.render(
		<ClickApp />
		document.getElementById('app')
	)



















