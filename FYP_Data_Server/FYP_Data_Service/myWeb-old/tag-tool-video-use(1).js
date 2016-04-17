function checkMin(input, min){
	if (input >= min)
		return true;
	else return false;
}

function checkMax(input, max){
	if (input <= max)
		return true;
	else return false;
}

function checkifInvalidExist(total){
	var exist = $("input").hasClass("invalid");
	if (exist)
		$('p').html("Input range should be 0 to " + total);
	else $('p').empty();
}

function keyupValidation(obj){

	console.log("on Keyup! this = " + obj);
	var result;
	var input = obj.val();
	var largerthenmin = checkMin(input, 0);
	var smallerthenmax = checkMax(input, totalDuration);
	//console.log("on Keyup input = " + input + ", largerthenmin = " + largerthenmin + ", smallerthenmax = " + smallerthenmax);
	if (largerthenmin === false || smallerthenmax === false){
		//console.log("Invalid!");
		//$('p').html("Input range should be 0 to " + totalpages);
		obj.addClass("invalid");
		result = false;
	}
	else if (isNaN(input) || input === ""){
		obj.addClass("invalid");
		result = false;
	}else {
		if (obj.hasClass("invalid")){
			//console.log("hasClass invalid");
			//$('p').empty();
			obj.removeClass("invalid");
		}
		result = true;
	}
	checkifInvalidExist(totalDuration);
	return result;
}

function getCurrentTime(video){
	var current = video.currentTime;
}

var totalDuration;

$(document).ready(function(){

	var totalTags = 1;

	var myVideo = $("#video-player");

	myVideo.on('canplay', function (){
		totalDuration = Math.round(this.duration);
		console.log("recall totalDuration = "+ totalDuration);

		// How to call slider??
		$("#page-slider-1").slider({
	      range: true,
	      min: 0,
	      max: totalDuration,
	      values: [ 0, totalDuration ],
	      slide: function( event, ui ) {
	      	console.log("ui.value = [" + ui.values[ 0 ] + ", " + ui.values[ 1 ] + "]");
	        $( "#page-start-1" ).val( ui.values[ 0 ] );
	        $( "#page-end-1" ).val( ui.values[ 1 ] );
	        if ($( "#page-start-1" ).hasClass("invaid")){
				$( "#page-start-1" ).removeClass("invalid");
			}
	        if ($( "#page-end-1" ).hasClass("invaid")){
				$( "#page-end-1" ).removeClass("invalid");
			}
	      }
	    });
	    /*$( "#page-start-1" ).attr({
	    	min: 0,
	    	max: totalpages 
	    });
	    $( "#page-end-1" ).attr({
	    	min: 0,
	    	max: totalpages 
	    });*/
	    $( "#page-start-1" ).val( 0 );
	    $( "#page-end-1" ).val( totalDuration );
	    //var width = 0.6 * 0.9 * 100;
	    //$('.ui-slider').width('50%');
		$("#page-start-1").on('keyup', function (e){
			var o = $(this);
			var valid = keyupValidation(o);
			//console.log("valid = " + valid);
			if (valid){
				//console.log("$(this).val() = "+ $(this).val());
				$("#page-slider-1").slider('values', 0, $(this).val());
			}
		});

		$("#page-end-1").on('keyup', function (e){
			var o = $(this);
			var valid = keyupValidation(o);
			//console.log("valid = " + valid);
			if (valid){
				//console.log("$(this).val() = "+ $(this).val());
				$("#page-slider-1").slider('values', 1, o.val());
			}
		});

		$("#add-new-slider").on('click', function(event){
			console.log("add-new-slider Clicked!");
			var newtag = totalTags +1;
			var container = $('<div>', {
				'id': "slider-"+newtag,
				'class': "ui-grid-b"
			});
			var start_container = $('<div>', {
			 'class': "page-start-container ui-block-a",
			 'style':"width:20%;"
			});
			var start_label = $('<label>', {
				'for': "page-start-"+newtag,
			});
			start_label.html("Start:");
			var start_text = $('<input>', {
				'type':"text",
				'name':"page-start-"+newtag,
				'class': "page-start",
				'id': "page-start-"+newtag
			});
			start_container.append(start_label).append(start_text);

			var slider_container = $('<div>', {
			 'class': "page-range-container ui-block-b",
			 'style':"width:60%;",
			 'id': "page-slider-"+newtag
			});

			var end_container = $('<div>', {
			 'class': "page-end-container ui-block-c",
			 'style':"width:20%;"
			});

			var end_label = $('<label>', {
				'for': "page-end-"+newtag,
			});
			end_label.html("End:");
			var end_text = $('<input>', {
				'type':"text",
				'name':"page-end-"+newtag,
				'class': "page-end",
				'id': "page-end-"+newtag
			});
			end_container.append(end_label).append(end_text);

			container.append(start_container).append(slider_container).append(end_container);
			// jQuery mobile adds its own styles and classes at Page load.
			//The element which are added later need to .trigger("create"); 
			// TO let jQuery mobile adds styles and classes to new elements added .
			container.appendTo($("#slider-container")).enhanceWithin();

			totalTags = totalTags +1;

			slider_container.slider({
		      range: true,
		      min: 0,
		      max: totalDuration,
		      values: [ 0, totalDuration ],
		      slide: function( event, ui ) {
		      	console.log("ui.value = [" + ui.values[ 0 ] + ", " + ui.values[ 1 ] + "]");
		        start_text.val( ui.values[ 0 ] );
		        end_text.val( ui.values[ 1 ] );
		        if (start_text.hasClass("invaid")){
					start_text.removeClass("invalid");
				}
		        if (end_text.hasClass("invaid")){
					end_text.removeClass("invalid");
				}
		      }
		    });
		    start_text.val( 0 );
		    end_text.val( totalDuration );

		    start_text.on('keyup', function (e){
				var o = $(this);
				var valid = keyupValidation(o);
				//console.log("valid = " + valid);
				if (valid){
					//console.log("$(this).val() = "+ $(this).val());
					slider_container.slider('values', 0, o.val());
				}
		    });
			end_text.on('keyup', function (e){
				var o = $(this);
				var valid = keyupValidation(o);
				//console.log("valid = " + valid);
				if (valid){
					//console.log("$(this).val() = "+ $(this).val());
					slider_container.slider('values', 1, o.val());
				}
			});
		});
	});

	
	console.log("recall selected_KnowlodgePoint_id = "+ Cookies.get('selected_KnowlodgePoint_id'));


	//$('.slider-container').on('slidestop', function (event){
		//console.log("Slide stop on: ");
	//});

	//$("#pdf-viewer").setHeight();

	/*$(".page-start").on('keyup',function (e){
		var input = $(this).val();

	});

	$(".page-end").on('keyup',function (e){

	});*/

	$("#add-new-tag").on('click', function (event){
		
	});

});