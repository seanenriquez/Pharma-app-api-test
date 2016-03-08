<?php

//$base_api_url = "https://eda22bb1.ngrok.io/templates/dev/api";
$base_api_url = "http://localhost/templates/dev/api";
$base_api_key = "1234567890QWERTYzxcvb";


?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Pharmacy-App API Test and Documentation Platform</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="">
		<meta name="author" content="">

		<!-- Le styles -->
		<link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
		<link href="bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet">
		<link href="debug.css" rel="stylesheet">

	</head>

	<body>

		<div class="hidden">

			<div class="httpfile">
				<a class="close">&times;</a>
				<div class="row show-grid">
					<div class="span2">
						<div class="control-group">
							<div class="controls">
								<input type="text" class="input-medium fakeinputname" value="">
							</div>
						</div>
						
						<!-- comment -->
					</div>

					<div class="span3">
						<div class="control-group">
							<div class="controls">
								<input class="input-file realinputvalue" multiple type="file">
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="httpparameter">
				<a class="close">&times;</a>
				<div class="row show-grid">
					<div class="span2">
						<div class="control-group">
							<div class="controls">
								<input type="text" class="input-medium fakeinputname" value="">
							</div>
						</div>
					</div>

					<div class="span3">
						<div class="control-group">
							<div class="controls">
								<input type="text" class="input-xlarge realinputvalue" value="">
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="httpauth">
				<a class="close">&times;</a>
				<div class="row show-grid">
					<div class="span2">
						<div class="control-group">
							<div class="controls">
								<input type="text" class="input-medium fakeinputname" value="">
							</div>
						</div>
					</div>

					<div class="span3">
						<div class="control-group">
							<div class="controls">
								<input type="password" class="input-xlarge realinputvalue" value="">
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="navbar navbar-fixed-top navbar-inverse">
			<div class="navbar-inner">
				<div class="container">
					<a class="btn btn-navbar" data-toggle="collapse"
						data-target=".nav-collapse"> <span class="icon-bar"></span> <span
							class="icon-bar"></span> <span class="icon-bar"></span>
					</a> <a class="brand" href="#">Pharmacy-App REST API Documentation + Test Platform</a>
					<div class="nav-collapse">
						<!--
						<ul class="nav">
						<li><a target="_blank" href="https://github.com/jeroenooms/resttesttest">Source Code</a></li>
						<li><a target="_blank" href="https://github.com/jeroenooms/resttesttest/issues/new">Submit Bug</a></li>
						<li><a target="_blank" href="http://jeroenooms.github.io">Author</a></li>
						</ul>
						-->
					</div>
					<!--/.nav-collapse -->
				</div>
			</div>
		</div>

		<div class="container">

			<div class="row show-grid">
			
				<div id="leftcolumn" class="span6">

					<div class="control-group">
						<label class="control-label" for="urlvalue">API Base Url</label>
						<div class="controls">
							<input type="text" class="input-xlarge" id="urlvalue"
								value="<?= $base_api_url ?>">
						</div>
					</div>

					<div class="control-group">
						<label class="control-label" for="urlvalue">API App Key</label>
						<div class="controls">
							<input type="text" class="input-xlarge" id="keyvalue"
								value="<?= $base_api_key ?>">
						</div>
					</div>
					
					<div id="errordiv"></div>

					<div class="alert alert-info">
						<a class="close" data-dismiss="alert">&times;</a> <strong>Welcome!</strong>
						Use this simple page to poke around at the API.
						Specify HTTP method, URL and parameters, and click on <b>Ajax Request</b>.
						Note that this page requires a browser with HTML5 support.
					</div>

					<form id="paramform" class="well" target="outputframe">

						<fieldset>
							<legend>API Calls</legend>

							<br />

							<div align="left">
								<button id="testaboutbutton" class="btn btn-success" style="margin-bottom: 1.5em;">
								<img src="spinner.gif" id="aboutspinner" /> About 
								</button>
								- {base-url}/<b>about</b>/{api-key}
							</div>

							<div align="left">
							
								<div id="userinfo">

									<div class="row show-grid">
										<div class="span2">
											<div class="control-group">
												<input id="uid" class="control-label">Username</label>
											</div>
										</div>

										<div class="span3">
											<div class="control-group">
												<input id="pwd" class="control-label">Password</label>
											</div>
										</div>
									</div>

								</div> 
								
								<button id="testloginbutton" class="btn btn-success" style="margin-bottom: 1.5em;">
								<img src="spinner.gif" id="loginspinner" /> Login 
								</button>

								- {base-url}/<b>login</b>/<i>username</i>/<i>password</i>/{api-key}
							</div>

							<!--
							<div align="left">
								<button id="testpostbutton"  class="btn btn-success" style="margin-bottom: 1.5em;">
									Post Test 
								</button>
							</div>   -->

							<div align="left">
								<button id="testprofilesbutton" disabled class="btn btn-success" style="margin-bottom: 1.5em;">
								<img src="spinner.gif" id="profilespinner" /> Profiles 
								</button>
							</div>                
							
							<div align="left">
								<div id="userinfo">

									<div class="row show-grid">
										<div class="span6">
											<div class="control-group">
												<input id="profileid" class="control-label"> Profile ID for Prescription List
											</div>
										</div>
									</div>

								</div> 
								<button id="testscriptsbutton" disabled class="btn btn-success" style="margin-bottom: 1.5em;">
									<img src="spinner.gif" id="scriptspinner" />Presciptions 
								</button>
							</div>                
							
							<div align="left">
								<button id="testservicesbutton" class="btn btn-success" style="margin-bottom: 1.5em;">
									Services 
								</button>
							</div>  
							
							<div align="left">
								<button id="testregisterinfobutton" class="btn btn-success" style="margin-bottom: 1.5em;">
								<img src="spinner.gif" id="registerinfospinner" /> Register (info)
								</button>
							</div>  
							
							<div align="left">
							
								<div id="registerinfo">

									<div class="row show-grid">
										<div class="span5">
											<div class="control-group">
												<input id="location" class="control-label"> Location ID</label>
											</div>
										</div>

									</div>
									
									<div class="row show-grid">
										<div class="span2">
											<div class="control-group">
												<input id="first_name" class="control-label"> FirstName</label>
											</div>
										</div>

										<div class="span3">
											<div class="control-group">
												<input id="last_name" class="control-label"> LastName</label>
											</div>
										</div>
									</div>

									<div class="row show-grid">
										<div class="span2">
											<div class="control-group">
												<input id="street_address" class="control-label"> Address</label>
											</div>
										</div>

										<div class="span3">
											<div class="control-group">
												<input id="city" class="control-label"> CityName</label>
											</div>
										</div>
									</div>
									<div class="row show-grid">
										<div class="span2">
											<div class="control-group">
												<input id="state" class="control-label"> StateName</label>
											</div>
										</div>

										<div class="span3">
											<div class="control-group">
												<input id="zip" class="control-label"> ZipName</label>
											</div>
										</div>
									</div>
									<div class="row show-grid">
										<div class="span2">
											<div class="control-group">
												<input id="rxnbr" class="control-label"> RX Number/Id</label>
											</div>
										</div>

										<div class="span3">
											<div class="control-group">
												<input id="gender" class="control-label"> Gender(M/F)</label>
											</div>
										</div>
									</div>
									<div class="row show-grid">
										<div class="span2">
											<div class="control-group">
												<input id="birthdate" class="control-label"> Birthdate</label>
											</div>
										</div>

										<div class="span3">
											<div class="control-group">
												<input id="email" class="control-label"> EmailAdd</label>
											</div>
										</div>
									</div>
									
									<div class="row show-grid">
										<div class="span2">
											<div class="control-group">
												<input id="security_question" class="control-label"> SecQuestion(ID)</label>
											</div>
										</div>

										<div class="span3">
											<div class="control-group">
												<input id="security_answer" class="control-label"> SecAnswer</label>
											</div>
										</div>
									</div>

								</div> 
								
								<button id="testregisterpostbutton" class="btn btn-info" style="margin-bottom: 1.5em;">
								<img src="spinner.gif" id="registerpostspinner" /> Register (post)
								</button><p>{base-url}/<b>registerpost</b>/{api-key}</p>
								
							</div>

							<div align="left">
								<button id="testhelpbutton" class="btn btn-success" style="margin-bottom: 1.5em;">
									<img src="spinner.gif" id="helpspinner" /> Help 
								</button>

							</div>     

							<div align="left">
								<button id="testnewpatientbutton" class="btn btn-success" style="margin-bottom: 1.5em;">
									<img src="spinner.gif" id="newpatientspinner" /> New Patient Form 
								</button>

							</div>     


							<p class="help-block">Method and Endpoint are required. Click
								below to add additional parameters.</p>

							<div align="left">
								<button id="addauthbutton" class="btn btn-primary" style="margin-bottom: 1.5em;">
									<i class="icon-lock icon-white"></i> Add authentication
								</button>
							</div>



							<div id="allheaders">

								<div class="row show-grid">
									<div class="span2">
										<div class="control-group">
											<label class="control-label">Header Name</label>
										</div>
									</div>

									<div class="span3">
										<div class="control-group">
											<label class="control-label">Header Value</label>
										</div>
									</div>
								</div>

							</div>

							<div align="left">
								<button id="addheaderbutton" class="btn btn-primary">
									<i class="icon-plus icon-white"></i> Add header
								</button>
							</div>
							<br />

							<div id="allparameters">

								<div class="row show-grid">
									<div class="span2">
										<div class="control-group">
											<label class="control-label">Parameter Name</label>
										</div>
									</div>

									<div class="span3">
										<div class="control-group">
											<label class="control-label">Parameter Value</label>
										</div>
									</div>
								</div>

							</div>

							<div align="left">
								
								<button id="addprambutton" class="btn btn-primary">
									<i class="icon-plus icon-white"></i> Add parameter
								</button>
								
							</div>
							<br />
						</fieldset>
					</form>



				</div>

				<div class="span6">
					<div id="ajaxoutput">
						<pre id="statuspre">0</pre>
						<pre class="pre-scrollable prettyprint linenums" id="outputpre"></pre>
						<pre class="pre-scrollable prettyprint linenums" id="headerpre"></pre>
					</div>
				</div>
			</div>

			<br>


		</div>

<!--		<script src="jquery-1.10.2.min.js"></script>  -->
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-beta1/jquery.min.js"></script>
		<script src="bootstrap/js/bootstrap.min.js"></script>
		<script src="chance.js"></script>
		<script src="debug.js"></script>

	</body>
</html>
