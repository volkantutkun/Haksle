
/** mobile-tablet detect **/
var isMobile = {
	Android: function ()
	{ return navigator.userAgent.match(/Android/i); },
	BlackBerry: function ()
	{ return navigator.userAgent.match(/BlackBerry/i); },
	iPhone: function ()
	{ return navigator.userAgent.match(/iPhone|iPod/i); },
	iPad: function ()
	{ return navigator.userAgent.match(/iPad/i); },
	Opera: function ()
	{ return navigator.userAgent.match(/Opera Mini/i); },
	Windows: function ()
	{ return navigator.userAgent.match(/IEMobile/i); },
	any: function ()
	{ return (isMobile.Android() || isMobile.iPhone() || isMobile.iPad()); }
};
/** Smart App Banners **/
if(isMobile.iPhone() && location.href.indexOf('#mobile') != -1 || isMobile.iPad() && location.href.indexOf('#mobile') != -1){
	var myAppStoreID;
	if (isMobile.iPad())
		myAppStoreID = "571596855";
	else if(isMobile.iPhone())
		myAppStoreID = "481035064";
	//$('head').append('<meta name="apple-itunes-app" content="app-id='+myAppStoreID+'">')
}

$(document).ready(function() {
	
	/*jquery ui dialog, close the dioalog when click to the overlay  */
	$('.ui-widget-overlay').live('click',function(){
		$(".ui-dialog-content").each(function(){
			if($(this).dialog("isOpen")){
				 $(this).dialog('close');
			}
		})
	})

	/***/
	/* Department.aspx */
	// Department gallery accordion
	if($(".msAccordion").length > 0){
		$(".msAccordion").each(function(){
			$(this).msAccordion({ defaultid: 0, event:'mouseover' });	
		});
	};


	/* HB.Master & NDFooter */
	//footer
	$(".foooterBtmMEN ul li:first-child").css('font-weight', 'bold');
	$(".foooterBtmMEN ul li:first-child a").css('color', '#000');
	$(".foooterBtmMEN ul").first().css('margin-left', '10px');

	$(".foooterTopMEN").height();
	var parentDIV = $(".foooterTopMEN").height();

	$(".foooterTopMEN ul").each(function (i) {
		var fchildDIV = $(this).height();
		var processing = (parentDIV - fchildDIV);
		$(this).css('margin-bottom', processing);
	});
	
	/** mobile-tablet detect **/
	if(isMobile.any()){
		/** wellcome screen **/
		var contentMb;
		//var iphone4 = (window.screen.height == (960 / 2));
		var iphone5 = (window.screen.height == (1136 / 2));
		
		if (isMobile.iPad())
			contentMb = '<div class="contentMb IpadLB"><a href="http://mhelp.hepsiburada.com" target="_blank" onClick="_gaq.push([\'_trackEvent\', \'Click Track\', \'Mobile Splash\', \'Help\']);" class="goHelp"></a><a href="javascript:closeMobileLB();" onClick="_gaq.push([\'_trackEvent\', \'Click Track\', \'Mobile Splash\', \'Continue to Hepsiburada\']);" class="goSite"></a><a href="https://itunes.apple.com/tr/app/hepsiburada-ipad/id571596855?l=tr&mt=8" target="_blank" onClick="_gaq.push([\'_trackEvent\', \'Click Track\', \'Mobile Splash\', \'App Download\']);" class="goApp"></a><img src="http://images.hepsiburada.net/assets/mobile/iPad_ekran_0.jpg" style="width:100%"></div>'
		else if(isMobile.iPhone()){
			if(iphone5)
				contentMb = '<div class="contentMb IphoneLB"><a href="http://mhelp.hepsiburada.com" target="_blank" onClick="_gaq.push([\'_trackEvent\', \'Click Track\', \'Mobile Splash\', \'Help\']);" class="goHelp"></a><a href="javascript:closeMobileLB();" onClick="_gaq.push([\'_trackEvent\', \'Click Track\', \'Mobile Splash\', \'Continue to Hepsiburada\']);" class="goSite"></a><a href="http://itunes.apple.com/qa/app/hepsiburada/id481035064?mt=8" target="_blank" onClick="_gaq.push([\'_trackEvent\', \'Click Track\', \'Mobile Splash\', \'App Download\']);" class="goApp"></a><img src="http://images.hepsiburada.net/assets/mobile/iPhone_1080_1578.jpg" style="width:100%"></div>'
			else
				contentMb = '<div class="contentMb IphoneLB less"><a href="http://mhelp.hepsiburada.com" target="_blank" onClick="_gaq.push([\'_trackEvent\', \'Click Track\', \'Mobile Splash\', \'Help\']);" class="goHelp"></a><a href="javascript:closeMobileLB();" onClick="_gaq.push([\'_trackEvent\', \'Click Track\', \'Mobile Splash\', \'Continue to Hepsiburada\']);" class="goSite"></a><a href="http://itunes.apple.com/qa/app/hepsiburada/id481035064?mt=8" target="_blank" onClick="_gaq.push([\'_trackEvent\', \'Click Track\', \'Mobile Splash\', \'App Download\']);" class="goApp"></a><img src="http://images.hepsiburada.net/assets/mobile/iPhone_1000_1210.jpg" style="width:100%"></div>'
		}
		else if(isMobile.Android())
			contentMb = '<div class="contentMb androidLB"><a href="http://mhelp.hepsiburada.com" target="_blank" onClick="_gaq.push([\'_trackEvent\', \'Click Track\', \'Mobile Splash\', \'Help\']);" class="goHelp"></a><a href="javascript:closeMobileLB();" onClick="_gaq.push([\'_trackEvent\', \'Click Track\', \'Mobile Splash\', \'Continue to Hepsiburada\']);" class="goSite"></a><a href="https://play.google.com/store/apps/details?id=com.pozitron.hepsiburada&feature=search_result#?t=W251bGwsMSwxLDEsImNvbS5wb3ppdHJvbi5oZXBzaWJ1cmFkYSJd" onClick="_gaq.push([\'_trackEvent\', \'Click Track\', \'Mobile Splash\', \'App Download\']);" class="goApp"></a><img src="http://images.hepsiburada.net/assets/mobile/android_1080_1920.jpg" style="width:100%"></div>'	
		
		var overlayMb = '<div onclick="closeMobileLB()" class="overlayMobileLB"></div>';
		var allContent = overlayMb + contentMb;
		
		$.getScript( "http://static.hepsiburada.net/scripts/hb/jquery.cookie.js", function() {
			isCookie(allContent);
		});
		
		/** Smart App Banners **/
		if(isMobile.Android() && location.href.indexOf('#mobile') != -1){
			$('head').append('<link rel="stylesheet" href="http://static.hepsiburada.net/css/hb/jquery.smartbanner.css" type="text/css" media="screen">');
			$('head').append('<meta name="google-play-app" content="app-id=com.pozitron.hepsiburada&hl=en">');
			$.getScript("http://static.hepsiburada.net/scripts/hb/jquery-1.8.2.min.js", function () {
				$.getScript("http://static.hepsiburada.net/scripts/hb/jquery.smartbanner.js", function () {
					$.smartbanner({
						title: 'Hepsiburada',
						author: 'Doğan Online',
						icon: 'http://static.hepsiburada.net/assets/hb/android.jpg',
						force: 'android',
						daysHidden: 0,
						daysReminder: 0
					});
				});
			});
		}
		/** category mouse over **/
		var hbMenuEl;
		if($('ul.emenu-root').parent('.leftpart').length)
			hbMenuEl = $('.hb-menu-item-text');
		else
			hbMenuEl = $('.hb-menu-item-text,.tumKategorilerBg');
			
		hbMenuEl.bind("click", function (e) {
			if (!$(this).hasClass('bindClick')) {
				e.preventDefault();
				$(this).addClass('bindClick');
			}
		});	
	}

});

/* HB.Master & NDFooter */
function bizimleCalismakIsterMisiniz() {
    $("#divPopupBizimleCalis").html("<iframe src='http://83.66.3.30/Applicant/WebEntStartPage.aspx?custId=624&webEntID=502' width='100%' height='100%' frameborder='0' scrolling='yes'></iframe>");
    $("#divPopupBizimleCalis").dialog({ autoOpen: false, title: "Bizimle Çalışmak İster Misiniz?", width: 780, height: 500, modal: true, resizable: false });
    $("#divPopupBizimleCalis").dialog("open");
}

/** mobile-tablet detect **/
function closeMobileLB(){
	$('.overlayMobileLB,.contentMb').remove();	
}
function isCookie(allContent){
	if ($.cookie("mobile") == "yes") {
		//$.cookie("mobile", "yes", { expires: bDate });
	} else {
		//var bDate = new Date();
		//bDate.setTime(bDate.getTime() + (5 * 60 * 1000));
		$("head").append('<meta name="viewport" content="width=1000">');
		$('body').append(allContent);
		$('.overlayMobileLB').width($(document).width());
		$('.overlayMobileLB').height($(document).height());
		(isMobile.iPhone() || isMobile.Android()) ? $('.overlayMobileLB').css({background:'#fff',opacity:1}) : "";
		$.cookie("mobile", "yes", { expires: 30 });
	}
}