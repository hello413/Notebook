$("#update").on("click", function() {
    $("#all").addClass("all");
    $("#back").removeClass("hide");
    $("#button1").on("click", function() {
        $("#back").addClass("hide");
        $("#all").removeClass("all");
    })
    $("#button2").on("click", function() {
        $("#back").addClass("hide");
        $("#all").removeClass("all");
    })
});