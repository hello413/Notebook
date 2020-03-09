/**
* Created by 雷金鹏 on 2019/12/21.
*/
$(document).ready(function(){

$("#search_li").hover(
function(){

    $("#tag_div").hide();
     $("#edit_div").hide();
      $("#more_div").hide();
     $("#share_div").hide();
 $("#search_div").show();
}
,function(){
 $("#search_div").hover(function(){
         $("#search_div").show();
 },function(){
        $("#search_div").hide();
 });
});


$("#tag_li").hover(

function(){
 $("#search_div").hide();
  $("#edit_div").hide();
  $("#share_div").hide();
   $("#more_div").hide();
 $("#tag_div").show();
}
,function(){
 // $("#search_div").hide();
 $("#tag_div").hover(function(){
         $("#tag_div").show();
 },function(){
        $("#tag_div").hide();
 });
});


$("#edit_li").hover(
function(){
  $("#search_div").hide();
   $("#tag_div").hide();
   $("#share_div").hide();
    $("#more_div").hide();
 $("#edit_div").show();
}
,function(){
 // $("#search_div").hide();
 $("#edit_div").hover(function(){
         $("#edit_div").show();
 },function(){
        $("#edit_div").hide();
 });
});

  $("#share_li").hover(
function(){
  $("#search_div").hide();
   $("#tag_div").hide();
    $("#edit_div").hide();
    $("#more_div").hide();
 $("#share_div").show();
}
,function(){
 // $("#search_div").hide();
 $("#share_div").hover(function(){
         $("#share_div").show();
 },function(){
        $("#share_div").hide();
 });
});



  $("#more_li").hover(
function(){
  $("#search_div").hide();
   $("#tag_div").hide();
    $("#edit_div").hide();
    $("#share_div").hide();
 $("#more_div").show();
}
,function(){
 // $("#search_div").hide();
 $("#more_div").hover(function(){
         $("#more_div").show();
 },function(){
        $("#more_div").hide();
 });
});

});
