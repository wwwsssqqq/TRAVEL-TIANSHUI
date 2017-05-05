(function($){
    var path = location.pathname;
    $(".list-group>.list-group-item").map(function(index,item){
         $(item).removeClass("active");
         if(path == $(item).attr("href")){
             $(item).addClass("active");
         }
    });
})($);
