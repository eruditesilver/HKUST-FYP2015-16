	function clearIndividual(){
		$(".popup-header").empty();
		$(".assetslist").empty();
		$(".selftestlist").empty();
		$(".msglist").empty();
	}

	function clear2nd(){
		$("#individual-2nd-popup-header").empty();
		$("#individual-2nd-popup-content").empty();
	}

	function build2ndPopup(event){
		var path = $(this).attr('src');
		var temp_id = $(this).attr('id');
		// TODO id => 3xxx
		var id = temp_id.slice(6);
		var resource_class = $(this).attr('class');

		var type = path.substring(path.lastIndexOf(".") + 1, path.length);
		var title = $('<h4>'+path.substring(path.lastIndexOf("/") + 1, path.length)+'</h4>');
		
		var name = path.substring(path.lastIndexOf("/") + 1);
		
		console.log("clicked path = " + path + ", id = " + id + ", type = " + type);

		// var link = "tag-tool.html";
		clear2nd();
		var content;
		if (type === "pdf"){
			console.log("Type === pdf");
			content = $('<object data="' + path +'"></object>');
		}else if ($.inArray(type, videoType) !== -1){
			content = $('<video controls><source src="' + assetsURL + name +'" type="video/' + type + '"></video>');
		}else if ($.inArray(type, audioType) !== -1){
			content = $('<audio controls><source src="' + assetsURL + name + '" type="audio/' + type + '"></audio>');
		}

		title.appendTo($("#individual-2nd-popup-header"));

		content.appendTo($("#individual-2nd-popup-content"));
		console.log("title = " + title + ", content = " + content);
		$("#individual-2nd-popup").modal('show');		
	}
	
	// filled in pop up lists
	function createIndividual(knowledgepointid, editmode, studentMode){
		var result = $.grep(listOfKnowledgePoints, function(o){ 
			return o.id === knowledgepointid; 
		});
		var KnowledgePoint = result[0];
		var id = KnowledgePoint.id;
		var assets = KnowledgePoint.assets;
		var parents = KnowledgePoint.parents;
		var tests = KnowledgePoint.tests;
		var messages = KnowledgePoint.qanda;

		var header = $('<h4 class="modal-title">'+KnowledgePoint.name+'</h4>');

		// Resources
		console.log("[editmode] = " + editmode + " Parents length = " + parents.length + "; Selftest length = " + tests.length + "; Msg length = " + messages.length);
		$.each(assets, function (i, item){
			console.log("[editmode] assets["+i+"] = " + item);
			var path = item.path;
			// id = -1, how to get back the taglist item?
			// console.log("item.id = " + item.id);
			var name = path.substring(path.lastIndexOf("/") + 1);
			var start = item.startpoint;
			var end = item.endpoint;

			//var oneitem = $('<li >');
			var oneasset = $('<a class="list-group-item" href="#individual-2nd-popup">[from:'+start + ' to ' + end + '] ' + name + '</a>');

			// On click -> build 2nd popup
			oneasset.on('click', function (event){
				clear2nd();
				//var asset_location = "../Asset/COMP_2611/Lecture_1/L1.pdf";
				var asset_location = assetsURL + name;

				console.log("CLicked Asset = " + asset_location + " assethtml ID = " + item.id + " start = " + start + " end = " + end);

				var title = $('<h4 class="modal-title">'+ name +"{from: " +start + ", to: " + end + "}"+'</h4>');
				var type = path.substring(path.lastIndexOf(".") + 1, path.length);

				var content;
				if (type === "pdf"){
					content = $('<object data="' + asset_location +"#page=" + start + '"></object>');
				}else if ($.inArray(type, videoType) !== -1){
					content = $('<video controls><source src="' + asset_location + '#t=' + start + ','+ end +'" type="video/' + type + '"></video>');
				}else if ($.inArray(type, audioType) !== -1){
					content = $('<audio controls><source src="' + asset_location +"#t=" + start + ','+ end + '" type="audio/' + type + '"></audio>');
				}

				title.appendTo($("#individual-2nd-popup-header"));

				content.appendTo($("#individual-2nd-popup-content"));

				//setTimeout( function(){ $( '.popupChild' ).popup( 'open' ) }, 1 );
				$("#individual-popup").modal('hide');
				//$("#individual-2nd-popup").popup('open');
				//$("#individual-2nd-popup").popup().enhanceWithin();
				$("#individual-2nd-popup").modal('show');
				setTimeout( function(){ $( '.popupChild' ).modal( 'show' ) }, 100 );
			});
			//oneitem.appendTo($(".assetslist"));
			oneasset.appendTo($(".assetslist"));
		});

		if (tests.length > 0){
			$.each(tests, function (i, item){
				// undefined???
				var question = item.question;
				//console.log("question = " + question);
				var oneasset = $('<li>' + question + '</li>');
				oneasset.appendTo($(".selftestlist"));
			});			
		}else {
			/*var form = $('<form>', {
				'method': "post",
				'action': "selftest.php"
			});
			var hidden = $('<input type="hidden" name="id" value='+ id + '>');*/
			var test_button = $('<button class="list-group-item">Go to Selftest Page</button>');
			test_button.on('click',  function(){
				window.location.assign("graph-drag-drop.html");
			});

			//form.append(hidden);
			//form.append(test_button);
			//form.appendTo($(".selftestlist"));
			test_button.appendTo($(".selftestlist"));
		}


		$.each(messages, function (i, item){
			// undefined???
			var question = item.question;
			//console.log("question = " + question);
			var oneasset = $('<a class="list-group-item">' + question + '</a>');

			oneasset.appendTo($(".msglist"));
		});

		header.appendTo($("#individual-popup-header"));
	}

	// display as list
	function displayAsList(){
		console.log("displayAsList!");
		$("#student-kp-list").empty();
		$.each(listOfKnowledgePoints, function (i, v){
			var id = v.id;
			var name = v.name;
			var parentsName_list = [];
			var parents = v.parents;
			var assets = v.assets;
			var tests = v.tests;
			var messages = v.qanda;
			
			var oneKnowledgePoint = $("<li id='KP-"+ id +"' class='list-group-item'>" + name + "</ls>");
			
			oneKnowledgePoint.on('click', {object: v}, changeContent);
			
			/*oneKnowledgePoint.on('click', function(event){
				clearStudentIndividual();
				console.log("Click on oneKnowledgePoint!");
				var title = $("<h2>" + name + "</h2>");
				var prereq = "Prerequisite: ";
				
				$.each(parentsName_list, function (l, m){
					prereq += m.name;
				});
				
				if (parentsName_list.length > 0){
					//prereq += "";
					$("p").html(prereq);
				}
				
				$.each(assets, function (l, item){
					//console.log("l = " + l);
					var path = item.path;
					// id = -1, how to get back the taglist item?
					// console.log("item.id = " + item.id);
					var name = path.substring(path.lastIndexOf("/") + 1);
					var start = item.startpoint;
					var end = item.endpoint;
					
					var oneasset = $("<a class='list-group-item'>" + name + "{from: " +start + ", to: " + end + "} </a>");
					
					oneasset.on('click', function(event){
						clear2nd();
						var asset_location = assetsURL + name;

						console.log("CLicked Asset = " + asset_location + " assethtml ID = " + item.id + " start = " + start + " end = " + end);

						var title = $('<h4 class="modal-title">'+ name +"{from: " +start + ", to: " + end + "}"+'</h4>');
						var type = path.substring(path.lastIndexOf(".") + 1, path.length);

						var content;
						if (type === "pdf"){
							content = $('<object data="' + asset_location +"#page=" + start + '"></object>');
						}else if ($.inArray(type, videoType) !== -1){
							content = $('<video controls><source src="' + asset_location + '#t=' + start + ','+ end +'" type="video/' + type + '"></video>');
						}else if ($.inArray(type, audioType) !== -1){
							content = $('<audio controls><source src="' + asset_location +"#t=" + start + ','+ end + '" type="audio/' + type + '"></audio>');
						}

						title.appendTo($("#individual-2nd-popup-header"));

						content.appendTo($("#individual-2nd-popup-content"));

						$("#individual-2nd-popup").modal('show');

					});
					//oneitem.appendTo($(".assetslist"));
					oneasset.appendTo($("#student-kp-asset"));
				});
				
				$.each(messages, function (l, item){
					var question = item.question;
					var person = item.person;
					var date = item.create;
					var anslist = item.ans;
					
					var onemessage = $("<li class='list-group-item'>" + question + "</li>");
					
					onemessage.on('click', function(event){
						$("#individual-msg-popup-content").empty();
						var person = item.person;
						var date = item.create;
						console.log("item = " + JSON.stringify(item));
						var anslist = item.ans;
						
						var content = person + ": " + question + "</br>";
						content += "<div style='float:right;font-size:10px'>"+ date +"</div></br>";
						
						console.log("anslist = " + anslist.length);
						$.each(anslist, function (j, ans){
							//audio part not finished
							
							if (ans.type == "Text") {
								content += "<br />";
								content += "<span class='professor_answer'>"+ "Answer : "+ ans.content+"</span>";
							}
							if (ans.type == "Audio") {
								//Audio
							}
						});
						$("#individual-msg-popup-content").html(content);
						
						$("#individual-msg-popup").modal('show');

					});
					//oneitem.appendTo($(".assetslist"));
					onemessage.appendTo($("#student-kp-message"));
				});
				
				title.appendTo($("#kp-individual-header"));
			});*/
			
			oneKnowledgePoint.appendTo($("#student-kp-list"));
			
			//console.log(JSON.stringify(listOfKnowledgePoints, null, 3));
		});
		
		var first = listOfKnowledgePoints[0];
		
		updateContent(first);
		
	}
	
	function updateContent(object){
		var id = object.id;
		var name = object.name;
		var assets = object.assets;
		var messages = object.qanda;
		var parentsName_list = [];
		var parents = object.parents;
		var tests = object.tests;
		
		clearStudentIndividual();
		
		console.log("object.name = " + object.name);
		
		$("#KP-"+id).addClass("active");
		
			$.each(parents, function (p){
				
				var result = $.grep(listOfKnowledgePoints, function(kp){ 
					return kp.id === parents[p]; 
				});
				//console.log("result[0].id = " + result[0].id);
				if (result.length > 0 && result != undefined){
					parentsName_list.push(result[0]);
				}
					
			});
			
				var title = $("<h2>" + name + "</h2>");
				var prereq = $("<span> Prerequisite: </span>)");
				$.each(parentsName_list, function (l, m){
					console.log("m=" + JSON.stringify(m));
					var oneparent = $("<li><a href=#>" + m.name +"</a></li>");
					oneparent.on('click', {object: m}, changeContent);
					
					prereq.append(oneparent);
				});
				
				if (parentsName_list.length > 0){
					console.log("prereq = " +prereq);
					//$("p").html(prereq);
					$("#parents").append(prereq);
				}
				
				console.log("assets = " + object);
				$.each(assets, function (l, item){
					//console.log("l = " + l);
					var path = item.path;
					// id = -1, how to get back the taglist item?
					// console.log("item.id = " + item.id);
					var name = path.substring(path.lastIndexOf("/") + 1);
					var start = item.startpoint;
					var end = item.endpoint;
					
					var oneasset = $("<a class='list-group-item'>" + name + "{from: " +start + ", to: " + end + "} </a>");
					
					oneasset.on('click', function(event){
						clear2nd();
						var asset_location = assetsURL + name;

						console.log("CLicked Asset = " + asset_location + " assethtml ID = " + item.id + " start = " + start + " end = " + end);

						var title = $('<h4 class="modal-title">'+ name +"{from: " +start + ", to: " + end + "}"+'</h4>');
						var type = path.substring(path.lastIndexOf(".") + 1, path.length);

						var content;
						if (type === "pdf"){
							content = $('<object data="' + asset_location +"#page=" + start + '"></object>');
						}else if ($.inArray(type, videoType) !== -1){
							content = $('<video controls><source src="' + asset_location + '#t=' + start + ','+ end +'" type="video/' + type + '"></video>');
						}else if ($.inArray(type, audioType) !== -1){
							content = $('<audio controls><source src="' + asset_location +"#t=" + start + ','+ end + '" type="audio/' + type + '"></audio>');
						}

						title.appendTo($("#individual-2nd-popup-header"));

						content.appendTo($("#individual-2nd-popup-content"));

						$("#individual-2nd-popup").modal('show');

					});
					//oneitem.appendTo($(".assetslist"));
					oneasset.appendTo($("#student-kp-asset"));
				});
				
				$.each(messages, function (l, item){
					var question = item.question;
					var person = item.person;
					var date = item.create;
					var anslist = item.ans;
					
					var onemessage = $("<li class='list-group-item'>" + question + "</li>");
					
					onemessage.on('click', function(event){
						$("#individual-msg-popup-content").empty();
						var person = item.person;
						var date = item.create;
						console.log("item = " + JSON.stringify(item));
						var anslist = item.ans;
						
						var content = person + ": " + question + "</br>";
						content += "<div style='float:right;font-size:10px'>"+ date +"</div></br>";
						
						console.log("anslist = " + anslist.length);
						$.each(anslist, function (j, ans){
							//audio part not finished
							
							if (ans.type == "Text") {
								content += "<br />";
								content += "<span class='professor_answer'>"+ "Answer : "+ ans.content+"</span>";
							}
							if (ans.type == "Audio") {
								//Audio
							}
						});
						$("#individual-msg-popup-content").html(content);
						
						$("#individual-msg-popup").modal('show');

					});
					//oneitem.appendTo($(".assetslist"));
					onemessage.appendTo($("#student-kp-message"));
				});	
				
				title.appendTo($("#kp-individual-header"));
		
	}
	
	function changeContent(event){
		
		var object = event.data.object;
		
		updateContent(object);
		
	}
	
	//function display content
	function clearStudentIndividual(){
		$("#kp-individual-header").empty();
		console.log("$('.page-header') = " + $(".page-header"));
		$("#parents").empty();
		$("#student-kp-asset").empty();
		$("#student-kp-message").empty();
		$("#student-kp-selftest").empty();
		
		$("#student-kp-list li").removeClass("active");
	}
	
var dragdropMode = false;
var studentMode = true;

$(document).ready(function(){

	canvas = new fabric.Canvas('canvas', { 
	    selection: false,
	    backgroundColor: '#F0F0F0'
	});

	canvas.setHeight(0);
	//canvas.setHeight(window.innerHeight * 0.9);
	canvas.setWidth(0);
	canvas.renderAll();

	/*canvas.on('mouse:down', function(o){
		var e = canvas.findTarget(o.e, false); //canvas.getActiveObject();
		//console.log("e = " + e + "; o.e = " + o.e);
		// WHY undefined??
		// getObject -> only SELECTED
		if (e != null && e.get('type') === 'group'){
			var selected_KnowlodgePoint_id = e.item(0).get('id');
			var selected_KnowlodgePoint_name = e.item(1).get('text');
			//console.log("getActiveGroup = " + e + "; selected_KnowlodgePoint_id = " + selected_KnowlodgePoint_id);

			// set cookies
			Cookies.set('selected_KnowlodgePoint_id', selected_KnowlodgePoint_id, { expires: 1 });
			Cookies.set('selected_KnowlodgePoint_name', selected_KnowlodgePoint_name, { expires: 1 });

			clearIndividual();
			createIndividual(selected_KnowlodgePoint_id, dragdropMode, studentMode);
			$("#individual-popup").modal('show');
		}
	});*/

	updateGraph(courseCode, courseNumber);

	setTimeout(displayAsList, 2000);

});