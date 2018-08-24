function $$(id){
    return $("#iframeAll").contents().find(id);
}


window.onload=function(){
    var $iframe=$("#iframeAll");

    $("#createNew").click(function(){
        switch($iframe.attr("src")){
            case "./view/project_page.html":
            window.localStorage["retUrl"]="./view/project_page.html";
                $iframe.attr("src","./view/project_Info.html");
                titleShow("项目发布页",true);
            break;
            case "./view/task_page.html":
            window.localStorage["retUrl"]="./view/task_page.html";
                $iframe.attr("src","./view/task_Info.html");
                titleShow("任务发布页",true);
            break;
        } 
        window.localStorage["details_find_id"]="";
    });
    $("#btnRet").click(function(){
        $iframe.attr("src",window.localStorage["retUrl"]);
    });
    monitoring_iframe();
    
}


//iframe中的元素方法
function load_Fun(isUnbind){
    var $iframe=$("#iframeAll");
    //配置：必须
    if(isUnbind==true){
        $$("#project_btn").unbind();
        $$("#task_btn").unbind();
    }
    /*  在下面写的方法  */
    //项目
    $$("#project_btn").click(function(){
        $iframe.attr("src","./view/project_page.html");
    });

    

    //任务
    $$("#task_btn").click(function(){
        $iframe.attr("src","./view/task_page.html");
    });
    

}



