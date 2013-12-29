/* NDHeader.ascx && Header.ascx */
/***/
var lastSelectedAutoCompleteRowObj = null;
function SearchTextIsEmpty() {
    if (mainSearchInput.val() == '' || mainSearchInput.val() == 'Aradığınız kelimeyi yazınız')
        return false;
    else
        return true;
}
function ClearSearchText() {
    SetSearchText("");
}
function SetSearchText(text) {
    mainSearchInput.val(text);
}
function GetSearchText() {
    return mainSearchInput.val();
}
function setWatermark(obj, text) {
    $(obj).blur(function (e) {
        if (this.value == '') {
            this.value = text;
            $(this).attr("style", "color:#CCCCCC !important;");
        }
    });
    $(obj).focus(function (e) {
        if (this.value == text) {
            this.value = "";
            $(this).attr("style", "color:#333333 !important;");
        }
    });
    if ($(obj)[0].value == "") {
        $(obj)[0].value = text;
        $(obj).attr("style", "color:#CCCCCC !important;");
    }
}

$(document).ready(function() {
	setWatermark(mainSearchInput, "Aradığınız kelimeyi yazınız");
});