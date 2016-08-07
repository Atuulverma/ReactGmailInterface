var React = require('react');
var NavBar = require('./NavBar');
var LeftSideBar = require('./LeftSideBar');
var RightSideBar = require('./RightSideBar');

var GmailBox = React.createClass({
  getInitialState: function()
  {
    return({allLabelsData:[], MessageDetail:[], allMessagesDetails:[], labelNameData:''});
  },
  gmailLogin: function()
  {
    var acToken, tokenType, expiresIn;
    var OAUTHURL    =   'https://accounts.google.com/o/oauth2/v2/auth?';
    var SCOPE       =   'https://mail.google.com/ https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/gmail.readonly';
    var CLIENTID    =   '918598521886-pqbj1j2nnfpl0h8in85elj8h43locrpa.apps.googleusercontent.com';
    var REDIRECT    =   'http://localhost:8080';
    var TYPE        =   'token';
    var _url        =   OAUTHURL + 'scope=' + SCOPE + '&client_id=' + CLIENTID + '&redirect_uri=' + REDIRECT + '&response_type=' + TYPE;
    var win         =   window.open(_url, "windowname1", 'width=800, height=600');

    var pollTimer   =   window.setInterval(function()
    {
        try
        {
            if (win.document.URL.indexOf(REDIRECT) != -1)
            {
                window.clearInterval(pollTimer);
                var url =   win.document.URL;
                acToken =   gup(url, 'access_token');
                tokenType = gup(url, 'token_type');
                expiresIn = gup(url, 'expires_in');
                localStorage.setItem('gToken',acToken);
                localStorage.setItem('gTokenType',tokenType);
                localStorage.setItem('gExprireIn',expiresIn);
                //console.log("gToken.."+localStorage.getItem('gToken'));
                //console.log("gTokenType.."+localStorage.getItem('gTokenType'));
                //console.log("gExprireIn.."+localStorage.getItem('gExprireIn'));
                function gup(url, name) {
                    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
                    var regexS = "[\\#&]"+name+"=([^&#]*)";
                    var regex = new RegExp( regexS );
                    var results = regex.exec( url );
                    if( results == null )
                        return "";
                    else
                        return results[1];
                }
                win.close();
            }
        }
        catch(e)
        {
          console.log(e);
        }
    }, 500);
  },
  getUserInfo: function()
  {
    var accessToken = localStorage.getItem('gToken');

    console.log(accessToken);
      $.ajax({
          url: 'https://www.googleapis.com/oauth2/v1/userinfo?key={AIzaSyAC3eZzXSbIa7Wa2bc8qHY-1cA9rHWc0Xk}',
          dataType: 'json',
          type: 'GET',
          beforeSend: function (request)
          {
            request.setRequestHeader("Authorization", "Bearer "+accessToken);
          },
          success: function(resp)
          {
              user    =   resp;
              console.log(user);
          }
      });
  },
  allLabels: function()
  {
      var accessToken = localStorage.getItem('gToken');
      $.ajax({
       url: 'https://www.googleapis.com/gmail/v1/users/dineshyadav742347%40gmail.com/labels?key={AIzaSyAC3eZzXSbIa7Wa2bc8qHY-1cA9rHWc0Xk}',
       dataType: 'json',
       type: 'GET',
       beforeSend: function (request)
       {
         request.setRequestHeader("Authorization", "Bearer "+accessToken);
       },
       success: function(data)
       {
         this.setState({allLabelsData:data.labels});
       }.bind(this),
       error: function(xhr, status, err) {
         console.error(err.toString());
       }.bind(this)
    });
   this.getDataWithLabelId({labelId:'INBOX', labelName:'INBOX'});
  },
  getDataWithLabelId: function(labelData)
  {
    var accessToken = localStorage.getItem('gToken');
    $.ajax({
     url: 'https://www.googleapis.com/gmail/v1/users/dineshyadav742347%40gmail.com/messages?labelIds='+labelData.labelId+'&maxResults=10&key={AIzaSyAC3eZzXSbIa7Wa2bc8qHY-1cA9rHWc0Xk}',
     dataType: 'json',
     type: 'GET',
     beforeSend: function (request)
     {
       request.setRequestHeader("Authorization", "Bearer "+accessToken);
     },
     success: function(data)
     {
       var finaldata = data.messages
       for(var key in finaldata)
       {
        var id = finaldata[key].id;
        this.getParticularMessage(id);
       }
       this.setState({allMessagesDetails:this.state.MessageDetail, labelNameData:labelData.labelName});
       this.state.MessageDetail=[];
     }.bind(this),
     async: false,
     error: function(xhr, status, err) {
       console.error(err.toString());
     }.bind(this)
  });

  },
  getParticularMessage: function(messageId)
  {
    var accessToken = localStorage.getItem('gToken');
    $.ajax({
     url: 'https://www.googleapis.com/gmail/v1/users/dineshyadav742347%40gmail.com/messages/'+messageId+'?key={AIzaSyAC3eZzXSbIa7Wa2bc8qHY-1cA9rHWc0Xk}',
     dataType: 'json',
     type: 'GET',
     beforeSend: function (request)
     {
       request.setRequestHeader("Authorization", "Bearer "+accessToken);
     },
     success: function(data)
     {
       this.state.MessageDetail.push(data);
     }.bind(this),
     async: false,
     error: function(xhr, status, err) {
       console.error(err.toString());
     }.bind(this)
  });
  },
  render:function()
  {
      return(
      <div className="GmailBox">
            <NavBar />
            <br/><br/><br/><br/>
            <div className="container-fluid">
          	<div className="row">
            <LeftSideBar submitLablelId={this.getDataWithLabelId} allLabelsData={this.state.allLabelsData}/>
            <button id="authorize-button" onClick={this.gmailLogin} className="btn btn-primary pull-right">Login</button>
            <button id="authorize-button" onClick={this.allLabels} className="btn btn-primary pull-right">Get Emails</button>
            <RightSideBar labelNameData={this.state.labelNameData} allMessagesData={this.state.allMessagesDetails}/>
          	</div>
          </div>
      </div>
      );
  }
  });

module.exports = GmailBox;
