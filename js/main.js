$.post('http://127.0.0.1:8084/' + 'name', {}).then(res => {
    $('#name')[0].innerHTML = "<br>" + res
}, err => {
    console.log(err);
})
$.post('http://127.0.0.1:8084/' + 'message', {}).then(res => {
    var a = eval(res)
    var num = a[0].count0;
    paging(num)
    $('#Sum')[0].innerHTML = a[0].count0;
    if (a[0].sum0 != null) {
        $('#seenSum')[0].innerHTML = a[0].sum0;
    }
    if (a[0].sum1 != null) {
        $('#likeSum')[0].innerHTML = a[0].sum1;
    }
}, err => {
    console.log(err);
})

$.post('http://127.0.0.1:8084/' + 'main', {
    first: parseInt("1")
}).then(res => {
    var a = eval(res)
    for (let i = 1; i < 5; i++) {
        $('#name' + i)[0].innerHTML = a[i - 1].notename;
        $('#notecontent' + i)[0].innerHTML = '&emsp;&emsp;' + a[i - 1].notecontent;
        $('#tag' + i)[0].innerHTML = a[i - 1].tag;
        $('#read_num' + i)[0].innerHTML = '阅读数：' + a[i - 1].read_num;
    }
}, err => {
    console.log(err);
})

for (let i = 1; i < 5; i++) {
    $(".work" + i).on("click", function() {
        $.post('http://127.0.0.1:8084/' + 'noteid', {
            noteid: i
        }).then(res => {
            alert(res);
        }, err => {
            console.log(err);
        })
    })
}

for (let i = 1; i < 5; i++) {
    $("#num" + i).on("click", function() {
        $.post('http://127.0.0.1:8084/' + 'main', {
            first: parseInt($("#num" + i)[0].innerHTML)
        }).then(res => {
            var a = eval(res)
            for (let i = 1; i < 5; i++) {
                $('#name' + i)[0].innerHTML = a[i - 1].notename;
                $('#notecontent' + i)[0].innerHTML = '&emsp;&emsp;' + a[i - 1].notecontent;
                $('#tag' + i)[0].innerHTML = a[i - 1].tag;
                $('#read_num' + i)[0].innerHTML = '阅读数：' + a[i - 1].read_num;
            }
        }, err => {
            console.log(err);
        })
    })
}

// $('#true').on("click", function() {
//     $.post('http://127.0.0.1:8084/' + 'main', {
//         condition: $('')
//     }).then(res => {
//         var a = eval(res)
//         for (let i = 1; i < 5; i++) {
//             $('#name' + i)[0].innerHTML = a[i - 1].notename;
//             $('#notecontent' + i)[0].innerHTML = '&emsp;&emsp;' + a[i - 1].notecontent;
//             $('#tag' + i)[0].innerHTML = a[i - 1].tag;
//             $('#read_num' + i)[0].innerHTML = '阅读数：' + a[i - 1].read_num;
//         }
//     }, err => {
//         console.log(err);
//     })

// })

function paging(num) {
    if (num <= 20) {
        $("#next")[0].innerHTML = "";
        if (num <= 4) {
            $("ul>#a:gt(0)").html("<div style='width:80px'></div>");
            for (let i = 3; i >= num % 4; i--) {
                $("#article>a")[i].style.visibility = "hidden";
            }
        } else if (num <= 8) {
            $("ul>#a:gt(1)").html("");
        } else if (num <= 12) {
            $("ul>#a:gt(2)").html("");
        } else if (num <= 16) {
            $("ul>#a:gt(3)").html("");
        } else {
            $("ul>#a:gt(4)").html("");
        }
        var l = parseInt(num / 4);
        $("ul>#a").eq(l).click(function() {
            for (let i = 3; i >= num % 4; i--) {
                $("#article>a")[i].style.visibility = "hidden";
            }
        })
        for (var i = 0; i < l; i++) {
            $("ul>#a").eq(i).click(function() {
                for (let i = 3; i >= num % 4; i--) {
                    $("#article>a")[i].style.visibility = "visible";
                }
            })
        }
    } else {
        $("#next").click(function() {
            if ($("ul>#a>")[4].innerHTML !== parseInt(num / 4 + 1).toString()) {
                for (let i = 0; i < 5; i++) {
                    $("ul>#a>")[i].innerHTML = (Number($("ul>#a>")[i].innerHTML) + 1).toString();
                }
            }
            if ($("ul>#a>")[0].innerHTML !== "1") {
                $("#first").removeClass("disabled");
            }
            if ($("ul>#a>")[4].innerHTML === parseInt(num / 4 + 1).toString()) {
                $("#next").addClass("disabled");
            }
        })
        $("#first").click(function() {
            if ($("ul>#a>")[0].innerHTML !== "1") {
                for (let i = 0; i < 5; i++) {
                    $("ul>#a>")[i].innerHTML = (Number($("ul>#a>")[i].innerHTML) - 1).toString();
                }
            }
            if ($("ul>#a>")[0].innerHTML === "1") {
                $("#first").addClass("disabled");
            }
            if ($("ul>#a>")[4].innerHTML !== parseInt(num / 4 + 1).toString()) {
                $("#next").removeClass("disabled");

            }
        })
        $("[name='is']").click(function() {
            if ($("ul>#a>")[4].innerHTML === parseInt(num / 4 + 1).toString()) {
                for (let i = 3; i >= num % 4; i--) {
                    $("#article>a")[i].style.visibility = "hidden";
                }
            }
        })
        $("ul>#a:lt(4)").click(function() {
            for (let i = 3; i >= num % 4; i--) {
                $("#article>a")[i].style.visibility = "visible";
            }
        })
    }
}