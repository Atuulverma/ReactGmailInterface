var React = require('react');
var SystemLabels = React.createClass({
  handleLableId:function(e)
  {
    this.props.submitLablelId({labelId:this.props.allLabelsData.id, labelName:this.props.allLabelsData.name});
  },
  render: function()
  {
    return(
      <div className="SystemLabels">
          <p><a href="#" onClick={this.handleLableId}>{this.props.allLabelsData.name}</a></p>
      </div>
    );
  }
});
module.exports = SystemLabels;
