import React from 'react';

export default React.createClass({
	render: function(){
		return <div class="winner">
			Winner is {this.props.winner}!
		</div>;
	}
});

