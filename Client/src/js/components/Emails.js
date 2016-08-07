var React = require('react');
var ReplyModal = require('./ReplyModal');

var Emails = React.createClass({
  getInitialState()
  {
    return {showModal: false};
  },
  handleHideModal()
  {
    this.setState({showModal: false});
  },
  handleShowModal()
  {
    this.setState({showModal: true});
  },
  render: function()
  {
    return(
      <div className="Emails">
      <div className="col-md-9">
        <table className="table">
          <tbody>
            <tr className="row">
            <td className="col-md-3">{this.props.messageFrom}</td>
            <td className="col-md-6"><a href="#replyModal" onMouseDown={this.handleShowModal}  data-toggle="modal">{this.props.messageSubject}</a></td>
            <td className="col-md-3">{this.props.messageDate}</td>
            </tr>
          </tbody>
        </table>
      </div>
        {this.state.showModal ? <ReplyModal msgId={this.props.messageId} msgFromAddress={this.props.msgFromAddress} replyTo={this.props.replyTo} handleHideModal={this.handleHideModal} messageSubject={this.props.messageSubject} messageBody={this.props.messageBody}/> : null}
      </div>

    );
  }
});
module.exports= Emails;
