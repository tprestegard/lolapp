//$(document.ready(function () {
//    $("$champ_table img").mouseover(function () {
//	$(this).css("border-color","yellow");
//    });
//});
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
	
	/*
	$('img').not(this).each( function() {
	    $(this).animate({opacity: 0.5, borderColor: "black"},ttime);
	});
	$(this).animate({opacity: 1.0, borderColor: "yellow"},ttime);
	*/

/*
	$('img').not(this).each( function() {
	    //$(this).animate({opacity: 0.5, borderColor: "black"},500);
	    if (!$(this).hasClass("inactive") && !$(this).hasClass("active")){
		//$(this).switchClass("inactive",500)
		$(this).addClass("inactive",ttime);
	    } else if ($(this).hasClass("active")) {
		$(this).removeClass("active",ttime/2).addClass("inactive",ttime/2);
	    }
	});

	if ($(this).hasClass("inactive")) {
	    //$(this).switchClass('active',500);
	    $(this).removeClass('inactive',ttime/2).addClass("active",ttime/2);
	} else {
	    $(this).addClass('active',ttime);
	}
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
