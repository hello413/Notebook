var num = 14;
if (num <= 20) {
    $("#next")[0].innerHTML = "";
    if (num <= 4) {
        $("ul>#a:gt(0)").html("<div style='width:80px'></div>");
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