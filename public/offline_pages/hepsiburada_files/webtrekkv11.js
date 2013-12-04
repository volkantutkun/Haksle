/**
* webtrekkConfig
* 
* globale webtrekk konfiguration
* global webtrekk config
* @type Object
* Edit Date : 16/11/2012
* Edit By : Ibrahim Songur
* Description :
*/ 
var webtrekkConfig = {
    trackId: "289941511384204",
    trackDomain: "hepsiburada01.webtrekk.net",
    domain: "localhost",
    cookie: "1",
    //linkTrack: "link",
    heatmap: "0",
    form: "1"
};

/*
********************* definition ihrer eigenen funktionen ********************
*********************** define your own functions here ***********************
*/

/*
********************** Farshid Customization Code Start **********************
*/

var wto = get_WT();

////Sample for more than one instance :
//var wto1 = get_WT("111111111111111");
//var wto2 = get_WT("222222222222222");
//var wto3 = get_WT();
//wto.trackId = "333333333333333";

//****************************************Get Web Trekk Object (wto)********************************
function get_WT(trackId) {
    var wto = new Object();
    if (trackId) {
        wto.trackId = trackId;
    }

//***********************************Track Link Function****************************************
    wto.trackLink = function (linkName) {
        var wt = new webtrekkV3(webtrekkConfig);
        wt.linkTrack = "link";
        //Set different trackId:
        if (wto.trackId) {
            wt.trackId = trackId;
        }
        setParams(wt, wto);
        // removed this line because of a firefox/iexplorer error
        //wt.sendinfo({ linkId: linkName, sendOnUnload: 1 });
		try{
        wt.sendinfo({ linkId: linkName});
		}catch(err){};
        resetParams(wt);
    }
    //End Track Link Function

//**********************************Track Link Function******************************************
    wto.trackSocialMedia = function (linkName, product) {
        var wt = new webtrekkV3(webtrekkConfig);
        wt.linkTrack = "link";
        //Set different trackId:
        if (wto.trackId) {
            wt.trackId = trackId;
        }
        setParams(wt, wto);
        wt.product = product;
        // removed this line because of a firefox/iexplorer error
        wt.sendinfo({ linkId: linkName });
        resetParams(wto);
    }
//************************************End Track Link Function***************************************

//**********************************Custom Tracking Function******************************************
     wto.sendinfo = function (key, value) {
           var wt = new webtrekkV3(webtrekkConfig);
           wt.linkTrack = "link";
           //Set different trackId:
           if (wto.trackId) {
               wt.trackId = trackId;
           }
           setParams(wt, wto);
           obj = {};
           obj[key]  = value;
           wt.sendinfo({ linkId: "clickname", customClickParameter: obj });
           resetParams(wto);
    }
//************************************Custom Tracking Function***************************************


    //Track Function:
    wto.track = function () {
        var wt = new webtrekkV3(webtrekkConfig);

        //Set different trackId:
        if (wto.trackId) {
            wt.trackId = trackId;
        }

        //Set Parameters:
        setParams(wt, wto);

        //If Tracking is Link Tracking Or Event Raise:
        if (wto.linkTrackParams) {
            wt.linkTrackParams = wto.linkTrackParams;
            wt.linkTrackAttribute = "";
            if (wto.linkId) {
               /* if (wto.sendOnUnload == 1) {
                    wt.sendinfo({ linkId: wto.linkId, sendOnUnload: 1 });
                }
                else {*/
                    wt.sendinfo({ linkId: wto.linkId });
              /*  }*/
            }
            else {
                wt.sendinfo();
            }

        }
        //If Tracking is Oppenning Page:
        else {
            wt.sendinfo();
        }

        //**************code to generate pixcel automatically but it is not needed when we use send info method***********************
        //        var url = "http://" + webtrekkConfig.trackDomain + "/" + wt.trackId + "/wt.pl?p=312," + wto.pageName;
        //        var myimg = document.createElement('img');
        //        myimg.onload = function () { };
        //        myimg.src = url;

        //*************** Set Parameters too null and get redy to fire next event***************************
        resetParams(wto);

    }
//*****************************************End of Track Function***************************
    return wto;
}
//****************************************End Of Get Web Trekk Object (wto)*******************************

function setParams(wt, wto) {
    if (wto.linkTrack)
        wt.linkTrack = wto.linkTrack;

    if (getParamFromQueryStr('intcamp')) {
        if(getParamFromQueryStr('intcamp') == "GununTeklifi" || getParamFromQueryStr('intcamp') == 'hfurun'){
            wt.mediaCode = 'intcamp';
            wt.campaignId = wt.mediaCode + '=' + getParamFromQueryStr('intcamp') + "." + wto.productCategory[1] + "." + wto.products;
        }else{
            wt.mediaCode = 'intcamp';
            wt.campaignId = wt.mediaCode + '=' + getParamFromQueryStr('intcamp');
        }
    }
    
     if (getParamFromQueryStr('bnrcamp')) {
       wt.mediaCode = 'bnrcamp';
     wt.campaignId = wt.mediaCode + '=' + getParamFromQueryStr('bnrcamp');
    }
     if (getParamFromQueryStr('excamp')) {
        wt.mediaCode = 'excamp';
        wt.campaignId = wt.mediaCode + '=' + getParamFromQueryStr('excamp');
    }
	    if (getParamFromQueryStr('wt_ds')) {
        wt.mediaCode = 'wt_ds';
        wt.campaignId = wt.mediaCode + '=' + getParamFromQueryStr('wt_ds');
    }
	    if (getParamFromQueryStr('wt_sm')) {
        wt.mediaCode = 'wt_sm';
        wt.campaignId = wt.mediaCode + '=' + getParamFromQueryStr('wt_sm');
    }
	    if (getParamFromQueryStr('wt_af')) {
        wt.mediaCode = 'wt_af';
        wt.campaignId = wt.mediaCode + '=' + getParamFromQueryStr('wt_af');
    }
	    if (getParamFromQueryStr('wt_mb')) {
        wt.mediaCode = 'wt_mb';
        wt.campaignId = wt.mediaCode + '=' + getParamFromQueryStr('wt_mb');
    }
	if (getParamFromQueryStr('wt_rt')) {
        wt.mediaCode = 'wt_rt';
        wt.campaignId = wt.mediaCode + '=' + getParamFromQueryStr('wt_rt');
    }
		if (getParamFromQueryStr('wt_em')) {
        wt.mediaCode = 'wt_em';
        wt.campaignId = wt.mediaCode + '=' + getParamFromQueryStr('wt_em');
    }
		if (getParamFromQueryStr('wt_cp')) {
        wt.mediaCode = 'wt_cp';
        wt.campaignId = wt.mediaCode + '=' + getParamFromQueryStr('wt_cp');
    }
	if (getParamFromQueryStr('wt_gl')) {
        wt.mediaCode = 'wt_gl';
        wt.campaignId = wt.mediaCode + '=' + getParamFromQueryStr('wt_gl');
    }
    if (wto.pageName) 
        wt.contentId = wto.pageName; 
    if (wto.orderValue)
        wt.orderValue = wto.orderValue;
    if (wto.orderId)
        wt.orderId = wto.orderId;
    if (wto.product)
        wt.product = wto.product.replace(/\|/gi, ';');
    if (wto.productCost)
        wt.productCost = wto.productCost;
    if (wto.productQuantity)
        wt.productQuantity = wto.productQuantity;
    if (wto.productCategory)
        wt.productCategory = wto.productCategory;
    if (wto.productStatus)
        wt.productStatus = wto.productStatus.replace(/\|/gi, ';');
    if (wto.mediaGroup)
        wt.mediaGroup = wto.mediaGroup;
    if (wto.customerId)
        wt.customerId = wto.customerId;         
    if (wto.internalSearch)
        wt.internalSearch = wto.internalSearch;
    if (wto.campaignId)
        wt.campaignId = wto.campaignId;
    if (wto.contentGroup)
        wt.contentGroup = wto.contentGroup;
    if (wto.customClickParameter)
        wt.customClickParameter = wto.customClickParameter;
    if (wto.customTimeParameter)
        wt.customTimeParameter = wto.customTimeParameter;
    if (wto.customCampaignParameter)
        wt.customCampaignParameter = wto.customCampaignParameter;
    if (wto.customEcommerceParameter)
        wt.customEcommerceParameter = wto.customEcommerceParameter;
    if (wto.customSid)
        wt.customSid = wto.customSid;
    if (wto.customEid)
        wt.customEid = wto.customEid;
    if (wto.cookieEidTimeout)
        wt.cookieEidTimeout = wto.cookieEidTimeout;
    if (wto.cookieSidTimeout)
        wt.cookieSidTimeout = wto.cookieSidTimeout;

    //Mapping custom parameters:
    if (wto.searchKeyword)
        wt.internalSearch = wto.searchKeyword;
    if (wto.productAmount)
        wt.productQuantity = wto.productAmount.replace(/\|/gi, ';');
    if (wto.productAmount)
        var pAmount = wto.productAmount.split(';');

    if (wto.productPrice) {
        var pPrice = wto.productPrice.split(';');
        var pCount = new Array();
        for (var i = 0; i < pPrice.length; i++) {
            pCount[i] = pAmount[pAmount.length - pAmount.length + i] * pPrice[pPrice.length - pPrice.length + i];
        }
        var tpp = "" + pCount + "";
        wt.productCost = tpp.replace(/\,/gi, ';'); 
    }

    if (wto.customParameter) {
        wt.customParameter = wto.customParameter;
    }
    else {
        wto.customParameter = {
            1: "",
            2: "",
            3: "",
            4: "",
            5: "",
            6: "",
            7: "",
            8: "",
            9: "",
            10: "",
            11: "",
            12: "",
            13: "",
            14: "",
            15: "",
            16: "",
            17: ""
        };
        wt.customParameter = {
            1: "",
            2: "",
            3: "",
            4: "",
            5: "",
            6: "",
            7: "",
            8: "",
            9: "",
            10: "",
            11: "",
            12: "",
            13: "",
            14: "",
            15: "",
            16: "",
            17: ""
        };
    }

    if (wto.customSessionParameter) {
        wt.customSessionParameter = wto.customSessionParameter;
    }
    else {
        wto.customSessionParameter = {
            1: "",
            2: "",
            3: "",
            4: "",
            5: "",
            6: ""
        };
        wt.customSessionParameter = {
            1: "",
            2: "",
            3: "",
            4: "",
            5: "",
            6: ""
        };
    }
    if (wto.searchContext) {
        wt.customParameter[1] = wto.searchContext;
        wt.customSessionParameter[1] = wto.searchContext;
        //parametre kapali
    }
    if (wto.numOfSearchResults) {
        wt.customParameter[2] = wto.numOfSearchResults;
    } 
    if (wto.searchResultsShown){
        wt.customParameter[6] = wto.searchResultsShown;
    }
	    if (wto.productName){
        wt.customParameter[7] = wto.productName;
    }
    if (wto.loginStatus){
        wt.customSessionParameter[4] = wto.loginStatus;
    }
    if (wto.prodView == "true")
        wt.productStatus = "view";


    if (wto.products) {
        wt.product = wto.products.replace(/\|/gi, ';');
    }

    if (wto.addToShoppingCart == "true")
        wt.productStatus = "add";

    if (wto.funnelStep && wto.funnelStep.length > 0)
        wt.contentId += '|' + wto.funnelStep;
    if (wto.funnelStep && wto.funnelStep.length > 0){
        wt.contentGroup={1:'Anasayfa'
        ,2:'_Sepet'
        ,3:''
        ,4:''
        ,5:''
        };
        }
        
       if (wto.customerId && wto.customerId.length > 0){
            //login
            wt.customSessionParameter[4] = "login";
        }
         else {
         //not login
         wt.customSessionParameter[4] = "Not login";
         }; 
        if(document.URL.toLowerCase().indexOf("liste/gununteklifi")> -1){
        wt.customParameter[13] = 'gunun teklifi';
        wt.customSessionParameter[6] = 'gunun teklifi';
        
        }
    if (wto.gununFirsatlari) {
        wt.customParameter[13] = wto.gununFirsatlari;
    }
     if (wto.myPage) {
        wt.customParameter[17] = wto.myPage;
    }
    if (wto.searchRefinements) {
        wt.customParameter[11] = wto.searchRefinements;
    }
    if (wto.pageNotFound) {
        wt.customParameter[16] = wto.pageNotFound;
    }
    wt.customEcommerceParameter = {
        1: (wto.shippingCost) ? wto.shippingCost : "",
        2: (wto.paymentMethod) ? wto.paymentMethod : "",
        3: (wto.bankselection) ? wto.bankselection : "",
        4: (wto.cargoselection) ? wto.cargoselection : "",
        5: (wto.brandname) ? wto.brandname : "",
		6: (wto.firstOrder) ? wto.firstOrder : "",
		7: (wto.campaingName) ? wto.campaingName : "",
		8: (wto.valueAddedTax) ? wto.valueAddedTax : "",
		9: (wto.campaingDiscount) ? wto.campaingDiscount : "",
		10: (wto.giftCart) ? wto.giftCart : ""
      };
    wt.customClickParameter = {
        1: (wto.searchSortingMethod) ? wto.searchSortingMethod : "",
		3: (wto.errorFormName) ? wto.errorFormName : "",
        4: (wto.firstOrderEvent) ? wto.firstOrderEvent : "",
        5: (wto.productDetailPage) ? wto.productDetailPage : ""     
        };
        
    if (wto.orderTotal)
        wt.orderValue = wto.orderTotal;

    if (wto.purchaseID && wto.purchaseID.length > 0) {
        wt.productStatus = "conf";
        wt.orderId = wto.purchaseID;
    }
    if (wto.selectedListType) {
        wt.customParameter[10] = wto.selectedListType;
    }
    if (wto.prodCampaign) {
        wt.customParameter[12] = wto.prodCampaign;
    }
    if (wto.selectedResultPosition) {
        wt.customParameter[3] = wto.selectedResultPosition;
    }
    if (wto.accountCreateStart == 'true') {
        wt.customParameter[14] = 'true';
    }
    if (wto.accountCreateComplete == 'true') {
        wt.customParameter[15] = 'true';
    }

    if( document.referrer!="" && document.referrer.indexOf("google")!=-1){
        wt.customParameter[4] = this.urlParam(document.referrer,"cd","");
        
        wt.customParameter[5] = "empty";
        
        if(document.referrer.indexOf("url?")!=-1){
            wt.customParameter[5] = "url";
        }else if(document.referrer.indexOf("aclk?")!=-1){
            wt.customParameter[5] = "aclk";
        }

    }
    
}
function resetParams(wto) {
    wto.trackId = null;
    wto.pageName = null;
    wto.linkTrackParams = null;
    wto.linkTrackAttribute = null;
    wto.orderValue = null;
    wto.orderId = null;
    wto.product = null;
    wto.productCost = null;
    wto.productQuantity = null;
    wto.productCategory = null;
    wto.productStatus = null;
    wto.mediaGroup = null;
    wto.customerId = null;
    wto.internalSearch = null;
    wto.campaignId = null;
    wto.contentGroup = null;
    wto.customParameter = null;
    wto.customSessionParameter = null;
    wto.customClickParameter = null;
    wto.customTimeParameter = null;
    wto.customCampaignParameter = null;
    wto.customEcommerceParameter = null;
    wto.customSid = null;
    wto.customEid = null;
    wto.cookieEidTimeout = null;
    wto.cookieSidTimeout = null;

    //Reset Custom Properties
    wto.siteSection = null;
    wto.server = null;
    wto.searchContext = null;
    wto.searchKeyword = null;
    wto.numOfSearchResults = null;
    wto.searchResultTitle = null;
    wto.searchRefinements = null;
    wto.searchSortingMethod = null;
    wto.searchResultsShown = null;
    wto.loginStatus = null;
    wto.errorFormName = null;
    wto.pageNotFound = null;
    wto.loggedIn = null;
    wto.prodView = null;
    wto.products = null;
    wto.addToShoppingCart = null;
    wto.productPrice = null;
    wto.productAmount = null;
    wto.funnelStep = null;
    wto.paymentMethod = null;
    wto.purchaseID = null;
    wto.viewAlisverisListem = null;
    wto.viewFiyatAlarmListem = null;
    wto.viewStokAlarmListem = null;
    wto.viewKiyaslamaListem = null;
    wto.viewHepsiOlsaListem = null;
    wto.viewEnSonGezdiklerim = null;
    wto.accountCreateStart = null;
    wto.accountCreateComplete = null;
    wto.brandname=null;
}

function getParamFromQueryStr(paramName) {
    hu = window.location.search.substring(1);
    gy = hu.split("&");
    for (i = 0; i < gy.length; i++) {
        ft = gy[i].split("=");
        if (ft[0] == paramName) {
            return ft[1];
        }
    }
}

/*
********************* Farshid Customization Code End ********************
*/

var wtUnescape=function(u){if(typeof(decodeURIComponent)=="function"){return decodeURIComponent(u)
}return unescape(u)
};

var urlParam=function($H,$V,$W){var p=new Array();
if($H.indexOf("?")>0){p=$H.substring($H.indexOf("?")+1).replace(/&amp;/g,"&").split("&")
}for(var i=0;
i<p.length;
i++){if(p[i].indexOf($V+"=")==0){return this.wtUnescape(p[i].substring($V.length+1).replace(/\+/g,"%20"))
}}return $W
};



/**
* beforeWebtrekk ist eine Demo-Funktion zum Testen der Schnittstellen
* @type Function
*/
var beforeWebtrekk = function () {
    console.log("Sende 3rd-Party Pixel vor dem Webtrekk Pixel mit trackId " + this.trackId);

};

/**
* afterWebtrekk ist eine Demo-Funktion zum Testen der Schnittstellen
* @type Function
*/
var afterWebtrekk = function () {
    console.log("Sende 3rd-Party Pixel nach dem Webtrekk Pixel mit trackId " + this.trackId);
};
/**
* beforeUnloadPixel ist eine Demo-Funktion zum Testen der Schnittstellen
* @type Function
*/
var beforeUnloadPixel = function () {
    console.log("Mach irgendwas vor Senden des Unload-Pixels");
};
/**
* afterUnload ist eine Dmo-Funktion zum Testen der Schnittstellen
* @type Function
*/
var afterUnloadPixel = function () {
    console.log("Mach irgendwas nach Senden des Unload-Pixels");
};

//webtrekkConfig.beforeSendinfoPixel= beforeWebtrekk();

/*
********************* Ab hier nichts ändern ********************
********************* Don't change anything beyond this line ********************
*/

var webtrekkUnloadObjects = []; var webtrekkLinktrackObjects = []; var webtrekkHeatmapObjects = []; function webtrekkUnload($a) { for (i = 0; i < webtrekkUnloadObjects.length; i++) { if (webtrekkUnloadObjects[i].beforeUnloadPixel != false) { webtrekkUnloadObjects[i].beforeUnloadPixel(); }; var p = ""; if (webtrekkUnloadObjects[i].config.linkId) { p += "&ct=" + webtrekkUnloadObjects[i].wtEscape(webtrekkUnloadObjects[i].maxlen(webtrekkUnloadObjects[i].config.linkId, 255)); if (p) { if (webtrekkUnloadObjects[i].linktrackOut) { p += "&ctx=1"; }; var $b = webtrekkUnloadObjects[i].ccParams; if (typeof ($b) == 'string' && $b != '') { p += $b; } } }; if (webtrekkUnloadObjects[i].wtEp) { if (webtrekkUnloadObjects[i].wtEpEncoded) { p += webtrekkUnloadObjects[i].wtEp; } else { var $c = webtrekkUnloadObjects[i].wtEp; if (typeof ($c) == 'string' && $c != '') { $c = $c.split(/;/); for (var z = 0; z < $c.length; z++) { if (webtrekkUnloadObjects[i].wtTypeof($c[z])) { var $d = $c[z].split(/=/); if (webtrekkUnloadObjects[i].checkSC('custom')) { $d[1] = webtrekkUnloadObjects[i].decrypt($d[1]); }; $d[1] = webtrekkUnloadObjects[i].wtEscape($d[1]); p += '&' + $d[0] + '=' + $d[1]; } } } } }; if (webtrekkUnloadObjects[i].formObject && $a != "noForm") { var gatherFormsP = webtrekkUnloadObjects[i].gatherForm(); if (gatherFormsP) { p += "&fn=" + (webtrekkUnloadObjects[i].formName ? webtrekkUnloadObjects[i].formName : webtrekkUnloadObjects[i].contentId.split(";")[0]) + '|' + (webtrekkUnloadObjects[i].formSubmit ? "1" : "0"); p += "&ft=" + webtrekkUnloadObjects[i].wtEscape(gatherFormsP); } }; if (p != "" || webtrekkUnloadObjects[i].config.sendOnUnload) { webtrekkUnloadObjects[i].quicksend(webtrekkUnloadObjects[i].wtEscape(webtrekkUnloadObjects[i].contentId.split(";")[0]) + ",1," + webtrekkUnloadObjects[i].baseparams(), p); webtrekkUnloadObjects[i].config.linkId = ""; webtrekkUnloadObjects[i].ccParams = ""; webtrekkUnloadObjects[i].wtEp = ""; }; if (webtrekkUnloadObjects[i].afterUnloadPixel != false) { webtrekkUnloadObjects[i].afterUnloadPixel(); } } }; function webtrekkLinktrack(e) { for (z = 0; z < webtrekkLinktrackObjects.length; z++) { if ((e.which && e.which == 1) || (e.button && e.button == 1)) { var a = document.all ? window.event.srcElement : this; for (var i = 0; i < 4; i++) { if (a.tagName && a.tagName.toLowerCase() != "a" && a.tagName.toLowerCase() != "area") { a = a.parentElement; } }; a.lname = (a.getAttribute('name') ? a.getAttribute('name') : ""); webtrekkLinktrackObjects[z].getCCParams(a); if (webtrekkLinktrackObjects[z].linkTrackAttribute) { var $e = ""; eval("tmp = (a.getAttribute(webtrekkLinktrackObjects[z].linkTrackAttribute)?a.getAttribute(webtrekkLinktrackObjects[z].linkTrackAttribute):'')"); if ($e) { a.lname = $e; } }; a.lpos = 0; if (!webtrekkLinktrackObjects[z].wtLength(a.lpos) && a.tagName) { c = document.links; for (d = 0; d < webtrekkLinktrackObjects[z].wtLength(c); d++) { if (a == c[d]) { a.lpos = d + 1; break; } } }; if (a.lpos) { if (webtrekkLinktrackObjects[z].linkTrack == "link") { var y = a.href.indexOf("//"); y = (y >= 0 ? a.href.substr(y + 2) : a.href); if (webtrekkLinktrackObjects[z].linkTrackPattern) { if (!webtrekkLinktrackObjects[z].linkTrackReplace) { webtrekkLinktrackObjects[z].linkTrackReplace = ""; }; y = y.replace(webtrekkLinktrackObjects[z].linkTrackPattern, webtrekkLinktrackObjects[z].linkTrackReplace); }; webtrekkLinktrackObjects[z].config.linkId = (a.lname ? (a.lname + ".") : "") + y.split("?")[0].replace(/\//g, "."); var p = ""; if (webtrekkLinktrackObjects[z].linkTrackParams) { p = webtrekkLinktrackObjects[z].linkTrackParams.replace(/;/g, ",").split(","); }; for (var i = 0; i < p.length; i++) { var v = webtrekkLinktrackObjects[z].urlParam(y, p[i], ""); if (v) { webtrekkLinktrackObjects[z].config.linkId += "." + p[i] + "." + v; } } } else if (webtrekkLinktrackObjects[z].linkTrack == "standard" && a.lname) { webtrekkLinktrackObjects[z].config.linkId = a.lname; }; var $f = false; if (webtrekkLinktrackObjects[z].linkTrackDownloads) { var $g = a.href.split("."); $g = $g.pop(); var $h = webtrekkLinktrackObjects[z].linkTrackDownloads.split(";"); for (i = 0; i < $h.length; i++) { if ($h[i] == $g) { $f = true; break; } } }; if (webtrekkLinktrackObjects[z].config.linkId) { if (webtrekkLinktrackObjects[z].domain && !webtrekkLinktrackObjects[z].isOwnDomain(a.href)) { webtrekkLinktrackObjects[z].linktrackOut = true; } }; if (webtrekkLinktrackObjects[z].isSafari || webtrekkLinktrackObjects[z].isOpera || webtrekkLinktrackObjects[z].isChrome || webtrekkLinktrackObjects[z].isDownloadFile || (webtrekkLinktrackObjects[z].linktrack_p && a.target != "" && a.target != "_self")) { webtrekkLinktrackObjects[z].sendinfo(webtrekkLinktrackObjects[z].config); } } } } }; function webtrekkHeatmapClick(e) { var isOpera = (navigator.userAgent.indexOf('Opera') != -1); var isIE = (!isOpera && navigator.userAgent.indexOf('MSIE') != -1); for (z = 0; z < webtrekkHeatmapObjects.length; z++) { var $i = { left: -1, top: -1 }; if (document.getElementById(webtrekkHeatmapObjects[z].heatmapRefpoint)) { var $j = document.getElementById(webtrekkHeatmapObjects[z].heatmapRefpoint); if (webtrekkHeatmapObjects[z].wtTypeof($j.offsetLeft)) { while ($j) { $i.left += $j.offsetLeft; $i.top += $j.offsetTop; $j = $j.offsetParent; } } }; var $k = 0; var $l = 0; if (!e) { var e = window.event; }; if (e.pageX || e.pageY) { $k = e.pageX; $l = e.pageY; } else { if (e.clientX || e.clientY) { $k = e.clientX; $l = e.clientY; if (isIE) { if (document.body.scrollLeft > 0 || document.body.scrollTop > 0) { $k += document.body.scrollLeft; $l += document.body.scrollTop; } else { if (document.documentElement.scrollLeft > 0 || document.documentElement.scrollTop > 0) { $k += document.documentElement.scrollLeft; $l += document.documentElement.scrollTop; } } } } }; var $m = 0; if (isIE) { $m = document.body.clientWidth; } else { $m = self.innerWidth - 16; }; var $n = true; if ($k >= $m || !webtrekkHeatmapObjects[z].sentFullPixel) { $n = false; }; if (($i.top >= 0 || $i.left >= 0) && $k > $i.left && $l > $i.top) { $k = '-' + ($k - $i.left); $l = '-' + ($l - $i.top); }; if ($n) { webtrekkHeatmapObjects[z].quicksend(webtrekkHeatmapObjects[z].wtEscape(webtrekkHeatmapObjects[z].contentId.split(";")[0]) + "," + $k + "," + $l, '', "hm"); } } }; function webtrekkStartHeatmap() { if (typeof (wt_heatmap) != "undefined") { window.setTimeout("wt_heatmap()", 1000); } else { if (typeof ($o) == "undefined") $o = 0; $o++; if ($o < 60) window.setTimeout("webtrekkStartHeatmap()", 1000); } }; function webtrekkStartOverlay() { if (typeof (wt_overlay) != "undefined") { wt_overlay(); } else { if (typeof ($p) == "undefined") $p = 0; $p++; if ($p < 60) window.setTimeout("webtrekkStartOverlay()", 1000); } }; function webtrekkFormTrackInstall() { for (i = 0; i < webtrekkUnloadObjects.length; i++) { webtrekkUnloadObjects[i].findForm(); if (!webtrekkUnloadObjects[i].formObject) { continue; }; for (var j = 0; j < webtrekkUnloadObjects[i].formObject.elements.length; j++) { var e = webtrekkUnloadObjects[i].formObject.elements[j]; webtrekkUnloadObjects[i].registerEvent(e, "focus", webtrekkFormFocus); }; webtrekkUnloadObjects[i].registerEvent(webtrekkUnloadObjects[i].formObject, "submit", webtrekkFormSubmit); } }; function webtrekkFormSubmit(e) { for (i = 0; i < webtrekkUnloadObjects.length; i++) { if (!webtrekkUnloadObjects[i].form) { continue; }; if (e.target == webtrekkUnloadObjects[i].formObject || e.srcElement == webtrekkUnloadObjects[i].formObject) { webtrekkUnloadObjects[i].formSubmit = true; } } }; function webtrekkFormFocus(e) { var a = document.all ? window.event.srcElement : e.target; if (!a.name || a.type == "submit" || a.type == "image") { return; }; for (i = 0; i < webtrekkUnloadObjects.length; i++) { var f = webtrekkUnloadObjects[i].formObject.getAttribute('name') ? webtrekkUnloadObjects[i].formObject.getAttribute('name') : webtrekkUnloadObjects[i].contentId.split(";")[0]; if (webtrekkUnloadObjects[i].formAttribute) { var $e = ""; eval("tmp = (webtrekkUnloadObjects[" + i + "].formObject.getAttribute(webtrekkUnloadObjects[" + i + "].formAttribute) ? webtrekkUnloadObjects[" + i + "].formObject.getAttribute(webtrekkUnloadObjects[" + i + "].formAttribute):'')"); if ($e) { f = $e; } }; webtrekkUnloadObjects[i].formFocus = a.name; } }; function webtrekkV3($q) { if (!$q) { var $q = webtrekkConfig; }; this.trackId = ($q.trackId) ? $q.trackId : (webtrekkConfig.trackId) ? webtrekkConfig.trackId : false; this.trackDomain = ($q.trackDomain) ? $q.trackDomain : (webtrekkConfig.trackDomain) ? webtrekkConfig.trackDomain : false; this.domain = ($q.domain) ? $q.domain : (webtrekkConfig.domain) ? webtrekkConfig.domain : false; this.linkTrack = ($q.linkTrack) ? $q.linkTrack : (webtrekkConfig.linkTrack) ? webtrekkConfig.linkTrack : false; this.linkTrackAttribute = ($q.linkTrackAttribute) ? $q.linkTrackAttribute : (webtrekkConfig.linkTrackAttribute) ? webtrekkConfig.linkTrackAttribute : false; this.linkTrackPattern = ($q.linkTrackPattern) ? $q.linkTrackPattern : (webtrekkConfig.linkTrackPattern) ? webtrekkConfig.linkTrackPattern : false; this.linkTrackReplace = ($q.linkTrackReplace) ? $q.linkTrackReplace : (webtrekkConfig.linkTrackReplace) ? webtrekkConfig.linkTrackReplace : false; this.linkTrackDownloads = ($q.linkTrackDownloads) ? $q.linkTrackDownloads : (webtrekkConfig.linkTrackDownloads) ? webtrekkConfig.linkTrackDownloads : false; this.customParameter = ($q.customParameter) ? $q.customParameter : (webtrekkConfig.customParameter) ? webtrekkConfig.customParameter : false; this.customClickParameter = ($q.customClickParameter) ? $q.customClickParameter : (webtrekkConfig.customClickParameter) ? webtrekkConfig.customClickParameter : false; this.customSessionParameter = ($q.customSessionParameter) ? $q.customSessionParameter : (webtrekkConfig.customSessionParameter) ? webtrekkConfig.customSessionParameter : false; this.customTimeParameter = ($q.customTimeParameter) ? $q.customTimeParameter : (webtrekkConfig.customTimeParameter) ? webtrekkConfig.customTimeParameter : false; this.customCampaignParameter = ($q.customCampaignParameter) ? $q.customCampaignParameter : (webtrekkConfig.customCampaignParameter) ? webtrekkConfig.customCampaignParameter : false; this.customEcommerceParameter = ($q.customEcommerceParameter) ? $q.customEcommerceParameter : (webtrekkConfig.customEcommerceParameter) ? webtrekkConfig.customEcommerceParameter : false; this.orderValue = ($q.orderValue) ? $q.orderValue : (webtrekkConfig.orderValue) ? webtrekkConfig.orderValue : false; this.orderCurrency = ($q.orderCurrency) ? $q.orderCurrency : (webtrekkConfig.orderCurrency) ? webtrekkConfig.orderCurrency : false; this.orderId = ($q.orderId) ? $q.orderId : (webtrekkConfig.orderId) ? webtrekkConfig.orderId : false; this.product = ($q.product) ? $q.product : (webtrekkConfig.product) ? webtrekkConfig.product : false; this.productCost = ($q.productCost) ? $q.productCost : (webtrekkConfig.productCost) ? webtrekkConfig.productCost : false; this.productQuantity = ($q.productQuantity) ? $q.productQuantity : (webtrekkConfig.productQuantity) ? webtrekkConfig.productQuantity : false; this.productCategory = ($q.productCategory) ? $q.productCategory : (webtrekkConfig.productCategory) ? webtrekkConfig.productCategory : false; this.productStatus = ($q.productStatus) ? $q.productStatus : (webtrekkConfig.productStatus) ? webtrekkConfig.productStatus : false; this.customerId = ($q.customerId) ? $q.customerId : (webtrekkConfig.customerId) ? webtrekkConfig.customerId : false; this.customerCategory = ($q.customerCategory) ? $q.customerCategory : (webtrekkConfig.customerCategory) ? webtrekkConfig.customerCategory : false; this.contentGroup = ($q.contentGroup) ? $q.contentGroup : (webtrekkConfig.contentGroup) ? webtrekkConfig.contentGroup : false; this.mediaCode = ($q.mediaCode) ? $q.mediaCode : (webtrekkConfig.mediaCode) ? webtrekkConfig.mediaCode : false; this.mediaCodeValue = ($q.mediaCodeValue) ? $q.mediaCodeValue : (webtrekkConfig.mediaCodeValue) ? webtrekkConfig.mediaCodeValue : false; this.mediaCodeCookie = ($q.mediaCodeCookie) ? $q.mediaCodeCookie : (webtrekkConfig.mediaCodeCookie) ? webtrekkConfig.mediaCodeCookie : false; this.campaignId = ($q.campaignId) ? $q.campaignId : (webtrekkConfig.campaignId) ? webtrekkConfig.campaignId : false; this.campaignAction = ($q.campaignAction) ? $q.campaignAction : (webtrekkConfig.campaignAction) ? webtrekkConfig.campaignAction : "click"; this.internalSearch = ($q.internalSearch) ? $q.internalSearch : (webtrekkConfig.internalSearch) ? webtrekkConfig.internalSearch : false; this.customSid = ($q.customSid) ? $q.customSid : (webtrekkConfig.customSid) ? webtrekkConfig.customSid : false; this.customEid = ($q.customEid) ? $q.customEid : (webtrekkConfig.customEid) ? webtrekkConfig.customEid : false; this.cookie = ($q.cookie) ? $q.cookie : (webtrekkConfig.cookie) ? webtrekkConfig.cookie : "3"; this.cookieEidTimeout = ($q.cookieEidTimeout) ? $q.cookieEidTimeout : (webtrekkConfig.cookieEidTimeout) ? webtrekkConfig.cookieEidTimeout : false; this.cookieSidTimeout = ($q.cookieSidTimeout) ? $q.cookieSidTimeout : (webtrekkConfig.cookieSidTimeout) ? webtrekkConfig.cookieSidTimeout : false; this.forceNewSession = ($q.forceNewSession) ? $q.forceNewSession : (webtrekkConfig.forceNewSession) ? webtrekkConfig.forceNewSession : false; this.xwtip = ($q.xwtip) ? $q.xwtip : (webtrekkConfig.xwtip) ? webtrekkConfig.xwtip : false; this.xwtua = ($q.xwtua) ? $q.xwtua : (webtrekkConfig.xwtua) ? webtrekkConfig.xwtua : false; this.xwtrq = ($q.xwtrq) ? $q.xwtrq : (webtrekkConfig.xwtrq) ? webtrekkConfig.xwtrq : false; this.mediaCodeFrames = ($q.mediaCodeFrames) ? $q.mediaCodeFrames : (webtrekkConfig.mediaCodeFrames) ? webtrekkConfig.mediaCodeFrames : false; this.framesetReferrer = ($q.framesetReferrer) ? $q.framesetReferrer : (webtrekkConfig.framesetReferrer) ? webtrekkConfig.framesetReferrer : false; this.plugins = ($q.plugins && $q.plugins != '') ? $q.plugins : (webtrekkConfig.plugins && webtrekkConfig.plugins != '') ? webtrekkConfig.plugins : ['Adobe Acrobat', 'Windows Media Player', 'Shockwave Flash', 'RealPlayer', 'QuickTime', 'Java', 'Silverlight']; if (typeof (this.plugins) == "string") { this.plugins = this.plugins.split(";"); }; this.forceHTTPS = ($q.forceHTTPS) ? $q.forceHTTPS : (webtrekkConfig.forceHTTPS) ? webtrekkConfig.forceHTTPS : false; this.secureConfig = ($q.secureConfig) ? $q.secureConfig : (webtrekkConfig.secureConfig) ? webtrekkConfig.secureConfig : false; this.heatmap = ($q.heatmap) ? $q.heatmap : (webtrekkConfig.heatmap) ? webtrekkConfig.heatmap : false; this.heatmapRefpoint = ($q.heatmapRefpoint) ? $q.heatmapRefpoint : (webtrekkConfig.heatmapRefpoint) ? webtrekkConfig.heatmapRefpoint : "wt_refpoint"; this.pixelSampling = ($q.pixelSampling) ? $q.pixelSampling : (webtrekkConfig.pixelSampling) ? webtrekkConfig.pixelSampling : false; this.form = ($q.form) ? $q.form : (webtrekkConfig.form) ? webtrekkConfig.form : false; this.formAttribute = ($q.formAttribute) ? $q.formAttribute : (webtrekkConfig.formAttribute) ? webtrekkConfig.formAttribute : false; this.formFieldAttribute = ($q.formFieldAttribute) ? $q.formFieldAttribute : (webtrekkConfig.formFieldAttribute) ? webtrekkConfig.formFieldAttribute : false; this.formFullContent = ($q.formFullContent) ? $q.formFullContent : (webtrekkConfig.formFullContent) ? webtrekkConfig.formFullContent : false; this.formAnonymous = ($q.formAnonymous) ? $q.formAnonymous : (webtrekkConfig.formAnonymous) ? webtrekkConfig.formAnonymous : false; this.reporturl = ($q.reporturl) ? $q.reporturl : (webtrekkConfig.reporturl) ? webtrekkConfig.reporturl : 'report2.webtrekk.de/cgi-bin/wt'; this.disableOverlayView = ($q.disableOverlayView) ? $q.disableOverlayView : (webtrekkConfig.disableOverlayView) ? webtrekkConfig.disableOverlayView : false; this.version = 312; this.beforeSendinfoPixel = false; this.afterSendinfoPixel = false; this.beforeUnloadPixel = false; this.afterUnloadPixel = false; this.deactivatePixel = false; this.optOut = false; this.eid = false; this.sampleCookieString = false; this.cookieOne = false; this.linkId = false; this.linktrackOut = false; this.linktrackNamedlinksOnly = true; this.ccParams = false; this.sentFullPixel = false; this.sentCampaignIds = {}; this.wtEp = false; this.wtEpEncoded = false; this.trackingSwitchMediaCode = false; this.trackingSwitchMediaCodeValue = false; this.trackingSwitchMediaCodeTimestamp = false; this.heatmapOn = false; this.overlayOn = false; this.gatherFormsP = false; this.formObject = false; this.formName = false; this.formFocus = false; this.formSubmit = false; this.browserLang = false; this.config = false; this.unloadInstance = webtrekkUnloadObjects.length; if (typeof (navigator.language) == "string") { this.browserLang = navigator.language.substring(0, 2); } else if (typeof (navigator.userLanguage) == "string") { this.browserLang = navigator.userLanguage.substring(0, 2); }; this.getConfig = function () { var c = { "contentId": this.contentId, "linkId": this.linkId, "sendOnUnload": false, "customParameter": this.customParameter, "customClickParameter": this.customClickParameter, "customSessionParameter": this.customSessionParameter, "customTimeParameter": this.customTimeParameter, "customCampaignParameter": this.customCampaignParameter, "customEcommerceParameter": this.customEcommerceParameter, "orderValue": this.orderValue, "orderCurrency": this.orderCurrency, "orderId": this.orderId, "product": this.product, "productCost": this.productCost, "productQuantity": this.productQuantity, "productCategory": this.productCategory, "productStatus": this.productStatus, "customerId": this.customerId, "customerCategory": this.customerCategory, "contentGroup": this.contentGroup, "campaignId": this.campaignId, "campaignAction": this.campaignAction, "internalSearch": this.internalSearch, "customSid": this.customSid, "customEid": this.customEid, "forceNewSession": this.forceNewSession, "xwtip": this.xwtip, "xwtua": this.xwtua, "xwtrq": this.xwtrq, "framesetReferrer": this.framesetReferrer, "forceHTTPS": this.forceHTTPS, "beforeSendinfoPixel": this.beforeSendinfoPixel, "afterSendinfoPixel": this.afterSendinfoPixel, "beforeUnloadPixel": this.beforeUnloadPixel, "afterUnloadPixel": this.afterUnloadPixel }; return c; }; this.indexOf = function (a, b, c) { return a.indexOf(b, c ? c : 0); }; this.wtTypeof = function (v) { return (typeof v != "undefined") ? 1 : 0; }; this.wtLength = function (a) { return a != "undefined" ? a.length : 0; }; this.getTimezone = function () { return Math.round((new Date().getTimezoneOffset() / 60) * (-1)); }; this.wtHref = function () { return this.wtLocation().href; }; this.wtLocation = function () { var r = document.location; if (!document.layers && document.getElementById) { eval("try {r=top.document.location;}catch(e){r=document.location;};"); } else { r = top.document.location; }; return r; }; this.getWebtrekkPath = function () { if (!document.layers && document.getElementById) { var $r = document.getElementsByTagName('script'); for (var i = 0; i < $r.length; i++) { if ($r[i].src.match(/webtrekk[a-z|A-Z|0-9|_]*\.js/g)) { return $r[i].src.replace(/webtrekk[a-z|A-Z|0-9|_]*\.js/g, ''); } } }; return ''; }; this.include = function (s) { if (!document.createElement) { return false; }; var $s = document.getElementsByTagName('head').item(0); var js = document.createElement('script'); js.setAttribute('language', 'javascript'); js.setAttribute('type', 'text/javascript'); js.setAttribute('src', s); $s.appendChild(js); return true; }; this.isIE = this.indexOf(navigator.appName, "Microsoft") ? false : true; if (!this.isIE) { this.isOpera = this.indexOf(navigator.appName, "Opera") ? false : true; if (!this.isOpera) { this.isSafari = (navigator.vendor.toLowerCase().indexOf("apple") != -1) ? true : false; this.isChrome = (navigator.vendor.toLowerCase().indexOf("google") != -1) ? true : false; } }; this.url2contentId = function ($t) { if (!$t) { return "no_content"; }; var $e = new RegExp("//(.*)").exec($t); if ($e.length < 1) { return "no_content"; }; var $u = $e[1].split("?")[0].replace(/\./g, "_").replace(/\//g, ".").replace(/\.{2,};/g, ".").toLowerCase(); return $u.split(";")[0]; }; this.contentId = ($q.contentId) ? $q.contentId : this.url2contentId(document.location.href); this.registerEvent = function ($j, e, f) { if ($j.addEventListener) { $j.addEventListener(e, f, false); } else { if ($j.attachEvent) { $j.attachEvent("on" + e, f); } } }; this.unregisterEvent = function ($j, e, f) { if ($j.removeEventListener) { $j.removeEventListener(e, f, false); } else { if ($j.detachEvent) { $j.detachEvent("on" + e, f); } } }; this.maxlen = function (v, l) { if (v && v.length > l) { return v.substring(0, l - 1); }; return v; }; this.wtEscape = function (u) { if (typeof (encodeURIComponent) == 'function') { return encodeURIComponent(u); }; return escape(u); }; this.wtUnescape = function (u) { if (typeof (decodeURIComponent) == 'function') { return decodeURIComponent(u); }; return unescape(u); }; this.decrypt = function (x) { if (x) { return eval("try {this.wtUnescape(x.replace(/([0-9a-fA-F][0-9a-fA-F])/g,'%$1'));}catch(e){''};"); } }; this.checkSC = function (x) { if (typeof (this.secureConfig) != 'string') { return false; }; var sc = this.secureConfig.split(';'); for (var i = 0; i < sc.length; i++) { if (sc[i] == x) { return true; } }; return false; }; this.zeroPad = function (n, $v) { var $w = "000000000000" + n; return $w.substring(($w.length - $v), $w.length); }; this.generateEid = function () { return '2' + this.zeroPad(Math.floor(new Date().getTime() / 1000), 10) + this.zeroPad(Math.floor(Math.random() * 1000000), 8); }; this.getexpirydate = function ($x) { var $y; var $z = new Date(); var $A = Date.parse($z); $z.setTime($A + $x * 60 * 1000); $y = $z.toUTCString(); return $y; }; this.setCookie = function (name, $B, $C) { var d = location.hostname; var $D = "^[0-9]{1,3" + String.fromCharCode(125) + "\.[0-9]{1,3" + String.fromCharCode(125) + "\.[0-9]{1,3" + String.fromCharCode(125) + "\.[0-9]{1,3" + String.fromCharCode(125) + "$"; if (d.search($D) == -1) { d = location.hostname.split("."); d = d[d.length - 2] + "." + d[d.length - 1]; }; var c; if (d.split('.')[0].length < 3 && this.isIE && typeof $C != "undefined") { c = name + "=" + escape($B) + ";path=/;expires=" + this.getexpirydate($C); } else if (d.split('.')[0].length < 3 && this.isIE) { c = name + "=" + escape($B) + ";path=/"; } else if (typeof $C != "undefined") { c = name + "=" + escape($B) + ";domain=" + d + ";path=/;expires=" + this.getexpirydate($C); } else { c = name + "=" + escape($B) + ";path=/;domain=" + d; }; document.cookie = c; }; this.getCookie = function ($E) { var $F = "" + document.cookie; var $G = $F.indexOf($E); if ($G == -1 || $E == "") { return ""; }; var $H = $F.indexOf(';', $G); if ($H == -1) { $H = $F.length; }; return unescape($F.substring($G + $E.length + 1, $H)); }; this.optOut = (this.getCookie("webtrekkOptOut")) ? true : false; if (this.optOut) { this.deactivatePixel = true; }; this.urlParam = function ($t, $I, $J) { var p = new Array(); if ($t.indexOf("?") > 0) { p = $t.substring($t.indexOf("?") + 1).replace(/&amp;/g, "&").split("&"); }; for (var i = 0; i < p.length; i++) { if (p[i].indexOf($I + "=") == 0) { return this.wtUnescape(p[i].substring($I.length + 1).replace(/\+/g, "%20")); } }; return $J; }; this.allUrlParam = function ($I, $J) { if (this.mediaCodeFrames && this.mediaCodeFrames != '') { var lf = this.mediaCodeFrames.split(";"); for (var i = 0; i < lf.length; i++) { var $K = false; eval("try { lFrame = eval(lf[i]) }catch(e){};"); if ($K && $K != top && $K.location) { var $L = this.urlParam($K.location.href, $I, $J); if ($L != $J) { return $L; } } }; return $J; } else { var topLocation = ""; eval("try {topLocation = top.location.href;}catch(e){topLocation=document.location.href;};"); return this.urlParam(topLocation, $I, $J); } }; this.linkTrackInit = function () { for (i = 0; i < webtrekkLinktrackObjects.length; i++) { if (this == webtrekkLinktrackObjects[i]) { return; } }; webtrekkLinktrackObjects.push(this); if (this.linkTrack && this.linkTrack == "link") { this.linktrackNamedlinksOnly = false; }; for (c = 0; c < document.links.length; c++) { var name = document.links[c].getAttribute('name'); if (this.linkTrackAttribute && this.linkTrackAttribute != "") { var $e = ""; eval("tmp = (document.links[c].getAttribute(this.linkTrackAttribute)?document.links[c].getAttribute(this.linkTrackAttribute):'')"); if ($e) { name = $e; } }; if (name || !this.linktrackNamedlinksOnly) { this.registerEvent(document.links[c], 'mousedown', webtrekkLinktrack); } } }; if (this.linkTrack) { this.linkTrackInit(); }; this.getCCParams = function (a) { var p = ''; if (this.config.customClickParameter) { var $M = (this.config.customClickParameter[a.getAttribute('name')]) ? this.config.customClickParameter[a.getAttribute('name')] : this.config.customClickParameter[a.id]; if (!$M) { $M = this.config.customClickParameter; }; for (var z in $M) { if (!isNaN(z) && this.wtTypeof($M[z]) && typeof ($M[z]) == 'string' && $M[z] != '') { if (this.checkSC('custom')) { $M[z] = this.decrypt($M[z]); }; p += '&ck' + z + '=' + this.wtEscape($M[z]); } } }; this.ccParams = p; return; }; this.plugInArray = function ($N, $O) { if (typeof ($N) != 'object') { return false; }; for (var i = 0; i < $N.length; i++) { var $P = new RegExp($N[i].toLowerCase(), 'g'); if ($O.toLowerCase().search($P) != -1) { return $N[i]; } }; return false; }; this.quicksend = function ($Q, $R, $S) { if (!this.trackDomain || !this.trackId || this.deactivatePixel) { return; }; if (!$S) { $S = "wt"; }; if (this.cookie == "1") { $R = "&eid=" + this.eid + "&one=" + (this.cookieOne ? "1" : "0") + "&fns=" + (this.forceNewSession ? "1" : "0") + $R; }; if (this.cookie != "1" && (this.wtTypeof(this.cookieEidTimeout) || this.wtTypeof(this.cookieSidTimeout))) { if (this.wtTypeof(this.cookieEidTimeout) && this.cookieEidTimeout != '') { $R = "&cet=" + this.cookieEidTimeout + $R; }; if (this.wtTypeof(this.cookieSidTimeout) && this.cookieSidTimeout != '') { $R = "&cst=" + this.cookieSidTimeout + $R; } }; if (this.pixelSampling > 0) { $R += "&ps=" + this.pixelSampling; }; $R = "&tz=" + this.getTimezone() + $R; var $T = (location.protocol == "https:" ? "https:" : "http:"); if (this.forceHTTPS) { $T = "https:"; }; var $U = $T + "//" + this.trackDomain + "/" + this.trackId + "/" + $S + "?p=" + this.version + "," + $Q + $R + "&eor=1"; if (document.images) { if (!this.wtTypeof($V)) { var $V = new Array(); }; var ii = $V.length; $V[ii] = new Image(); $V[ii].src = $U; $V[ii].onload = function () { }; } else { document.write("<img src='" + $U + "' height='1' width='1'>"); }; if ($S != 'hm') { this.cookieOne = false; this.sentFullPixel = 1; } }; this.send = function (p, $W, ep) { if ($W == "link") { this.config.linkId = p; this.linkTrack = "manual"; this.wtEp = ep; if (this.isChrome || this.isOpera || this.isSafari) { webtrekkUnload('noForm'); } else { this.registerEvent(window, (this.isIE && this.wtTypeof(window.onbeforeunload)) ? "beforeunload" : "unload", webtrekkUnload); }; return; }; if ($W == "click") { this.config.linkId = p; this.wtEp = ep; webtrekkUnload('noForm'); return; }; var $X = (p) ? p : this.config.contentId; if (!$X) { $X = "no_content"; }; var $Y = ""; var $Z = this.wtEscape($X) + ",1,"; $Z += this.baseparams(); var $00 = navigator.plugins.length; var $01 = ""; if ($00 > 0) { var $02 = Array(); for (var i = 0; i < $00; i++) { if (navigator.plugins && navigator.appName != 'Microsoft Internet Explorer') { if (navigator.plugins[i].name == "Shockwave Flash") { $01 = navigator.plugins[i].description; } else { $01 = navigator.plugins[i].name; }; var $03 = this.plugInArray(this.plugins, $01); if ($03 && !this.plugInArray($02, $03)) { $02.push($03); } } }; $01 = $02.join("|"); }; if (typeof (ep) == "string" && ep != "") { ep = ep.split(/;/); for (var z = 0; z < ep.length; z++) { if (this.wtTypeof(ep[z])) { $d = ep[z].split(/=/); if (this.checkSC('custom')) { $d[1] = this.decrypt($d[1]); }; $d[1] = this.wtEscape($d[1]); $Y += '&' + $d[0] + '=' + $d[1]; } } } else { this.wtEpEncoded = false; var $04 = ''; if (typeof (this.config.customParameter) == 'object') { for (var z in this.config.customParameter) { if (!isNaN(z) && this.wtTypeof(this.config.customParameter[z]) && typeof (this.config.customParameter[z]) == 'string' && this.config.customParameter[z] != '') { if (this.checkSC('custom')) { this.config.customParameter[z] = this.decrypt(this.config.customParameter[z]); }; $04 += '&cp' + z + '=' + this.wtEscape(this.config.customParameter[z]); } } }; var $05 = ''; if (typeof (this.config.customSessionParameter) == 'object') { for (var z in this.config.customSessionParameter) { if (!isNaN(z) && this.wtTypeof(this.config.customSessionParameter[z]) && typeof (this.config.customSessionParameter[z]) == 'string' && this.config.customSessionParameter[z] != '') { if (this.checkSC('custom')) { this.config.customSessionParameter[z] = this.decrypt(this.config.customSessionParameter[z]); }; $05 += '&cs' + z + '=' + this.wtEscape(this.config.customSessionParameter[z]); } } }; var $06 = ''; if (typeof (this.config.customTimeParameter) == 'object') { for (var z in this.config.customTimeParameter) { if (!isNaN(z) && this.wtTypeof(this.config.customTimeParameter[z]) && typeof (this.config.customTimeParameter[z]) == 'string' && this.config.customTimeParameter[z] != '') { if (this.checkSC('custom')) { this.config.customTimeParameter[z] = this.decrypt(this.config.customTimeParameter[z]); }; $06 += '&ce' + z + '=' + this.wtEscape(this.config.customTimeParameter[z]); } } }; var $07 = ''; if (typeof (this.config.customEcommerceParameter) == 'object') { for (var z in this.config.customEcommerceParameter) { if (!isNaN(z) && this.wtTypeof(this.config.customEcommerceParameter[z]) && typeof (this.config.customEcommerceParameter[z]) == 'string' && this.config.customEcommerceParameter[z] != '') { if (this.checkSC('custom')) { this.config.customEcommerceParameter[z] = this.decrypt(this.config.customEcommerceParameter[z]); }; $07 += '&cb' + z + '=' + this.wtEscape(this.config.customEcommerceParameter[z]); } } }; if (this.config.orderValue) { if (this.checkSC('order')) { $Y += "&ov=" + this.wtEscape(this.decrypt(this.config.orderValue)); } else { $Y += "&ov=" + this.wtEscape(this.config.orderValue); } }; if (this.config.orderCurrency) { if (this.checkSC('order')) { $Y += "&cr=" + this.wtEscape(this.decrypt(this.config.orderCurrency)); } else { $Y += "&cr=" + this.wtEscape(this.config.orderCurrency); } }; if (this.config.orderId) { $Y += "&oi=" + this.wtEscape(this.config.orderId); }; if (this.config.product) { $Y += "&ba=" + this.wtEscape(this.config.product); if (this.config.productCost) { $Y += "&co=" + this.wtEscape(this.config.productCost); }; if (this.config.productQuantity) { $Y += "&qn=" + this.wtEscape(this.config.productQuantity); }; if (typeof (this.config.productCategory) == 'object') { for (var z in this.config.productCategory) { if (!isNaN(z) && typeof (this.config.productCategory[z]) == 'string' && this.config.productCategory[z] != '') { $Y += "&ca" + z + "=" + this.wtEscape(this.config.productCategory[z]); } } }; if (this.config.productStatus) { $Y += "&st=" + this.wtEscape(this.config.productStatus); } }; if (this.config.customerId) { $Y += "&cd=" + this.wtEscape(this.config.customerId); }; if (typeof (this.config.customerCategory) == 'object') { for (var z in this.config.customerCategory) { if (!isNaN(z) && typeof (this.config.customerCategory[z]) == 'string' && this.config.customerCategory[z] != '') { $Y += "&vc" + z + "=" + this.wtEscape(this.config.customerCategory[z]); } } }; if (this.browserLang) { $Y += "&la=" + this.wtEscape(this.browserLang); }; if (typeof (this.config.contentGroup) == 'object') { for (var z in this.config.contentGroup) { if (!isNaN(z) && typeof (this.config.contentGroup[z]) == 'string' && this.config.contentGroup[z] != '') { $Y += "&cg" + z + "=" + this.wtEscape(this.config.contentGroup[z]); } } }; var $08 = ''; if (this.config.campaignId && !(this.config.campaignId in this.sentCampaignIds)) { $Y += "&mc=" + this.wtEscape(this.config.campaignId); $Y += "&mca=" + this.config.campaignAction.substring(0, 1); this.sentCampaignIds[this.config.campaignId] = true; if (typeof (this.config.customCampaignParameter) == 'object') { for (var z in this.config.customCampaignParameter) { if (!isNaN(z) && this.wtTypeof(this.config.customCampaignParameter[z]) && typeof (this.config.customCampaignParameter[z]) == 'string' && this.config.customCampaignParameter[z] != '') { if (this.checkSC('custom')) { this.config.customCampaignParameter[z] = this.decrypt(this.config.customCampaignParameter[z]); }; $08 += '&cc' + z + '=' + this.wtEscape(this.config.customCampaignParameter[z]); } } } }; if (this.trackingSwitchMediaCode) { $Y += "&tmc=" + this.wtEscape(this.trackingSwitchMediaCode); }; if (this.trackingSwitchMediaCodeValue) { $Y += "&tmcv=" + this.wtEscape(this.trackingSwitchMediaCodeValue); }; if (this.trackingSwitchMediaCodeTimestamp) { $Y += "&tmct=" + this.wtEscape(this.trackingSwitchMediaCodeTimestamp); }; var $09 = ""; var $0a; if (typeof (wt_vt) != "undefined") { $0a = wt_vt; }; if (!this.wtTypeof($0a)) { $0a = this.urlParam(location.href, 'wt_vt', false); }; if ($0a) { var $0b = this.getCookie('wt_vt').split(";"); for (var i = 0; i < $0b.length; i++) { if ($0b[i].indexOf($0a + 'v') != -1) { $09 = '&wt_vt=' + $0b[i].split('t')[0].split('v')[1]; } } }; if ($09) { $Y += $09; }; if (this.config.internalSearch) { $Y += "&is=" + this.wtEscape(this.maxlen(this.config.internalSearch, 255)); }; if ($04) { $Y += $04; }; if ($08) { $Y += $08; }; if ($06) { $Y += $06; }; if ($07) { $Y += $07; }; if ($05) { $Y += $05; }; if (this.wtTypeof(this.config.customSid) && this.config.customSid != '') { $Y += "&csid=" + this.config.customSid; }; if (this.wtTypeof(this.config.customEid) && this.config.customEid != '') { $Y += "&ceid=" + this.config.customEid; }; if (this.wtTypeof(this.config.xwtip) && this.config.xwtip != '') { $Y += "&X-WT-IP=" + this.wtEscape(this.config.xwtip); }; if (this.wtTypeof(this.config.xwtua) && this.config.xwtua != '') { $Y += "&X-WT-UA=" + this.wtEscape(this.config.xwtua); }; if (this.wtTypeof(this.config.xwtrq) && this.config.xwtrq != '') { $Y += "&X-WT-RQ=" + this.wtEscape(this.config.xwtrq); } }; if (this.config.linkId && this.config.customClickParameter) { var $M = (this.config.customClickParameter[this.config.linkId]) ? this.config.customClickParameter[this.config.linkId] : this.config.customClickParameter; for (var z in $M) { if (!isNaN(z) && this.wtTypeof($M[z]) && typeof ($M[z]) == 'string' && $M[z] != '') { if (this.checkSC('custom')) { $M[z] = this.decrypt($M[z]); }; $Y += '&ck' + z + '=' + this.wtEscape($M[z]); } }; this.ccParams = false; }; if (this.config.linkId && this.config.sendOnUnload) { this.linkTrack = "manual"; this.wtEp = $Y; this.wtEpEncoded = true; if (this.isChrome || this.isOpera || this.isSafari) { webtrekkUnload('noForm'); } else { this.registerEvent(window, (this.isIE && this.wtTypeof(window.onbeforeunload)) ? "beforeunload" : "unload", webtrekkUnload); }; return; } else if (this.config.linkId) { this.wtEp = $Y; this.wtEpEncoded = true; webtrekkUnload('noForm'); return; } else if (!this.config.contentId && !this.config.linkId) { this.config.contentId = this.contentId; this.config.linkId = "wt_ignore"; this.wtEp = $Y; this.wtEpEncoded = true; webtrekkUnload('noForm'); return; } else if (this.config.sendOnUnload) { this.wtEp = $Y; this.wtEpEncoded = true; if (this.isChrome || this.isOpera || this.isSafari) { webtrekkUnload('noForm'); } else { this.registerEvent(window, (this.isIE && this.wtTypeof(window.onbeforeunload)) ? "beforeunload" : "unload", webtrekkUnload); }; return; }; if (this.cookie == "1") { if (this.cookieOne) { $Y += "&np=" + this.wtEscape($01); } } else { $Y += "&np=" + this.wtEscape($01); }; this.quicksend($Z, $Y); }; this.sendinfo = function (c, p, $W, ep) { if (this.cookie == "1" && !this.optOut && !this.deactivatePixel) { this.firstParty(); }; if (this.urlParam(location.href, 'fb_xd_fragment', false)) { return; }; if (typeof (c) == 'object') { this.config = c; } else { this.config = this.getConfig(); }; if (!this.config.campaignId && this.mediaCode) { this.getMediaCode(); }; if (this.beforeSendinfoPixel != false) { this.beforeSendinfoPixel(); }; if (this.contentId != "" || p != "" || document.layers) { this.send(p, $W, ep); }; if (this.afterSendinfoPixel != false) { this.afterSendinfoPixel(); } }; this.sendinfo_media = function ($0c, mk, $0d, $0e, mg, bw, $0f, $0g) { if (this.wtTypeof($0h)) { $0h($0c, mk, $0d, $0e, mg, bw, $0f, $0g, this.unloadInstance); } }; this.isOwnDomain = function (l) { var pt = ''; if (this.domain) { if (this.domain.toUpperCase().indexOf("REGEXP:") == 0) { pt = new RegExp(this.domain.substring(7), "i"); if (pt.test(this.getDomain(l))) { return true; } } else { var $0i = this.domain.split(';'); var $0j = this.getDomain(l); for (var i = 0; i < $0i.length; i++) { if ($0j == $0i[i]) { return true; } } } } else { return false; }; return false; }; this.getDomain = function (l) { if (typeof (l) != 'string') { return ''; }; l = this.wtUnescape(l); l = l.split('://')[1]; var rx = new RegExp('^(?:[^\/]+:\/\/)?([^\/:]+)', 'g'); if (typeof (l) != 'undefined') { l = l.match(rx); if (l[0]) { return l[0].toLowerCase(); }; }; return ''; }; this.baseparams = function () { var $0k = screen.width + "x" + screen.height + "," + (navigator.appName != 'Netscape' ? screen.colorDepth : screen.pixelDepth) + ","; $0k += ((navigator.cookieEnabled == true) ? "1," : ((navigator.cookieEnabled == false) ? "0," : ((document.cookie.indexOf("=") != -1) ? "1," : "0,"))); $0k += new Date().getTime() + ","; var $0l = 0; if (this.framesetReferrer) { $0l = this.wtEscape(this.framesetReferrer); } else { if (document.referrer.length > 0) { $0l = this.wtEscape(document.referrer); } }; if (this.sentFullPixel) { $0k += "2"; } else if (!this.isOwnDomain($0l)) { $0k += $0l; } else if (this.isOwnDomain($0l)) { $0k += "1"; } else { $0k += $0l; }; var h = 0; if (!document.layers && document.getElementById) { eval("try {h = top.window.innerHeight;}catch(e){};"); } else { h = top.window.innerHeight; }; if (!h) { eval("try {h = top.document.documentElement.clientHeight;}catch(e){};"); }; if (!h) { eval("try {h = top.document.body.clientHeight;}catch(e){};"); }; var w = 0; if (!document.layers && document.getElementById) { eval("try {w = top.window.innerWidth;}catch(e){};"); } else { w = top.window.innerWidth; }; if (!w) { eval("try {w = top.document.documentElement.clientWidth;}catch(e){};"); }; if (!w) { eval("try {w = top.document.body.clientWidth;}catch(e){};"); }; if (h && h > screen.height) { h = screen.height; }; if (w && w > screen.width) { w = screen.width; }; if (typeof (w) == 'undefined') { w = -1; }; if (typeof (h) == 'undefined') { h = -1; }; $0k += "," + w + "x" + h; $0k += "," + (navigator.javaEnabled() ? "1" : "0"); return $0k; }; this.getMediaCode = function (mc) { if (!mc) { if (!this.mediaCode) { return false; }; mc = this.mediaCode; }; var m = mc.split(";"); this.config.campaignId = ""; for (var i = 0; i < m.length; i++) { if (this.config.campaignId != "") { this.config.campaignId += ";"; }; if (this.mediaCodeCookie) { if (this.getCookie('wt_' + m[i].toLowerCase() + this.allUrlParam(m[i], "").toLowerCase()) == '') { this.config.campaignId += m[i] + this.wtEscape("=" + this.allUrlParam(m[i], "")); } else { this.config.campaignId += m[i] + "=ignore"; }; var $0m = ''; if (this.mediaCodeCookie == 'eid') { $0m = 60 * 30 * 24 * 60; }; this.setCookie('wt_' + m[i].toLowerCase() + this.allUrlParam(m[i], "").toLowerCase(), 1, $0m); } else { if (this.allUrlParam(m[i], "") != "") { this.config.campaignId += m[i] + this.wtEscape("=" + this.allUrlParam(m[i], "")); } } } }; this.heatmapOn = (this.wtHref().indexOf("wt_heatmap=1") >= 0); this.overlayOn = (this.wtHref().indexOf("wt_overlay=1") >= 0 || document.cookie.indexOf("wt_overlay=1") >= 0); if (this.wtHref().indexOf("wt_overlay=0") >= 0) { this.overlayOn = false; this.setCookie("wt_overlay", "", -1); }; var $0n = false; for (i = 0; i < webtrekkHeatmapObjects.length; i++) { if (this == webtrekkHeatmapObjects[i]) { $0n = true; } }; if (!$0n) { webtrekkHeatmapObjects.push(this); }; if (this.heatmap && this.heatmap == "1" && !this.heatmapOn) { this.registerEvent(document, "mousedown", webtrekkHeatmapClick); }; if (this.heatmapOn && !this.disableOverlayView) { if (this.include(location.protocol + "//" + this.reporturl + "/heatmap.pl?wt_contentId=" + this.wtEscape(this.contentId.split(";")[0]) + "&x=" + new Date().getTime())) { if (navigator.userAgent.indexOf('MSIE 6') != -1 && navigator.userAgent.indexOf('Windows NT 5.0') != -1) { alert("Click OK to start heatmap."); }; this.registerEvent(window, "load", webtrekkStartHeatmap); } }; if (this.overlayOn && !this.disableOverlayView) { this.setCookie("wt_overlay", "1"); if (this.include(location.protocol + "//" + this.reporturl + "/overlay.pl?wt_contentId=" + this.wtEscape(this.contentId.split(";")[0]) + "&x=" + new Date().getTime())) this.registerEvent(window, "load", webtrekkStartOverlay); }; this.setPixelSampling = function ($0o) { if (!$0o) { var $0o = this.pixelSampling; }; var trackId = this.trackId.split(",")[0]; var $0p = this.getCookie("wt3_sample").split(";"); var $0q = false; for (var i = 0; i < $0p.length; i++) { if (this.indexOf($0p[i], trackId + "|" + $0o) != -1) { $0q = true; } else if (this.indexOf($0p[i], trackId + "|") != -1) { $0p[i] = ""; } }; if (!$0q) { if (Math && Math.random && parseInt(Math.random() * $0o) == 0) { $0p.push(trackId + "|" + $0o + "|1"); } else { $0p.push(trackId + "|" + $0o + "|0"); }; var $0r = 60; if (this.cookieEidTimeout) { $0r = this.cookieEidTimeout; }; this.setCookie("wt3_sample", $0p.join(";"), $0r * 30 * 24 * 60); $0p = this.getCookie("wt3_sample"); }; if (this.indexOf($0p, trackId + "|" + $0o + "|1") == -1) { this.deactivatePixel = true; } }; if (this.pixelSampling && !this.optOut) { this.setPixelSampling(); }; this.firstParty = function () { var $0s = this.getCookie("wt3_sid").split(";"); var $0t = this.getCookie("wt3_eid").split(";"); var $0u = (this.cookieSidTimeout) ? this.cookieSidTimeout : 30; var $0r = (this.cookieEidTimeout) ? this.cookieEidTimeout : 60; var trackId = this.trackId.split(",")[0]; var $0v = false; var $0w = false; for (var i = 0; i < $0s.length; i++) { if ($0s[i].indexOf(trackId) != -1) { $0v = i; break; } }; for (var i = 0; i < $0t.length; i++) { if ($0t[i].indexOf(trackId + "|") != -1) { $0w = i; break; } }; if (!$0v) { $0s.push(trackId); if ($0w) { this.forceNewSession = true; } }; if (!$0w) { this.eid = this.generateEid(); this.cookieOne = true; $0t.push(trackId + "|" + this.eid); this.setCookie("wt3_eid", $0t.join(";"), $0r * 30 * 24 * 60); } else { this.eid = $0t[$0w].replace(trackId + "|", ""); }; this.setCookie("wt3_sid", $0s.join(";")); }; var $0x = false; for (i = 0; i < webtrekkUnloadObjects.length; i++) { if (this == webtrekkUnloadObjects[i]) { $0x = true; } }; if (!$0x) { webtrekkUnloadObjects.push(this); this.registerEvent(window, (this.wtTypeof(window.onbeforeunload)) ? "beforeunload" : "unload", webtrekkUnload); }; this.findForm = function () { var f = document.forms; for (var i = 0; i < f.length; i++) { var cf = f[i]; if (this.wtTypeof(cf.elements["wt_form"])) { this.formObject = cf; return; } } }; this.checkFormFocus = function ($0y) { if ($0y == this.formFocus) { return 1; }; return 0; }; this.getFormFieldValue = function (ff) { var p = ff.name; if (this.formFieldAttribute) { p = ''; var $e = false; eval("tmp = (ff.getAttribute(this.formFieldAttribute) ? ff.getAttribute(this.formFieldAttribute) : '')"); if ($e) { p = $e; }; if (p) { p = p.replace(/[\.|;]/g, "_"); } }; return p; }; this.gatherForm = function () { var $0z = ";"; if (!this.formObject) { return; }; var f = this.formObject; var p = f.getAttribute('name') ? f.getAttribute('name') : this.contentId.split(";")[0]; if (this.formAttribute) { var $e = ""; eval("tmp = (f.getAttribute(this.formAttribute) ? f.getAttribute(this.formAttribute) : '')"); if ($e) { p = $e; } }; this.formName = p; var fl = ""; if (this.wtTypeof(f.elements["wt_fields"])) { fl = f.elements["wt_fields"].value; }; if (!fl) { for (var i = 0; i < f.elements.length; i++) { var e = f.elements[i]; if (this.getFormFieldValue(e)) { fl += this.getFormFieldValue(e) + $0z; } }; fl = fl.substring(0, fl.lastIndexOf($0z)) }; var $0A = fl.split($0z); var $0B = $0A.length; var $0C = ""; if (this.formFullContent) { $0C = this.formFullContent.split($0z); }; var pa = ""; var $0D = new Array(); for (var i = 0; i < f.elements.length; i++) { var e = f.elements[i], $B, $0E, $0F = false; if (fl) { for (var j = 0; j < $0B; j++) { if (this.getFormFieldValue(e) == $0A[j]) { $0F = true; } } } else { if (this.getFormFieldValue(e)) { $0F = true; } }; if ($0F) { $B = null; if (e.type == 'select-multiple') { for (var j = 0; j < e.options.length; j++) { var $0G = false; if (e.options[j].selected) { $0G = true; pa += ";" + this.getFormFieldValue(e).replace(/[\.|;]/g, "_") + "." + e.type + "|" + ((this.formAnonymous) ? "anon" : e.options[j].value.replace(/[\.|;]/g, "_")) + "|" + this.checkFormFocus(e.name); }; if (!$0G) { $B = "empty"; } } }; if (e.type == 'select-one') { if (e.selectedIndex != -1) { $B = e.options[e.selectedIndex].value.replace(/[\.|;]/, "_"); if (!$B) { $B = "empty"; } } }; if (e.type == 'checkbox') { if (!e.checked) { $B = "empty"; } else { $B = e.value.replace(/[\.|;]/, "_"); } }; if (e.type == 'radio') { if (e.checked) { $B = e.value.replace(/[\.|;]/g, "_"); }; $0D[$0D.length] = this.getFormFieldValue(e); }; if (e.type == "password" || e.type == "text" || e.type == "textarea") { $B = (e.value ? "filled_out" : "empty"); for (var k = 0; k < $0C.length; k++) { if ($0C[k] == this.getFormFieldValue(e)) { $B = this.maxlen(e.value, 30); } }; if (!$B) { $B = "empty"; } }; if ($B) { name = this.getFormFieldValue(e).replace(/[\.|;]/g, "_"); $0E = ";" + name + "." + e.type + "|"; if (pa.indexOf($0E) == -1) { pa += $0E + ((this.formAnonymous) ? "anon" : $B) + "|" + this.checkFormFocus(e.name); } } } }; for (var i = 0; i < $0D.length; i++) { var n = ";" + $0D[i].replace(/[\.|;]/g, "_") + ".radio|"; if (pa.indexOf(n) == -1) { pa += n + ((this.formAnonymous) ? "anon" : "empty") + "|" + this.checkFormFocus(e.name); } }; if (pa) { pa = pa.substring(1); }; return pa; }; this.formTrackInstall = function (f) { if (f) { this.formObject = f; }; this.form = 1; webtrekkFormTrackInstall(); }; if (this.form) { webtrekkFormTrackInstall(); }; this.cookieManager = function (name, $0H, $0I) { var i, j; this.name = name; this.keySeperator = "~"; this.fieldSeparator = "#"; this.durationSeperator = "|"; this.found = false; this.expires = $0H; this.accessPath = $0I; this.rawValue = ""; this.fields = []; this.fieldsDuration = []; this.fieldnames = []; this.read = function () { var $0J = this.name + "="; var $0K = document.cookie; this.rawValue = null; this.found = false; if ($0K.length > 0) { $0L = $0K.indexOf($0J); if ($0L != -1) { $0L += $0J.length; end = $0K.indexOf(";", $0L); if (end == -1) { end = $0K.length }; this.rawValue = $0K.substring($0L, end); this.found = true; } }; if (this.rawValue != null) { var sl = this.rawValue.length; var $0M = 0; var $0N = 0; var i = 0; do { $0N = this.rawValue.indexOf(this.fieldSeparator, $0M); if ($0N != -1) { var $0O = this.rawValue.substring($0M, $0N).split(this.durationSeperator); var rV = $0O[0].split(this.keySeperator); this.fields[rV[0]] = unescape(rV[1]); this.fieldsDuration[rV[0]] = parseInt(unescape($0O[1])); i++; $0M = $0N + 1; } } while ($0N != -1 & $0N != (this.rawValue.length - 1)); }; return this.found; }; this.getSize = function () { var $0P = new Date().getTime(); var $0Q = ""; for (i in this.fields) { if (this.fieldsDuration[i] >= $0P) { $0Q += escape(i) + this.keySeperator + escape(this.fields[i]) + this.durationSeperator + escape(this.fieldsDuration[i]) + this.fieldSeparator; } }; return $0Q.length; }; this.write = function () { var $0P = new Date().getTime(); var $0R = true; var $0Q = this.name + "="; for (i in this.fields) { if (this.fieldsDuration[i] >= $0P) { $0Q += escape(i) + this.keySeperator + escape(this.fields[i]) + this.durationSeperator + escape(this.fieldsDuration[i]) + this.fieldSeparator; $0R = false; } }; var $0S = ($0R) ? -99999 : this.expires; if ($0S != "") { if (typeof ($0S) == "number") { var $0T = new Date(); var $0U = new Date(); $0U.setTime($0T.getTime() + 1000 * 60 * 60 * 24 * $0S); $0Q += "; expires=" + $0U.toGMTString(); } else { $0Q += "; expires=" + $0S.toGMTString(); } }; if (this.accessPath != null) { $0Q += "; PATH=" + this.accessPath; }; var d = location.hostname; var $D = "^[0-9]{1,3" + String.fromCharCode(125) + "\.[0-9]{1,3" + String.fromCharCode(125) + "\.[0-9]{1,3" + String.fromCharCode(125) + "\.[0-9]{1,3" + String.fromCharCode(125) + "$"; if (d.search($D) == -1) { d = location.hostname.split("."); d = d[d.length - 2] + "." + d[d.length - 1]; }; $0Q += "; DOMAIN=" + d; document.cookie = $0Q; return null; }; this.remove = function () { this.expires = -10; this.write(); return this.read(); }; this.get = function ($0V) { var $0P = new Date().getTime(); if (this.fieldsDuration[$0V] >= $0P) { return this.fields[$0V]; }; return ""; }; this.set = function ($0V, $0W, $C, $W, $0X) { if (!$C) { $C = 31536000; }; if (!$W) { $W = ""; }; var $0P = new Date().getTime(); if ($W == "first" && this.fields[$0V] != "" && this.fields[$0V] != null && this.fieldsDuration[$0V] >= $0P) { return this.fields[$0V]; }; this.fields[$0V] = $0W; this.fieldsDuration[$0V] = $0P + (parseInt($C) * 1000); if (!$0X) { this.write(); }; return $0W; }; this.prepare = function ($0V, $0W, $C, $W) { this.set($0V, $0W, $C, $W, true); }; this.read(); }; };
var webtrekkPixel = false; if (typeof (webtrekk) == "object") { webtrekkConfig = webtrekk; webtrekkPixel = new webtrekkV3(); } function wt_sendinfo(p, mode, ep) { if (webtrekkPixel) { for (i in webtrekk) { if (i != "plugins" && i != "sendinfo") { webtrekkPixel[i] = webtrekk[i]; } } webtrekkPixel.sendinfo(false, p, mode, ep); } }

/* Ende der webtrekk.js */
