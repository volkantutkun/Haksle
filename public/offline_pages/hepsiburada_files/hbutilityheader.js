if (document.images)
{
  picNA01= new Image(80,80); 
  picNA01.src = "//images.hepsiburada.net/hbv2/Icn/naimage80.gif?v=0.07";    

  picNA02= new Image(80,80);
  picNA02.src = "//images.hepsiburada.net/hbv2/Icn/naimage80.gif?v=0.07";      
  
  picNA03= new Image(200,200);
  picNA03.src = "//images.hepsiburada.net/hbv2/Icn/naimage200.gif?v=0.07";   

  picNA04= new Image(200,200);
  picNA04.src = "//images.hepsiburada.net/hbv2/Icn/naimage200.gif?v=0.07";

  picNA05 = new Image(150, 150);
  picNA05.src = "//images.hepsiburada.net/hbv2/Icn/naimage150.gif?v=0.07";

  picNA06 = new Image(200, 295);
  picNA06.src = "//images.hepsiburada.net/hbv2/Icn/naimage200x295.gif?v=0.07";

  picNA07 = new Image(40, 40);
  picNA07.src = "//images.hepsiburada.net/hbv2/Icn/naimage_40.gif?v=0.07";

  picNA08 = new Image(135, 135);
  picNA08.src = "//images.hepsiburada.net/hbv2/Icn/naimage_135.gif?v=0.07";

  picNA09 = new Image(500, 500);
  picNA09.src = "//images.hepsiburada.net/hbv2/Icn/naimage_500.gif?v=0.07";

  picNA10 = new Image(1500, 1500);
  picNA10.src = "//images.hepsiburada.net/hbv2/Icn/naimage_1500.gif?v=0.07";

  picNA11 = new Image(1500, 2213);
  picNA11.src = "//images.hepsiburada.net/hbv2/Icn/naimage_1500x2213.gif?v=0.07"; 

  picNA12 = new Image(300, 443);
  picNA12.src = "//images.hepsiburada.net/hbv2/Icn/naimage_300x443.gif?v=0.07";

  picNA13 = new Image(55, 80);
  picNA13.src = "//images.hepsiburada.net/hbv2/Icn/naimage_55x80.gif?v=0.07";  
}
function hbimg(imgObj,size,pictype)
{
	imgObj.setAttribute('onerror','');

	if (imgObj)
	{
		var ImageSrc=new Image();

		if (pictype==0)
		{
			if (size==80)
			{
			    ImageSrc.src = picNA01.src;
			}
			else if (size == 150) {
			    ImageSrc.src = picNA05.src;
			} 
            else if (size == 295) {
			    ImageSrc.src = picNA06.src;
			}
            else if (size == 40) {
			    ImageSrc.src = picNA07.src;
			}
            else if (size == 135) {
			    ImageSrc.src = picNA08.src;
			}
            else if (size == 500) {
			    ImageSrc.src = picNA09.src;
			}
            else if (size == 1500) {
			    ImageSrc.src = picNA10.src;
			}
            else if (size == 2213) {
			    ImageSrc.src = picNA11.src;
			}
            else if (size == 443) {
			    ImageSrc.src = picNA12.src;
			}
            else if (size == 80) {
			    ImageSrc.src = picNA13.src;
			}
            else
			{
			    ImageSrc.src = picNA03.src;
			}
		}
		imgObj.setAttribute('src', ImageSrc.src);
		
	}
}


function IsNumeric(sText)
{
	var ValidChars = "0123456789.,";
	var IsNumber=true;
	var Char;
	if (sText == null || sText.length == 0)
	{
		return false;
	}

	for (i = 0; i < sText.length && IsNumber == true; i++) 
	{ 
			Char = sText.charAt(i); 
			if (ValidChars.indexOf(Char) == -1) 
			{
				IsNumber = false;
			}
	}
	return IsNumber;
}

function getPosition(obj)
{
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		curleft = obj.offsetLeft;
		curtop = obj.offsetTop;
		while (obj = obj.offsetParent) 
		{
				curleft += obj.offsetLeft;
				curtop += obj.offsetTop;
		}
	}
	return [curleft,curtop];
}

function clickButton(e, buttonid) {
    var bt = $("#" + buttonid).get(0);
    if (typeof bt != 'undefined' && e.keyCode == 13)
        bt.click();
}

var isPasswordFieldOnFocus = false;
$(document).ready(function () {
    $("#Signin1_txtPassword").focus(function () {
        isPasswordFieldOnFocus = true;
    }).blur(function () {
        isPasswordFieldOnFocus = false;
    });
});


function clickButtonV2(e, buttonid) {
    var bt = $("#" + buttonid).get(0);
    if (typeof bt != 'undefined' && isPasswordFieldOnFocus && e.keyCode == 13) {
   	        $('#' + buttonid).focus();
   	        __doPostBack('Signin1$btnLoginLink',''); 
        }
//		{ 
//			if(navigator.appName.indexOf("Netscape")>(-1))
//			{ 
//				if (e.keyCode == 13)
//				{ 
//					$('#'+buttonid).focus();
//					__doPostBack('Signin1$btnLoginLink',''); 
//					return false; 
//				} 
//			} 
//			
//			if (navigator.appName.indexOf("Microsoft Internet Explorer")>(-1))
//			{ 
//				if (event.keyCode == 13)
//				{ 
//					$('#'+buttonid).focus();
//					__doPostBack('Signin1$btnLoginLink',''); 
//					return false; 
//				} 
//			} 
//		} 
	}

function GetID(evt){ 
	evt = evt || window.event; 
	var targ = evt.target || evt.srcElement; 
	if (targ.nodeType == 3) 
	{
		targ = targ.parentNode;
	}
	
	return targ.id;
} 

function getQueryVariable(variable){ 
	var query = window.location.search.substring(1).toLowerCase();  
	var vars = query.split("&");  
	for (var i=0;i<vars.length;i++) 
	{    
		var pair = vars[i].split("=");   
		if (pair[0] == variable.toLowerCase()) 
		{
		    return pair[1];    
		}  
	} 
}


function go(id){
	var obj = document.getElementById(id);
	return obj;
}

function DisableShortWords(textBoxID,minWordLength){
	
	var textBox = go(textBoxID);
	
	if ( (textBox.value == null) || (textBox.value.length < minWordLength))
	{
		//alert("Lütfen En Az" + minWordLength.toString() + " Karakter Giriniz.");
		return false;
	}
	
	return true;
	
}

function HideLayer(layerID){
	var ctrl = document.getElementById(layerID);
	ctrl.style.display = 'none';
}

function GetScreensize(){
	var screenW = 1024, screenH = 768;
	if (parseInt(navigator.appVersion)>3) {
	screenW = screen.width;
	screenH = screen.height;
	}
	else if (navigator.appName == "Netscape" 
		&& parseInt(navigator.appVersion)==3
		&& navigator.javaEnabled()
	) 
	{
	var jToolkit = java.awt.Toolkit.getDefaultToolkit();
	var jScreenSize = jToolkit.getScreenSize();
	screenW = jScreenSize.width;
	screenH = jScreenSize.height;
	}
	var sc = new Array(screenW,screenH);
	return sc;
}

function GetBrowserSize(){
	var winW = 1080, winH = 748;
	if (parseInt(navigator.appVersion)>3) {
	if (navigator.appName=="Netscape") {
	winW = window.innerWidth;
	winH = window.innerHeight;
	}
	if (navigator.appName.indexOf("Microsoft")!=-1) {
	winW = document.body.offsetWidth;
	winH = document.body.offsetHeight;
	}
	}
	
	var sc = new Array(winW,winH);
	return sc;
}

function is_child_of(parent, child){
	if( child != null ) {			
		while( child.parentNode ) {
			if( (child = child.parentNode) == parent ) {
				return true;
			}
		}
	}
	return false;
}

/*
* Usage: 
* <div onMouseOut="fixOnMouseOut(this, event, 'JavaScript Code');"> 
*		So many childs 
*	</div>
*/
function fixOnMouseOut(element, event, JavaScript_code){
	var evt;
	if ( typeof window.event!= "undefined" ) 
		evt = window.event;
	else 
		evt = event; 
		
	var current_mouse_target = null;
	if( evt.toElement ) {				
		current_mouse_target 			 = evt.toElement;
	} else if( evt.relatedTarget ) {				
		current_mouse_target 			 = evt.relatedTarget;
	}
	if( !is_child_of(element, current_mouse_target) && element != current_mouse_target ) {
		eval(JavaScript_code);
	}
}


//<FlashScripts>

//v1.0
//Copyright 2006 Adobe Systems, Inc. All rights reserved.
function AC_AddExtension(src, ext){
  if (src.indexOf('?') != -1)
    return src.replace(/\?/, ext+'?'); 
  else
    return src + ext;
}

function AC_Generateobj(objAttrs, params, embedAttrs){ 
  var str = '<object ';
  for (var i in objAttrs)
    str += i + '="' + objAttrs[i] + '" ';
  str += '>';
  for (var i in params)
    str += '<param name="' + i + '" value="' + params[i] + '" /> ';
  str += '<embed ';
  for (var i in embedAttrs)
    str += i + '="' + embedAttrs[i] + '" ';
  str += ' ></embed></object>';

  document.write(str);
}

function AC_FL_RunContent(){
  var ret = 
    AC_GetArgs
    (  arguments, ".swf", "movie", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
     , "application/x-shockwave-flash"
    );
  AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);
}

function AC_SW_RunContent(){
  var ret = 
    AC_GetArgs
    (  arguments, ".dcr", "src", "clsid:166B1BCA-3F9C-11CF-8075-444553540000"
     , null
    );
  AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);
}

function AC_GetArgs(args, ext, srcParamName, classid, mimeType){
  var ret = new Object();
  ret.embedAttrs = new Object();
  ret.params = new Object();
  ret.objAttrs = new Object();
  for (var i=0; i < args.length; i=i+2){
    var currArg = args[i].toLowerCase();    

    switch (currArg){	
      case "classid":
        break;
      case "pluginspage":
        ret.embedAttrs[args[i]] = args[i+1];
        break;
      case "src":
      case "movie":	
        args[i+1] = AC_AddExtension(args[i+1], ext);
        ret.embedAttrs["src"] = args[i+1];
        ret.params[srcParamName] = args[i+1];
        break;
      case "onafterupdate":
      case "onbeforeupdate":
      case "onblur":
      case "oncellchange":
      case "onclick":
      case "ondblClick":
      case "ondrag":
      case "ondragend":
      case "ondragenter":
      case "ondragleave":
      case "ondragover":
      case "ondrop":
      case "onfinish":
      case "onfocus":
      case "onhelp":
      case "onmousedown":
      case "onmouseup":
      case "onmouseover":
      case "onmousemove":
      case "onmouseout":
      case "onkeypress":
      case "onkeydown":
      case "onkeyup":
      case "onload":
      case "onlosecapture":
      case "onpropertychange":
      case "onreadystatechange":
      case "onrowsdelete":
      case "onrowenter":
      case "onrowexit":
      case "onrowsinserted":
      case "onstart":
      case "onscroll":
      case "onbeforeeditfocus":
      case "onactivate":
      case "onbeforedeactivate":
      case "ondeactivate":
      case "type":
      case "codebase":
        ret.objAttrs[args[i]] = args[i+1];
        break;
      case "width":
      case "height":
      case "align":
      case "vspace": 
      case "hspace":
      case "class":
      case "title":
      case "accesskey":
      case "name":
      case "id":
      case "tabindex":
        ret.embedAttrs[args[i]] = ret.objAttrs[args[i]] = args[i+1];
        break;
      default:
        ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i+1];
    }
  }
  ret.objAttrs["classid"] = classid;
  if (mimeType) ret.embedAttrs["type"] = mimeType;
  return ret;
}


//v1.1
//Copyright 2006 Adobe Systems, Inc. All rights reserved.
function AC_AX_RunContent(){
  var ret = AC_AX_GetArgs(arguments);
  AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);
}

function AC_AX_GetArgs(args){
  var ret = new Object();
  ret.embedAttrs = new Object();
  ret.params = new Object();
  ret.objAttrs = new Object();
  for (var i=0; i < args.length; i=i+2){
    var currArg = args[i].toLowerCase();    

    switch (currArg){
      case "pluginspage":
      case "type":
      case "src":
        ret.embedAttrs[args[i]] = args[i+1];
        break;
      case "data":
      case "codebase":
      case "classid":
      case "id":
      case "onafterupdate":
      case "onbeforeupdate":
      case "onblur":
      case "oncellchange":
      case "onclick":
      case "ondblClick":
      case "ondrag":
      case "ondragend":
      case "ondragenter":
      case "ondragleave":
      case "ondragover":
      case "ondrop":
      case "onfinish":
      case "onfocus":
      case "onhelp":
      case "onmousedown":
      case "onmouseup":
      case "onmouseover":
      case "onmousemove":
      case "onmouseout":
      case "onkeypress":
      case "onkeydown":
      case "onkeyup":
      case "onload":
      case "onlosecapture":
      case "onpropertychange":
      case "onreadystatechange":
      case "onrowsdelete":
      case "onrowenter":
      case "onrowexit":
      case "onrowsinserted":
      case "onstart":
      case "onscroll":
      case "onbeforeeditfocus":
      case "onactivate":
      case "onbeforedeactivate":
      case "ondeactivate":
        ret.objAttrs[args[i]] = args[i+1];
        break;
      case "width":
      case "height":
      case "align":
      case "vspace": 
      case "hspace":
      case "class":
      case "title":
      case "accesskey":
      case "name":
      case "tabindex":
        ret.embedAttrs[args[i]] = ret.objAttrs[args[i]] = args[i+1];
        break;
      default:
        ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i+1];
    }
  }
  return ret;
}

//</FlashScripts>

//<HepsiburadaV3>
function VeriOpen() {
	window.open("https://seal.verisign.com/splash?form_file=fdf/splash.fdf&dn=WWW.HEPSIBURADA.COM&lang=en" , null, "height=480,width=550,status=no,toolbar=no,menubar=no,location=no,scrollbars=yes");
}

function updatecartonfly(VariantID,ProductID,Catalog,VariantGroup,CampaignPanelID,WishListProductID)
{
	var url = "/SpeedCart.aspx?s=" + VariantID + "&p=" + ProductID + "&c=" + Catalog + "&paid=" + CampaignPanelID + "&v=" + VariantGroup + "&w=" +  WishListProductID;
	var ly = document.getElementById("cartonthefly");
	var screensize = GetBrowserSize();
	var screenperc = 80;
	var screenleft = (screensize[0] - (screensize[0] * (screenperc / 100))) / 2;
	var screenwidth = (screensize[0] * (screenperc / 100));
	ly.style.display='block';
	ly.style.top = "150px";
	ly.style.left = screenleft + "px";
	ly.style.zIndex = 200;
	ly.style.width =  screenwidth + "px";
	ly.style.height = "520px";	
	ly.style.backgroundColor = "white";			
	var f_Basket = $("#frmBasket").get(0);		
	try
	{
		if (parent.frmBasket.location.href.toLowerCase().indexOf("speedcart.aspx") > -1)
		{
			var campaignPanel = CampaignPanelID;
			if (campaignPanel == null)
				campaignPanel = '';
			parent.frmBasket.addToCart(VariantID,ProductID,Catalog,'',campaignPanel,WishListProductID);
		}
		else
		{ 
			f_Basket.src = url;
		}
	}
	catch(e)
	{
		f_Basket.src = url;
	}	
	
	return false;	
}
 
	
function ShowAdd()
{
	var ly = document.getElementById("rightProductBanner");
	if (ly)
	{
		ly.style.position='absolute';
		ly.style.display='block';
		ly.style.top = findPosY(ly) + 'px';
		ly.style.left = findPosX(ly) + 'px' ;
	}

}

function OpenLayer(urllink,t)
{
	if (urllink==null || urllink=='')
	{
		return;
	}
	
	if (urllink.startsWith('/LayerInfo.aspx')==false && urllink.startsWith('LayerInfo.aspx')==false && 
		urllink.startsWith('/yorumekle.aspx')== false && urllink.startsWith('yorumekle.aspx')== false &&
		urllink.startsWith('/AddToProfileList.aspx')== false && urllink.startsWith('AddToProfileList.aspx')== false)
	{
		return;
	}
	
	if (t=='imgHaberVerLink')
	{
		t='aListeyeEkle';
	}
	
	var bt=	document.getElementById(t);
	var ly = document.getElementById("ServiceLayer");
	var screenperc = 100;
	ly.style.display='block';
	if (bt.style.width==''){w=145;}else{w=Px(bt.style.width,5);}
	ly.style.top=findPosY(bt)-200+ 'px';
	ly.style.left=findPosX(bt) - 510 + 'px' ;
	ly.style.width = '500px';
	ly.style.zIndex = 200;
	ly.style.height = 250;	
	ly.style.backgroundColor = "white";		
		
	if (t=='aStokAlarmListem')
	{
		var cwidth = 500;
		ly.style.width = cwidth + 'px';
		ly.style.height = 600;	
		ly.style.top = findPosY(bt)-250 + 'px';
	}
	
	if (t=='yorumlink2' || t=='_ctl0_linkYorum')
	{ 
		var cwidth = 800;
		ly.style.width = cwidth + 'px';
		ly.style.height = 480;	
		ly.style.top = findPosY(bt)-220 + 'px';
		ly.style.left = findPosX(bt) - 700 + 'px' ;
	}
	
	if (t=='LinkProfileList')
	{
		var cwidth = 550;
		ly.style.width = cwidth + 'px';
		ly.style.height = 485;	
		ly.style.top = findPosY(bt)- 300 + 'px';
		ly.style.left=findPosX(bt) - 700 + 'px' ;
	}
	
	try
	{
		var scroll='auto';
		if(urllink.startsWith('yorumekle.aspx')== true)
		{
			scroll='no';
		}
		
		if (urllink.startsWith('/')==false)
		{
			urllink= '/' + urllink	;
		}
		
		ly.innerHTML = '<iframe src="http://' + document.domain + urllink + '" frameborder="0" id="frmService" scrolling="' + scroll +'" class="FloatingFrame"></iframe>';
		
	}
	catch(e)
	{
		
	}	
	return false;	
}


	function center(mylayer)
    {
       mylayer.style.left=document.body.offsetWidth/2-mylayer.offsetWidth/2;
       mylayer.style.top=(document.body.offsetHeight/2-mylayer.offsetHeight/2)+document.body.scrollTop ;
	}	
			
	function GoRedirect(page)
	{
		
		var obj=document.getElementById('drCatalogs');
		var url=page;
		if (obj[obj.selectedIndex].value!=0)
		{
			url += "?catID=" + obj[obj.selectedIndex].value;
		}
		
		location.assign(url);
		
	}
	
    
   
   	function clickButton(e, buttonid)
   	{ 
		var bt = document.getElementById(buttonid); 
		if (typeof bt == 'object')
		{ 
			if(navigator.appName.indexOf("Netscape")>(-1))
			{ 
				if (e.keyCode == 13)
				{ 
					bt.click(); 
					return false; 
				} 
			} 
			
			if (navigator.appName.indexOf("Microsoft Internet Explorer")>(-1))
			{ 
				if (event.keyCode == 13)
				{ 
					bt.click(); 
					return false; 
				} 
			} 
		} 
	}


	function PreloadImage()
	{
		try
		{
			var preload_image;
			preload_image = new Image(16,16); 
			preload_image.src="images/tabs/spinner.gif"; 
		}
		catch(e)
		{
		}
		
  	}	

	function Loading(obj)
	{	
		if (typeof(Page_ClientValidate) == 'function')
		{
			if (!Page_ClientValidate())
			{
				return false;
			}
		}
			
		var lod=document.getElementById('loading');
		var bt=go(obj);
		var lText='<table class="loading" border="0" width="100%" cellspacing="0" cellpadding="3"><tr><td width="20"><IMG border="0" SRC="images/tabs/spinner.gif"></td><td>��leminiz Ger�ekle�iyor. L�tfen bekleyiniz.</td></tr></table>'							
		if (lod)
		{
			lod.style.display='block';
		}
		else
		{
			lod=document.createElement('<div>');
			lod.setAttribute('id','loading');
			lod.style.position='absolute';
			var w=0;
			if (bt.style.width==''){w=120;}else{w=Px(bt.style.width,5);}
			lod.style.top=findPosY(bt) + 'px';
			lod.style.left=findPosX(bt) + w + 'px';
			lod.innerHTML=lText;
			lod.style.display='block';
			document.body.appendChild(lod);
		}
	}

	function findPosX(obj)
	{
		var curleft = 0;
		if (obj.offsetParent)
		{
			while (obj.offsetParent)
			{
				curleft += obj.offsetLeft
				obj = obj.offsetParent;
			}
		}
		else if (obj.x)
		curleft += obj.x;
		
		return curleft;
	}

	function findPosY(obj)
	{
		var curtop = 0;
		if (obj.offsetParent)
		{
			while (obj.offsetParent)
			{
				curtop += obj.offsetTop
				obj = obj.offsetParent;
			}
		}
		else if (obj.y)
			curtop += obj.y;
		return curtop;
	}

	function go(id)
	{
		var obj = document.getElementById(id);
		return obj;
	}

	function Px(v,a)
	{
 		return  parseInt(v.replace('px','')) + a ;
	}					
	

	function MySplit(v,c)
	{
		var a =v.split(';');
		for (var i=0;i<c;i++){if (typeof(a[i])=='undefined'){	a[i]='';}}
		return a;
	}
			
	
	  
  function OpenWishList(url)
	{
		var bt=go('lnkAddToWishList');
	
		var ly = document.getElementById("ServiceLayer");
		var screenperc = 80;
		ly.style.display='block';
		if (bt.style.width==''){w=145;}else{w=Px(bt.style.width,5);}
		ly.style.top='20px';//findPosY(bt)-5 + 'px';
		ly.style.left=findPosX(bt) + w + 'px';
		ly.style.width = '500px';
		ly.style.zIndex = 200;
		ly.style.height = 600;	
		ly.style.backgroundColor = "white";			
		var f_Basket = $("#frmService").get(0);	
		try
		{
			f_Basket.src = url;
		}
		catch(e)
		{
		
		}	
		return false;			
	}
	
	function ShowHelp(obj,hid,dist)
	{
				var cont=document.getElementById('helpTT');
				if (hid==0)
				{
					cont.style.display='none';
					return;
				}
				if (cont)
				{
					cont.style.left=findPosX(obj) + dist  + 'px';
					cont.style.display= cont.style.display=='none' ? 'block' : 'none'; 
					cont.style.top=findPosY(obj) + 'px';
				}
				else
				{
					var cont= document.createElement('<div>');
					cont.setAttribute('id','helpTT');
					cont.style.position='absolute';
					cont.style.left=findPosX(obj) + dist + 'px';
					cont.style.top=findPosY(obj) + 'px';
					cont.style.width = '200px';
					cont.style.zindex=300;
					//cont.className='HText';
					document.body.appendChild(cont);
				}
				
				cont.innerHTML='<table cellpadding=2 border=0><tr><td class="HText">' + eval('ht' + hid) + '</td></tr></table>';
	}
	
	function ShowDesc(obj,text,dist)
	{
				
				var cont=document.getElementById('helpTT');
				if (text=='')
				{
					cont.style.display='none';
					return;
				}
				if (cont)
				{
					cont.style.left=findPosX(obj) + dist  + 'px';
					cont.style.position='absolute';
					cont.style.display= cont.style.display=='none' ? 'block' : 'none'; 
					cont.style.top=findPosY(obj) + 'px';
					cont.style.width = '300px';
					cont.style.zindex=300;
				}

				
				cont.innerHTML='<table cellpadding=2 border=0><tr><td class="HText">' + text + '</td></tr></table>';
	}	
	
	function SortRedirect(id)
	{
		var obj=document.getElementById(id);
		var pageName=window.location.pathname;//.substring(1); //bsaka20091223
		var Query=window.location.search.substring(1);
		var pos=Query.indexOf('sorting=');
		
		if (pos!=-1)
		{
			var freplace=Query.substring(pos,pos+9);
			var treplace='sorting=' + obj[obj.selectedIndex].value ;
			Query=Query.replace(freplace,treplace) ;
		}
		else
		{
			Query=Query + '&sorting=' + obj[obj.selectedIndex].value;
		}

		
		var PagingPos=Query.indexOf('record=');
		if (PagingPos!=-1)
		{
			var record='record=' + getQueryVariable('record'); 
			Query=Query.replace(record,'') ;
		}
		
		if (Query!='' )
		{
			Query = '?' + Query;
		}
		
		var url=pageName + Query;
		
		location.assign(url);
	}	
	

	function InStockRedirect(id)
	{
		var obj=document.getElementById(id);
		var pageName=window.location.pathname;//.substring(1); //bsaka20091223
		var Query=window.location.search.substring(1);

		var Sel='';
		if (obj.checked){Sel='stockinfo=1'}

		var pos=Query.indexOf('stockinfo=');
		
		if (pos!=-1)
		{
			Query=Query.replace('&stockinfo=1','') ;
			Query=Query.replace('stockinfo=1','') ;
		}
		else
		{
			Query=Query + '&' + Sel ;
		}
		
		var PagingPos=Query.indexOf('record=');
		if (PagingPos!=-1)
		{
			var record='record=' + getQueryVariable('record'); 
			Query=Query.replace(record,'') ;
		}
		
		if (Query!='' )
		{
			Query = '?' + Query;
		}
		
		var url=pageName + Query;
		
		location.assign(url);
	}	
			
	function DisableDblClick(obj)
	{	
		if (typeof(Page_ClientValidate) == 'function')
		{
			if (!Page_ClientValidate())
			{
				return false;
			}
		}
		
		var lod=document.getElementById('dvDisableLayer');
		var bt=go(obj);
		var lText='<table class="disableBtnlayer" border="0" width="100%" cellspacing="0" cellpadding="3"><tr><td width="20"><IMG border="0" SRC="images/tabs/spinner.gif"></td><td>İşleminiz gerçekleşiyor.<br> Lütfen bekleyiniz...</td></tr></table>'							
		lod.style.position='absolute';
		lod.style.top=findPosY(bt) + -1 + 'px';
		lod.style.left=findPosX(bt) + -1 + 'px';
		lod.innerHTML=lText;
		lod.style.display='block';

	}				

	function GoToURL(Query)
	{
		var pageName=window.location.pathname;//.substring(1); //bsaka20091223
		var url=pageName + Query;
		url=url.replace('besiktas/','');
		url=url.replace('galatasaray/','');
		location.assign(url);
	}

	function UseCheck()
	{
		var cd=$("#TxCekNo").attr('value');
		if (cd.length>7)
		{
			GoToURL('?giftcode=' + cd);
		}
		else
		{
			alert('Çek kodunuzu giriniz ya da sağdaki çeklerim tuşuna tıklayınız');
		}
	}

	
	var LastCatOID=0;
	var LastCatalogName;
	var ProductAdded=false;
	
	function AddToMyCompareList(obj,oid,catalogName,CatOID)
	{
		LastCatOID=CatOID;
		LastCatalogName=catalogName;
		Microsoft.CommerceServer.Site.Department.AddToCompareList(oid,catalogName,AddToMyCompareList_CallBack,obj)
	}


	function AddToMyCompareList_CallBack(res)
	{
		if (res)
		{
			var r=res.value;
			if (r && r>0)
			{
				ProductAdded=true;
				var Cont=$(res.context);
				
				if (r==1)
				{
					Cont.html('Ürün kıyaslama listenize eklendi. Kıyaslamak istediğiniz diğer ürünleri de ekleyiniz.');
				}
				else
				{
					Cont.html('Listenizdeki ' + r + ' ürünü kıyaslamak için tıklayınız');
				}
				
				Cont[0].onclick=null;
				Cont.click(function() {
				
					ShowKiyaslamaLayer();
					
				});
				
			}
		}
	}
	
	function SwtichToMyCompareList(obj,SKU)
	{
		if (obj)
		{
			var act=obj.checked;
			Microsoft.CommerceServer.Site.product_compare.SwitchToCompareList(SKU,act,SwtichToMyCompareList_CallBack,obj)
		}
		
	}
	
	function SwtichToMyCompareList_CallBack(res)
	{
		if (res)
		{
			//alert('changed');
		}
	}
	
	function ShowKiyaslamaLayer()
	{
		if (ProductAdded==false)
		{
			alert('Kıyaslamak istediğiniz ürünleri işaretleyiniz.');
		}
		else
		{
			//$("#divCompare").html('<table class="disableBtnlayer" border="0" width="100%" cellspacing="0" cellpadding="3"><tr><td width="20"><IMG border="0" SRC="images/tabs/spinner.gif"></td><td>İşleminiz gerçekleşiyor.<br> Lütfen bekleyiniz...</td></tr></table>')
			
			var myWidth = 0, myHeight = 0;
			  if( typeof( window.innerWidth ) == 'number' ) {
				//Non-IE
				myWidth = window.innerWidth;
				myHeight = window.innerHeight;
			  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
				//IE 6+ in 'standards compliant mode'
				myWidth = document.documentElement.clientWidth;
				myHeight = document.documentElement.clientHeight;
			  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
				//IE 4 compatible
				myWidth = document.body.clientWidth;
				myHeight = document.body.clientHeight;
			  }
			  //window.alert( 'Width = ' + myWidth );
			  //window.alert( 'Height = ' + myHeight );
			  
			var lyrHeight = myHeight - 100;
			
			$("#divCompare").show();
			$("#divCompare").dialog({ 
				modal:true,
				overlay: { opacity: 0.5, background: "black"},
				width:'80%',
				height:lyrHeight,
				title:"Ürün Kıyaslama",
				dialogClass:"flora"
			});	
		
			$("#frmBasket").attr('src','/product_compare.aspx?cid=' + LastCatOID + "&CatalogName=" + LastCatalogName);			
			
			
			
		}
	}
	 
	function fnKiyaslamaExtend()
	{
		var obj=document.getElementById('kiyaslamaExtend');
		var pageName=window.location.pathname;//.substring(1); //bsaka20091223
		var Query=window.location.search.substring(1);

		if (obj.checked)
		{
			Query=Query + '&sh=1';
		}
		else
		{
			Query=Query.replace('&sh=1','') ;
		}
		
		if (Query!='' )
		{
			Query = '?' + Query;
		}
		
		var url=pageName + Query;
		
	
		location.assign(url);
	}	
	
	function ShowCaptionHelp()
	{
		if ($('#helpme').css('display')=='block')
		{
			$('#helpme').hide();
		}
		else
		{
			$('#helpme').slideDown('fast');
		}
	}	
	
// </HepsiburadaV3>

//<jquery.store2.js>

(function ($) {
	$.store2 = {
        maxSize : 20,
		keys : new Array(),
		cache_length : 0,
		items : new Array(),
		setItem: function(pKey, pValue){
			if (typeof(pValue) != 'undefined') 
			{
				if (typeof(this.items[pKey]) == 'undefined') 
				{
					this.cache_length++;
				}
				this.keys.push(pKey);
				this.items[pKey] = pValue;
				
				if (this.cache_length > this.maxSize)
				{
					//this.removeOldestItem();
				}
			}
			return pValue;
		},
		removeItem: function(pKey){
			var tmp;
			if (typeof(this.items[pKey]) != 'undefined') 
			{
				this.cache_length--;
				var tmp = this.items[pKey];
				delete this.items[pKey];
			}
			return tmp;
		},
		getItem: function(pKey){
			return this.items[pKey];
		},
		hasItem: function(pKey){
			return typeof(this.items[pKey]) != 'undefined';
		},
		clear:function(){
			var tmp = this.cache_length;
			this.keys = new Array();
			this.cache_length = 0;
			this.items = new Array();
			return tmp;
		}
	};
	
})(jQuery);

//</jquery.store2.js>


//<header_setupV3.js>
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
				checkHeaderPopUpMenuShow();
				$divHeaderPopUpMenuHeader.addClass('tumkategorilerHover').removeClass('tumkategorilerDef'); 
				$divHeaderPopUpMenu.slideDown('fast');
			},
			function(){
				hideHeaderPopUpMenu();
			}
		);
	}
	
	function positionCatalogMenu(){
		var $divHeaderPopUpMenu = $('#divHeaderPopUpMenu');
		var positiondivHeaderPopUpMenuHeader = $('#headermenu').position();
		var newpositionTop = positiondivHeaderPopUpMenuHeader.top + 30;
		var newpositionLeft = positiondivHeaderPopUpMenuHeader.left + 6;
		$divHeaderPopUpMenu.css({position:'absolute',top:newpositionTop,left:newpositionLeft,'z-index':100});
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
	
	function checkHeaderBrandStoresListShow()
	{
		if ($.store2.hasItem('divHeaderBrandStoresListTO'))
		{
			clearTimeout( $.store2.getItem('divHeaderBrandStoresListTO'));
			$.store2.removeItem('divHeaderBrandStoresListTO') ;
		}
	}

	function hideHeaderBrandStoresListMenu()
	{
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
		$divHeaderUserLists.hover( function(){ checkHeaderUserListMenuShow() }, function(){ hideHeaderUserListMenu();});
	}
	
	function positionHeaderUserListMenu(){
		var $divHeaderUserLists = $('#divHeaderUserLists');
		var $divHeaderUserListsHeader = $('#divHeaderUserListsHeader');
		var divHeaderListHeaderPosition = $divHeaderUserListsHeader.position();
		var divHeaderUserListsTop = divHeaderListHeaderPosition.top + 30;
		var divHeaderUserListsLeft = divHeaderListHeaderPosition.left - 25;
		$divHeaderUserLists.css({ position: 'absolute', display:'none', marginLeft: 0, marginTop: 0, top: divHeaderUserListsTop, left: divHeaderUserListsLeft });
	}
	
	function checkHeaderUserListMenuShow()
	{
		if ($.store2.hasItem('divHeaderUserListsTO'))
		{
			clearTimeout( $.store2.getItem('divHeaderUserListsTO'));
			$.store2.removeItem('divHeaderUserListsTO') ;
		}
	}

	function hideHeaderUserListMenu()
	{
		var hideTimeout = setTimeout('$("#divHeaderUserLists").slideUp("fast")',500);
		$.store2.setItem('divHeaderUserListsTO', hideTimeout);
	}	
	
	
	function setUpHeaderPersonalListMenu(){
		var $divHeaderPersonalLists = $('#divHeaderPersonalLists');
		var $mypage = $('#mypage');
		$divHeaderPersonalLists.remove().appendTo('body');
		positionHeaderPersonalListMenu();
		$(window).bind('resize',positionHeaderPersonalListMenu);
		$mypage.hover(
			function()
			{
				checkHeaderPersonalListMenuShow();
				$divHeaderPersonalLists.slideDown('fast');
			},
			function()
			{
				hideHeaderPersonalListMenu();
			}
		);
		$divHeaderPersonalLists.hover( function(){ checkHeaderPersonalListMenuShow() }, function(){ hideHeaderPersonalListMenu();});
	}
	
	function positionHeaderPersonalListMenu(){
		 
		var $divHeaderPersonalLists = $('#divHeaderPersonalLists');
		var $mypage = $('#mypage');
		var divHeaderListHeaderPosition = $mypage.position();
		var divHeaderPersonalListsTop = divHeaderListHeaderPosition.top + 13;
		var divHeaderPersonalListsLeft = divHeaderListHeaderPosition.left - 48;
		$divHeaderPersonalLists.css({ position: 'absolute', display:'none', marginLeft: 0, marginTop: 0, top: divHeaderPersonalListsTop, left: divHeaderPersonalListsLeft });
	}
	
	function checkHeaderPersonalListMenuShow()
	{
		if ($.store2.hasItem('divHeaderPersonalListsTO'))
		{
			clearTimeout( $.store2.getItem('divHeaderPersonalListsTO'));
			$.store2.removeItem('divHeaderPersonalListsTO') ;
		}
	}

	function hideHeaderPersonalListMenu()
	{
		var hideTimeout = setTimeout('$("#divHeaderPersonalLists").slideUp("fast")',500);
		$.store2.setItem('divHeaderPersonalListsTO', hideTimeout);
	}	

	function formatItem(row) {
		if (row[2] == 0)
			return "<div><div style='float:left;font-style:italic;'>" + row[0] + " kelimesini tüm kategorilerde ara</div></div>";
		else
			return "<div><div style='float:left'>" + row[0] + "</div><div style='float:right'>" + row[1] + "</div></div>";
	}
	
	function ProfileLoaded(response)
	{
		if (response && response.value && response.value.LoggedIn)
		{
			$('#spnUserInfoMessageCount').html('(' + response.value.MessageCount.toString() + ')');
			$('#spnUserInfoProfileName').html(response.value.ProfileName.toString());
			$('#spnUserInfoBasketCount').html('(' + response.value.BasketItemCount.toString() + ')');
			$('#spnUserInfoDiscountCount').html('(' + response.value.DiscountCount.toString() + ')');
			$('#divUserInfoNotLoggedIn').hide();
			$('#divUserInfoLoggedIn').show();
			setUpHeaderPersonalListMenu();
		}
	}
//</header_setupV3.js>


function disableSelection(target){
if (typeof target.onselectstart!="undefined") //IE route
	target.onselectstart=function(){return false}
else if (typeof target.style.MozUserSelect!="undefined") //Firefox route
	target.style.MozUserSelect="none"
else //All other route (ie: Opera)
	target.onmousedown=function(){return false}
target.style.cursor = "default"
}

//Sample usages
//disableSelection(document.body) //Disable text selection on entire body
//disableSelection(document.getElementById("mydiv")) //Disable text selection on element with id="mydiv"
