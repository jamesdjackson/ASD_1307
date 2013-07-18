<!--James Jackson-->
<!--ASD 1307-->
<!--Project 1-->

$('#splash').on('pageinit', function(){
});

$('#penTestDataItems').on('pageinit', function(){
});

$('#newPenTest').on('pageshow', function(){
	var thisDate = new Date();
    var month = thisDate.getMonth() + 1;
    var dateVal = thisDate.getFullYear() + '-' + month + '-' + thisDate.getDate();
    $("#penTestDate").val(dateVal);
    if ($("#additionalData").val()){
    	$('#addonData').show();
    } else {
    	$('#addonData').hide();
    }
    $('#penTestType').change(function() {
		console.log("fired");
		if ($("#penTestType").val() === "Custom") {
			$('#addonData').show();

		} else {
			$('#addonData').hide();

		}
	});

var penTestEnumerator;
	var myForm = $('#testForm'),
		errorsLink = $("#errorsLink");
    var inputCheck;
    inputCheck = myForm.validate({
        required:{
            "penTestList":{
                required:true
            },
            custom:{
                required:function (element) {
                    return ($("#penTestType").val() === "PenTest Type");
                }
            }
        },
        messages:{
            qty:{ min:jQuery.format("Greater than {0}") }
        },

        invalidHandler:function (form, inputCheck) {
            errorsLink.click();
            var html = "";
            for (var key in inputCheck.submitted) {
                var label = $('label[for^="' + key + '"]').not("[generated]");
                var legend = label.closest("fieldset").find(".ui-controlgroup-label");
                var fieldName = legend.length ? legend.text() : label.text();
                html += "<li>" + fieldName + "</li>";
            }
            $("#formErrors").find("ul").html(html);
        },
        submitHandler:function (form) {
            storeData($("#testID").val());
            form.reset();
            testSequence();
        }
    });
	$(".reset").on('click',function() {
		window.location.reload();
	});
	testSequence($("#testID").val());
	$("#clearData").on('click',function() {
		clearLocal();
		window.location.reload();
	});
});

$(document).on( "pagebeforechange", function( e, data ) {
	if ( typeof data.toPage === "string" ) {
		var u = $.mobile.path.parseUrl( data.toPage ),
			re = /^#penTestDataItems/;
		if ( u.hash.search(re) !== -1 ) {
			getPenTests( u, data.options );
			e.preventDefault();
		}
	}
});

var fakePenTests = function (){
	for(var n in json){
		var id = n;
		localStorage.setItem(id, JSON.stringify(json[n]));
	}
};

var getPenTests = function( urlObj, options ){
	var categoryName = urlObj.hash.replace( /.*category=/, "" ),
		pageSelector = urlObj.hash.replace( /\?.*$/, "" ),
		$page = $( pageSelector ),
		$header = $page.children( ":jqmData(role=header)" ),
		$content = $page.children( ":jqmData(role=content)" );
		structure = "<div id='penTests' data-role='collapsible-set' data-content-theme='b'>",
		semantics = "";
		console.log("cat: " + categoryName);
		console.log("page: " + pageSelector);
	if (localStorage.length === 1 && localStorage.getItem("jobNumber")){
		alert("Adding notional PenTest data.");
		fakePenTests();
	}

var penTestSerializer = [];
	for(var i = 0, j = localStorage.length; i < j; i++){
		if(Number(localStorage.key(i))/1 === Number(localStorage.key(i))){
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var localData = JSON.parse(value);
			var editLink = "<div class='ui-grid-a'><div class='ui-block-a'><a class='edit' data-role='button' data-theme='b' data-icon='plus' href='#'>Edit Job</a></div>";
			var deleteLink = "<div class='ui-block-b'><a class='delete' data-role='button' data-theme='b' data-icon='minus' href='#'>Delete Test</a></div></div>";
			if (categoryName === localData["penTestType"][1] ){
				penTestSerializer.push(key);
				semantics += "<div id='jobUni' data-role='collapsible' data-inset='true'><h3>" +
                    ": " + localData["penTestID"][1] + "</h3><ul data-role='listview' data-inset='true'>";
				for(var n in localData){
					var object = localData[n];
					semantics += "<li>" + object[0] + ": " +object[1] + "</li>";
				}
				semantics += "</ul>" + editLink + deleteLink + "</div>";
			} else if ( categoryName === "displayAll"){
				penTestSerializer.push(key);
				semantics += "<div id='jobUni' data-role='collapsible' data-inset='true'><h3>" + ": " +
                    localData["penTestID"][1] + "</h3><ul data-role='listview' data-inset='true'>";
				for(var n in localData){
					var object = localData[n];
					semantics += "<li>" + object[0] + ": " +object[1] + "</li>";
				}
				semantics += "</ul>" + editLink + deleteLink + "</div>";
			}
		}
	}

	semantics +="</div></ul>";
	if (categoryName != "displayAll"){
		$header.find( "h1" ).html(categoryName + " Jobs");
	} else {
		$header.find( "h1" ).html("All Jobs");
	}
	$content.html( structure + semantics);
	$('.delete').each(function(i){
		this.key = penTestSerializer[i];
		$(this).on("click", deleteTest);
	});
	$('.edit').each(function(i){
		this.key = penTestSerializer[i];
		$(this).on("click", editItem);
	});
		$page.page();
		$content.find( ":jqmData(role=collapsible-set)" ).collapsibleset();
		$content.find( ":jqmData(role=listview)" ).listview();
		$content.find( ":jqmData(role=button)" ).button();
		options.dataUrl = urlObj.href;
		$.mobile.changePage( $page, options );
}, penTestEnumerator;

var testSequence = function (value){
	console.log("Start testSequence");
	console.log("testSequence value:");
	console.log(value);
	console.log(localStorage.getItem("jobNumber"));
	if (localStorage.getItem("jobNumber") !== value && value !== "" && value !== undefined ){
		console.log("First testSequence");
	} else if (localStorage.getItem("jobNumber")) {
		penTestEnumerator = localStorage["jobNumber"];
		$("#testID").val(Number(penTestEnumerator));
		console.log("Second testSequence");
	} else {
		penTestEnumerator = 0099;
		localStorage.setItem("jobNumber", penTestEnumerator.toString());
		$("#testID").val(penTestEnumerator);
		console.log("testSequence");
	};
	console.log("testSequence");
};

var storeData = function(key){
	console.log("Start storeData");
	console.log("storeData key:");
	console.log(key);
	if (!key || key === undefined){
		var id = penTestEnumerator;
		var num = Number($("#testID").val())+1;
		localStorage["jobNumber"] = num.toString();
	} else {
		var id = key;
		
	}
	var penTestForm				= {};
		penTestForm.penTestID		= ["PenTest ID", $("#testID").val()];
		penTestForm.clientID		= ["Client ID", $("#clientID").val()];
		penTestForm.address		= ["Address", $("#address").val()];
		penTestForm.city		= ["City", $("#city").val()];
		penTestForm.state		= ["State", $("#state").val()];
		penTestForm.zipcode		= ["Zipcode", $("#zipcode").val()];
		penTestForm.phone		= ["Phone", $("#phone").val()];
		penTestForm.email		= ["Email", $("#email").val()];
		penTestForm.penTestDate		= ["PenTestDate Date", $("#penTestDate").val()];
		penTestForm.incidentReponse	= ["Incident Response", $('input:radio[name=rush]:checked').val()];
		penTestForm.penTestType		= ["PenTest Type", $("#penTestType").val()];
		penTestForm.additionalData	= ["Custom Info", $("#additionalData").val()];
	localStorage.setItem(id, JSON.stringify(penTestForm));
	if (!key || key === undefined){
		alert(penTestEnumerator + " Saved");
	} else {
		alert(key + " Saved");
	}
	testSequence();
	console.log("storeData");
};

var	deleteTest = function (){
	var ask = confirm("Delete this?");
	if(ask){
		console.log(this.key);
		localStorage.removeItem(this.key);
		alert("PenTest was deleted!");
		$(this).parents().filter('#jobUni').remove();
		$( "#penTests" ).collapsibleset( "refresh" );
	} else{
		alert("Evidence was not deleted.");
	}
};

var editItem = function (){
	var value = localStorage.getItem(this.key);
	var penTestForm = JSON.parse(value);
	console.log(value);
	$.mobile.changePage( "#newPenTest");
	$("#testID").val(penTestForm.penTestID[1]);
	$("#clientID").val(penTestForm.clientID[1]);
	$("#address").val(penTestForm.address[1]);
	$("#city").val(penTestForm.city[1]);
	$("#state").val(penTestForm.state[1]);
	$("#zipcode").val(penTestForm.zipcode[1]);
	$("#phone").val(penTestForm.phone[1]);
	$("#email").val(penTestForm.email[1]);
	$("#penTestDate").val(penTestForm.penTestDate[1]);
	$('input:radio[name=rush]:checked').val(penTestForm.incidentReponse[1]);
	$("#penTestType").val(penTestForm.penTestType[1]);
	$("#additionalData").val(penTestForm.additionalData[1]);
	$('select').selectmenu('refresh', true);
	console.log("Ran editItem");
};
					
var clearLocal = function(){
	localStorage.clear();
	alert("All evidence deleted!");

};

$('#currentPenTest').on('pageinit', function(){
    $('#dataDisplayList').empty();
    $("#xml").on('click', function(){
        console.log("XML Format");
        $.ajax({
            url: 'xhr/data.xml',
            type: 'GET',
            dataType: 'xml',
            success: function(r){
                $('#dataDisplayList').empty();
                var penTests = $( r );
                console.log(r);
                penTests.find("job").each(function(){
                    var job = $(this);
                    $(
                        '<li data-role="list-divider">' + job.find("number").text() + '</li>' +
                            '<li>' +
                            '<p class="ui-li-aside ui-li-desc">' + job.find("tested").text() + '</p>' +
                            '<p class="ui-li-desc">' + '<strong>' + job.find("type").text() + " Job for " +
                                job.find("clientID").text() + '</strong>' + '</p>' +
                            '<p class="ui-li-desc">' + "Vulnerabilities: "+job.find("mitigations").text()+'</p>'+
                            '</li>'
                    ).appendTo('#dataDisplayList');
                });
                $('#dataDisplayList').listview('refresh');
            }
        });
        return false;
    });
});