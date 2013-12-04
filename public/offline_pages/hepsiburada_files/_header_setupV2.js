function setUpCatalogMenu()
{
	var $divHeaderPopUpMenuHeader = $('#divHeaderPopUpMenuHeader').css('Z-index',110);
	if ($divHeaderPopUpMenuHeader.find("a[MainPage='true']").length == 1)
	{
		$divHeaderPopUpMenuHeader.removeClass('tumkategorilerDef').addClass('tumkategorilerDefST');
		return;
	}
	$divHeaderPopUpMenuHeader.removeClass('tumkategorilerDefST').addClass('tumkategorilerDef');
	var $divHeaderPopUpMenu = $('#divHeaderPopUpMenu');
	positionCatalogMenu();
	$(window).bind('resize',positionCatalogMenu);
	$divHeaderPopUpMenu.hover( function(){ checkHeaderPopUpMenuShow() }, function(){ hideHeaderPopUpMenu();});
	$divHeaderPopUpMenuHeader.hover(
		function(){
			clearTimeout($(this).data('timeout'));
			var t = setTimeout(function () {
			    checkHeaderPopUpMenuShow();
				$divHeaderPopUpMenuHeader.addClass('tumkategorilerHover').removeClass('tumkategorilerDef'); 
				$divHeaderPopUpMenu.slideDown('fast');
			}, 300);
			$(this).data('timeout', t);
		},
		function(){
			clearTimeout($(this).data('timeout'));
			var t = setTimeout(function () {
				hideHeaderPopUpMenu();
			}, 300);
			$(this).data('timeout', t);
		}
	);
}

function positionCatalogMenu(){
	var $divHeaderPopUpMenu = $('#divHeaderPopUpMenu');
	var positiondivHeaderPopUpMenuHeader = $('#headermenu').position();
	var newpositionTop = positiondivHeaderPopUpMenuHeader.top + 30;
	var newpositionLeft = positiondivHeaderPopUpMenuHeader.left - ('30');
	$divHeaderPopUpMenu.css({ position: 'absolute', top: newpositionTop, left: newpositionLeft, 'z-index': 9999999 });
	$(".hb-menu-item ").attr("isloaded", "false");
}

function hideHeaderPopUpMenu(){
	var hideTimeout = setTimeout('$("#divHeaderPopUpMenu").slideUp("fast", function() {$("#divHeaderPopUpMenuHeader").removeClass("tumkategorilerHover");$("#divHeaderPopUpMenuHeader").addClass("tumkategorilerDef");});',500);
	$.store2.setItem('divHeaderPopUpMenuTO', hideTimeout);
}

function checkHeaderPopUpMenuShow(){
	if ($.store2.hasItem('divHeaderPopUpMenuTO'))
	{
		clearTimeout($.store2.getItem('divHeaderPopUpMenuTO'));
		$.store2.removeItem('divHeaderPopUpMenuTO') ;
	}
}

function setUpBrandlistMenu(){
	var $divHeaderBrandStoresHeader = $('#divHeaderBrandStoreHeader');
	var $divHeaderBrandStoresList = $('#trademark_multimenu');
	$divHeaderBrandStoresList.appendTo($divHeaderBrandStoresHeader);
	var $spacer = $('<div id="divSpacer" style="display:none;background-color:#ffffff;position:absolute;z-index:999;height:2px;width:124px;"></div>');
	$divHeaderBrandStoresHeader.append($spacer);
	positionBrandListMenu();
	$(window).bind('resize',positionBrandListMenu);
	$divHeaderBrandStoresHeader.hover(
		function(){ 
			checkHeaderBrandStoresListShow();
			$spacer.show();
			$divHeaderBrandStoresHeader.removeClass('markamagazalarDef').addClass('markamagazalarHover');
			$divHeaderBrandStoresList.slideDown('fast');
		},
		function(){ 
			$spacer.hide();
			hideHeaderBrandStoresListMenu();
		});
}

function positionBrandListMenu(){
	var $divHeaderBrandStoresHeader = $('#divHeaderBrandStoreHeader');
	var $divHeaderBrandStoresList = $('#trademark_multimenu');
	var divHeaderBrandStoresHeaderPosition = $divHeaderBrandStoresHeader.position();
	var divHeaderBrandStoresListTop = divHeaderBrandStoresHeaderPosition.top + 27;
	var divHeaderBrandStoresListLeft = divHeaderBrandStoresHeaderPosition.left ;
	var spacer = $divHeaderBrandStoresHeader.find("#divSpacer");
	spacer.css({top: (divHeaderBrandStoresListTop-2).toString() + 'px' , left : (divHeaderBrandStoresHeaderPosition.left).toString() +  'px'});
	$divHeaderBrandStoresList.css({ position: 'absolute', display:'none', marginLeft: 0, marginTop: 0, top: divHeaderBrandStoresListTop - 1, left: divHeaderBrandStoresListLeft - 1,'z-index':99 });
}

function checkHeaderBrandStoresListShow(){
	if ($.store2.hasItem('divHeaderBrandStoresListTO'))
	{
		clearTimeout( $.store2.getItem('divHeaderBrandStoresListTO'));
		$.store2.removeItem('divHeaderBrandStoresListTO') ;
	}
}

function hideHeaderBrandStoresListMenu(){
	var hideTimeout = setTimeout('$("#trademark_multimenu").slideUp("fast");$("#divHeaderBrandStoreHeader").removeClass("markamagazalarHover").addClass("markamagazalarDef");',300);
	$.store2.setItem('divHeaderBrandStoresListTO', hideTimeout);
}	

function setUpHeaderUserListMenu(){
	var $divHeaderUserLists = $('#divHeaderUserLists');
	var $divHeaderUserListsHeader = $('#divHeaderUserListsHeader');
	$divHeaderUserLists.remove().appendTo('body');
	positionHeaderUserListMenu();
	$(window).bind('resize',positionHeaderUserListMenu);
	$divHeaderUserListsHeader.hover(
		function()
		{
			checkHeaderUserListMenuShow();
			$divHeaderUserLists.slideDown('fast');
		},
		function()
		{
			hideHeaderUserListMenu();
		}
	);
	$divHeaderUserLists.hover(function(){ checkHeaderUserListMenuShow() }, function(){ hideHeaderUserListMenu();});
}

function positionHeaderUserListMenu(){
	var $divHeaderUserLists = $('#divHeaderUserLists');
	var $divHeaderUserListsHeader = $('#divHeaderUserListsHeader');
	var divHeaderListHeaderPosition = $divHeaderUserListsHeader.position();
	var divHeaderUserListsTop = divHeaderListHeaderPosition.top + 30;
	var divHeaderUserListsLeft = divHeaderListHeaderPosition.left - 25;
	$divHeaderUserLists.css({ position: 'absolute', display:'none', marginLeft: 0, marginTop: 0, top: divHeaderUserListsTop, left: divHeaderUserListsLeft });
}

function checkHeaderUserListMenuShow(){
	if ($.store2.hasItem('divHeaderUserListsTO'))
	{
		clearTimeout( $.store2.getItem('divHeaderUserListsTO'));
		$.store2.removeItem('divHeaderUserListsTO') ;
	}
}

function hideHeaderUserListMenu(){
	var hideTimeout = setTimeout('$("#divHeaderUserLists").slideUp("fast")',500);
	$.store2.setItem('divHeaderUserListsTO', hideTimeout);
}	

function formatItem(row){
	return "<div><div style='float:left'>" + row[0] + "</div><div style='float:right'>" + row[1] + " ürün</div></div>";
}

function HeaderProfileLoaded(response){

	if (response.value != null && response.value.LoggedIn)	{

		$('#wellcomeUser').html('<span class="fleft mt8 colorccc">Merhaba, </span> <span class="fleft mt8 ml3" style="color:#eeeeee !important;"> ' + response.value.ProfileName.toString()+'</span>');

		$('#spnMessageCount').html('(' + response.value.MessageCount.toString() + ')'); 

		if(response.value.MessageCount < 1)
		{
			$('#spnMessageCount').html(''); 
		}
		
		$('#spnFirsatCount').html('(' + response.value.DiscountCount.toString() + ')');  
		if(response.value.DiscountCount < 1)
		{
			$('#opportunity').replaceWith('');  
		}	
	   
		showBasketCount(response.value.BasketItemCount.toString());
		$('#spnCartCount').html('(' + response.value.BasketItemCount.toString() + ')'); 
		
	$('#cart, #lists, #opportunity, #message, #pageList, #logOut, .HeaderTopV3 h3, .HeaderTopV2 h3, .HeaderTop h3, #MainPage').css({'display' : 'block'});

	}else{
		$('#cart, #lists, #pageList, #logIn, #logOn, #MainPage').css({'display' : 'block'});
	}

}

function showBasketCount(itemCount) {
	try {
		
		var iconname = '';
		if (itemCount=='1')
			iconname = 'basket1';
		else if (itemCount=='2')
			iconname='basket2';
		else if (itemCount!='')
			iconname='basket3';
	   
		if (iconname == '' || itemCount=='0')
			iconname= '';
	   
		if (window.external.msIsSiteMode() && iconname != '') {
			window.external.msSiteModeSetIconOverlay('http://static.hepsiburada.net/hbv2/hepsiburadapin/' + iconname + '.ico',' ');
		}
		else if (window.external.msIsSiteMode()) {
			window.external.msSiteModeClearIconOverlay();
		}
	}
	catch (e) {
	}
}

var Ekolay = {};

Ekolay.Init = function (htmlTemplatePath) {
    $("#divExternalCampaign").load(htmlTemplatePath, function (response, status, xhr) {
        Ekolay.Render();
    });
};

Ekolay.Render = function myfunction() {
    $("#SGeneralBar .wrapBar .bRight .dropDownList > span").click(function () {

        if ($(this).hasClass("selected")) {
            $(this).removeClass("selected");
            $("#SGeneralBar .ddl_hover").slideUp(200);
        } else {
            $(this).addClass("selected");
            $("#SGeneralBar .ddl_hover").slideDown(200);
        }
    }); //end of click()
    $("#SGeneralBar").slideDown();
};
