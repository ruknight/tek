(function (window, $, util) {
    $(function () {
        //ブラウザチェック
        if (typeof sessionStorage === 'undefined') {
            console.log("Web Storage使用不可");
            return;
        }
        var storage = sessionStorage;
        var contents_id = storage.getItem("id");

        var ajax_option = {
            url: "api/contents",
            type: 'get',
            data: {id: contents_id}
        };
        
        var successCallback = function (data) {
            var img1 = $("#s1");
            var img2 = $("#s2");
            var img3 = $("#s3");
            var contents = data[0];
            img1.attr("src", contents.videolist[0]);
            img2.attr("src", contents.videolist[1]);
            img3.attr("src", contents.videolist[0]);
            var max_star = 5;//最高評価
            var number_of_star = (contents.id % 2) + 4; //奇数なら5、偶数なら4が出る。
            var star_in_html = "";
            for (var i = 1; i <= max_star; i++) {
                if (i > number_of_star) {
                    star_in_html += '<span class="glyphicon glyphicon-star-empty"></span>'
                } else {
                    star_in_html += '<span class="glyphicon glyphicon-star"></span>'
                }
            }
            $("#star").append('<div id="stars">' + star_in_html + '</div>');
            var title_tel = $("#title_tel");
            title_tel.append(contents.title + "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;TEL:" + contents.tel);
            var address = $("#address");
            address.append("住所：&emsp;" + contents.address);
            var time = $("#time");
            time.append("営業時間：&emsp;" + contents.officehours[0]);
            var setumei = $("#setumei");
            setumei.append(contents.description);

            var button = $(".button_wrapper");
            for (var i = 0; i < contents.transportation.length; i++) {
                button.append("<button type='button' class='btn btn-primary'>" + contents.transportation[i] + "</button>&nbsp;");
            }
        }
        util.ajax(ajax_option, successCallback);

        $(".swipeshow").swipeshow({
            autostart: true, // 自動スタートするか否か。する場合はtrue、しない場合はfalse
            interval: 3000, // スライド切替のインターバル
            initial: 0, // スライドインデックス
            speed: 700, // アニメーションスピード
            friction: 0.3, // バウンスバック動作
            mouse: true, // マウスのドラッグでの操作を有効にするかどうか
            $dots: $("div.dots"),
        });
    });
})(window, jQuery, window.util);