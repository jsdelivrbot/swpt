var win_w=$("html").width();
var currNodeId=null;
$(function(){
    var dis=true;
    var toolbtn=true;
    var rtl=$("#rtoptool");
    window.addEventListener("resize", function () {
        setSize();
    }, false);
    function setSize(){
        win_w=$("html").width();
        $("#contentId").width(win_w-60);
    }
    $(".lt").mouseover(function(){
        if(dis){$(this).addClass("ltover");}
        else{$(this).addClass("ltover2");}
    });
    $(".lt").mouseout(function(){
        $(this).removeClass("ltover ltover2");
    });
    $(".lt").click(function(){
        var show=$("#sidebar").css("display");
        show=(show=="block")?"none":"block";
        $("#sidebar").css("display",show);
        if(show=="none"){
            $(this).attr("class","lt ltnone ltover2");
            $("#contentId").width(win_w);
            dis=false;
        }else{
            $(this).attr("class","lt ltover");
            $("#contentId").width(win_w-60);
            dis=true;
        }
    });
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
    /* var imgs = ["./img/sidebar/bzbg-hover.png", "./img/sidebar/Personal-Center-hover.png",
        "./img/sidebar/news-hover.png", "./img/sidebar/xietong-hover.png", "./img/sidebar/zzsz-hover.png",
        "./img/sidebar/Home-hover.png", "./img/sidebar/zzsz-hover.png",
        "./img/sidebar/wqgl-hover.png"];
    var funR = function() {
        $('#icolist a:eq(0) img').attr({
            "src": "./img/sidebar/bzbg.png"
        });
        $('#icolist a:eq(1) img').attr({
            "src": "./img/sidebar/Personal-Center.png"
        });
        $('#icolist a:eq(2) img').attr({
            "src": "./img/sidebar/news.png"
        });
        $('#icolist a:eq(3) img').attr({
            "src": "./img/sidebar/xietong.png"
        });
        $('#icolist a:eq(4) img').attr({
            "src": "./img/sidebar/zzsz.png"
        });
        $('#icolist a:eq(5) img').attr({
            "src": "./img/sidebar/Home.png"
        });
        $('#icolist a:eq(6) img').attr({
            "src": "./img/sidebar/zzsz.png"
        });
        $('#icolist a:eq(7) img').attr({
            "src": "./img/sidebar/wqgl.png"
        });
    } */
    $( "#icolist a" ).each( function ( index ) {
        $( this ).click( function() {
            var t = $(this).index();
            funR();
            $( "#icolist a:eq( " + t + " )" ).find( "img" ).attr({
                "src": imgs[t]
            });
        } )
    } )
    /*$('.icoA').on('click',function(e){
        var $imgElem = $(e.currentTarget).find('img'),
            dot = $imgElem.attr('src').split('/').pop().split('.')[0],
            dots = $imgElem.attr('src').split('/').pop().split('.')[0] + '-hover';
        console.log($imgElem.attr('src').replace(dot, dots));
        //console.log(dot);
    })*/
    $("#enterprise_coll").remove();
    var getuid=window.localStorage['user']?JSON.parse(window.localStorage['user']):null;
    if(getuid!=null){
       if(getuid.companyExit){
            var html='<a href="./workbench/workbench.html" target="maincontent" id="enterprise_coll"><dl><dt><img src="./img/sidebar/u84.png" alt=""></dt><dd>企业协同</dd></dl></a>';
            $("#icolist_one").after(html);
       }
    };
    $(document).on("click","#rtoptooloff",function () {
        if(toolbtn){
            rtl.animate({
                width: "458px",
                opacity:1
            }, 1000 );
            toolbtn=false;
        }else{
            rtl.animate({
                width: "38px",
                opacity:0.5
            }, 1000 );
            toolbtn=true;
        }
    });
    $(document).on("click","button.gomethod",function () {
        var fw=$("#maincontent");
       var method=$(this).data("method");
        var url =null;
        console.log("index currNodeId:"+currNodeId);
        if(method=="add"){
            url = `website/assets/ueditor/formdesign/preview.html?id=3624&name=测试站点&method=add&selectId=3624`;
        }else if(method=="list"){
            url = 'website/assets/ueditor/formdesign/preview.html?id=3624&name=测试列表&method=watch';
        }else if(method=="edit"){
            url = 'website/assets/ueditor/formdesign/preview.html?id=3624&name=测试站点&method=change&selectId=3624';
        }else if(method=="del"){
            url ='website/assets/ueditor/formdesign/preview.html?id=3624&name=测试站点&method=add&selectId=3624';
        }
        /*if(method=="add"){
            url = `website\/assets\/ueditor\/formdesign\/preview.html?id=3624&name=测试站点&method=add&selectId=3624`;
        }else if(method=="list"){
            url = 'website/assets/ueditor/formdesign/preview.html?id=3624&name=测试列表&method=watch`;
        }else if(method=="edit"){
            url = `website/assets/ueditor/formdesign/preview.html?id=3624&name=测试站点&method=change&selectId=3624`;
        }else if(method=="del"){
            url = `website/assets/ueditor/formdesign/preview.html?id=3624&name=测试站点&method=add&selectId=3624`;
        }*/
        console.log(url);
        fw.attr('src',url);
    });
});