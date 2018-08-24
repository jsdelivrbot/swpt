var r=angular.module('upLoadRe_pc',["tm.pagination"]);
r.filter("myjoin",function(){
    return function(obj){
        return obj.join(',');
    }
});
 //首页控制器
r.controller('rectr',["$scope","$rootScope","$state","getData","$stateParams",function($scope,$rootScope,$state,$stateParams,getData){
    $scope.file_type = 'list' ; // 切换显示 
    $scope.tab = 1;  //默认导航栏 - 全部  - 显示
    $scope.musicTab =1 ;  //默认导航栏   音频  -- 显示
    $scope.$on("tab",function(e,m){
        $scope.tab = m;
    })
    $state.go('main.examine');
   //上传资源分类
   $scope.release = [{"id":1,"title":"全部"},{"id":2,"title":"已发布"},{"id":3,"title":"待审核"},{"id":4,"title":"未通过"}];
    //导航内容
   $scope.navItems = [{'id':1,'title':'审核资源','href':'.examine'},{'id':2,'title':'审核专辑','href':'.examinezj'}];
   $scope.navTab = function(id){
       $scope.tab = id;
   }
   
    //选择音频类型
    $scope.musicType = function(index){
        $scope.musicTab = index;
    }
   //选择审核
   $scope.fileType = function(index){
       $scope.tab = index;
       $scope.file_type ='list';
       if($scope.tab == 3){
           $scope.file_type = "fileChk" ;
       }
   }
 

}])
.controller('examine',["$scope","$state",'getData',function($scope,$state,getData){
       $scope.sourceShows = 1; //默认模块类型 第一个显示
       $scope.objectShows= 6;//默认推荐对象 第一个显示
       $scope.bookShows =  2;//默认资源 第一个显示
       $scope.video = 'video' ;//默认显示视频
       $scope.examShow =1;    // 默认第一显示 添加class
       $scope.imgSrc = source_exam; //视频、音频路径
       $scope.contentText = getData.contentText; // 审核不通过原因
       $scope.paginationConf={
            currentPage:1,        //当前页
            itemsPerPage:10      //初始分页总数
        }
         
         //上传资源类型 导航栏数据
        getData.getUrlData("/uploadType/getAllUploadType").then(function (res){
            $scope.sourceType = res.data.msg;
        })

        //书籍类型 导航栏数据
        getData.getUrlData("/bookType/getAllBookType").then(function (res){
            $scope.bookType = res.data.msg;
        })

        //推荐对象
        getData.getUrlData("/recommendedObject/getAllRecommendedObject").then(function (res){
            $scope.objectType = res.data.msg;
        })

        //点击审核按钮
      $scope.videoExamine = function(e,type){
                $scope.dataName = $(e.target).parent().prev().prev().html();
                $scope.dataId = $(e.target).parent().parent().attr("id");
                $scope.dataUrl = $(e.target).parent().parent().attr("data-url");
                $scope.htmlSource = '';
                if(type === "video"){
                    $scope.htmlSource = "<video src='"+$scope.imgSrc+$scope.dataUrl+"' style='width:400px;height:300px ;object-fit:fill' controls='controls'></video>";
                }else if(type === "music"){
                    $scope.htmlSource = "<audio src='"+$scope.imgSrc+$scope.dataUrl+"' style='width:400px;height:100px ;object-fit:fill' controls='controls'></audio>";
                }
                swal({ 
                    title: ""+$scope.dataName+"",
                    showCancelButton: true,
                    confirmButtonText:"通过(Y)",
                    cancelButtonText:"不通过(N)",
                    text: $scope.htmlSource, 
                    html: true 
                });
                $("#mdModal").hide();
        }

    
  $scope.getPageCount = function(){
        
             if($scope.video === 'video'){
                 
                     //默认获取视频显示数据的 url
                    $scope.pageUrl = "/science/getAuditedResourcesPagingToVideo"+
                                        "?start="+$scope.paginationConf.currentPage+
                                        "&limit="+$scope.paginationConf.itemsPerPage+
                                        "&uploadTypeId="+$scope.sourceShows+
                                        "&recommendedObjectId="+$scope.objectShows+
                                        "&bookTypeId="+$scope.bookShows;
                    //默认获取视频总条数的Url
                    $scope.pageCountUrl = courseware_root_url+"/science/getAuditedResourcesPagingToVideoCount"+
                                        "?start="+$scope.paginationConf.currentPage+
                                        "&limit="+$scope.paginationConf.itemsPerPage+
                                        "&uploadTypeId="+$scope.sourceShows+
                                        "&recommendedObjectId="+$scope.objectShows+
                                        "&bookTypeId="+$scope.bookShows; 
                }else if($scope.video === 'music'){
                    //默认获取音频数据显示url
                    $scope.pageUrl = "/science/getAuditedResourcesPagingToMusic?start="+$scope.paginationConf.currentPage+
                                        "&limit="+$scope.paginationConf.itemsPerPage+
                                        "&uploadTypeId="+$scope.sourceShows+
                                        "&recommendedObjectId="+$scope.objectShows+
                                        "&bookTypeId="+$scope.bookShows;
                    //默认获取音频总条数的Url
                    $scope.pageCountUrl = courseware_root_url+"/science/getAuditedResourcesPagingToMusicCount"+
                                            "?start="+$scope.paginationConf.currentPage+
                                            "&limit="+$scope.paginationConf.itemsPerPage+
                                            "&uploadTypeId="+$scope.sourceShows+
                                            "&recommendedObjectId="+$scope.objectShows+
                                            "&bookTypeId="+$scope.bookShows; 
            
                }
            //默认显示
          getData.getUrlData($scope.pageUrl).then(function(res){
                    $scope.sourceData = res.data.msg;
            })
     //设置分页基本参数
        $scope.page = function(){

            $scope.paginationConf={
        　　　　　　currentPage:1,//访问第几页数据，从1开始
        　　　　　　totalItems:$scope.paginationConf.totalItems,//数据库中总共有多少条数据
        　　　　　　itemsPerPage:10,//默认每页展示多少条数据，可更改
        　　　　　　perPageOptions: [10, 20, 30, 40, 50],//可选择的每页展示多少条数据
                    onChange:function(){
                            getData.getUrlData($scope.pageUrl).then(function(res){
                                    $scope.sourceData = res.data.msg;
                            })
                    }
        　   }
        } 


       //分页总数据
            $.ajax({
                        url:$scope.pageCountUrl,
                        type: "get",
                        dataType:"JSON",
                        async:false,
                        success: function(res){  
                            $scope.paginationConf.totalItems = res.msg;//获取总条数
                            $scope.page(); 
                        }
             });  

   }
   $scope.getPageCount()
  

    //点击模块类型 
    $scope.sourceExam = function(id,name){
        $scope.bookShows = id;  
        $scope.getPageCount();
    }
    
    //点击推荐对象
    $scope.objectExam = function(id,name){
        $scope.objectShows = id;
        $scope.getPageCount();
    }

    //点击  书籍类型
     $scope.modelExam = function(id,name){
        $scope.sourceShows = id;
         $scope.getPageCount();
     }

        //审核资源类型
        $scope.examType = function(id,name){
            $scope.examShow = id;  
            if($scope.examShow == 1){        //显示视频
                $scope.video = "video";
                $scope.getPageCount();
            }else if($scope.examShow == 2){  //显示音频
                $scope.video = "music";
                $scope.getPageCount();
            }else if($scope.examShow == 3){  //显示图书
                $scope.video = "tushu";
                $scope.getPageCount();
            }else if($scope.examShow == 4){  // 显示图库
                $scope.video = "tiku";
                $scope.getPageCount();
            }
        }

   

   //资源审核 - 通过确定按钮
   $scope.confirmExam = function(){
           
    if($scope.video == "video"){
        $scope.examUrl =  "/video/updateVideoExamine?videoExamine=2&id="+ $scope.dataId
                      
       }else if($scope.video == "music"){
           $scope.examUrl =  "/music/updateMusicExamine?musicExamine=2&id="+$scope.dataId
       }
        
       getData.getUrlData($scope.examUrl).then(function(d){
             //删除视图
           $("#"+$scope.dataId).remove();
           $("#mdModal").fadeOut();
       })
     
   }

   //审核不通过 确定发送 - 按钮
   $scope.examConfirm = function(){
        $("#mdModal").fadeOut();
        $("#"+$scope.dataId).remove();
   }

    //  审核不通过原因 -  取消按钮
   $scope.cancelExam = function(){
       $("#mdModal").fadeOut();
       $("#textCont").val(""); //清空 文本框的内容
       $scope.chkItem = [];  // 清空  选择状态
   }

   //审核不通过 -  取消按钮
   $scope.cancelexam = function(){
       $("#mdModal").fadeIn();
   }

      //选择审核内容
      $scope.chkItem = []; 
      $scope.content = function(state,item,index){
                   $scope.chkItem[index] = !state;  
                       //有一个为false则全选按钮为不选中  
                       if(!$scope.chkItem[index]){  
                           $("#textCont").value = "";
                       }else {  
                           //选中追加进去  
                           $("#textCont").val($("#textCont").val()+item.context);
                       }
           $scope.contText = $("#textCont").val(); 
      }

       //审核专辑 -不通过审核理由 审核通过 - 确定按钮
    $scope.confirmInsert = function(){
       
        if($scope.video == "video"){  //如果是视频  审核视频Url
            $scope.examUrl =  "/video/updateVideoExamine?videoExamine=2&id="+ $scope.dataId+
                        "&auditGrounds="+$scope.contText;
        }else if($scope.video == "music"){ //如果是音频   审核音频Url
            $scope.examUrl =  "/music/updateMusicExamine?videoExamine=2&id="+ $scope.dataId+
            "&auditGrounds="+$scope.contText;
        }
        getData.getUrlData($scope.examUrl).then(function(d){
              //删除视图
            $("#"+$scope.examId).remove();
            $("#mdModal").fadeOut();
        })
    }

}]) 

.controller('examinezj',["$scope","$state",'getData',function($scope,$state,getData){
    $scope.sourceShow = 1; //默认模块类型 第一个显示
    $scope.objectShow = 1;//默认推荐对象 第一个显示
    $scope.bookShow =  1;//默认资源 第一个显示
    $scope.imgSrc = source_exam; // 视频、音频 路径
    $scope.contentText = getData.contentText // 审核不通过原因
    $scope.paginationConf={
        currentPage:1,
        itemsPerPage:10
    }

    //获取上传资源类型 导航栏数据
     getData.getUrlData("/uploadType/getAllUploadType").then(function (res){
         $scope.sourceType = res.data.msg;
     })

     //获取书籍类型 导航栏数据
     getData.getUrlData("/bookType/getAllBookType").then(function (res){
         $scope.bookType = res.data.msg;
     })

     //获取推荐对象 导航栏数据
     getData.getUrlData("/recommendedObject/getAllRecommendedObject").then(function (res){
         $scope.objectType = res.data.msg;
     })

    //设置分页基本参数
    $scope.page = function(){ 
        $scope.paginationConf={
    　　　　　　currentPage:1,//访问第几页数据，从1开始
    　　　　　　totalItems:$scope.paginationConf.totalItems,//数据库中总共有多少条数据
    　　　　　　itemsPerPage:10,//默认每页展示多少条数据，可更改
    　　　　　　perPageOptions: [10, 20, 30, 40, 50],//可选择的每页展示多少条数据
               onChange:function(){
                    getData.getUrlData("/science/getAuditedSciencePaging"+
                         "?start="+$scope.paginationConf.currentPage+
                         "&limit="+$scope.paginationConf.itemsPerPage+
                         "&uploadTypeId="+$scope.sourceShow+
                         "&recommendedObjectId="+$scope.objectShow+
                         "&bookTypeId="+$scope.bookShow ).then(function(res){
                          $scope.sourceData = res.data.msg;
                        })
               }
    　   }
    }

    //默认显示
    getData.getUrlData("/science/getAuditedSciencePaging"+
    "?start="+$scope.paginationConf.currentPage+
    "&limit="+$scope.paginationConf.itemsPerPage+
    "&uploadTypeId="+$scope.sourceShow+
    "&recommendedObjectId="+$scope.objectShow+
    "&bookTypeId="+$scope.bookShow ).then(function(res){
     $scope.sourceData = res.data.msg;
   })
   
    //获取分页总页数
    $scope.getPageCount = function(){

            $.ajax({
                url:courseware_root_url+"/science/getAuditedSciencePagingCount"+
                    "?uploadTypeId="+$scope.sourceShow+
                    "&recommendedObjectId="+$scope.objectShow+
                    "&bookTypeId="+$scope.bookShow,
                type: "get",
                dataType:"JSON",
                async:false,
                success: function(res){  
                    $scope.paginationConf.totalItems = res.msg;  
                    $scope.page();
                }
            }); 
    }
    $scope.getPageCount();

      //书籍类型
   $scope.sourceExam = function(id,name){
      $scope.bookShow = id;
      $scope.getPageCount();
    }

    //点击推荐对象
    $scope.objectExam = function(id,name){ 
         $scope.objectShow = id;
        $scope.getPageCount();
    }

    //点击模块类型
    $scope.modelExam = function(id,name){
        $scope.sourceShow = id;
        $scope.getPageCount();
    }

      //审核不通过 -  取消按钮
      $scope.cancelSource = function(){
        $("#mdModal").fadeIn();
        $("#zjModal").fadeOut();
     

    }

    // 审核不通过原因 -  取消按钮
   $scope.cancelExam = function(){
        $("#mdModal").fadeOut();
        $("#textCont").val(""); //清空 文本框的内容
        $scope.chkItem = [];  // 清空  选择状态
   }

    //审核专辑 - 点击审核按钮
    $scope.sourceExamine = function(ev){
        $scope.examId = $(ev.target).parent().parent().attr("id");
        $("#zjModal").fadeIn();
        getData.getUrlData("/science/getScienceById?id="+$scope.examId).then(function(d){
            $scope.allData = d.data.msg;
        })
    }

   //选择审核内容
   $scope.chkItem = []; 
   $scope.content = function(state,item,index){
                $scope.chkItem[index] = !state;  
                    //有一个为false则全选按钮为不选中  
                    if(!$scope.chkItem[index]){  
                        $("#textCont").value = "";
                    }else{  
                        //选中追加进去  
                        $("#textCont").val($("#textCont").val()+item.context);
                     }
         $scope.contText = $("#textCont").val(); 
   } 

    //审核专辑 -  审核通过 - 确定按钮
    $scope.confirmSource = function(){
            $("#zjModal").fadeOut();
            getData.getUrlData("/science/updateExamineState?id="+
                       $scope.examId+"&bookExamine=2&completionStateId=2").then(function(d){})
            $("#"+$scope.examId).remove();
    }

   //审核专辑 -不通过审核理由 审核通过 - 确定按钮
   $scope.confirmInsert = function(){
        $("#mdModal").fadeOut()
        getData.getUrlData("/science/updateExamineState?id="+$scope.examId+
                           "&bookExamine=2&completionStateId=2"+
                           "&auditGrounds="+$scope.contText).then(function(d){
                 //删除视图
              $("#"+$scope.examId).remove();
         })
   }
     //审核专辑 - 删除按钮 - 
    $scope.sourceDel = function(ev){
      $scope.sourceId = $(ev.target).parent().parent().attr("id");
        swal({
            title: "您确定要删除吗？",
            text: "您确定要删除这条数据？",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: false,
            confirmButtonText: "是的，我要删除",
            confirmButtonColor: "#ec6c62"
        }, function() {
            getData.getUrlData("/science/deleteScience?bookDelete="+$scope.sourceId).then(function(d){
                swal("操作成功!", "已成功删除数据！", "success");
                //删除视图
                $(ev.target).parent().parent().remove();
            }).error(function(){    
                    swal("OMG", "删除操作失败了!", "error");
            })
        });
    }
}])