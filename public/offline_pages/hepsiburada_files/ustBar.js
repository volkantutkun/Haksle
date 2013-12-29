var Ekolay = {};
//Ekolay.HtmlTemplatePath = "http://static.hepsiburada.net/css/eKolay/html/EkolayHeaderBar.html";

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
        });//end of click()
        $("#SGeneralBar").slideDown();
};
