$('#home').on('pageinit', function(){
	
});

$('#data-item').on('pageshow', function(){
	var typeArr = urlVars("=");
	var type = typeArr[1];
	console.log(type);
	$('.delete').on('click', function(){
		console.log('delete clicked');
		deleteItem(type);
		return false;
	});
	$('.edit').on('click', function(){
		console.log('edit clicked');
		editItem(type);
		return false;
	});
});

$('#data-items').on('pageshow', function(){
	console.log("data items fired");
	var typeArr = urlVars("=");
	var type = typeArr[1];
	$("#dataButtons").controlgroup('refresh');

	$("#all" ).off();
	$("#closed").off();
	$("#open").off();
	
	//Click events to sort a category
	$("#all").on('click', function(){
		console.log("Display all");
		$.couch.db('jobapp').view('app/all-' + type, {
			success: function(data) {
				console.log(data);
				$('#dataDisplayList').empty();
				$.each(data.rows, function(index, data) {
					console.log(data);
					var status = (data.key[2] === 0) ? "Open PenTest" : "Closed PenTest";
					var due = (data.key[1]).join("/");
					var job = data.key[0];
					var customer = data.value.customer;
					var qty = data.value.qty;
					var prodt = data.value.prodt;
					var theme = (status === "Open PenTest" ) ? 'b' : 'a';
					$(
						'<li data-role="divider" data-theme=' + theme + ' id="jobDiv">' + 'PenTest#: ' + job  + '<span class="dividerMargin">'+ status + '</span>' + '<span class="dividerMargin">'+ "Due: " + due + '</span>' + '</li>' +
						'<li>' + '<a href=#data-item?item=' + data.id + '>' +
						'<p class="ui-li-desc">' + '<strong>' + customer + '</strong>' + '</p>' +
						'<p class="ui-li-desc">' + "Approx number of Intrusions: " + qty + '</p>' +
						'<p class="ui-li-desc">' + "Projected # of Patches Req: " + prodt + '</p>' +
						'</a></li>'
						).appendTo('#dataDisplayList');
				});
				$('#dataDisplayList').listview('refresh');
			}
		});
		return false;
	});
	$("#closed").on('click', function(){
		console.log("Display closed");
		$.couch.db('pentester2').view('app/all-' + type + '-status?startkey=[1,0]&endkey=[1,{}]' , {
			success: function(data) {
				console.log(data);
				$('#dataDisplayList').empty();
				$.each(data.rows, function(index, data) {
					console.log(data);
					var status = (data.key[0] === 0) ? "Open PenTest" : "Closed PenTest";
					var due = (data.value.due).join("/");
					var job = data.key[1];
					var customer = data.value.customer;
					var qty = data.value.qty;
					var prodt = data.value.prodt;
					var theme = (status === "Open PenTest" ) ? 'b' : 'a';
					$(
						'<li data-role="divider" data-theme=' + theme + ' id="jobDiv">' + 'PenTest#: ' + job  + '<span class="dividerMargin">'+ status + '</span>' + '<span class="dividerMargin">'+ "Due: " + due + '</span>' + '</li>' +
						'<li>' + '<a href=#data-item?item=' + data.id + '>' +
						'<p class="ui-li-desc">' + '<strong>' + customer + '</strong>' + '</p>' +
						'<p class="ui-li-desc">' + "Approx number of Intrusions: " + qty + '</p>' +
						'<p class="ui-li-desc">' + "Projected # of Patches Req: " + prodt + '</p>' +
						'</a></li>'
						).appendTo('#dataDisplayList');
				});
				$('#dataDisplayList').listview('refresh');
			}
		});
		return false;
	});
	$("#open").on('click', function(){
		console.log("Display open");
		$.couch.db('pentester2').view('app/all-' + type + '-status?startkey=[0,0]&endkey=[0,{}]', {
			success: function(data) {
				console.log(data);
				$('#dataDisplayList').empty();
				$.each(data.rows, function(index, data) {
					console.log(data);
					var status = (data.key[0] === 0) ? "Open PenTest" : "Closed PenTest";
					var due = (data.value.due).join("/");
					var job = data.key[1];
					var customer = data.value.customer;
					var qty = data.value.qty;
					var prodt = data.value.prodt;
					var theme = (status === "Open PenTest" ) ? 'b' : 'a';
					$(
						'<li data-role="divider" data-theme=' + theme + ' id="jobDiv">' + 'PenTest#: ' + job  + '<span class="dividerMargin">'+ status + '</span>' + '<span class="dividerMargin">'+ "Due: " + due + '</span>' + '</li>' +
						'<li>' + '<a href=#data-item?item=' + data.id + '>' +
						'<p class="ui-li-desc">' + '<strong>' + customer + '</strong>' + '</p>' +
						'<p class="ui-li-desc">' + "Approx number of Intrusions: " + qty + '</p>' +
						'<p class="ui-li-desc">' + "Projected # of Patches Req: " + prodt + '</p>' +
						'</a></li>'
						).appendTo('#dataDisplayList');
				});
				$('#dataDisplayList').listview('refresh');
			}
		});
		return false;
	});
});

var urlVars = function(splitVal){
	var urlData = $.mobile.path.parseUrl(window.location.href);
	var type = urlData.hash.split(splitVal);

	return type;
}
	
$('#addItem').on('pageinit', function(){

	$('#jobContain').hide();
	$('input:radio[value="No"]').prop("checked", true).checkboxradio("refresh");
	$('input:radio[value=0]').prop("checked", true).checkboxradio("refresh");
	var myDate = new Date();
    var month = myDate.getMonth() + 1;
    var dateVal = myDate.getFullYear() + '-' + month + '-' + myDate.getDate();
    $("#requestDate").val(dateVal);
    if ($("#closedAdvanced-PenTest").val()){
    	$('#customContain').show();
    } else {
    	$('#customContain').hide();
    }
    $('#jobTypeList').change(function() {
		console.log("fired");
		if ($("#jobTypeList").val() === "Closed Advanced PenTest") {
			$('#customContain').show();

		} else {
			$('#customContain').hide();

		}
	});
    
	var myForm = $('#penTestInfo'),
		errorsLink = $("#errorsLink");
	var validator = myForm.validate({
		rules: {
			"select-choice-min" : {
				required: true,
			},
			closedAdvanced-PenTest: {
				required: function(element) {
					return ($("#select-choice-min").val() === "Custom");
				}
			},
			qty: {
				required: true,
				min: 1
			},
			mitigationStrategy: {
				required: true,
				min: 1
			}
		},
			messages: {
				qty: { min: jQuery.format("Must be greater than {0}.")}
				mitigationStrategy: { min: jQuery.format("Must be greater than {0}.")}

			},

		invalidHandler: function(form, validator) {
			var html = "";
			for(var key in validator.submitted){
				var label = $('label[for^="'+ key +'"]').not("[generated]");
					//console.log(label.text());
				var legend = label.closest("fieldset").find(".ui-controlgroup-label");
				var fieldName = legend.length ? legend.text() : label.text();
				html += "<li>" + fieldName + "</li>";
			};
			$("#formErrors ul").html(html);
		},
		submitHandler: function(form) {
			
			docCreate(myForm.serializeArray());
			form.reset();
			$('#jobContain').hide();
			$("#jobTypeList").val("").selectmenu('refresh'); 
		}
	});
	


});


$(document).on( "pagebeforechange", function( e, data ) {

	if ( typeof data.toPage === "string" ) {
			var u = $.mobile.path.parseUrl( data.toPage ),
			re1 = /^#data-items/,
			re2 = /^#data-item/;
		if ( u.hash.search(re1) !== -1 ) {
			getCategory( u, data.options );
			e.preventDefault();
		} else if ( u.hash.search(re2) !== -1 ) {
			getItem( u, data.options );
			e.preventDefault();
		}
	}
});

var getItem = function ( urlObj, options ){
	var jobID = urlObj.hash.replace( /.*item=/, "" ),
	pageSelector = urlObj.hash.replace( /\?.*$/, "" ),
	$page = $( pageSelector ),
	$header = $page.children( ":jqmData(role=header)" )
	$content = $page.children( ":jqmData(role=content)" );
	
	var editLink = "<div class='ui-grid-a'><div class='ui-block-a'><a class='edit' data-role='button' data-theme='b' data-icon='plus' href='#'>Edit</a></div>";
	var deleteLink = "<div class='ui-block-b'><a class='delete' data-role='button' data-theme='b' data-icon='minus' href='#'>Delete</a></div></div>";
	
	$('#jobDisplay').empty();
	$.couch.db('jobapp').openDoc(jobID, {
		success: function(data) {
			console.log(data);
			var status = (data.Status === 0) ? "Open PenTest" : "Closed PenTest";
			$(		'<div id=itemInfo>' +
					'<p class="ui-li-aside ui-li-desc">'+ "Due: " + data["Complete-By Date"].join("/") + '</p>' +
					'<p class="ui-li-desc">' + '<strong>' + data["Company"] + '</strong>' + '</p>' +
					'<p class="ui-li-desc">' + " PenTest Complexity " + data["Job Type"] + '</p>' +
					'<p class="ui-li-desc">' + "Approx number of Intrusions: " + data["number of Intrusions"] + '</p>' +
					'<p class="ui-li-desc">' + " Projected # of Patches Req: " + data["Mitigation Strategy"] + "hrs" + '</p>' +
					'<p class="ui-li-desc">' + " Date Requested: " + (data["Date Requested"]).join("/") + '</p>' +
					'<p class="ui-li-desc">' + " Status: " + status + '</p>' +
					'</div>'
				).appendTo('#jobDisplay');
			$('#jobDisplay').find('#itemInfo');
			$('#itemInfo').append(editLink + deleteLink);
			$('#jobDisplay').find( ":jqmData(role=button)" ).button();
		}
		
	});
	
	$page.page();
	$('#jobDisplay').find( ":jqmData(role=button)" ).button();
	options.dataUrl = urlObj.href;
	$.mobile.changePage( $page, options );
};

var getCategory = function( urlObj, options ){
	var categoryName = urlObj.hash.replace( /.*category=/, "" ),
		pageSelector = urlObj.hash.replace( /\?.*$/, "" ),

		$page = $( pageSelector ),

		$header = $page.children( ":jqmData(role=header)" )

		$content = $page.children( ":jqmData(role=content)" );
		
		console.log("cat: " + categoryName);
		console.log("page: " + pageSelector);
		
	
	$.couch.db('jobapp').view('app/all-' + categoryName, {
		success: function(data) {
			console.log(data);
			$('#dataDisplayList').empty();
			$.each(data.rows, function(index, data) {
				console.log(data);
				var status = (data.key[2] === 0) ? "Open PenTest" : "Closed PenTest";
				var due = (data.key[1]).join("/");
				var job = data.key[0];
				var customer = data.value.customer;
				var qty = data.value.qty;
				var prodt = data.value.prodt;
				var theme = (status === "Open PenTest" ) ? 'b' : 'a';
				$(
					'<li data-role="divider" id="jobDiv">' + 'PenTest#: ' + job  + '<span class="dividerMargin">'+ status + '</span>' + '<span class="dividerMargin">'+ "Due: " + due + '</span>' + '</li>'
				).appendTo('#dataDisplayList').attr('data-theme', theme);
				$(
					'<li><a href=#data-item?item=' + data.id + '>' +
					'<p class="ui-li-desc">' + '<strong>' + customer + '</strong>' + '</p>' +
					'<p class="ui-li-desc">' + "Approx number of Intrusions: " + qty + '</p>' +
					'<p class="ui-li-desc">' + " Projected # of Patches Req: " + prodt + "hrs" + '</p>' +
					'</a></li>'
				).appendTo('#dataDisplayList');
			});
			$('#dataDisplayList').listview('refresh');
		}
	});
	
	if(categoryName === "jobs"){
		$("#data-items").find("h1").html("All PenTests");
	}else {
		$("#all").show();
		var type = categoryName;
		var typeSplit = type.split("");
		typeSplit[0] = typeSplit[0].toUpperCase();
		var typeLower = typeSplit.join("");
		$("#data-items").find("h1").html( typeLower + " Jobs");
	}
		$page.page();
		$content.find( ":jqmData(role=collapsible-set)" ).collapsibleset();
		$content.find( ":jqmData(role=listview)" ).listview();
		$content.find( ":jqmData(role=button)" ).button();
		$content.find( ":jqmData(role=controlgroup)" ).controlgroup();
		options.dataUrl = urlObj.href;
		$.mobile.changePage( $page, options );

};

var docSave = function (doc){
	$.couch.db("pentester2").saveDoc(doc, {
		success: function(data) {
			console.log(data);
		},
		error: function(status) {
			console.log(status);
		}
	});
}

var docInsert = function (id,rev,nextJobNum,formData){
	var doc = {};
		if(id === 0 && rev === 0){
			var type = formData[12].value
			var typeSplit = type.split("");
			typeSplit[0] = typeSplit[0].toLowerCase();
			var typeLower = typeSplit.join("");
			var order = (formData[8].value).split('-');
			for(var i=0; i < order.length; i++) { order[i] = +order[i]; } 
			var due = (formData[9].value).split('-');
			for(var n=0; n < due.length; n++) { due[n] = +due[n]; }
			var jobType = formData[12].value;
			doc._id = "job:"+ typeLower + ":" + nextJobNum;
			doc["PenTest Number"] = nextJobNum;
			doc.Status = Number(formData[11].value);
			doc.Company = formData[1].value;
			doc.Address = formData[2].value;
			doc.City = formData[3].value;
			doc.State = formData[4].value;
			doc.Zipcode = Number(formData[5].value);
			doc.Phone = formData[6].value;
			doc.Email = formData[7].value;
			doc["Order Date"] = order;
			doc["Complete-By Date"] = due;
			doc["Rush Order"] = formData[10].value;
			doc["Job Type"] = formData[12].value;
			doc["Additional Info"] = formData[13].value;
			doc.number of Intrusions = Number(formData[14].value);
			doc["Mitigation Strategy"] = Number(formData[15].value);
			doc["Design Effort"] = Number(formData[16].value);
		} else {
			var order = ($("#requestDate").val()).split('-');
			for(var i=0; i < order.length; i++) { order[i] = +order[i]; } 
			var due = ($("#completeByDate").val()).split('-');
			for(var n=0; n < due.length; n++) { due[n] = +due[n]; }
			var jobType = $("#jobTypeList").val();
			doc._id = id;
			doc._rev = rev;
			doc["PenTest Number"] = Number($("#jobnum").val());
			doc.Status = Number($('input:radio[name=status]:checked').val());
			doc.Company = $("#client").val();
			doc.Address = $("#address").val();
			doc.City = $("#city").val();
			doc.State = $("#state").val();
			doc.Zipcode = Number($("#zipcode").val());
			doc.Phone = $("#phone").val();
			doc.Email = $("#email").val();
			doc["Order Date"] = order;
			doc["Complete-By Date"] = due;
			doc["Rush Order"] = $('input:radio[name=rush]:checked').val();
			doc["Job Type"] = jobType;
			doc["Additional Info"] = $("#Additional Info").val();
			doc.number of Intrusions = Number($("#qty").val());
			doc["Mitigation Strategy"] = Number($("#mitigationStrategy").val());
			doc["Design Effort"] = Number($("#slider-fill").val());
		}
	return doc;		
};

var docCreate = function(formData){
	console.log("Start docCreate");
	console.log(formData);
	var docIdArr = urlVars("_");
	if (docIdArr[0] === "#addItem"){
		$.couch.db('pentester2').view('app/all-pentests', {
			success: function(data) {
				var lastIndex = data.total_rows - 1;
				nextJobNum = data.rows[lastIndex].key[0] + 1;
				console.log(nextJobNum);
				var doc = docInsert(0,0,nextJobNum,formData);
				console.log(doc);
				docSave(doc);
				$.mobile.changePage('#data-item?item=' + doc._id, {changeHash: false});
			}
		});
	} 
	else {
		console.log(docIdArr);
		console.log((docIdArr[0]).substr(1));
		var rev = docIdArr[1];
		var id = docIdArr[0].substr(1);
		var doc = docInsert(id,rev);
		console.log(doc);
		docSave(doc);
		$.mobile.changePage('#data-item?item=' + (docIdArr[0]).substr(1), {changeHash: false});
	}
	console.log("End saveData");
};

var	deleteItem = function (docId){
	$.couch.db("pentester2").openDoc(docId, {
		success: function(data) {
			var re = /.*:/
			rev = data._rev
			jobNum = (data._id).replace(re, "");
			var doc = {"_id": data._id, "_rev": data._rev};
			var ask = confirm("Are you sure you want to delete job #:" + jobNum + " ?");
			if(ask){
				$.couch.db("pentester2").removeDoc(doc, {
					success: function(data) {
						console.log(data);
						var begin = (data.id).indexOf(':') + 1;
						var end = (data.id).lastIndexOf(':');
						var type = (data.id).slice(begin,end);
						var typeSplit = type.split("");
						typeSplit[0] = typeSplit[0].toLowerCase();
						var typeUrl = typeSplit.join("");
						$.mobile.changePage("#data-items?category=" + typeUrl);
					}
				});
			} else{
				alert("PenTest#:" + jobNum + " was NOT deleted.");
			}
		}
	});
};

var editItem = function (docId){
	console.log(docId);
	$.couch.db("pentester2").openDoc(docId , {
		success: function(data) {
			console.log(data);
			var rev = data._rev;
			console.log(docId + rev);
			var re = /.*:/
			var jobNum = (data._id).replace(re, "");
			var doc = {"_id": data._id, "_rev": data._rev}; 
			console.log(jobNum);
			$.mobile.changePage( "#addItem", {dataUrl: data._id + "_" + data._rev} );
			$('#jobContain').show();
			$("#jobnum").val(jobNum);
			$("#client").val(data.Company);
			$("#address").val(data.Address);
			$("#city").val(data.City);
			$("#state").val(data.State);
			$("#zipcode").val(data.Zipcode);
			$("#phone").val(data.Phone);
			$("#email").val(data.Email);
			$("#requestDate").val((data["Date Requested"]).join("-"));
			$("#completeByDate").val((data["Complete-By Date"]).join("-"));
			$("#jobTypeList").val(data["Job Type"]);
			$("#custom").val(data["Additional Info"]);
			$("#qty").val(data.number of Intrusions);
			$("#mitigationStrategy").val(data["Mitigation Strategy"]);
			$("#slider-fill").val(data["Design Effort"]);
			$('select').selectmenu('refresh', true);
			if(data["Rush Order"] === "Yes"){
				$('input:radio[value="Yes"]').prop("checked", true).checkboxradio("refresh");
				$('input:radio[value="No"]').prop("checked", false).checkboxradio("refresh");
			} else {
				$('input:radio[value="Yes"]').prop("checked", false).checkboxradio("refresh");
				$('input:radio[value="No"]').prop("checked", true).checkboxradio("refresh");
			}
			if(data.Status === 0){
				$('input:radio[value=0]').prop("checked", true).checkboxradio("refresh");
				$('input:radio[value=1]').prop("checked", false).checkboxradio("refresh");
			} else {
				$('input:radio[value=0]').prop("checked", false).checkboxradio("refresh");
				$('input:radio[value=1]').prop("checked", true).checkboxradio("refresh");
			}
			console.log("ran editItem");
		}
	});
};

var csvToObject = function(data){
		var obj = {};
		var values = [];

		var rows = data.split('\r');
	
		var keys = rows[0].split(';');

		for(var l=1, m=rows.length; l<m;l++){
			values.push(rows[l].split(';'));
		}
		

		re = /\,(\w|\w)/; 
		for(var i=0, j=values.length; i<j;i++){
			
			var newObj = {};
			for(var k=0, l=values[i].length; k<l; k++){
				
				if(re.test(values[i][k]) ){
					
					var subArr = values[i][k].split(',');
					
					values[i][k] = subArr;
					
				}
				newObj[keys[k]] = values[i][k];
			}
			var key = values[i][0];
			obj[key] = newObj;
		}
		
	
		return obj;
};;
