$("#update").on("click", function() {
    $("#all").addClass("all");
    $("#back").removeClass("hide");
    $("#button1").click(async function(e) {
        if (!$('#notename').val() || !$('#notecontent').val() || !$('#jurisd').val() || !$('#tag').val()) {
            alert("信息输入不完整,添加失败")
        } else {
            $.post('http://127.0.0.1:8084/' + 'write', {
                notename: $('#notename').val(),
                notecontent: $('#notecontent').val(),
                tag: $('#tag').val()
            }).then(res => {
                alert("添加成功")
            }, err => {
                console.log(err);
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