var React = require('react');


var ReplyModal = React.createClass({
getInitialState: function()
{
  return({replyToUser:'', replySubject:'',replyMessage:''});
}
,
appendPre: function(message)
{
  var iFrameNode = this.refs.myIframe,
  frameDoc = iFrameNode.contentWindow.document;
  frameDoc.write(message);
},
componentDidMount: function()
{
  $('#reply-subject').addClass("hidden");
  $('#send-button').addClass("hidden");
  $('#reply-to').addClass("hidden");
  $('#reply-message').addClass("hidden");

 var subject = this.props.messageSubject;
 var reply_subject = 'Re: '+subject.replace(/\"/g, '&quot;');

 var reply_to = this.props.replyTo;
 var msg_from_add = this.props.msgFromAddress
 reply_to = ( reply_to !== undefined ? this.props.replyTo : msg_from_add).replace(/\"/g, '&quot');
 this.setState({replyToUser: reply_to,replySubject: reply_subject});

 var encodedBody = this.props.messageBody;
 encodedBody = encodedBody.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
 encodedBody = decodeURIComponent(escape(window.atob(encodedBody)));
 this.appendPre(encodedBody);
},
closeModal: function(){
  this.props.handleHideModal();
},
replyBoxEnabled:function()
{
  $('#iframe-message').addClass("hidden");
  $('#reply-button').addClass("hidden");
  $('#reply-subject').removeClass("hidden");
  $('#send-button').removeClass("hidden");
  $('#reply-to').removeClass("hidden");
  $('#reply-message').removeClass("hidden");
},
sendMessage: function()
{
  var accessToken = localStorage.getItem('gToken');
  var email = '';
  var Headers = {'To': this.state.replyToUser,'Subject': this.state.replySubject,'In-Reply-To': this.props.msgId};
  for(var header in Headers)
  {
    email += header += ": "+Headers[header]+"\r\n";
  }
  email += "\r\n" + this.state.replyMessage;
  var encodedMessage =  window.btoa(email).replace(/\+/g, '-').replace(/\//g, '_');
  console.log(accessToken);
  $.ajax({
   url: 'https://www.googleapis.com/gmail/v1/users/dineshyadav742347%40gmail.com/messages/send?key={AIzaSyAC3eZzXSbIa7Wa2bc8qHY-1cA9rHWc0Xk}',
   dataType: 'json',
   contentType: "application/json",
   type: 'POST',
   data: JSON.stringify({'raw': encodedMessage}),
   beforeSend: function (request)
   {
     request.setRequestHeader("Authorization", "Bearer "+accessToken);
   },
   success: function(data)
   {
     console.log("Success");
   }.bind(this),
   async: false,
   error: function(xhr, status, err) {
     console.error("Error.."+err.toString());
   }.bind(this)
});
},
handleMessageState: function(e)
{
  this.setState({replyMessage:e.target.value});
},
render: function()
{
  return(

        <div className="modal fade" id="replyModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button className="close" onClick={this.closeModal} data-dismiss="modal">x</button>
                <h4 className="modal-title">{this.props.messageSubject}</h4>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <input type="text" className="form-control" value={this.state.replyToUser} id="reply-to" disabled />
                </div>

                <div className="form-group">
                  <input type="text" className="form-control disabled" value={this.state.replySubject} id="reply-subject" disabled />
                </div>

                <div className="form-group">
                  <textarea className="form-control" id="reply-message" onChange={this.handleMessageState} placeholder="Message" rows="10" required></textarea>
                </div>
                <iframe id="iframe-message" ref="myIframe" >
                </iframe>
              </div>
              <div className="modal-footer">
                <button className="btn btn-default" onClick={this.closeModal} type="button" data-dismiss="modal">
                  Close
                </button>
                <button className="btn btn-primary" id="reply-button" onClick={this.replyBoxEnabled}>Reply</button>
                <button type="submit" id="send-button" onClick={this.sendMessage} className="btn btn-primary" data-dismiss="modal">Send</button>
              </div>
            </div>
          </div>
        </div>
  );
}});

module.exports= ReplyModal;
