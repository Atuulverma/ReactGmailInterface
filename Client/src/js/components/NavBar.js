var React = require('react');

var NavBar = React.createClass({

render:function()
{
  return(
    <div className="container-fluid">
    	<div className="row">
    		<div className="col-md-12">
    			<nav className="navbar navbar-default navbar-inverse navbar-fixed-top" role="navigation">
    				<div className="navbar-header">

    					<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
    						 <span className="sr-only">Toggle navigation</span><span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span>
    					</button> <a className="navbar-brand" href="#">Gmail</a>
    				</div>

    				<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
    					<ul className="nav navbar-nav">
    						<li className="active">
    							<a href="#">Link</a>
    						</li>
    						<li>
    							<a href="#">Link</a>
    						</li>
    						<li className="dropdown">
    							 <a href="#" className="dropdown-toggle" data-toggle="dropdown">Dropdown<strong className="caret"></strong></a>
    							<ul className="dropdown-menu">
    								<li>
    									<a href="#">Action</a>
    								</li>
    								<li>
    									<a href="#">Another action</a>
    								</li>
    								<li>
    									<a href="#">Something else here</a>
    								</li>
    								<li className="divider">
    								</li>
    								<li>
    									<a href="#">Separated link</a>
    								</li>
    								<li className="divider">
    								</li>
    								<li>
    									<a href="#">One more separated link</a>
    								</li>
    							</ul>
    						</li>
    					</ul>
    					<form className="navbar-form navbar-left" role="search">
    						<div className="form-group">
    							<input type="text" className="form-control" />
    						</div>
    						<button type="submit" className="btn btn-default">
    							Submit
    						</button>
    					</form>
    					<ul className="nav navbar-nav navbar-right">
    						<li>
    							<a href="#">Link</a>
    						</li>
    						<li className="dropdown">
    							 <a href="#" className="dropdown-toggle" data-toggle="dropdown">Dropdown<strong className="caret"></strong></a>
    							<ul className="dropdown-menu">
    								<li>
    									<a href="#">Action</a>
    								</li>
    								<li>
    									<a href="#">Another action</a>
    								</li>
    								<li>
    									<a href="#">Something else here</a>
    								</li>
    								<li className="divider">
    								</li>
    								<li>
    									<a href="#">Separated link</a>
    								</li>
    							</ul>
    						</li>
    					</ul>
    				</div>
    			</nav>
    		</div>
    	</div>
    </div>
  );
}
});

module.exports=NavBar;
