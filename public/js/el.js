$(document).ready( function() {

    var aslide = function () {

        var el = $(".J-marquee li").first();
        el.hide();
        $(".J-marquee").append(el);
        el.show();

     };
     setInterval("aslide()",2000);
    //ѡ�
    $(".J-trigger .trigger-nav li").hover(  function () {
        var _trigger = $(this);
        _trigger.addClass("active");
        _trigger.siblings().removeClass("active");
            var cardname=_trigger.attr("triggercard");
                $(".trigger-item .trigger-item-list[cardname='"+ cardname+"']").show();
                $(".trigger-item .trigger-item-list[cardname='"+ cardname+"']").siblings().hide();
        });


    $("#J-BOX a").click(function () {
        var con= $(this).text();
        var newcon = $('form[name="roal"] p input').val(con);
    })

    var btn = function () {
        $("#select").click(function () {


        });
    }




});