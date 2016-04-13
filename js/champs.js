//$(document.ready(function () {
//    $("$champ_table img").mouseover(function () {
//	$(this).css("border-color","yellow");
//    });
//});
$(function() {
    $("#champ_table img").click(function () {
	//$(this).css("border-color","yellow");
	//$(this).css("opacity","1.0");
	//$('img').css("border-color","black");
	//$(this).css("border-color","yellow");
	// could do this more efficiently.
	$('img').not(this).each( function() {
	    //$(this).animate({opacity: 0.5, borderColor: "black"},500);
	    $(this).animate({opacity: 0.5, borderColor: "black"},500);
	});
	//$('img.active').removeClass('active',500);
	//$(this).addClass('active',500);
	$(this).animate({opacity: 1.0, borderColor: "yellow"},500);
	
	/*
	$(this).animate({
	    opacity: 1.0
	},"slow");
*/
	// DDragon server
	var ddPassive = "http://ddragon.leagueoflegends.com/cdn/6.7.1/img/passive/"
	var ddSkill = "http://ddragon.leagueoflegends.com/cdn/6.7.1/img/spell/";
	//' . $champ_i["spells"][$j]["image"]["f\
	/*
	for ($j = 0; $j < 4; $j++) {
	    //print_r($champ_i);
	            echo '<img src="http://ddragon.leagueoflegends.com/cdn/6.7.1/img/spell/' . $champ_i["spells"][$j]["image"]["f\
ull"] . '" alt="' . $champ_i["spells"][$j]["name"] . '" />' . "\n";
	            //echo $champ_i["spells"][$j]["image"]["full"];
*/	
	var champName = $(this).attr('data-name');

	
	$.getJSON("data/champ_info.json", function(jsonData) {
	    //console.log(Object.keys(jsonData.data[champName].name));
	    var skillHTML = [];
	    var champData = jsonData.data[champName];

	    // Add name as heading
	    skillHTML.push("<h3>" + champData.name + ", " + champData.title + "</h3>");
	    
	    
	    // Add passive
	    skillHTML.push("<img src=\"" + ddPassive + champData.passive.image.full + "\" />");
	    //console.log(skillHTML);

	    // Add skills.
	    for (i=0; i < champData.spells.length; i++) {
		skillHTML.push("<img src=\"" + ddSkill + champData.spells[i].image.full + "\" />");
	    }

	    $('#skills').html(skillHTML);
	});



	
	/*
        var champs_JSON = $.getJSON("data/champ_info.json", function () {
	    console.log( "success" );
	})
	    .done(function() {
		console.log( "second success" );
	    })
	    .fail(function() {
		console.log( "error" );
	    })
	    .always(function() {
		console.log( "complete" );
	    });

	// Perform other work here ...
	console.log(JSON.stringify(champs_JSON));
	
	 Set another completion function for the request above
	champs_JSON.complete(function() {
	    console.log( "second complete" );
	});
	*/
    }).mouseover(function () {
    }).mouseout(function () {
    });
});
