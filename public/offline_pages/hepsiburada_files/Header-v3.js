var selFlag;
$('body').ready(

function () {
    
	$(".HeaderBottom li.hov").hover(function () {
		$(this).html($(this).find('a'));
		$(this).html($("<strong><span>" + $(this).html() + "</span></strong>"));
		$(".HeaderBottom .selected").removeClass('selected');
		$(this).addClass('selected');

	}, function () {
		$(this).html($(this).find('a'));
		$(".HeaderBottom .selected").removeClass('selected');
		$(this).html($("<strong><span>" + $(this).html() + "</span></strong>"));
		$(selBottomFlag).addClass('selected');
	});
	
	selBottomFlag = $(".HeaderBottom").find('.selected');
	
	$(".HeaderBottom li.first").hover(
	function () {
		$(".HeaderBottom .selected").removeClass('selected');
		$(this).addClass('selected');      
        
	}, function () {
		$(".HeaderBottom .selected").removeClass('selected');
		$(selBottomFlag).addClass('selected');
	});
});