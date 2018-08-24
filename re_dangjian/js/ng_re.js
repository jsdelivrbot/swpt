var r=angular.module('re_dangjian',["tm.pagination"]);
r.filter("myjoin",function(){
    return function(obj){
        return obj.join(',');
    }
});

r.controller('examinezj',["$scope","$state",'getData',function($scope,$state,getData){
    $scope.firstTypeShow = 1; //默认一级 第一个显示
    $scope.secondTypeShow = 1;//默认二级 第一个显示
    $scope.examinePass = "examPass"; //默认 显示 通过 数据
    $scope.pass = 1;   //默认  显示  通过按钮
    $scope.contentText = getData.contentText // 审核不通过原因
    $scope.examData = getData.examData;  //显示通过、未通过
    $scope.paginationConf={
        currentPage:1,
        itemsPerPage:10
    }
    $scope.expass = function(id){
        $scope.pass = id;
        if($scope.pass == 1){
            $scope.examinePass = "examPass";
        }else{
            $scope.examinePass = "examFail";
        }
    }
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


    getData.getUrlData("/firstType/getAllFirstType").then(function(res){
        $scope.firstType = res.data.msg;
    })

     //点击一级分类 
   $scope.sourceExam = function(id,name){
      $scope.firstTypeShow = id;
      $scope.getPageCount();
      //二级分类
      getData.getUrlData("/twoType/getTwoTypeByFirstTypeId?id=" +$scope.firstTypeShow ).then(function(res){
        $scope.secondType = res.data.msg;
      })
    }

     //点击二级分类
    $scope.objectExam = function(id,name){
        $scope.secondTypeShow = id;
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
      //专辑 查看 跳转
    $scope.sourceDetail = function(ev){
        ev.stopPropagation();
        $scope.detailId = $(ev.target).parent().parent().attr("id");
       $state.go('bookdetail',{'detailId':$scope.detailId});    
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
.controller('bookdetail',["$scope","$routeParams","getData","$stateParams",function($scope,$routeParams,getData,$stateParams){
    $scope.imgSrc = source_exam; //获取图片路径
    $scope.sourceType = getData.sourceType;  //导航栏类型
    $scope.contentType = 'video'; //默认 -显示视频数据
    $scope.navId = 1;
      if($stateParams.detailId != null && $stateParams.bookExamId == null){
     getData.getUrlData("/science/getMultiTableScienceById?id="+$stateParams.detailId+"&bookExamine="+$stateParams.examineId).then(function(d){
        $scope.bookData = d.data.msg;
      
     }) 

   }else if( $stateParams.bookExamId != null){
        getData.getUrlData("/science/getMultiTableScienceById?id="+$stateParams.detailId+"&bookExamine="+$stateParams.bookExamId).then(function(d){
            $scope.bookData = d.data.msg;
        }) 
   }
    $scope.navType = function(id){
            $scope.navId = id;
        if($scope.navId == 1){
            $scope.contentType = 'video';
        }else if($scope.navId == 2){
            $scope.contentType = 'music';
        }else if($scope.navId == 3){
            $scope.contentType ='tushu';
        } else if($scope.navId == 4){
            $scope.contentType = 'tiku';
        }
    }
 }]) 