$(function() {
    $("#champ_table img").click(function () {

	// could do this more efficiently.
	// Table parameters.
	var inactive_op = 0.5;
	var inactive_bc = "black";
	var active_op = 1.0;
	var active_bc = "yellow";
	var ttime = 800;

	// If already selected, don't do anything!
	if ($(this).css("border-left-color") === "rgb(255, 255, 0)") {
	    return;
	}
	
	
	$('#champ_table img').not(this).each( function() {
	    if ($(this).css("opacity") != inactive_op) {
		$(this).animate({opacity: inactive_op, borderColor: inactive_bc},ttime);
	    }

	});
	$(this).animate({opacity: active_op, borderColor: active_bc},ttime*0.5);
	
	// DDragon server
	var ddPassive = "http://ddragon.leagueoflegends.com/cdn/6.9.1/img/passive/"
	var ddSkill = "http://ddragon.leagueoflegends.com/cdn/6.9.1/img/spell/";
	var champName = $(this).attr('data-name');
	
	$.getJSON("data/champ_info.json", function(jsonData) {
	    //console.log(Object.keys(jsonData.data[champName].name));
	    var champData = jsonData.data[champName];

	    if($('#skill_div').is(":visible")) {
		// Fade out images/name
		$('#skill_div img,p').fadeOut('slow', function() {
		    // Update images/name
		    $('#skill_div p').html(champData.name + ", " + champData.title);
		    $('#skill_div').find('img:first').attr("src",ddPassive + champData.passive.image.full);
		    for (i=0; i<champData.spells.length; i++) {
			$('#skill_div').find("img:eq(" + (i+1) +")").attr("src",ddSkill + champData.spells[i].image.full);
		    }
		    // Fade in images/name
		    $('#skill_div img,p').fadeIn('slow');	
		});		
	    } else {
		// Update images/name
		$('#skill_div p').html(champData.name + ", " + champData.title);
		$('#skill_div').find('img:first').attr("src",ddPassive + champData.passive.image.full);
		for (i=0; i<champData.spells.length; i++) {
		    $('#skill_div').find("img:eq(" + (i+1) +")").attr("src",ddSkill + champData.spells[i].image.full);
		}
		// Fade in whole div
		$('#skill_div').fadeIn('slow');	
	    }
	    // Create hidden divs with skill information so we don't have to load the JSON each time a skill is hovered on?
	    // Store this info in global variable.
	    window.champJSON = champData;
	    //console.log(Object.keys(champData.spells[0]["effect"]));
	    //console.log(JSON.stringify(champData.spells[0]));
	    
	});


    }).mouseover(function () {
    }).mouseout(function () {
    });

});

// Display skill info on hover.
$(function() {
    function genSkillInfo(skillJSON) {
	/*
	var output = skillJSON["sanitizedTooltip"];

	// Regex stuff
	for (i=1; i<3; i++) {
	    output = output.replace("{{ e" + i + " }}",skillJSON["effectBurn"][i]);
	}
	output = output.replace("{{ f1 }}","");
	
	console.log(JSON.stringify(skillJSON));
	
	return output;
	*/
	return skillJSON["sanitizedDescription"];
    }


    $("#skill_div div").hover(function () {
	//$("img", this).animate({opacity: 0.2});
	// Show div for this skill, attached to the div containing the img.
	//$('<div class="tooltip">I\' am tooltips! tooltips! tooltips! :)</div>')
	//    .appendTo('body');
	var x = genSkillInfo(window.champJSON.spells[0]);
	//console.log(x);
	
    }, function() {
	//$("img", this).animate({opacity: 1.0});
    });


    $("#skill_table div").tooltip({
	items: "div",
	content: function () {
	    var idx = $(this).parent().parent().children().index($(this).parent());
	    if (idx > 0) {
		return genSkillInfo(window.champJSON.spells[idx-1]);
	    } else {
		return genSkillInfo(window.champJSON.passive);
	    }
	},
	position: { my: "center bottom-10", at: "center top", collision: "none" },
	show: { effect: "fadeIn", delay: 0 },
	hide: { effect: "fadeOut", delay: 100 },
    });

});
