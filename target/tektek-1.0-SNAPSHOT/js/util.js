( function ( mod ) {

    window.util = mod( window.$ );

} ) ( function ( $ ) {  // 引数に定義箇所で指定した依存モジュールを指定する

  var util = {};
  util.truncateDescription = function(description){
    return description.slice(0, 20) + " ...";
  };
  util.ajax = function(option, successCallback, errorCallback){
      if(!option.url || !option.type || !option.data){
          return;
      }
      $.ajax({
      url: option.url,
      type: option.type,
      dataType: 'json',
      contentType: "application/json; charset=utf-8",
      data: option.data
    }).done(function(data){
        successCallback(data);
    }).fail(function (data) {
        errorCallback(data);
    });
      
      
  }
  return  util; // 実行時にはモジュールを返す

} );
