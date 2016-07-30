$(document).ready(function () {
    //不限选择条件
    $(".ux-select-list").on("click", ".select-all", function () {

        if (!$(this).hasClass("selected")) {
            $(this).addClass("selected");
        }

        var $flexBox = $(this).parents(".ux-select-item");
        $flexBox.find("dd").removeClass("selected");
        $flexBox.find("li").removeClass("selected");
        var $selectResult = $(".ux-select-result");
        var selected = $flexBox.find("dl").attr("id");
        $selectResult.find("." + selected).remove();

        if ($(this).data("name") == 'brand') {
            $selectResult.find(".select-brand").remove();
            $selectResult.find(".select-series").remove();
            $(".series-grid").slideUp(400);
        }

        if ($selectResult.find(".selected").size() < 1) {
            $(".select-no").show();
            $(".del-select").hide();
        }

        //组合条件
        var str = getAllConditional();
        console.log(str);
    });

    //删除已选择的选项
    $(".ux-select-result").on("click", "dd:not(':last')", function () {
        if ($(this).hasClass("select-no")) {
            return false;
        }

        var item = $(this).attr("data-item");

        var $dropSeries = $(".series-grid");
        var $dropBrand = $(".brand-grid");
        //品牌
        if ($(this).hasClass("select-brand")) {

            $dropBrand.parents(".ux-select-item").find(".select-all").addClass("selected");
            $dropSeries.find("dl").remove();
            $(this).parents("dl").find(".select-series").remove();
            $dropBrand.find("li").removeClass("selected");
            $dropSeries.find("li").removeClass("selected");
            $dropSeries.slideUp(400);
        }

        //车系
        if ($(this).hasClass("select-series")) {
            $dropSeries.find("dl").remove();
            $dropSeries.find("li").removeClass("selected");
        }


        var cItem = $("." + item);
        cItem.removeClass("selected");

        cItem.each(function () {
            if ($(this).parents("dl").find(".selected").size() == 0) {
                $(this).parents(".ux-select-item").find(".select-all").addClass("selected");
            }
        });

        if (!$(this).hasClass("del-select")) {
            $(this).remove();
        } else {
            $(this).hide();
        }

        if ($(".ux-select-result").find(".selected").size() < 1) {
            $(".select-no").show();
            $(".del-select").hide();
        }

        //组合条件
        var str = getAllConditional();
        console.log(str);
    });

    //全部清除
    $(".del-select").on("click", function () {
        clearAll($(this));
        //组合条件
        var str = getAllConditional();
        console.log(str);
    });

    function clearAll(obj) {
        obj.hide();
        $(".ux-select-result .selected").remove();
        $(".ux-select-list dd").removeClass("selected");
        $(".select-no").show();
        var $selectAll = $(".ux-select-list .select-all");
        if (!$selectAll.hasClass(".selected")) {
            $selectAll.addClass("selected");
        }
        var $series = $(".series-grid");
        var $brand = $(".brand-grid");
        $series.find("dl").remove();
        $series.find("li").removeClass("selected");
        $brand.find("li").removeClass("selected");
        $series.slideUp(400);
    }

    //选项选中
    $(".ux-select-list").on("click", "dd", function () {
        var itemIndex = $(this).data("item");
        if ($(this).hasClass("selected")) {

            $(this).removeClass("selected");
            var $selectResult = $(".ux-select-result");
            $('.ux-select-result .' + itemIndex).remove();
            if ($selectResult.find(".selected").size() < 1) {
                $(".select-no").show();
                $(".del-select").hide();
            }
            if ($(this).parents("dl").find(".selected").size() < 1) {
                $(this).parents(".ux-select-item").find(".select-all").addClass("selected");
            }
        } else {
            var item = $(this).data("item");
            var selected = $(this).parent("dl").attr("id");

            if ($(this).hasClass("bidding-type")) {
                $(this).siblings("dd").removeClass("selected");
            }
            $(this).addClass("selected").addClass(item);

            $(this).parents(".ux-select-item").find(".select-all").removeClass("selected");

            var $selectResult = $(".ux-select-result");


            if ($(".selected" + item).length < 1) {
                var copyThisA = $(this).clone();
                var selectLastDd = $(".ux-select-result dl").find("dd:last");
                if (!$(this).hasClass("bidding-type")) {

                    //每一项选择时改变'全部'
                    var allSize = $('.ux-select-result .' + selected).size();
                    var size = $("#" + selected).find("dd").size();
                    if (allSize == size && size != 1) {
                        $('.ux-select-result .' + selected).remove();
                        $("#" + selected).find("dd").removeClass("selected");
                        $("#" + selected).parents(".ux-select-item").find(".select-all").addClass("selected");
                        if ($selectResult.find(".selected").size() < 1) {
                            $(".ux-select-result .del-select").hide();
                            $(".ux-select-result .select-no").show();
                        }
                    }
                } else {
                    if ($selectResult.find("dd").hasClass("bidding-type")) {
                        $selectResult.find("dd.bidding-type").remove();
                    }
                }
                copyThisA.removeClass(item).addClass(item).addClass(selected).insertBefore(selectLastDd);
                $selectResult.find(".select-no").hide();
                $selectResult.find(".del-select").show();
            }
        }

        //组合条件
        var str = getAllConditional();
        console.log(str);
    });

    //以下为获取选项条件
    function getAllConditional() {
        var str = "";
        $(".ux-select-list").find("dl").each(function (index) {
            str += getStr(index);
        });
        return str;
    }

    function getStr(str) {
        var tempStr = "";
        var $select = $(".ux-select-result .select" + str);

        var size = $select.size();
        if (size > 0) {
            tempStr = getText($(".ux-select-result .select" + str));

        } else {
            var $first = $("#select" + str).parents(".ux-select-item").find(".select-all");
            tempStr = "&" + $first.data("name") + "=" + $first.find("span").text();
        }
        return tempStr;
    }

    function getText(obj) {
        var temp = "";

        obj.each(function () {
            var $that = $(this);
            if (typeof($that.attr("data-city")) == "undefined") {
                temp += "&" + $that.data("name") + "=" + $.trim($that.find("span").text());
            } else {
                temp += "&" + $that.data("name") + "=" + $that.data('city');
            }
        });
        return temp;
    }
});
