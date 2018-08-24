$(function () {
    var w=$("#maxentrance");
    var url="editor/assets/ueditor/formdesign/preview.html?link=";
    var nodeid;//=localStorage.getItem("setSiteid");
    var data=null;
    if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        //window.location.href = "/Mobile";
        data={"site_id":6,"is_pc":0};
    }else{
        data={"site_id":6,"is_pc":1};
    }
    $.ajax({
        type: "POST",
        url: DEFAULT_URL+"herdNodeQueryFacade/getSiteFirst",
        data:JSON.stringify(data),
        contentType:"application/json; charset=UTF-8",
        success: function(m){
            if(m.msg.node_id>0){
                url+=m.msg.node_id;
                nodeid=m.msg.node_id;
            }else{
                url+="2875";
            }
            w.attr("src",url);
        }
    });
    /*if(nodeid){
        url+=nodeid;
    }else{
        $.ajax({
            type: "POST",
            url: root_url+"/herdNodeQueryFacade/getSiteFirst",
            data:JSON.stringify({"site_id":6,"is_pc":1}),
            contentType:"application/json; charset=UTF-8",
            success: function(m){
                if(m.msg.node_id>0){
                    url+=m.msg.node_id;
                    nodeid=m.msg.node_id;
                }else{
                    url+="2875";
                }
                w.attr("src",url);
            }
        });
    }
    setCurrNodeId(nodeid);*/
})