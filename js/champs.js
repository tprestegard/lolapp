$(function() {
    $("#champ_table img").click(function () {

	// could do this more efficiently.
	// Table parameters.
	var inactive_op = 0.5;
	var inactive_bc = "black";
	var active_op = 1.0;
	var active_bc = "yellow";
	var ttime = 500;
	
	
	$('img').not(this).each( function() {
	    if ($(this).css("opacity") != inactive_op) {
		$(this).animate({opacity: inactive_op, borderColor: inactive_bc},ttime);
	    }

	});
	$(this).animate({opacity: active_op, borderColor: active_bc},ttime);
	
	// DDragon server
	var ddPassive = "http://ddragon.leagueoflegends.com/cdn/6.7.1/img/passive/"
	var ddSkill = "http://ddragon.leagueoflegends.com/cdn/6.7.1/img/spell/";
	var champName = $(this).attr('data-name');

	
	$.getJSON("data/champ_info.json", function(jsonData) {
	    //console.log(Object.keys(jsonData.data[champName].name));
	    var skillHTML = [];
	    var champData = jsonData.data[champName];

	    // Add name as heading
	    skillHTML.push("<h3>" + champData.name + ", " + champData.title + "</h3>");
	    
	    // Set up table.
	    //skillHTML.push("<table style=\"padding:5px;\"><tbody><tr>");
	    var table = $('<table></table>');
    	    
	    // Add passive
	    skillHTML.push("<img src=\"" + ddPassive + champData.passive.image.full + "\" />");
    
	    // Add skills.
	    for (i=0; i < champData.spells.length; i++) {
		skillHTML.push("<img src=\"" + ddSkill + champData.spells[i].image.full + "\" />");
	    }

	    table.append(skillHTML);
	    $('#skills').fadeOut('fast', function () {
		$('#skills').html(skillHTML);
		$('#skills').fadeIn('fast');
	    });
	});

    }).mouseover(function () {
    }).mouseout(function () {
    });
});
