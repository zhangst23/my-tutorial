
var React = require('react');

module.exports = React.createClass({
    render:function(){
      return (
        <button id="add-question-btn" onClick={this.props.onToggleForm} className="btn btn-success"></button>
      )
    }
})
