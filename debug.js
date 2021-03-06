var test_api_key = $("#keyvalue").val();
var base_api_uri = $("#urlvalue").val();

$('#aboutspinner').hide();
$('#loginspinner').hide();
$('#profilespinner').hide();
$('#scriptspinner').hide();
$('#servicespinner').hide();
$('#loginspinner').hide();
$('#registerinfospinner').hide();
$('#registerpostspinner').hide();
$('#helpspinner').hide();
$('#newpatientspinner').hide();
$('#tagsspinner').hide();
$('#xferscriptspinner').hide();
$('#newscriptspinner').hide();

function showHeaders() {
	showAuthHeaders();
	showHeaderHeaders();
	showParamHeaders();
}

function showAuthHeaders() {
	if ($("#authentication").find(".realinputvalue").length > 0) {
		$("#addauthbutton").hide();
		$("#authentication").show();
	} else {
		$("#addauthbutton").show();
		$("#authentication").hide();
	}
}

function showHeaderHeaders() {
	if ($("#allheaders").find(".realinputvalue").length > 0) {
		$("#allheaders").show();
	} else {
		$("#allheaders").hide();
	}
}

function showParamHeaders() {
	if ($("#allparameters").find(".realinputvalue").length > 0) {
		$("#allparameters").show();
	} else {
		$("#allparameters").hide();
	}
}


$("#addheaderbutton").click(function(e) {
	e.preventDefault();
	$('.httpparameter:first').clone(true).appendTo("#allheaders");
	showHeaders();
});

$("#addprambutton").click(function(e) {
	e.preventDefault();
	$('.httpparameter:first').clone(true).appendTo("#allparameters");
	showHeaders();
});

$("#addfilebutton").click(function(e) {
	e.preventDefault();
	$('.httpfile:first').clone(true).appendTo("#allparameters");
	showHeaders();
});

//this specifies the parameter names
$(".fakeinputname").blur(function() {
	var newparamname = $(this).val();
	$(this).parent().parent().parent().parent().find(".realinputvalue").attr("name", newparamname);
});


$(".close").click(function(e) {
	e.preventDefault();
	$(this).parent().remove();
	showHeaders();
});


function postWithAjax(myajax,route,type) {

	myajax = myajax || {};
	myajax.url = $("#urlvalue").val() + route;
	myajax.type = type;

	if (checkForAuth())
	{
		myajax.username = $("#authentication input:first").val();
		myajax.password = $("#authentication input").eq(1).val();
	}

	myajax.complete = function(jqXHR) {       

		$("#statuspre").text(
			"HTTP " + jqXHR.status + " " + jqXHR.statusText);
		if (jqXHR.status == 0) {
			httpZeroError();
		} else if (jqXHR.status >= 200 && jqXHR.status < 300) {
			$("#statuspre").addClass("alert-success");
		} else if (jqXHR.status >= 400) {
			$("#statuspre").addClass("alert-error");
		} else {
			$("#statuspre").addClass("alert-warning");
		}
		$("#outputpre").text(jqXHR.responseText);
		$("#headerpre").text(jqXHR.getAllResponseHeaders());
	}

	if (jQuery.isEmptyObject(myajax.data)) {
		myajax.contentType = 'application/x-www-form-urlencoded';
	}

	$("#outputframe").hide();
	$("#outputpre").empty();
	$("#headerpre").empty();
	$("#outputframe").attr("src", "")
	$("#ajaxoutput").show();
	$("#statuspre").text("0");
	$("#statuspre").removeClass("alert-success");
	$("#statuspre").removeClass("alert-error");
	$("#statuspre").removeClass("alert-warning");

	$('#ajaxspinner').show();
	var req = $.ajax(myajax).always(function(){
		$('#ajaxspinner').hide();
	});
}

$("#submitajax").click(function(e) {

	e.preventDefault();
	if(checkForFiles()){
		postWithAjax({
			headers: createHeaderData(),
			data : createMultipart(), 
			cache: false,
			contentType: false,
			processData: false,  
			xhrFields: { withCredentials: true },
			crossDomain: true
		});
	} else {
		postWithAjax({
			headers : createHeaderData(),
			data : createUrlData(),
			xhrFields: { withCredentials: true },
			crossDomain: true
		});    
	}
});

function checkForFiles() {
	return $("#paramform").find(".input-file").length > 0;
}

function checkForAuth() {
	return $("#paramform").find("input[type=password]").length > 0;
}

function createUrlData(){

	var mydata = {};
	var parameters = $("#allparameters").find(".realinputvalue");
	for (i = 0; i < parameters.length; i++) {
		name = $(parameters).eq(i).attr("name");
		if (name == undefined || name == "undefined") {
			continue;
		}
		value = $(parameters).eq(i).val();
		mydata[name] = value
	}
	return(mydata);
}

function createMultipart(){
	//create multipart object
	var data = new FormData();

	//add parameters
	var parameters = $("#allparameters").find(".realinputvalue");
	for (i = 0; i < parameters.length; i++) {
		name = $(parameters).eq(i).attr("name");
		if (name == undefined || name == "undefined") {
			continue;
		}
		if(parameters[i].files){
			data.append(name, parameters[i].files[0]);      
		} else {
			data.append(name, $(parameters).eq(i).val());
		}
	}
	return(data)  
}

function createHeaderData(){
	var mydata = {};
	var parameters = $("#allheaders").find(".realinputvalue");
	for (i = 0; i < parameters.length; i++) {
		name = $(parameters).eq(i).attr("name");
		if (name == undefined || name == "undefined") {
			continue;
		}
		value = $(parameters).eq(i).val();
		mydata[name] = value
	}
	return(mydata);
}

function httpZeroError() {
	$("#errordiv").append('<div class="alert alert-error"> <a class="close" data-dismiss="alert">&times;</a> <strong>Oh no!</strong> Javascript returned an HTTP 0 error. One common reason this might happen is that you requested a cross-domain resource from a server that did not include the appropriate CORS headers in the response. Better open up your Firebug...</div>');
}            

function cleardivs() {
	
	$("#outputframe").hide();
	$("#outputpre").empty();
	$("#headerpre").empty();
	$("#outputframe").attr("src", "")
	$("#ajaxoutput").show();
	$("#statuspre").text("0");
	$("#statuspre").removeClass("alert-success");
	$("#statuspre").removeClass("alert-error");
	$("#statuspre").removeClass("alert-warning");

}

function timerDisbleButtons() {
			
	$("#testprofilesbutton").prop('disabled', false);
	$("#testscriptsbutton").prop('disabled', false);
}

$("#testaboutbutton").click(function(e) {
	
	e.preventDefault();
	cleardivs();
	$('#aboutspinner').show();
		
	$.ajax({
		url:  base_api_uri+"/about/"+test_api_key,
		dataType: 'json',
		xhrFields: {
			withCredentials: true
		},
		success: function (data, status, jqXHR) {
			
			$('#aboutspinner').hide();
			$("#outputpre").append(JSON.stringify(data, undefined, 4));
			$("#headerpre").text(jqXHR.getAllResponseHeaders());
			
			$.each(data, function (key, value) {
				//handle the data  
				console.log(key,value);
			});


		},
		error: function (ts) {
			$('#aboutspinner').hide();
			console.log(ts.responseText);
		},
		
	});

});

$("#testhelpbutton").click(function(e) {
	
	e.preventDefault();
	cleardivs();
	$('#helpspinner').show();
		
	$.ajax({
		url:  base_api_uri+"/help/"+test_api_key,
		dataType: 'json',
		xhrFields: {
			withCredentials: true
		},
		success: function (data, status, jqXHR) {
			
			$('#helpspinner').hide();
			$("#outputpre").append(JSON.stringify(data, undefined, 4));
			$("#headerpre").text(jqXHR.getAllResponseHeaders());
			
			$.each(data, function (key, value) {
				//handle the data  
				console.log(key,value);
			});


		},
		error: function (ts) {
			$('#helpspinner').hide();
			console.log(ts.responseText);
		},
		
	});

});


$("#testservicebutton").click(function(e) {
	
	e.preventDefault();
	cleardivs();
	$('#servicespinner').show();
		
	$.ajax({
		url:  base_api_uri+"/services/"+test_api_key,
		dataType: 'json',
		xhrFields: {
			withCredentials: true
		},
		success: function (data, status, jqXHR) {
			                                                                     0
			$('#servicespinner').hide();
			$("#outputpre").append(JSON.stringify(data, undefined, 2));
			$("#headerpre").text(jqXHR.getAllResponseHeaders());
			
			$.each(data, function (key, value) {
				//handle the data  
				console.log(key,value);
			});


		},
		error: function (ts) {
			$('#servicespinner').hide();
			console.log(ts.responseText);
		},
		
	});

});

$("#testloginbutton").click(function(e) {
	
	e.preventDefault();
	cleardivs();
	$('#loginspinner').show();
	
	var uid = $("#uid").val();
	var pwd = $("#pwd").val();
		
	$.ajax({
		url:  base_api_uri+"/login/"  + test_api_key,
		dataType: 'json',
		type: "POST",
		data: {
        username: uid,
        password: pwd
		},

		xhrFields: {
			withCredentials: true
		},
		success: function (data, status, jqXHR) {
			
			$('#loginspinner').hide();
			$("#outputpre").append(JSON.stringify(data, undefined, 2));
			$("#headerpre").text(jqXHR.getAllResponseHeaders());
			
			if (data.is_logged)  {
				
				window.setTimeout(timerDisbleButtons, 12000000);
				
				$("#testprofilebutton").prop('disabled', false);
				$("#testscriptsbutton").prop('disabled', false);
				
			}
			else {
				
			}
			
			
			$.each(data, function (key, value) {
				//handle the data  
				console.log(key,value);
			});


		},
		error: function (ts) {
			$('#loginspinner').hide();
			console.log(ts.responseText);
		},
		
	});

});


$("#testprofilebutton").click(function(e) {
	
	e.preventDefault();
	cleardivs();
	$('#profilespinner').show();
	
	var uid = $("#uid").val();
	var pwd = $("#pwd").val();
	
	var ajax_url = base_api_uri+"/profiles/" + test_api_key;          
	$("#statuspre").text(ajax_url);	
	
	$.ajax({
		url: ajax_url,
		dataType: 'json',
		xhrFields: {
			withCredentials: true
		},
		success: function (data, status, jqXHR) {
			
			$('#profilespinner').hide();
			$("#outputpre").append(JSON.stringify(data, undefined, 2));
			$("#headerpre").text(jqXHR.getAllResponseHeaders());
			
			if (data.is_logged)  {
				
				$("#testprofilesbutton").prop('disabled', false);
				$("#testscriptsbutton").prop('disabled', false);
				
			}
			else {
				
			}
			
			
			$.each(data, function (key, value) {
				//handle the data  
				console.log(key,value);
			});


		},
		error: function (ts) {
			$('#profilespinner').hide();
			console.log(ts.responseText);
		},
		
	});

});


$("#testscriptsbutton").click(function(e) {
	
	e.preventDefault();
	$('#scriptspinner').show();

	cleardivs();
	
	var profid = $("#profileid").val();
		
	$.ajax({
		url:  base_api_uri+"/patients/" + profid + "/" + test_api_key,
		dataType: 'json',
		xhrFields: {
			withCredentials: true
		},
		success: function (data, status, jqXHR) {
			
			$('#scriptspinner').hide();
			$("#outputpre").append(JSON.stringify(data, undefined, 2));
			$("#headerpre").text(jqXHR.getAllResponseHeaders());
			
			if (data.is_logged)  {
				
				$("#testprofilesbutton").prop('disabled', false);
				$("#testscriptsbutton").prop('disabled', false);
				
			}
			else {
				
			}
			
			
			$.each(data, function (key, value) {
				//handle the data  
				console.log(key,value);
			});

		},
		error: function (ts) {
			$('#scriptspinner').hide();
			console.log(ts.responseText);
		},
		
	});

});

$("#testregisterinfobutton").click(function(e) {
	
	e.preventDefault();
	$('#registerinfospinner').show();

	cleardivs();
		
	$.ajax({
		url:  base_api_uri+"/registerinfo/" + test_api_key,
		dataType: 'json',
		xhrFields: {
			withCredentials: true
		},
		success: function (data, status, jqXHR) {
			
			$('#registerinfospinner').hide();
			$("#outputpre").append(JSON.stringify(data, undefined, 2));
			$("#headerpre").text(jqXHR.getAllResponseHeaders());
					
			
			$.each(data, function (key, value) {
				//handle the data  
				console.log(key,value);
			});

		},
		error: function (ts) {
			$('#registerinfospinner').hide();
			console.log(ts.responseText);
		},
		
	});

});

$("#testregisterpostbutton").click(function(e) {
	
	e.preventDefault();
	cleardivs();
	$('#registerspinner').show();
			
	$.ajax({
		url:  base_api_uri+"/registerpost/" + test_api_key,
		type: "POST",
		data: {
        location: $("#location").val(),
        first_name: $("#first_name").val(),
        last_name: $("#last_name").val(),
        street_address: $("#street_address").val(),
        city: $("#city").val(),
        state: $("#state").val(),
        zip: $("#zip").val(),
        rxnbr: $("#rxnbr").val(),
        gender: $("#gender").val(),
        birthdate: $("#birthdate").val(),
        email: $("#email").val(),
        security_question: $("#security_question").val(),
        security_answer: $("#security_answer").val()
    	},
		contentType: "application/x-www-form-urlencoded",
		dataType: 'json',
		xhrFields: {
			withCredentials: true
		},
		success: function (data, status, jqXHR) {
			
			$('#registerspinner').hide();
			$("#outputpre").append(JSON.stringify(data, undefined, 2));
			$("#headerpre").text(jqXHR.getAllResponseHeaders());
								
			$.each(data, function (key, value) {
				//handle the data  
				console.log(key,value);
			});


		},
		error: function (ts) {
			$('#registerspinner').hide();
			console.log(ts.responseText);
		},
		
	});

});

$("#testtagsbutton").click(function(e) {
	
	e.preventDefault();
	$('#tagsspinner').show();

	cleardivs();
		
	$.ajax({
		url:  base_api_uri+"/tags/" + test_api_key,
		dataType: 'json',
		xhrFields: {
			withCredentials: true
		},
		success: function (data, status, jqXHR) {
			
			$('#tagsspinner').hide();
			$("#outputpre").append(JSON.stringify(data, undefined, 2));
			$("#headerpre").text(jqXHR.getAllResponseHeaders());
								
			$.each(data, function (key, value) {
				//handle the data  
				console.log(key,value);
			});

		},
		error: function (ts) {
			$('#tagsspinner').hide();
			alert(ts.responseText);
		},
		
	});

});

$("#testnewpatientpostbutton").click(function(e) {
	
	e.preventDefault();
	cleardivs();
	$('#newpatientpostspinner').show();
			
	$.ajax({
		url:  base_api_uri+"/newpatientpost/" + test_api_key,
		type: "POST",
		data: {
        location: chance.integer({min: 0, max: 1}),
        first_name: chance.first(),
        last_name: chance.last(),
        street_address: chance.address(),
        city:  chance.city(),
        state: chance.state(),
        zip: chance.zip(),
   	  email: chance.email(),
    	  phone_number: chance.phone(),
    	  date_birth: chance.birthday({string: true}),
    	  alternate_contact_name: chance.name(),
    	  alternate_contact_phone_number: chance.phone(),
    	  allergies: chance.sentence(),
    	  auto_refill_scripts: "Yes",
    	  send_text_notifications: "Yes",
    	  send_email_notifications: "Yes",
    	  pharmacy_name: chance.name(),
    	  pharmacy_number: chance.phone(),
    	  prescription_number_1: chance.natural(),
    	  prescription_name_1: chance.string({length: 9}),
    	  prescription_number_2: chance.natural(),
    	  prescription_name_2: chance.string({length: 9}),
    	  prescription_number_3: chance.natural(),
    	  prescription_name_3: chance.string({length: 9}),
    	  prescription_number_4: chance.natural(),
    	  prescription_name_4: chance.string({length: 9}),
    	  message: chance.paragraph()
    	},
		contentType: "application/x-www-form-urlencoded",
		dataType: 'json',
		xhrFields: {
			withCredentials: true
		},
		success: function (data, status, jqXHR) {
			
			$('#newpatientpostspinner').hide();
			$("#outputpre").append(JSON.stringify(data, undefined, 2));
			$("#headerpre").text(jqXHR.getAllResponseHeaders());
								
			$.each(data, function (key, value) {
				//handle the data  
				console.log(key,value);
			});


		},
		error: function (ts) {
			$('#newpatientpostspinner').hide();
			console.log(ts.responseText);
		},
		
	});

});


$("#testxfrescriptpostbutton").click(function(e) {
	
	e.preventDefault();
	cleardivs();
	$('#xfrescriptspinner').show();
			
	$.ajax({
		url:  base_api_uri+"/xferscriptpost/" + test_api_key,
		type: "POST",
		data: {
        location: chance.integer({min: 0, max: 1}),
        first_name: chance.first(),
        last_name: chance.last(),
   	  email: chance.email(),
    	  phone_number: chance.phone(),
    	  date_birth: chance.birthday({string: true}),
    	  pharmacy_name: chance.name(),
    	  pharmacy_number: chance.phone(),
    	  prescription_number_1: chance.natural(),
    	  prescription_name_1: chance.string({length: 9}),
    	  prescription_number_2: chance.natural(),
    	  prescription_name_2: chance.string({length: 9}),
    	  prescription_number_3: chance.natural(),
    	  prescription_name_3: chance.string({length: 9}),
    	  prescription_number_4: chance.natural(),
    	  prescription_name_4: chance.string({length: 9}),
    	  message: chance.paragraph()
    	},
		contentType: "application/x-www-form-urlencoded",
		dataType: 'json',
		xhrFields: {
			withCredentials: true
		},
		success: function (data, status, jqXHR) {
			
			$('#xfrescriptspinner').hide();
			$("#outputpre").append(JSON.stringify(data, undefined, 2));
			$("#headerpre").text(jqXHR.getAllResponseHeaders());
								
			$.each(data, function (key, value) {
				//handle the data  
				console.log(key,value);
			});


		},
		error: function (ts) {
			$('#xfrescriptspinner').hide();
			console.log(ts.responseText);
		},
		
	});

});

$("#testxferscriptpostbutton").click(function(e) {
	
	e.preventDefault();
	cleardivs();
	$('#xfrescriptspinner').show();
			
	$.ajax({
		url:  base_api_uri+"/xferscriptpost/" + test_api_key,
		type: "POST",
		data: {
        location: chance.integer({min: 0, max: 1}),
        first_name: chance.first(),
        last_name: chance.last(),
   	  email: chance.email(),
    	  phone_number: chance.phone(),
    	  date_birth: chance.birthday({string: true}),
    	  pharmacy_name: chance.name(),
    	  pharmacy_number: chance.phone(),
    	  prescription_number_1: chance.natural(),
    	  prescription_name_1: chance.string({length: 9}),
    	  prescription_number_2: chance.natural(),
    	  prescription_name_2: chance.string({length: 9}),
    	  prescription_number_3: chance.natural(),
    	  prescription_name_3: chance.string({length: 9}),
    	  prescription_number_4: chance.natural(),
    	  prescription_name_4: chance.string({length: 9}),
    	  message: chance.paragraph()
    	},
		contentType: "application/x-www-form-urlencoded",
		dataType: 'json',
		xhrFields: {
			withCredentials: true
		},
		success: function (data, status, jqXHR) {
			
			$('#xfrescriptspinner').hide();
			$("#outputpre").append(JSON.stringify(data, undefined, 2));
			$("#headerpre").text(jqXHR.getAllResponseHeaders());
								
			$.each(data, function (key, value) {
				//handle the data  
				console.log(key,value);
			});


		},
		error: function (ts) {
			$('#xfrescriptspinner').hide();
			console.log(ts.responseText);
		},
		
	});

});


$("#testnewscriptpostbutton").click(function(e) {
	
	e.preventDefault();
	cleardivs();
	$('#newscriptspinner').show();
			
	$.ajax({
		url:  base_api_uri+"/newscriptpost/" + test_api_key,
		type: "POST",
		data: {
        location: chance.integer({min: 0, max: 1}),
        first_name: chance.first(),
        last_name: chance.last(),
   	  email: chance.email(),
    	  phone_number: chance.phone(),
    	  date_birth: chance.birthday({string: true}),
    	  provider_name: chance.name(),
    	  provider_number: chance.phone(),
    	  medication_number_1: chance.natural(),
    	  medication_name_1: chance.string({length: 9}),
    	  medication_number_2: chance.natural(),
    	  medication_name_2: chance.string({length: 9}),
    	  medication_number_3: chance.natural(),
    	  medication_name_3: chance.string({length: 9}),
    	  medication_number_4: chance.natural(),
    	  medication_name_4: chance.string({length: 9}),
    	  message: chance.paragraph()
    	},
		contentType: "application/x-www-form-urlencoded",
		dataType: 'json',
		xhrFields: {
			withCredentials: true
		},
		success: function (data, status, jqXHR) {
			
			$('#newscriptspinner').hide();
			$("#outputpre").append(JSON.stringify(data, undefined, 2));
			$("#headerpre").text(jqXHR.getAllResponseHeaders());
								
			$.each(data, function (key, value) {
				//handle the data  
				console.log(key,value);
			});


		},
		error: function (ts) {
			$('#newscriptspinner').hide();
			console.log(ts.responseText);
		},
		
	});

});

