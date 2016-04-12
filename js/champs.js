//$(document.ready(function () {
//    $("$champ_table img").mouseover(function () {
//	$(this).css("border-color","yellow");
//    });
//});
$(function() {
    $("#champ_table img").click(function () {
	$(this).prop('title', $(this).attr('alt'));
    }).mouseover(function () {
    }).mouseout(function () {
    });
});
