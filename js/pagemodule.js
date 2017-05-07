/**
 * 页面分页组件
 * Created by wangshiping5 on 2017/3/20.
 */
define(["ejs","text!tpl/pagemodule1.tpl"],function (ejs,tpl1) {
    // var ejs = require("ejs");
    // var tpl1 = require("pagemodule1.tpl");
    $.fn.setPage = function (opt) {
        opt = $.extend({
            entriesCount: 10, //默认显示10个页号，超过10个，中间用...代替
            edgeEntriesCount: 5,
            linkTo: "javascript:void(0)",
            prevText: "&laquo;",
            nextText: "&raquo;",
            ellipseText: "...",
            prevShowAlways: true,
            nextShowAlways: true,
            currentIndex: 0,
            type: "1",
            callback: function () {
                return false;
            }
        }, opt || {});
        return this.each(function () {
            var pageCount = $(this).attr("pageCount") || 0;
            var pageSize = $(this).attr("pageSize") || 0;
            var pageIndex = $(this).attr("pageIndex") || 0;

            typeof opt.pageCount == 'undefined' && (opt.pageCount = pageCount);
            typeof opt.pageSize == 'undefined' && (opt.pageSize = pageSize);
            typeof opt.pageIndex == 'undefined' && (opt.pageIndex = pageIndex);

            opt.interval = getInterval(opt.pageCount, opt.pageSize, opt.entriesCount, opt.currentIndex);
            if (opt.type == 1) {
                var html = new ejs({ text: tpl1 }).render(opt);
                $(this).html(html);
                var that = this;

                $(this).off("click").on("click", "li", function () {
                    if ($(this).hasClass("active") || $(this).hasClass("disabled")) return true;
                    var pageIndex = $(this).attr("pageIndex");
                    opt.currentIndex = pageIndex;
                    opt.currentIndex = parseInt(pageIndex, 10);
                    opt.pageCount = parseInt(opt.pageCount, 10);
                    if (pageIndex > opt.pageCount) return false;
                    opt.interval = getInterval(opt.pageCount, opt.pageSize, opt.entriesCount, opt.currentIndex);
                    var html = new ejs({ text: tpl1 }).render(opt);
                    $(that).html(html);
                    opt.callback(pageIndex);
                });
            }

            if (opt.type == 2) {
                var html = new ejs({ text: tpl2 }).render(opt);
                $(this).html(html);
                var that = this;

                $(this).on("click", "a, button", function () {
                    if ($(this).hasClass("disabled")) return true;
                    var pageIndex = $(this).attr("pageIndex");
                    opt.currentIndex = parseInt(pageIndex, 10);
                    opt.pageCount = parseInt(opt.pageCount, 10);
                    if (pageIndex < 0 || pageIndex > opt.pageCount) return false;
                    opt.interval = getInterval(opt.pageCount, opt.pageSize, opt.entriesCount, opt.currentIndex);
                    var html = new ejs({ text: tpl2 }).render(opt);
                    $(that).html(html);
                    opt.callback(pageIndex);
                });
            }
        });
    };

    function getInterval(pageCount, pageSize, entriesCount, currentIndex) {
        var ne_half = Math.ceil(entriesCount / 2);
        var upper_limit = pageCount - entriesCount;
        var start = currentIndex > ne_half ? Math.max(Math.min(currentIndex - ne_half, upper_limit), 0) : 0;
        var end = currentIndex > ne_half ? Math.min(currentIndex + ne_half, pageCount) : Math.min(entriesCount, pageCount);
        return [start, end];
    }
});