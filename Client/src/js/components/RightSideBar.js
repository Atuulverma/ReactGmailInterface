var React = require('react');
var Emails = require('./Emails');

var RightSideBar = React.createClass({
  getHTMLPart: function(arr)
  {
    for(var x = 0; x <= arr.length; x++)
    {
      if(typeof arr[x].parts === 'undefined')
      {
        if(arr[x].mimeType === 'text/html')
        {
          return arr[x].body.data;
        }
      }
      else
      {
        return this.getHTMLPart(arr[x].parts);
      }
    }
    return '';
  },
render: function()
{
    var allMessagesRow = this.props.allMessagesData.map(function(msg){
    var msgSubject;
    var msgFrom;
    var msgDate;
    var encodedBody = '';
    var msgFromAddress;
    var replyTo;
    var messageId;
    if(typeof msg.payload.parts === 'undefined')
    {
      encodedBody = msg.payload.body.data;
    }
    else
    {
      encodedBody = this.getHTMLPart(msg.payload.parts);
    }
    for (var headerIndex = 0; headerIndex < msg.payload.headers.length; headerIndex++)
    {
          if (msg.payload.headers[headerIndex].name == 'Subject') {
              msgSubject = msg.payload.headers[headerIndex].value;
          }
          if (msg.payload.headers[headerIndex].name == 'From') {
              msgFrom = msg.payload.headers[headerIndex].value;
              var fields = msgFrom.split(/</);
              msgFrom = fields[0];
          }
          if (msg.payload.headers[headerIndex].name == 'Date') {
              msgDate = msg.payload.headers[headerIndex].value;
          }
          if (msg.payload.headers[headerIndex].name == 'Reply-to') {
              replyTo = msg.payload.headers[headerIndex].value;
          }
          if (msg.payload.headers[headerIndex].name == 'From') {
              msgFromAddress = msg.payload.headers[headerIndex].value;
          }
          if (msg.payload.headers[headerIndex].name == 'Message-ID') {
              messageId = msg.payload.headers[headerIndex].value;
          }

      }
      return(
        <Emails messageId={messageId} replyTo={replyTo} msgFromAddress={msgFromAddress} messageBody={encodedBody} allMsgsData={msg} messageSubject={msgSubject} messageFrom={msgFrom} messageDate={msgDate}  key={msg.id}></Emails>
      );

  }.bind(this));
  return(
    <div className="RightSideBar">
    {allMessagesRow}
    </div>
      );
}
});
module.exports = RightSideBar
