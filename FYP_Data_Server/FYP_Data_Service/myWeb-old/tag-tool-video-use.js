var totalduration;

function popupVideoloaded(video){

	totalduration = $("#video-player").duration;

	console.log("popupVideoloaded totalduration = " + totalduration);

	var myVideo = $("#video-player");

	myVideo.on('canplay', function (){
		totalDuration = Math.round(this.duration);
		console.log("recall myVideo = " + myVideo + " totalDuration = "+ totalDuration);

	//var totalTags = 1;
		// How to call slider??
		$("#tag-video-slider").slider({
	      range: true,
	      min: 0,
	      max: totalduration,
	      values: [ 0, totalduration ],
	      slide: function( event, ui ) {
	      	console.log("ui.value = [" + ui.values[ 0 ] + ", " + ui.values[ 1 ] + "]");
	        $( "#video-tag-start" ).val( ui.values[ 0 ] );
	        $( "#video-tag-end" ).val( ui.values[ 1 ] );
	        if ($( "#video-tag-start" ).hasClass("invaid")){
				$( "#video-tag-start" ).removeClass("invalid");
			}
	        if ($( "#video-tag-end" ).hasClass("invaid")){
				$( "#video-tag-end" ).removeClass("invalid");
			}
	      }
	    });

	    $( "#video-tag-start" ).val( 0 );
	    $( "#video-tag-end" ).val( totalduration );
	    //var width = 0.6 * 0.9 * 100;
	    //$('.ui-slider').width('50%');
		$("#video-tag-start").on('keyup', function (e){
			var o = $(this);
			var valid = keyupValidation(o);
			//console.log("valid = " + valid);
			if (valid){
				//console.log("$(this).val() = "+ $(this).val());
				$("#tag-video-slider").slider('values', 0, $(this).val());
			}
		});

		$("#video-tag-end").on('keyup', function (e){
			var o = $(this);
			var valid = keyupValidation(o);
			//console.log("valid = " + valid);
			if (valid){
				//console.log("$(this).val() = "+ $(this).val());
				$("#tag-video-slider").slider('values', 1, o.val());
			}
		});
	});
}
