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
            if ($("ul>#a>#num")[4].innerHTML !== parseInt(num / 4 + 1).toString()) {
                for (let i = 0; i < 5; i++) {
                    $("ul>#a>#num")[i].innerHTML = (Number($("ul>#a>#num")[i].innerHTML) + 1).toString();
                }
            }
            if ($("ul>#a>#num")[0].innerHTML !== "1") {
                $("#first").removeClass("disabled");
            }
            if ($("ul>#a>#num")[4].innerHTML === parseInt(num / 4 + 1).toString()) {
                $("#next").addClass("disabled");
            }
        })
        $("#first").click(function() {
            if ($("ul>#a>#num")[0].innerHTML !== "1") {
                for (let i = 0; i < 5; i++) {
                    $("ul>#a>#num")[i].innerHTML = (Number($("ul>#a>#num")[i].innerHTML) - 1).toString();
                }
            }
            if ($("ul>#a>#num")[0].innerHTML === "1") {
                $("#first").addClass("disabled");
            }
            if ($("ul>#a>#num")[4].innerHTML !== parseInt(num / 4 + 1).toString()) {
                $("#next").removeClass("disabled");

            }
        })
        $("[name='is']").click(function() {
            if ($("ul>#a>#num")[4].innerHTML === parseInt(num / 4 + 1).toString()) {
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