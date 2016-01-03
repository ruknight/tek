$(function () {
    $(".sampleb").on("click", function () {
        var comment = $(".samplet").val();
        $("#commentList").append("<li>" + comment + "</li>");
        $(".samplet").val("");
    });
});