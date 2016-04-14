$(function() {
    $("#champ_table img").click(function () {

	// could do this more efficiently.
	// Table parameters.
	var inactive_op = 0.5;
	var inactive_bc = "black";
	var active_op = 1.0;
	var active_bc = "yellow";
	var ttime = 800;
	
	
	$('img').not(this).each( function() {
	    if ($(this).css("opacity") != inactive_op) {
		$(this).animate({opacity: inactive_op, borderColor: inactive_bc},ttime);
	    }

	});
	$(this).animate({opacity: active_op, borderColor: active_bc},ttime*0.5);
	
	// DDragon server
	var ddPassive = "http://ddragon.leagueoflegends.com/cdn/6.7.1/img/passive/"
	var ddSkill = "http://ddragon.leagueoflegends.com/cdn/6.7.1/img/spell/";
	var champName = $(this).attr('data-name');

	
	$.getJSON("data/champ_info.json", function(jsonData) {
	    //console.log(Object.keys(jsonData.data[champName].name));
	    var skillHTML = [];
	    var champData = jsonData.data[champName];

	    // Add name as heading
	    skillHTML += "<p>" + champData.name + ", " + champData.title + "</p>";
	    
	    // Set up table.
	    skillHTML += "<table id=\"skill_table\"><tr>";
    	    
	    // Add passive
	    skillHTML += "<td><img src=\"" + ddPassive + champData.passive.image.full + "\" /></td>";
    
	    // Add skills.
	    for (i=0; i < champData.spells.length; i++) {
		skillHTML += "<td><img src=\"" + ddSkill + champData.spells[i].image.full + "\" /></td>";
	    }

	    skillHTML += "</tr></table>";

	    /*
	    if ($('#skill_div').is(":visible")) {
		$('#skill_div img, p').fadeOut('slow', function () {
		    $('#skill_div').html(skillHTML);
		    $('#skill_div img').fadeIn('slow');
		    $('#skill_div p').fadeIn('slow');
		});
	    */
	    if ($('#skill_div').is(":visible")) {
		$('#skill_div img').fadeOut('slow', function () {
		    $('#skill_div').html(skillHTML);
		    $('#skill_div').fadeIn('slow');
		});
	    } else {
		$('#skill_div').html(skillHTML);
		$('#skill_div').fadeIn('slow');
	    }
		
	});

    }).mouseover(function () {
    }).mouseout(function () {
    });
});
