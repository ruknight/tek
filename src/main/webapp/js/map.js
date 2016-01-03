google.maps.event.addDomListener(window, 'load', function () {

    //ブラウザチェック
    if (typeof sessionStorage === 'undefined') {
        console.log("Web Storage使用不可");
    } else {
        var storage = sessionStorage;
        var contents_id = storage.getItem("id");
        console.log(contents_id);
        var useragent = navigator.userAgent;
        var map = document.getElementById("gmap");
        var directionsDisplay;
        var directionsService;
        var settingMap;
        //本来は渡されるデータ
        var end = '';
        var transport = "自動車";
        var current_position;
        var start = "日光駅";
        //データ取得
        $.ajax({
            url: "api/contents",
            type: 'get',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: {id: contents_id}
        }).done(function (data) {
            end = data[0].address;
            //現在地の取得
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
            } else {
                console.log("Geolocationが利用できません");
            }


            function successCallback(position) {
                current_position = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            }
            function errorCallback(error) {
                // エラーコードのメッセージを定義
                var errorMessage = {
                    0: "原因不明のエラーが発生しました…。",
                    1: "位置情報の取得が許可されませんでした…。",
                    2: "電波状況などで位置情報が取得できませんでした…。",
                    3: "位置情報の取得に時間がかかり過ぎてタイムアウトしました…。",
                };
                console.log(errorMessage[error.code]);
            }

            //mapのレイアウトの調節
            if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1) {
                map.style.width = '375';
                map.style.height = '627';
            } else {
                map.style.width = '900px';
                map.style.height = '375px';
            }
            //初期設定
            var options = {
                zoom: 5,
                center: new google.maps.LatLng(37.658587, 139.745425),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            settingMap = new google.maps.Map(map, options);
            // Start/Finish icons
            var icons = {
                start: new google.maps.MarkerImage(
                        // URL
                        'http://maps.google.com/mapfiles/ms/micons/man.png',
                        // (width,height)
                        new google.maps.Size(44, 32),
                        // The origin point (x,y)
                        new google.maps.Point(0, 0),
                        // The anchor point (x,y)
                        new google.maps.Point(22, 32)
                        ),
                end: new google.maps.MarkerImage(
                        // URL
                        'http://maps.google.co.jp/mapfiles/ms/icons/red-dot.png',
                        // (width,height)
                        new google.maps.Size(44, 32),
                        // The origin point (x,y)
                        new google.maps.Point(0, 0),
                        // The anchor point (x,y)
                        new google.maps.Point(22, 32)
                        )
            };
            directionsDisplay = new google.maps.DirectionsRenderer({
                suppressMarkers: true
            });
            directionsDisplay.setMap(settingMap);


            //交通手段を設定する
            function decideTransportSetting(transport) {
                if (transport === "徒歩") {
                    return google.maps.TravelMode.WALKING;
                } else if (transport === "自動車") {
                    return google.maps.TravelMode.DRIVING;
                } else if (transport === "自転車") {
                    return google.maps.TravelMode.BICYCLING;
                } else if (transport === "電車" || transport === "バス") {
                    return google.maps.TravelMode.TRANSIT;
                }
            }


            var request = {
                origin: start,
                destination: end,
                travelMode: decideTransportSetting(transport),

                avoidHighways: true,
            };
            directionsService = new google.maps.DirectionsService();
            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                    console.log(response);
                    var leg = response.routes[0].legs[0];
                    makeMarker(leg.start_location, icons.start, leg.start_address);
                    makeMarker(leg.end_location, icons.end, leg.end_address);
                } else {
                    console.log('ルートが見つかりませんでした…');
                }
            });
            function makeMarker(position, icon, title) {
                new google.maps.Marker({
                    position: position,
                    map: settingMap,
                    icon: icon,
                    title: title
                });
            }
        });
    }
});

