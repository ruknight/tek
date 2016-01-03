(function (window, $, util) {
    $(function () {
        //ブラウザチェック
        if (typeof sessionStorage === 'undefined') {
            console.log("Web Storage使用不可");
            return;
        }
        var storage = sessionStorage;

        function addContentsClickListener() {
            $("div .contents").on("click", function () {
                var id = $(this).attr("id");
                storage.setItem("id", id);
                window.location.href = "contents.html";
            });
        }
        $(document).on('click', '#searchWord', function () {
            $("#contents_list").empty();
            $("#tagList").empty();
            var w = $("#word").val();
            var ajax_option = {
                url: "api/search",
                type: 'get',
                data: {word: w}
            };
            var successCallback = function (data) {
                if (data.length === 0) {
                    $("#categoryList").show();
                    $("#emptyList").show();

                } else {
                    $("#categoryList").hide();
                    $("#emptyList").hide();
                }
                for (var i = 0; i < data.length; i++) {
                    $("#contents_list").append(
                            '<li>\n\
                                <div id="' + data[i].id + '" class="row contents">\n\
                                    <div class="col-xs-6">\n\
                                        <img src="' + data[i].videolist[1] + '" class="img-responsive img-rounded contents-img" alt="Responsive image" width="180" height="120">\n\
                                    </div>\n\
                                    <div class="col-xs-6"><div class="contents-message col-md-6">\n\
                                        <h5>' + data[i].title + '</h5>\n\
                                        <p>' + util.truncateDescription(data[i].description) + '</p>\n\
                                    </div>\n\
                                </div>\n\
                            </li>'
                    );
                    if (typeof data[i].tag[i] !== "undefined") {
                        $("#tagList").append(
                                '<button type="button" id="tag' + (i + 1) + '" class="btn btn-primary">\n\
                                    ' + data[i].tag[i] + '\
                                </button>'
                        );
                    }
                }
                addContentsClickListener();
            };
            var errorCallback = function (data) {
                $("#categoryList").show();
                $("#emptyList").show();
            }
            util.ajax(ajax_option, successCallback, errorCallback);

        });
        $(document).on('click', '#tag1', function () {
            $("#contents_list").empty();
            $("#tagList").empty();
            var tag = $(this).text().trim();

            var ajax_option = {
                url: "api/search",
                type: 'get',
                data: {word: tag}
            };
            var successCallback = function (data) {
                if (data.length === 0) {
                    $("#categoryList").show();
                    $("#emptyList").show();
                } else {
                    $("#categoryList").hide();
                    $("#emptyList").hide();
                }
                for (var i = 0; i < data.length; i++) {
                    $("#contents_list").append(
                            '<li>\n\
                        <div id="' + data[i].id + '" class="row contents">\n\
                            <div class="col-xs-6">\n\
                                <img src="' + data[i].videolist[1] + '" class="img-responsive img-rounded contents-img" alt="Responsive image" width="180" height="120">\n\
                            </div>\n\
                            <div class="col-xs-6">\n\
                                <div class="contents-message col-md-6">\n\
                                    <h5>' + data[i].title + '</h5>\n\
                                    <p>' + util.truncateDescription(data[i].description) + '</p>\n\
                                </div>\n\
                            </div>\n\
                        </div>\n\
                    </li>'
                    );
                    if (typeof data[i].tag[i] !== "undefined") {
                        $("#tagList").append('<button type="button" id="tag' + (i + 1) + '" class="btn btn-primary">' + data[i].tag[i] + '</button>');
                    }
                }
                addContentsClickListener();
            };
            var errorCallback = function (data) {
                $("#categoryList").show();
                $("#emptyList").show();
            }
            util.ajax(ajax_option, successCallback, errorCallback);
        });
    });
})(window, jQuery, window.util);
