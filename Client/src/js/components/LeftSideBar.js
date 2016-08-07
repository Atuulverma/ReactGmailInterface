var React = require('react');
var LeftSideBarLabels = require('./LeftSideBarLabels');
var ComposeModal = require('./ComposeModal');
var LeftSideBar = React.createClass({
  getInitialState: function()
  {
    return({clickedLabel:''});
  },
  submitLablelId:function(data)
  {
    this.setState({clickedLabel:data.labelName});
    this.props.submitLablelId({labelId:data.labelId, labelName:data.labelName});
  },

render:function(){
  return(
    <div className="LeftSideBar">
    <div className="col-md-3">
      <div className="list-group">
         <a href="#" className="list-group-item active">{this.state.clickedLabel!=''? this.state.clickedLabel :'INBOX'}</a>
        <div className="list-group-item">
          <a  href="#myModal" data-toggle="modal" className="btn btn-danger btn-default btn-block">
            Compose
          </a>
        </div>
        <ComposeModal/>
        <LeftSideBarLabels submitLablelId={this.submitLablelId} allLabelsData={this.props.allLabelsData}/>
        <a className="list-group-item active"><span className="badge"></span></a>
      </div>
    </div>
    </div>

  );
}

});

module.exports = LeftSideBar;
