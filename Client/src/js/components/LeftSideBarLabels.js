var React = require('react');
var SystemLabels = require('./SystemLabels');
var UserLabels = require('./UserLabels');
var LeftSideBarLabels = React.createClass({
  submitLablelId:function(data)
  {
    this.props.submitLablelId({labelId:data.labelId,labelName:data.labelName});
  },
  render:function(){
    var allSystemLabels = this.props.allLabelsData.map(function(allSystemLabels){
      if(allSystemLabels.type==='system')
      {
        return(
          <SystemLabels submitLablelId={this.submitLablelId} allLabelsData={allSystemLabels} key={allSystemLabels.id}></SystemLabels>
        );
      }
    }.bind(this));
    var allUserLabels = this.props.allLabelsData.map(function(allSystemLabels){
      if(allSystemLabels.type==='user')
      {
        return(
          <UserLabels submitLablelId={this.submitLablelId} allLabelsData={allSystemLabels} key={allSystemLabels.id}></UserLabels>
        );
      }
    }.bind(this));
    return(
      <div className="LeftSideBarLabels">
          <div className="list-group-item">
          <span className="list-group-item-text">
          {allSystemLabels}
          </span>
          </div>
          <div className="list-group-item">
            <span className="badge"></span>
            <span className="list-group-item-text">
             {allUserLabels}
            </span>
          </div>
      </div>
    );
  }
});

module.exports=LeftSideBarLabels;
