$(function(){
  var win_w=$("html").width();
  $( "#contentId" ).width( win_w - 60 );
  window.addEventListener("resize", function () {
    setSize();
  }, false);
  function setSize(){
    win_w=$("html").width();
    $("#contentId").width(win_w-60);
  }
  $("#icolist dl").click(function(){
    $('.curr_module').removeClass('curr_module');
    $(this).addClass('curr_module');
  })
  var imgs = ["./img/sidebar/Home-hover.png","./img/sidebar/Home-hover.png", "./img/sidebar/bzbg-hover.png",
    "./img/sidebar/news-hover.png", "./img/sidebar/xietong-hover.png", "./img/sidebar/Personal-Center-hover.png"];
  var funR = function () {
    $('#icolist a:eq(0) img').attr({
      "src": "./img/sidebar/Home.png"
    });
    $('#icolist a:eq(1) img').attr({
      "src": "./img/sidebar/Home.png"
    });
    $('#icolist a:eq(2) img').attr({
      "src": "./img/sidebar/bzbg.png"
    });
    $('#icolist a:eq(3) img').attr({
      "src": "./img/sidebar/news.png"
    });
    $('#icolist a:eq(4) img').attr({
      "src": "./img/sidebar/xietong.png"
    });
    $('#icolist a:eq(5) img').attr({
      "src": "./img/sidebar/Personal-Center.png"
    });
  }
});
