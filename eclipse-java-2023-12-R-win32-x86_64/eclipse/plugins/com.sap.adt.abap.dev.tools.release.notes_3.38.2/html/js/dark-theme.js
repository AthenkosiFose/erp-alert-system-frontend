var darkToggle = {

    init: function() {

        if (darkToggle.getCookie("dark")==""){
            darkToggle.setCookie("dark", "true");
        }
        if (darkToggle.getCookie("dark")=="false"){
            $(".dark > input").prop("checked", false);
        } else {
            $(".dark > input").prop("checked", true);
        }

        darkToggle.refreshStatus();

        $(".dark > input").click( function(){
            darkToggle.refreshStatus();
        });

    },

    refreshStatus: function(){
        $("body").addClass("dark");
        if ($(".dark > input").length){
            if (!$(".dark > input").prop("checked")){
                $("body").removeClass("dark");
                darkToggle.setCookie("dark", "false");
            } 
            if ($(".dark > input").prop("checked")) {
                $("body").addClass("dark");
                darkToggle.setCookie("dark", "true");
            }
        }
    },

    setCookie: function (cname,cvalue) {
        document.cookie = cname + "=" + cvalue;
    },

    getCookie: function (cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }


};

$(function() {

    darkToggle.init();

});


  
  