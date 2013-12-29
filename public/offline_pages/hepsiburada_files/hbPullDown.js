function setupPullDown(controlId, controlHeaderId, gapX, gapY){

    var $divControl = $('#'+controlId);
    var $divControlHeader = $('#'+controlHeaderId);
    $divControl.remove().appendTo('body');
    setupPullDownPosition(controlId, controlHeaderId, gapX, gapY);
    $(window).bind('resize', function(){
        setupPullDownPosition(controlId, controlHeaderId, gapX, gapY)
    });
    $divControlHeader.hover(function() {
        checkPullDownToShow(controlId);
        $divControl.slideDown('fast');
        $divControlHeader.addClass('menuHeaderHover');
    }, function() {
        hidePullDown(controlId,controlHeaderId);
    });
    $divControl.hover(function(){
        checkPullDownToShow(controlId)
    }, function() {
        hidePullDown(controlId,controlHeaderId);
    });
}

function setupPullDownPosition(controlId, controlHeaderId, gapX, gapY){

    var $divControl = $('#' + controlId);
    var $divControlHeader = $('#' + controlHeaderId);
    var divHeaderListHeaderPosition = $divControlHeader.position();
    var divHeaderUserListsTop = divHeaderListHeaderPosition.top + gapY;
    var divHeaderUserListsLeft = divHeaderListHeaderPosition.left - gapX;
    $divControl.css({
        position: 'absolute',
        display: 'none',
        marginLeft: 0,
        marginTop: 0,
        top: divHeaderUserListsTop,
        left: divHeaderUserListsLeft
    });
}

function checkPullDownToShow(controlId){
    var cId = controlId + 'TO';
    if ($.store2.hasItem(cId)) {
        clearTimeout($.store2.getItem(cId));
        $.store2.removeItem(cId);
    }
}

function hidePullDown(controlId,controlHeaderId){
    var cId = controlId + 'TO';

    var $divControl = $('#' + controlId);
    var $divControlHeader = $('#' + controlHeaderId);
    var hideTimeout = setTimeout(function() {
        $divControl.slideUp("fast");
        $divControlHeader.removeClass("menuHeaderHover");
    }, 500);
    
    $.store2.setItem(cId, hideTimeout);

}
function ShowMore(sender, cId) {
    if ($("#" + cId).css("display") == "none") {
        $("#" + cId).slideDown('fast');
        $(sender).css("display", "none");
    } else {
        $("#" + cId).slideUp('fast');
        $(sender).html('Diger..');
    }
}