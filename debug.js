var test_api_key = $("#keyvalue").val();
var base_api_uri = $("#urlvalue").val();

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
	$('#ajaxspinner').show();

}

function timerDisbleButtons() {
			
	$("#testprofilesbutton").prop('disabled', false);
	$("#testscriptsbutton").prop('disabled', false);
}

$("#testaboutbutton").click(function(e) {
	
	e.preventDefault();
	cleardivs();
		
	$.ajax({
		url:  base_api_uri+"/about/"+test_api_key,
		dataType: 'json',
		xhrFields: {
			withCredentials: true
		},
		success: function (data, status, jqXHR) {
			
			$('#ajaxspinner').hide();
			$("#outputpre").append(JSON.stringify(data, undefined, 4));
			$("#headerpre").text(jqXHR.getAllResponseHeaders());
			
			$.each(data, function (key, value) {
				//handle the data  
				console.log(key,value);
			});


		},
		error: function (ts) {
			$('#ajaxspinner').hide();
			console.log(ts.responseText);
		},
		
	});

});
$("#testservicesbutton").click(function(e) {
	
	e.preventDefault();
	cleardivs();
		
	$.ajax({
		url:  base_api_uri+"/services/"+test_api_key,
		dataType: 'json',
		xhrFields: {
			withCredentials: true
		},
		success: function (data, status, jqXHR) {
			                                                                     0
			$('#ajaxspinner').hide();
			$("#outputpre").append(JSON.stringify(data, undefined, 2));
			$("#headerpre").text(jqXHR.getAllResponseHeaders());
			
			$.each(data, function (key, value) {
				//handle the data  
				console.log(key,value);
			});


		},
		error: function (ts) {
			$('#ajaxspinner').hide();
			console.log(ts.responseText);
		},
		
	});

});

$("#testloginbutton").click(function(e) {
	
	e.preventDefault();
	cleardivs();
	
	var uid = $("#uid").val();
	var pwd = $("#pwd").val();
		
	$.ajax({
		url:  base_api_uri+"/login/" + uid + "/" + pwd + "/" + test_api_key,
		dataType: 'json',
		xhrFields: {
			withCredentials: true
		},
		success: function (data, status, jqXHR) {
			
			$('#ajaxspinner').hide();
			$("#outputpre").append(JSON.stringify(data, undefined, 2));
			$("#headerpre").text(jqXHR.getAllResponseHeaders());
			
			if (data.is_logged)  {
				
				window.setTimeout(timerDisbleButtons, 12000000);
				
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
			$('#ajaxspinner').hide();
			console.log(ts.responseText);
		},
		
	});

});


$("#testprofilesbutton").click(function(e) {
	
	e.preventDefault();
	cleardivs();
	
	var uid = $("#uid").val();
	var pwd = $("#pwd").val();
		
	$.ajax({
		url:  base_api_uri+"/profiles/" + test_api_key,
		dataType: 'json',
		xhrFields: {
			withCredentials: true
		},
		success: function (data, status, jqXHR) {
			
			$('#ajaxspinner').hide();
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
			$('#ajaxspinner').hide();
			console.log(ts.responseText);
		},
		
	});

});


$("#testscriptsbutton").click(function(e) {
	
	e.preventDefault();
	cleardivs();
	
	var profid = $("#profileid").val();
		
	$.ajax({
		url:  base_api_uri+"/patients/" + profid + "/" + test_api_key,
		dataType: 'json',
		xhrFields: {
			withCredentials: true
		},
		success: function (data, status, jqXHR) {
			
			$('#ajaxspinner').hide();
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
			$('#ajaxspinner').hide();
			console.log(ts.responseText);
		},
		
	});

});


$("#testpostbutton").click(function(e) {
	
	e.preventDefault();
	cleardivs();
	
	var uid = $("#uid").val();
	var pwd = $("#pwd").val();
		
	$.ajax({
		url:  base_api_uri+"/register/" + test_api_key,
		type: "POST",
		data: {
        password: pwd,
        userid: uid
    	},
		contentType: "application/x-www-form-urlencoded",
		dataType: 'json',
		xhrFields: {
			withCredentials: true
		},
		success: function (data, status, jqXHR) {
			
			$('#ajaxspinner').hide();
			$("#outputpre").append(JSON.stringify(data, undefined, 2));
			$("#headerpre").text(jqXHR.getAllResponseHeaders());
						
			
			$.each(data, function (key, value) {
				//handle the data  
				console.log(key,value);
			});


		},
		error: function (ts) {
			$('#ajaxspinner').hide();
			console.log(ts.responseText);
		},
		
	});

});

