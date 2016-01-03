(function (window, $, util) {
    $(function () {

        //ブラウザチェック
        if (typeof sessionStorage === 'undefined') {
            console.log("Web Storage使用不可");
            return;
        }
        
        var storage = sessionStorage;

        var ajax_option = {
            url: "api/category",
            type: 'get',
            data: {q: "歴史"}
        };
        
        var successCallback = function (data) {
            for (var i = 0; i < data.length; i++) {
                $("#contents_list").append(
                        '<li>\n\
                            <div id="' + data[i].id + '" class="row contents">\n\
                                <div class="col-xs-5">\n\
                                    <img src="' + data[i].videolist[0] + '" class="img-responsive img-rounded contents-img" alt="Responsive image">\n\
                                </div>\n\
                                <div class="col-xs-7">\n\
                                    <div class="contents-message col-md-6">\n\
                                        <h5>' + data[i].title + '</h5>\n\
                                        <p>' + util.truncateDescription(data[i].description) + '</p>\n\
                                    </div>\n\
                                </div>\n\
                            </div>\n\
                          </li>'
                );
            }
            $("div .contents").on("click", function () {
                var id = $(this).attr("id");
                storage.setItem("id", id);
                window.location.href = "contents.html";
            });
        };

        util.ajax(ajax_option, successCallback);
        
        
        ajax_option = {
            url: "api/category",
            type: 'get',
            data: {q: "お土産"}
        };
        
        successCallback = function (data) {
            for (var i = 0; i < data.length; i++) {
                $("#contents_list2").append(
                        '<li>\n\
                            <div id="' + data[i].id + '" class="row contents">\n\
                                <div class="col-xs-5">\n\
                                    <img src="' + data[i].videolist[0] + '" class="img-responsive img-rounded contents-img" alt="Responsive image">\n\
                                </div>\n\
                                <div class="col-xs-7">\n\
                                    <div class="contents-message col-md-6">\n\
                                        <h5>' + data[i].title + '</h5>\n\
                                        <p>' + util.truncateDescription(data[i].description) + '</p>\n\
                                    </div>\n\
                                </div>\n\
                            </div>\n\
                        </li>'
                );
            }
            $("div .contents").on("click", function () {
                var id = $(this).attr("id");
                storage.setItem("id", id);
                window.location.href = "contents.html";
            });
        };
        
        util.ajax(ajax_option, successCallback);

        var swiper = new Swiper('.swiper-container', {
            paginationClickable: true,
            spaceBetween: 30,
            loop: true,
            touchRatio: 0.5,
            grabCursor: true,
            calculateHeight: true,
            centeredSlides: true,
        });
    });
//console.log(util.say()); 
})(window, jQuery, window.util);
