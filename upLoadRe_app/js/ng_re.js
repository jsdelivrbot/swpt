var r=angular.module('upLoadRe_app',["tm.pagination"]);
r.filter("myjoin",function(){
    return function(obj){
        return obj.join(',');
    }
});
 //首页控制器
r.controller('rectr',["$scope","$state","$stateParams","getData",function($scope,$state,$stateParams,getData){
    $scope.examine = 1; //默认审核 -- 显示全部
    $scope.stateList = [];  //审核状态       
    $scope.gId = null ; //资源内容  id
    $scope.sourceConent  = null;  //获取资源内容 
    $scope.examineId = 1 ; 
     //分页默认参数  
     $scope.paginationConf = {
        currentPage:1,
        itemsPerPage :10
    }
    $scope.file_type = 'list' ; // 切换显示 
    $scope.musicTab =1 ;  //默认导航栏   音频  -- 显示
   //上传资源分类
   $scope.release = getData.release;
   $scope.success = function(){
    location.href=source_url+"/upLoadRe_pc/#!/main/re_detail";
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
   //页面点击创建
    $scope.addCourse = function(){
        $scope.modalSource =! $scope.modalSource;
    }
    $scope.bookId = null;
    $scope.moreFile = function(ev){
        ev.stopPropagation();
        $scope.morethatFile =! $scope.morethatFile;
        //获取每条数据的ID
        $scope.bookId = angular.element(ev.target).parent().parent().parent().parent().attr("id");
    }
    
    //编辑资源
    $scope.editorSource = function(){
        getData.getUrlData("/science/getScienceById?id="+$scope.bookId).then(function(d){
           $scope.data = d.data.msg;
           $state.go('editor',{id:$scope.bookId});
           localStorage.clear();
        }) 

    }

    //删除资源内容
    $scope.delSource = function(e){
        $scope.morethatFile = ! $scope.morethatFile;
      //删除资源内容
        swal({
            title: "您确定要删除吗？",
            text: "您确定要删除这条数据？",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: false,
            confirmButtonText: "是的，我要删除",
            confirmButtonColor: "#ec6c62"
        }, function() {
            getData.getUrlData("/science/deleteScience?bookDelete="+$scope.bookId).then(function(d){
                swal("操作成功!", "已成功删除数据！", "success");
                //删除视图
                $("#"+$scope.bookId).remove();
            }).error(function(){
                swal("OMG", "删除操作失败了!", "error");
            })
        });
    }
      //删除成功后
      $scope.successDel = function(){
        $scope.morethatFile = ! $scope.morethatFile;
    }
    //首页 -- 删除 
    $scope.sourceDele = function(){
        $("#"+$scope.bookId).remove();
        $scope.morethatFile =! $scope.morethatFile;
    }

    $scope.shareSource = function(){
        $scope.shareModal =! $scope.shareModal;
    }
    $scope.moreClose = function(){
     $scope.morethatFile =! $scope.morethatFile;
    }
    $scope.modalClose = function(){
        $scope.modalSource =! $scope.modalSource;
    }
    $scope.shareClose = function(){
      $scope.shareModal =! $scope.shareModal;
      $scope.morethatFile =! $scope.morethatFile;
    }

    
   //获取审核状态
   $scope.getState = function(data){
        if(data == null){
            return ;
        }else {
        $scope.stateList = [];  //清空之前的状态
            for(var i=0; i<data.length;i++){
                for(var j=0;j<data[i].stateList.length;j++){
                    $scope.stateList.push(data[i].stateList[j].bookStateName);
                }
            } 
        }
      
   }
  
  $scope.totoalUrl=  courseware_root_url+'/science/getAllScienceCount';  
      //资源内容数据显示   
    $scope.getAllData = function(){  
        if($scope.examine == 1){
           $scope.url= "/science/getAllSciencePaging?start="+$scope.paginationConf.currentPage+
            "&limit="+$scope.paginationConf.itemsPerPage;
        }else{
            $scope.url =  "/science/getScienceConditional?start="+$scope.paginationConf.currentPage+
            "&limit="+$scope.paginationConf.itemsPerPage+"&completionStateId="+$scope.examineId;
        }
        //默认请求全部数据
          getData.getUrlData($scope.url).then(function(d){
                 $scope.sourceConent = d.data.msg;  
                $scope.getState($scope.sourceConent);
           }) 
        }   
        
     //设置分页基本参数
        $scope.page = function(){  
                $scope.paginationConf={
            　　　　　　currentPage:1,//访问第几页数据，从1开始
            　　　　　　totalItems:$scope.paginationConf.totalItems,//数据库中总共有多少条数据
            　　　　　　itemsPerPage:10,//默认每页展示多少条数据，可更改
            　　　　　　perPageOptions: [10, 20, 30, 40, 50],//可选择的每页展示多少条数据
                       onChange:function(){
                          $scope.getAllData();
                       }  
            　   }
            
        }
    
         //获取分页总页数
            $.ajax({
                url:$scope.totoalUrl,
                type: "get",
                dataType:"JSON",
                async:false,
                success: function(res){  
                    $scope.paginationConf.totalItems = res.msg;  
                    $scope.page();
                    $scope.getAllData();
                }
            }); 
      

    //获取审核数据显示
    $scope.examineFun = function(){
        $scope.stateList = [] ;   //清空审核状态
        $scope.paginationConf.currentPage = 1;
        if($scope.examine == 1){
            $scope.pageAllUrl = courseware_root_url+"/science/getAllScienceCount";
        }else{
            $scope.pageAllUrl = courseware_root_url+"/science/getScienceConditionalCount?completionStateId="+$scope.examineId
        }
        $.ajax({
            url:$scope.pageAllUrl,
            type: "get",
            dataType:"JSON",
            async:false,
            success: function(res){  
                $scope.paginationConf.totalItems = res.msg; 
                $scope.getAllData();
            }
        });
    }

    //资源内容 -- 切换审核状态
  
    $scope.examineType = function(id,name){
        $scope.examine = id;
        $scope.file_type ='list';
        if($scope.examine  == 1){
            $scope.examineFun()
        }else if($scope.examine  == 2){
            $scope.examineId = 2 ;
            $scope.examineFun();
        } else if($scope.examine  == 3){
            $scope.examineId  = 1
            $scope.file_type ='fileChk';
            $scope.examineFun();
        }else if($scope.examine  == 4){
            $scope.examineId = 4
            $scope.examineFun();
        } 
    }
       //详情跳转
       $scope.sourceDetail = function(ev){
        ev.stopPropagation();
        $scope.detailId = $(ev.currentTarget).attr("id"); 
        if($scope.examine == 1){
             $scope.bookExamId = $(ev.currentTarget).attr("data-exam");
        }else {
            $scope.bookExamId = null;
        }
        $state.go("bookdetail",{detailId:$scope.detailId,examineId:$scope.examineId,bookExamId:$scope.bookExamId});
   }
 


}])
  //资源类型页面控制器
.controller('reUpfileDesctr',["$scope","$rootScope","$routeParams","$compile","getData","$state","$stateParams",function($scope,$rootScope,$routeParams,$compile,getData,$state,$stateParams){
    $scope.selectValue = null;
    $scope.mySource = null // 获取我的资源 内容
    // var getuid=window.localStorage['user']?JSON.parse(window.localStorage['user']):null;
    // if(getuid==null){
    //     window.location.href="../login2/index.html";
    // }  
    // 上传信息
    $scope.teaching_material_type=1;
    $scope.succId = 1;
    $scope.release = getData.release;
    //点击上传信息
    $scope.setTeachingMaterialType=function(type){
        $scope.teaching_material_type=type;
    }
    $scope.isread=false; // 确定服务条款
    $scope.gcss=['one','two','three',"four"];
      //上传数据
    $scope.des = getData.des;

    $scope.cmp = null ; 
    $scope.cur_var={
        "fileAudioName":null,  //获取上传音频的名称
        "fileVideoName":null,  //获取上传视频的名称
        "fileSourceName":null, //获取上传题库的名称
        "fileCoverName":null,   //获取上传图片的名称
        "source_type_id":null, //资源类型 ID
        "source_type_name":null, //资源类型 名称
        "rec_object_id":null,   //推荐对象 ID
        "rec_object_name":null,  //推荐对象  名称
        "book_type_id":null,    //书籍类型  ID
        "book_type_name":null,   //书籍类型  名称
        "free_type_id":null,     //收费  ID
        "free_type_name":null,     //收费  名称
        "file_name":null,        //上传名称
        "file_author":null,      //上传作者
        "file_press":null,       //上传出版社
        "file_ibsn":null,        //上传 IBSN
        "file_introduce":null,    //上传 推荐理由
        "file_explain":null,      //上传简介内容
        "file_price":null,       //按节收费价格
        "comState":false,        //允许评论
        "free":true,             // 允许分享 
        "chapterName":null,     //章节名称
        "videoPath":null,       //视频路径
        "audioPath":null,       //音频路径
        "scienceId" :null,      //上传资源id
        "scienceName":null,     //上传资源名称
        "bookDelete":1,      //删除状态
        "bookExamine":1,      //审核状态（1：待审核2：已通过3：未通过）
        "completionStateId":1, //书籍状态（1：待审核2：正在更新3：已完结4：未通过） 
        "conmmentContext":null //评论内容
    }

    $scope.cmp = angular.copy($scope.cur_var);//复制模板
    $scope.cmp = TOOL.getObject("cur_var"); //获取缓存中是数据
  
    // //资源内容跳转 - 编辑跳转 
    if($stateParams.id != null){
         getData.getUrlData("/science/getScienceById?id="+$stateParams.id).then(function(d){
            $scope.dataValue = d.data.msg;
            $scope.source_type_name = $scope.dataValue.uploadTypeList[0].uploadTypeName;
            $scope.rec_object_name = $scope.dataValue.recommendedList[0].recommendedObjectName;
            $scope.book_type_name = $scope.dataValue.bookTypeList[0].bookTypeName;
            $scope.free_type_name = $scope.dataValue.chargeList[0].chargeType;
            $scope.file_author=$scope.dataValue.bookAuthor; 
            $scope.Rcomment=$scope.dataValue.bookComment;
            $scope.bookDelete=$scope.dataValue.bookDelete;
            $scope.bookExamine=$scope.dataValue.bookExamine;
            $scope.file_ibsn=$scope.dataValue.bookIBSN;
            $scope.file_name=$scope.dataValue.bookName;
            $scope.file_press=$scope.dataValue.bookPress;
            $scope.Rshare=$scope.dataValue.bookShare;
            $scope.book_type_id=$scope.dataValue.bookTypeId;
            $scope.file_explain=$scope.dataValue.briefIntroduction;
            $scope.cur_var.file_price=$scope.dataValue.chargePrice;
            $scope.free_type_id=$scope.dataValue.chargeTypeId;
            $scope.completionStateId=$scope.dataValue.completionStateId;
            $scope.conmmentContext=$scope.dataValue.conmmentContext;
            $scope.fileCoverName=$scope.dataValue.coverPhoto;
            $scope.rec_object_id=$scope.dataValue.recommendedObjectId;
            $scope.file_introduce=$scope.dataValue.recommendedReasons;
            $scope.source_type_id=$scope.dataValue.uploadTypeId;
            $scope.showFree();
         })
   
    }
    //资源内容跳转  -- 继续上传跳转
    if($stateParams.Cid != null){
        getData.getUrlData("/science/getScienceById?id="+$stateParams.Cid).then(function(d){
            $scope.dataCon = d.data.msg;
            $scope.chapterName=  $scope.dataCon.chapterName;
            $scope.fileVideoName =  $scope.dataCon.fileVideoName;
            $scope.fileAudioName =  $scope.dataCon.fileAudioName;
            //$("#selName").attr("disabled","disabled");
          $scope.sourceName.push({"id":$scope.dataCon.id,"bookName":$scope.dataCon.bookName});
       })
    }else if($stateParams.ChapId != null){
        getData.getUrlData("/bookChapter/getUnionAllBookChapterById?id="+$stateParams.ChapId).then(function(d){
            $scope.chapterCon = d.data.msg;
            $scope.cur_var.chapterName = $scope.chapterCon.bookChapterName;
            $scope.cur_var.fileVideoName = $scope.chapterCon.videoName;
            $scope.cur_var.fileAudioName = $scope.chapterCon.videoName.musicName;
            //$("#selName").attr("disabled","disabled");
            $scope.sourceName.push({"id":$scope.chapterCon.scienceId,"bookName":$scope.chapterCon.bookName});
       })
    }else{

        //获取上传资源 名称
        getData.getUrlData("/science/getAllScience").then(function(d){
            $scope.sourceName = d.data.msg;
            $scope.selectValue = $scope.sourceName[0].id;
        
        }) 
    }
    $scope.showlist = function(){
        //上传资源类型
        getData.getUrlData("/uploadType/getAllUploadType").then(function (res){
            $scope.sourceType = res.data.msg;
        })
        //书籍类型
        getData.getUrlData("/bookType/getAllBookType").then(function (res){
            $scope.bookType = res.data.msg;
        })
    
        //收费类型
        getData.getUrlData("/chargeType/getAllChargeType").then(function (res){
            $scope.sourceFree = res.data.msg;
        })

        //推荐对象
        getData.getUrlData("/recommendedObject/getAllRecommendedObject").then(function (res){
            $scope.recObject = res.data.msg;
        })
        
     }
     $scope.showlist();


    //点击书籍类型
    $scope.setSourceType = function(id,name){
        $scope.cmp.source_type_id = id;
        $scope.cmp.source_type_name  = name ;
        $scope.source_type_id = id;
        $scope.source_type_name = name;
        $stateParams.Cid ==null?sourceId =  $scope.cmp.source_type_id: freeId = $scope.source_type_id;
 
    }
    //点击推荐对象
    $scope.setRecObject =function(id,name){
        $scope.cmp.rec_object_id = id;
        $scope.cmp.rec_object_name = name;
        $scope.rec_object_id = id;
        $scope.rec_object_name = name;
        $stateParams.Cid ==null?recId =  $scope.cmp.rec_object_id: freeId = $scope.rec_object_id;

    }
    //点击书籍类型
    $scope.setBookType = function(id,name){
      
        $scope.cmp.book_type_id = id;
        $scope.cmp.book_type_name = name;
        $scope.book_type_id = id;
        $scope.book_type_name = name;
        $stateParams.Cid ==null?bookId =  $scope.cmp.book_type_id: freeId = $scope.book_type_id;

    }
    //点击发布模式
    $scope.show_free =1 ;
    $scope.setFree =function(id,name){
        $scope.cmp.free_type_id = id;
        $scope.cmp.free_type_name = name; 
        $scope.free_type_id = id;
        $scope.free_type_name = name; 
        $scope.cur_var.free_type_name =  name; 
        $scope.showFree();
        $stateParams.Cid ==null?freeId =  $scope.cmp.free_type_id: freeId = $scope.free_type_id;

  
    }
    //点击切换上传信息
    $scope.sw_teaching = function(){
        $scope.cmp = angular.copy($scope.cur_var);//复制模板
        $("#p_sw_material").show();
    }

    //收费价格只能输入数字并且只能是小数点两位
    $scope.clearNoNum = function(obj,attr){
        //先把非数字的都替换掉，除了数字和"."
        obj.file_price = obj.file_price.replace(/[^\d.]/g, ""); 
      //必须保证第一个为数字而不是"."
        obj.file_price = obj.file_price.replace(/^\./g, "");
      //保证只有出现一个.而没有多个"."
        obj.file_price = obj.file_price.replace(/\.{2,}/g, ".");
      //保证"."只出现一次，而不能出现两次以上
        obj.file_price = obj.file_price.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
       //保证"."只后面只能出现两位有效数字
         obj.file_price = obj.file_price.replace(/([0-9]+\.[0-9]{2})[0-9]*/, "$1");
    }

    //上传信息确定
    $scope.uploadlSubmit = function(){
        $scope.cur_var = angular.copy($scope.cmp);
        $("#p_sw_material").hide();
    }

    //判断发布模式 显示
    $scope.showFree = function(){
        if($scope.cmp.free_type_id == 2 || $scope.free_type_id == 2){
            $(".chapter_t").css("display","block");
        }else{
            $(".chapter_t").css("display","none");
        } 
        if($scope.cmp.free_type_id == 3 || $scope.free_type_id ==3){
            $(".chapter_free").css("display","block");
        }else{    
            $(".chapter_free").css("display","none");
        }
    }
    $scope.showFree();

    $scope.Moperate = function(ev){
        $scope.moreOperate =! $scope.moreOperate; 
       $scope.dataId = $(ev.target).parent().parent().attr("id");
    }
    //关闭窗口
    $scope.close = function(){
        $scope.moreOperate = ! $scope.moreOperate;
    }

    //创建资源
    $scope.nextFile = function(){
        $scope.imgUrl = $(".uploadcoverName").val()+"."+$("#uploadcover").val().split(".")[1];
        function p(s){
            return s < 10 ? '0' + s: s;
        }
    
        var myDate = new Date();
        //获取当前年
        var year=myDate.getFullYear();
        //获取当前月
        var month=myDate.getMonth()+1;
        //获取当前日
        var date=myDate.getDate(); 
        var h=myDate.getHours();       //获取当前小时数(0-23)
        var m=myDate.getMinutes();     //获取当前分钟数(0-59)
        var s=myDate.getSeconds();  
        $scope.now = year+'-'+p(month)+"-"+p(date)+" "+p(h)+':'+p(m)+":"+p(s);
        var form = document.getElementById('uploadForm');
        var formdata = new FormData(form);
           //判断是创建还是编辑
           if( $stateParams.id != null){
            $scope.sourceId = $scope.source_type_id;
            $scope.bookId = $scope.book_type_id;
            $scope.freeId = $scope.free_type_id;
            $scope.recId = $scope.rec_object_id;
            $scope.createUrl = courseware_root_url+"/science/updateScience" ;
            formdata.append("id",$stateParams.id);
        }else{
            $scope.sourceId = $scope.cur_var.source_type_id;
            $scope.bookId = $scope.cur_var.book_type_id;
            $scope.freeId = $scope.cur_var.free_type_id;
            $scope.recId  = $scope.cur_var.rec_object_id;
            $scope.createUrl= courseware_root_url+"/science/addScienceOne"
        }
        formdata.append("uploadTypeId",$scope.sourceId); //模块类型 id
        formdata.append("recommendedObjectId",$scope.recId); // 推荐对象 id
        formdata.append("bookTypeId",$scope.bookId);   //书籍类型  id
         formdata.append("chargeTypeId",$scope.freeId);  //发布模式  id
        formdata.append("bookExamine","1");
        formdata.append("bookDelete","1");
        formdata.append("completionStateId","1");
        formdata.append("uploadTime",$scope.now);
        $.ajax({
                type: "POST",
                url:$scope.createUrl,
                data: formdata,
                processData:false,
                contentType: false,
                cache: false,
                success: function (result) {
                    //成功后弹出窗口
                swal("恭喜您！创建成功！", "", "success");
                },error:function(res){

                    //失败弹出窗口
                    swal("创建失败！", "", "error");
                }
            });
    }

    //创建成功后跳转主页面
    $scope.succssConfirm = function(){
        $state.go("index");
    }

    $scope.uploadCancel = function(){
        $("#p_sw_material").hide();
    }
    //资源类型取消返回上一级页面
    $scope.editorCancel = function(){
        javascript:history.go(-1);
    }
    //阅读条款
    $scope.setRead=function(){
        $scope.isread=!$scope.isread;
    }
    //文件上传
    $scope.uploadvideo=function(){
        $("#uploadvideo").click();
    };
    $scope.uploadenclosure=function(){
        $("#uploadenclosure").click();
    };
    $scope.uploadcover=function(){
        $("#uploadcover").click();
    };
   $scope.uploadaudio = function(){
       $("#uploadaudio").click();
   }
   //上传文件类型前端显示 
   $scope.upFile = function(mb,file,file_length,reader,upfile_type,up,uname,fname){
    var file_def_pic_size=1024*1024*20;
    var cur_file_size=0;
    var sizeMK='M';
    for(var i=0;i<file_length;i++){
        var max=file[i].size;
        if(max>file_def_pic_size){  
            layer.alert("文件过大，限制上传");
            document.getElementById(type).value=null;
            fname.html("文件过大，限制上传");
            return false;
        }
        if(mb>max){
            sizeMK="KB";
            cur_file_size=parseInt(max/1024);
            if(cur_file_size<1){
                sizeMK="B";
                cur_file_size=max;
            }
        }else{
            cur_file_size=(max/mb).toFixed(2);
        }
        reader.readAsBinaryString(file[i]);
        var file_ext=$scope.isExt(file[i].name,true);
        upfile_type.html(file_ext+"/"+cur_file_size+sizeMK);
        var up_num="1%";
        up.css({"width":up_num});
        reader.onprogress=function(evt){
            up_num=(evt.loaded/max)*100+"%";
            up.css({"width":up_num});
            fname.html(up_num);
            uname.val($scope.fileVideoName)
        }
        reader.onloadend = function(){
            fname.html( "上传完成");
        }
    }
  }   
  //上传文件出错页面显示
   $scope.fileTest = function(file,file_max,type){
        if($scope.isExt(file[0].name,false)){
            layer.alert("文件类型不正确");
            document.getElementById(type).value=null;
            return false;
        }
        var max=file[0].size;
        if(max>file_max){
            layer.alert("文件过大，限制上传");
            document.getElementById(type).value=null;
            return false;
        }
        if(mb>max){
            sizeMK="KB";
            cur_file_size=parseInt(max/1024);
        }else{
            cur_file_size=(max/mb).toFixed(2);
        }
        reader.readAsBinaryString(file[0]);
        var file_ext=$scope.isExt(file[0].name,true);
        upfile_type.html(file_ext+"/"+cur_file_size+sizeMK);
        var up_num="1%";
        reader.onprogress=function(evt){
            up_num=(evt.loaded/max)*100+"%";
            up.css({"width":up_num});
            fname.html(up_num);
        }
        reader.onloadend=function(){
            fname.html("上传完成");
        }
   }
    $scope.fileSelected=function(type){
        var file = document.getElementById(type).files;
        var fileType = file[0].name.split(".")[1];
        var filename='';
        var reader=new FileReader();
        var mb=1024*1024;
        var file_def_pic_size=1024*1024*20;
        var sizeMK='M';
        var file_max=$scope.des.upfile_video_size*mb;
        var cur_file_size=0;
        var upfile_type=$("."+type+"content .upfile_type"); 
        var up=$('.'+type+'content .upfile_progress');
        var fname=$('.'+type+'content .file_name');
        var uname = $(".re_uf_bldes ."+type+"Name");
        $("."+type+"content").show();
        var file_length=file.length;  
        if(file[0].name!=''){
            if(type=='uploadvideo'){
                 $scope.fileVideoName = file[0].name.split(".")[0];
                if($scope.des.video.upfile_video_ext.indexOf(fileType) !== -1){ 
                    $scope.upFile(mb,file,file_length,reader,upfile_type,up,uname,fname);
                }else{
                  $scope.fileTest(file,file_max,type);
                }
            }else if(type =='uploadaudio'){
                $scope.fileAudioName = file[0].name.split(".")[0];
                if($scope.des.audio.upfile_video_ext.indexOf(fileType) !== -1){ 
                    $scope.upFile(mb,file,file_length,reader,upfile_type,up,uname,fname);
                }else{
                    $scope.fileTest(file,file_max,type);
                }

            }else if(type=='uploadenclosure'){
                $scope.fileSourceName = file[0].name.split(".")[0];
                if($scope.des.question.upfile_video_ext.indexOf(fileType) !== -1){ 
                    $scope.upFile(mb,file,file_length,reader,upfile_type,up,uname,fname);
                }else{
                   $scope.fileTest(file,file_max,type);
                }
            }else if(type=='uploadcover'){
                $scope.videocover = fileType;
                var uploadName = $scope.cur_var.fileAudioName,
                    uploadPath = file;
                var ext=$scope.isExt(file[0].name,true);
                $scope.fileCoverName = file[0].name.split(".")[0];
   
                if($.inArray(ext,['jpg','png','bmp','gif','jpeg'])==-1){
                    layer.alert("文件类型不正确");
                    document.getElementById(type).value=null;
                    fname.html("文件类型不正确");
                    return false;
                }
                var max=file[0].size;
                if(max>file_def_pic_size){
                    alyer.alert("上传图片过大，限制1M内");
                    document.getElementById(type).value=null;
                    fname.html("上传图片过大，限制1M内");
                    return false;
                }
                if(mb>max){
                    sizeMK="KB";
                    cur_file_size=parseInt(max/1024);
                    if(cur_file_size<1){
                        sizeMK="B";
                        cur_file_size=max;
                    }
                }else{
                    cur_file_size=(max/mb).toFixed(2);
                }
                reader.readAsBinaryString(file[0]);
                $(".uploadcovercontent .upfile_type").html(ext+"/"+cur_file_size+sizeMK);
                var up_num="1%";
                var fname_pr='封面图';
                reader.onprogress=function(evt){
                    up_num=(evt.loaded/max)*100+"%";
                    up.css({"width":up_num});
                    fname.html(fname_pr+up_num);
                    uname.val($scope.fileCoverName);
                }
                reader.onloadend=function(){
                    fname.html(fname_pr+"上传完成");
                }
            }
        }
    }
    $scope.isExt=function(name,sw){
        var dot = name.lastIndexOf(".");
        var ext = name.substring(dot + 1);
        if(sw){
            return ext;
        }
        if($.inArray(ext,$scope.des.upfile_video_ext)==-1){
   
            return true;
        }
        return false;
    }

    //选择上传资源

    $scope.loadChange = function(id,name){
          $scope.cur_var.scienceId = id;
           $scope.cur_var.scienceName = name;
    }
   
    $scope.upfileSumbt=function(isValid){
      
        function p(s){
            return s < 10 ? '0' + s: s;
        }

        var myDate = new Date();
        //获取当前年
        var year=myDate.getFullYear();
        //获取当前月
        var month=myDate.getMonth()+1;
        //获取当前日
        var date=myDate.getDate(); 
        var h=myDate.getHours();       //获取当前小时数(0-23)
        var m=myDate.getMinutes();     //获取当前分钟数(0-59)
        var s=myDate.getSeconds();  
        $scope.now = year+'-'+p(month)+"-"+p(date)+" "+p(h)+':'+p(m)+":"+p(s);

            if(!$scope.isread){
                alert('提交前选阅读《资源上传服务条款》');
                return false;
            }   
            
            var form= document.getElementById('uploadFormSource');
            var formdata = new FormData(form);
                formdata.append("scienceId",$scope.selectValue)
                formdata.append("uploadTime",$scope.now);
            if($stateParams.ChapId != null || $stateParams.videoId != null || $stateParams.musicId != null){ //继续上传
                    formdata.append("id",$stateParams.ChapId);
                    formdata.append("videoId",$stateParams.videoId);
                    formdata.append("musicId",$stateParams.musicId);
                $scope.submitUrl=courseware_root_url+"/bookChapter/updateBookChapter"; 
            }else{
                $scope.submitUrl = courseware_root_url+"/bookChapter/addBookChapter";
            }
        $.ajax({
            url:$scope.submitUrl,
            type: 'POST',
            dataType:'json',
            data: formdata,
            contentType: false,
            cache: false,
            processData: false,
            success: function (d) {
                swal("恭喜您！创建成功！", "", "success");
            },error:function(res){
                 //失败弹出窗口
                 swal("创建失败！", "", "error");
            }
        }); 
        };  


    //分页
    $scope.paginationConf = {
    	currentPage:1,
    	itemsPerPage :10
    }
    $scope.chaperTab = 1 //默认选中全部
    $scope.chaper = 1;
 
  
     //获取资源显示
     $scope.allUrl = courseware_root_url+"/bookChapter/getUnionAllBookChapterCount";
  
     //获取资源显示
     $scope.showData = function(){
         if($scope.chaperTab == 1){
            $scope.examineUrl = "/bookChapter/getUnionAllBookChapter?start="+$scope.paginationConf.currentPage+
              "&limit="+$scope.paginationConf.itemsPerPage;
         }else{
            $scope.examineUrl= "/bookChapter/getAllBookChapterFormExamine?start="+$scope.paginationConf.currentPage
             +"&limit="+$scope.paginationConf.itemsPerPage+"&bookChapterExamine="+$scope.chaper ;
         }
         getData.getUrlData($scope.examineUrl).then(function(d){
             $scope.mySource =  d.data.msg;
         }) 
     } 

    //分页
   $scope.allData = function(){
        //设置分页基本参数
        $scope.page = function(){  
            $scope.paginationConf={
        　　　　　　currentPage:1,//访问第几页数据，从1开始
        　　　　　　totalItems:$scope.paginationConf.totalItems,//数据库中总共有多少条数据
        　　　　　　itemsPerPage:10,//默认每页展示多少条数据，可更改
        　　　　　　perPageOptions: [10, 20, 30, 40, 50],//可选择的每页展示多少条数据
                   onChange:function(){
                     $scope.showData();
                   }  
        　   }
       
    }

    //默认获取分页总数
        $.ajax({
                url: $scope.allUrl,
                type: "get",
                dataType:"JSON",
                async:false,
                success: function(res){  
                    $scope.paginationConf.totalItems = res.msg;  
                    $scope.page();
                }
        });  
   } 

    $scope.getUrlData = function(){
        $scope.paginationConf.currentPage =1 ;
            if($scope.chaperTab ==1){
                $scope.allUrl =  courseware_root_url+"/bookChapter/getUnionAllBookChapterCount";
            }else{
                $scope.allUrl = courseware_root_url+"/bookChapter/getAllBookChapterFormExamineCount?bookChapterExamine="+$scope.chaper;
            }
            $scope.showData();
            $scope.allData();
    } 
$scope.getUrlData();

     //切换审核状态
    $scope.chapterType = function(id){
        $scope.chaperTab = id;
      if($scope.chaperTab == 1){
        $scope.getUrlData()
        }else if($scope.chaperTab == 2 ){
            $scope.chaper = 2 || 3 ;
            $scope.getUrlData()
        }else if($scope.chaperTab == 3){
            $scope.chaper = 1 ;
            $scope.getUrlData()
        }else{
            $scope.chaper = 4 ;
            $scope.getUrlData()
        }
    }

    //双击视频 
    $scope.uploadVideo = function(id,ev){
        $scope.dataUrl = $(ev.target).attr("data-url");
        $scope.dataName = $(ev.target).html();
        swal({ 
            title: ""+$scope.dataName+"",
            showCancelButton: true,
            showConfirmButton:false,
            closeOnConfirm: false,
            text: "<video src='"+$scope.dataUrl+"' style='width:400px;height:400px ;object-fit:fill' controls='controls'></video>", 
            html: true 
          });
    }
    //双击我的资源 - 查看资源 
    $scope.uploadMusic = function(id,ev){
        $scope.dataUrl = $(ev.target).attr("data-url");
        $scope.dataName = $(ev.target).html();
        swal({ 
            title: ""+$scope.dataName+"",
            showCancelButton: true,
            showConfirmButton:false,
            closeOnConfirm: false,
            text: "<audio src='"+$scope.dataUrl+"' style='width:400px;height:50px' controls='controls'></audio>", 
            html: true 
          });
    }

         //删除我的资源 章节
    $scope.removeChapter = function(e){
        $scope.moreOperate = ! $scope.moreOperate;
            swal({
                title: "您确定要删除吗？",
                text: "您确定要删除这条数据？",
                type: "warning",
                showCancelButton: true,
                closeOnConfirm: false,
                confirmButtonText: "是的，我要删除",
                confirmButtonColor: "#ec6c62"
            }, function() {
                swal("操作成功!", "已成功删除数据！", "success");
                getData.getUrlData("/bookChapter/delBookChapter?id="+$scope.dataId).then(function(d){
                    swal("操作成功!", "已成功删除数据！", "success");
                    //删除视图
                    $("#"+$scope.dataId).remove(); 
                }).error(function(r){
                        swal("OMG", "删除操作失败了!", "error");
                })
            
            });
       }

       //删除成功后
       $scope.successDel = function(){
           $scope.moreOperate = ! $scope.moreOperate;
       }

    
    //修改章节
    $scope.insertChapter = function(ev){
        $scope.ChapId = $(ev.target).parent().parent().attr("id");  //获取章节id
        $scope.videoId = $(ev.target).parent().parent().attr("data-videoId"); //获取视频id
        $scope.musicId = $(ev.target).parent().parent().attr("data-musicId"); //获取音频id
        $state.go('source',{
            "ChapId":$scope.ChapId,
            "videoId": $scope.videoId,
            "musicId": $scope.musicId 
         });
    }


   //我的资源   跳转创建资源页面
   $scope.createSource = function(){
       $state.go('conf');
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
    $scope.playVideo = function(id,url,ev){
        $scope.videoPath = $scope.imgSrc+url;
        $scope.type = "type";
        $scope.videoTitle = angular.element(ev.currentTarget).children().children("span").html();
    }

    $scope.closeVideo = function(ev){
    $scope.type = "";
    angular.element(ev.currentTarget).parent().siblings()[0].pause();
    }
    $scope.enterTop = function(){
    $scope.showTop = "showTop";
    }
    $scope.leaveTop = function(){
        $scope.showTop = "";
    }
 }]) 