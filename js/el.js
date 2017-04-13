$(document).ready( function() {
    var aslide = function () {
        var _el = $(".J-marquee li").first();
        _el.hide();
        $("J-marquee").append(_el);
        _el.show();
    };
    var timer = setInterval(aslide,2000);

    //ѡ�
        $(".J-trigger .trigger-nav li").click(function () {
            var _trigger = $(this);
            _trigger.addClass("active");
            var cardname=_trigger.attr("triggercard");
                $(".trigger-item .trigger-item-list[cardname='"+ cardname+"']").show();
                $(".trigger-item .trigger-item-list[cardname='"+ cardname+"']").siblings().hide();

        });



    $(".J-trigger .trigger-nav").hover(
        function () {
        console.log("in");
    },function(){
        console.log("out");
    })





});