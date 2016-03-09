<?php

//$base_api_url = "https://eda22bb1.ngrok.io/templates/dev/api";
$base_api_url = "https://eda22bb1.ngrok.io/templates/dev/api";
$base_api_key = "1234567890QWERTYzxcvb";


?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<!-- Required meta tags always come first -->
		<meta charset="utf-8">
		<title>Pharmacy App API Testing Platform</title>
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta http-equiv="x-ua-compatible" content="ie=edge">

		<!-- Bootstrap CSS -->
		<link rel="stylesheet" href="bootstrap/css/bootstrap.css">

		<!-- Font Awesome CSS -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">

		<!-- Debug CSS -->
		<link rel="stylesheet" href="debug.css">

	</head>
	<body>

		<!-- Hidden Pop up forms -->
		<div class="hidden-xs-up">
			<div class="httpfile">
				<a class="close">&times;</a>
				<div class="row">
					<div class="col-sm-4">
						<div class="control-group">
							<div class="controls">
								<input type="text" class="form-control fakeinputname" value="12a34">
							</div>
						</div>
					</div>

					<div class="col-sm-2">
						<div class="control-group">
							<div class="controls">
								<label class="file">
									<input type="file" class="input-file realinputvalue"  multiple type="file">
									<span class="file-custom"></span>
								</label>
							</div>
						</div>
					</div>
				</div> 
			</div>

			<!-- Add header button -->
			<div class="httpparameter">
				<a class="close">&times;</a>
				<div class="row">
					<div class="col-sm-4">
						<div class="control-group">
							<div class="controls">
								<fieldset class="form-group">
									<input type="text" class="form-control fakeinputname" value="" placeholder="Name">
								</fieldset>
							</div>
						</div>
					</div>

					<div class="col-sm-7">
						<div class="control-group">
							<div class="controls">
								<fieldset class="form-group">
									<label for="addheadervalue" class="sr-only ">Add Header Value</label>
									<input type="text" class="form-control realinputvalue" value="" placeholder="Value">
								</fieldset>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- /Add header button -->
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
		<!-- /Hidden Pop up forms -->

		<!--header navbar -->
		<div class="container">
			<nav class="navbar navbar-full navbar-dark bg-inverse">
				<a class="brand navbar-brand" href="#">Pharmacy-App REST API Documentation + Test Platform</a>
			</nav>
		</div>
		<!--/header navbar -->

		<!--top API input forms -->
		<section>
			<div class="container pad-top">

				<div class="row">
					<div class="col-md-12" >
						<form id="apiform">
							<div class="col-md-6" >
								<label for="urlvalue"><h4>API Base Url</h4></label>
								<input type="text" class="form-control form-control-lg " id="urlvalue" value="<?= $base_api_url ?>">
							</div>
							<div class="col-md-6" >
								<label for="urlvalue"><h4>API App Key	</h4></label>
								<input type="text" class="form-control form-control-lg " id="keyvalue" value="<?= $base_api_key ?>">
							</div>

						</form>
					</div>
				</div>
			</div>
		</section>
		<!--/top API input forms -->

		<!--alerts & info messages-->
		<section>
			<div class="container">
				<div id="errordiv"></div>

				<div class="alert alert-info">
					<a class="close" data-dismiss="alert">&times;</a> <strong>Welcome!</strong>
					Use this simple page to poke around at the API.
					Specify HTTP method, URL and parameters, and click on <b>Ajax Request</b>.
					Note that this page requires a browser with HTML5 support.
				</div>

			</div>
		</section>
		<!--/alerts & info messages-->

		<!--left side fourms-->
		<section>
			<div class="container pad-top">
				<div class="row">
					<div class="col-md-6">
						<div class="card">
							<div class="card-block">   
							
								<h3 class="card-title">API Calls</h3>

								<div class="api-section">
									<h4 class="card-title">About</h4>
									<p class="card-text"> theset asasdfasd fa'sdkfasdfds</p>
									<button class="btn btn-success-outline" id="testaboutbutton">About</button>
									<span class="label label-warning">{base-url}/about/{api-key}</span>
								</div>

								<div class="api-section">
									<h4 class="card-title">Login</h4>
									<p class="card-text"> theset asasdfasd fa'sdkfasdfds</p>
									<fieldset class="form-group">
										<label for="uid" class="sr-only ">Your username</label>
										<input type="text" class="form-control form-control-lg" id="uid" placeholder="Username">
									</fieldset>

									<fieldset class="form-group">
										<label for="pwd" class="sr-only">Your password</label>
										<input type="password" class="form-control form-control-lg" id="pwd" placeholder="Password">
									</fieldset>

									<button class="btn btn-success-outline" id="testloginbutton"><i class="fa fa-sign-in"></i> Login</button>
									<span class="label label-warning">  {base-url}/login/username/password/{api-key}</span>
								</div>

								<div class="api-section">
									<h4 class="card-title">Profiles</h4>
									<p class="card-text"> theset asasdfasd fa'sdkfasdfds</p>
									<button id="testprofilebutton" disabled class=" btn btn-success-outline">Profiles</button>
									<span class="label label-warning">  {base-url}/login/username/password/{api-key}</span>
								</div>

								<div class="api-section">
									<h4 class="card-title">Prescriptions</h4>
									<p class="card-text"> theset asasdfasd fa'sdkfasdfds</p>
									<fieldset class="form-group">
										<label for="profileid" class="sr-only">Profile ID for Prescription List</label>
										<input type="text" class="form-control form-control-lg" id="profileid" placeholder="Profile ID for Prescription List">
									</fieldset>
									
									<button id="testscriptsbutton" disabled class="btn btn-success-outline">Prescriptions</button>
									<span class="label label-warning">  {base-url}/login/username/password/{api-key}</span>
								</div>

								<div class="api-section">
									<h4 class="card-title">Services</h4>
									<p class="card-text"> theset asasdfasd fa'sdkfasdfds</p>
									<button class="btn btn-success-outline" id="testservicebutton">Services</button>
									<span class="label label-warning">  {base-url}/login/username/password/{api-key}</span>
								</div>

								<div class="api-section">
									<h4 class="card-title">Help</h4>
									<p class="card-text"> theset asasdfasd fa'sdkfasdfds</p>
									<button class="btn btn-success-outline" id="testhelpbutton">Help</button>
									<span class="label label-warning">  {base-url}/login/username/password/{api-key}</span>
								</div>

								<div class="api-section">
									<h4 class="card-title">Register</h4>
									<p class="card-text"> theset asasdfasd fa'sdkfasdfds</p>

									<button id="testregisterinfobutton " class="btn btn-success">
										<img src="spinner.gif" id="registerinfospinner" /> Register (info)
									</button>
									<span class="label label-warning">  {base-url}/login/username/password/{api-key}</span>
								</div>

								<div class="api-section">
									<div class="row">
										<div class="col-md-6">
											<div class="form-group">
												<input id="location" class="form-control form-control-sm" placeholder="Location ID"> </label>
											</div>
										</div>
									</div>
									<div class="row">
										<div class="col-md-6">
											<div class="form-group">
												<input id="first_name" class="form-control form-control-sm" placeholder=" FirstName"></label>
											</div>
										</div>
										<div class="col-md-6">
											<div class="form-group">
												<input id="last_name" class="form-control form-control-sm" placeholder=" LastName"></label>
											</div>
										</div>
									</div>
									<div class="row">

										<div class="col-md-6">
											<div class="form-group">
												<input id="street_address" class="form-control form-control-sm" placeholder=" Address"></label>
											</div>
										</div>
										<div class="col-sm-6">
											<div class="form-group">
												<input id="city" class="form-control form-control-sm" placeholder=" CityName"></label>
											</div>
										</div>
									</div>
									<div class="row">

										<div class="col-sm-6">
											<div class="form-group">
												<input id="state" class="form-control form-control-sm" placeholder=" StateName"></label>
											</div>
										</div>
										<div class="col-sm-6">
											<div class="form-group">
												<input id="zip" class="form-control form-control-sm" placeholder=" ZipName"></label>
											</div>
										</div>
									</div>
									<div class="row">

										<div class="col-sm-6">
											<div class="form-group">
												<input id="rxnbr" class="form-control form-control-sm" placeholder=" RX Number/Id"></label>
											</div>
										</div>
										<div class="col-sm-6">
											<div class="form-group">
												<input id="gender" class="form-control form-control-sm" placeholder=" Gender(M/F)"></label>
											</div>
										</div>

									</div>
									<div class="row">

										<div class="col-sm-6">
											<div class="form-group">
												<input id="birthdate" class="form-control form-control-sm" placeholder=" Birthdate"></label>
											</div>
										</div>
										<div class="col-sm-6">
											<div class="form-group">
												<input id="email" class="form-control form-control-sm" placeholder=" EmailAdd"></label>
											</div>
										</div>
									</div>
									<div class="row">
										<div class="col-sm-6">
											<div class="form-group">
												<input id="security_question" class="form-control form-control-sm" placeholder=" SecQuestion(ID)"></label>
											</div>
										</div>
										<div class="col-sm-6">
											<div class="form-group">
												<input id="security_answer" class="form-control form-control-sm" placeholder=" SecAnswer"></label>
											</div>
										</div>
									</div>

									<button id="testregisterpostbutton" class="btn btn-info" >
										<i class="fa fa-check"></i> Register (post)
									</button><span class="label label-default">{base-url}/registerpost/{api-key}</span>


								</div>
								<div class="api-section">
									<h4 class="card-title">New Patient Form POST</h4>
									<p class="card-text"> theset asasdfasd fa'sdkfasdfds</p>
									<button id="testnewpatientbutton" class="btn btn-success" style="margin-bottom: 1.5em;">
										<img src="spinner.gif" id="newpatientspinner" style="display: none;"> New Patient Form 
									</button>
								</div>
							</div>






							<div class="card bot-card">
								<div class="card-block">
									<h4 class="card-title">Method and Endpoint are required
										<br>Click below to add additional parameters.</h4>

									<button id="addauthbutton" class="btn btn-primary "><i class="fa fa-lock"></i>  Add Authentication</button>
									<div id="allheaders">
										<div class="row">
											<div class="col-md-4">
												<fieldset class="form-group">
													<label class="control-label">Header Name</label>
												</fieldset>
											</div>

											<div class="col-md-7">
												<fieldset class="form-group">
													<label class="control-label">Header Value</label>
												</fieldset>
											</div>
										</div>

									</div>
									<br>
									<button id="addheaderbutton" class="btn btn-primary"><i class="fa fa-plus"></i> Add Header</button>
									<br>
									<div id="allparameters">

										<div class="row">
											<div class="col-md-4">
												<fieldset class="form-group">
													<label class="control-label">Parameter Name</label>
												</fieldset>
											</div>
											<div class="col-md-7">
												<fieldset class="form-group">
													<label class="control-label">Parameter Value</label>
												</fieldset>
											</div>
										</div>

									</div>	
									<button id="addprambutton" class="btn btn-primary"><i class="fa fa-plus"></i> Add Parameter</button>
									<br>
									<div id="allparameters">
										<div class="row">
											<div class="col-md-4">
												<fieldset class="form-group">
													<label class="control-label">Parameter Name</label>
												</fieldset>
											</div>
											<div class="col-md-7">
												<fieldset class="form-group">
													<label class="control-label">Parameter Value</label>
												</fieldset>
											</div>
										</div>

									</div>

									<button id="addfilebutton" class="btn btn-primary"><i class="fa fa-file"></i>Add File</button>

									<button id="submitajax"class="btn btn-success pull-right btn-lg"><i class="fa fa-download"></i>Ajax Request</button>
									<img src="spinner.gif" id="ajaxspinner" style="display: none;">

									<br>
									<br>
								</div>	
							</div>
						</div>
					</div>

					<!-- Right side of site-->
					<div class="col-md-6">
						<div id="ajaxoutput">
							<pre id="statuspre">0</pre>
							<pre class="pre-scrollable prettyprint linenums" id="outputpre"></pre>
							<pre class="pre-scrollable prettyprint linenums" id="headerpre"></pre>
						</div>
					</div>

				</div>
			</div>
			</div>
			<!-- /Right side of site-->
		</section>

		</footer>
		<!-- jQuery first, then Bootstrap JS. -->
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-beta1/jquery.min.js"></script>
		<script src="bootstrap/js/bootstrap.js"></script>
		<script src="chance.js"></script>
		<script src="debug.js"></script>
	</body>
</html>












