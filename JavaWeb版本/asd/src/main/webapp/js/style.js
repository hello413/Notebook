$("#update").on("click", function() {
    alert("000000000")
    $("#all").addClass("all");
    $("#back").removeClass("hide");
    $("#button1").click(async function() {
        if (!$('#notename').val() || !$('#notecontent').val() || !$('#tag').val()) {
            alert("信息输入不完整,添加失败")
        } else {
            alert("11111111")
            $.post("route/write", {
                notename: $('#notename').val(),
                notecontent: $('#notecontent').val(),
                tag: $('#tag').val()
            },function f(data) {
                alert(data);
            })
            $("#back").addClass("hide");
            $("#all").removeClass("all");
        }
    })
    $("#button2").on("click", function() {
        $("#back").addClass("hide");
        $("#all").removeClass("all");
    })
});