function setCurrNodeId(id){
    window.parent.currNodeId=id;
}
$(function () {
    var w=$("#website");
    var url="editor/assets/ueditor/formdesign/preview.html?link=";
	var nodeid;//=localStorage.getItem("setSiteid");
	
	if(nodeid){
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
    setCurrNodeId(nodeid);
})