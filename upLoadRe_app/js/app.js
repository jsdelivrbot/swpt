
var root_burl='/data/';
var app=angular.module('dd8w',[
    "ngRoute",
    "ui.router",
	"upLoadRe_app"
 ])

.config(["$stateProvider","$urlRouterProvider","$locationProvider",function($stateProvider,$urlRouterProvider,$locationProvider){
    $urlRouterProvider.otherwise("/index");
    $stateProvider.state('index',{
        url:'/index',
        templateUrl:'tpl/index.html',
        controller:'rectr'
    }).state('editor',{
        params:{ id:null},
        url:'/re_editor',
        templateUrl:'tpl/re_upfile_editor.html',
        controller:'reUpfileDesctr'
    }).state('source',{
        params:{
            "ChapId":null,
            "videoId":null,
            "musicId":null
        },
        url:'/re_source',
        templateUrl:'tpl/re_upfile_resource.html',
        controller:'reUpfileDesctr'
    }).state('music',{
        url:'/my_music',
        templateUrl:'tpl/re_music.html',
        controller:'reUpfileDesctr'
    }).state('conf',{
        url:'/re_conf',
        templateUrl:'tpl/re_upfile_conf.html',
        controller:'reConf'
    }).state('bookdetail',{
        url:'/book_detail',
        params:{'detailId':null,'examineId':null,"bookExamId":null},
        url:'/book_detail',
        templateUrl:'tpl/bookDetail.html',
        controller:'bookdetail'
    })
}]) 
.factory('getData', ['$http', function($http){
   var f = {};
   f.des={
    'question':{
        'title':'题库',
        'upfile_video_size':20,
        'upfile_video_ext':['txt','doc','docx','xls','xlsx','ppt','pptx','pdf'],
        'isEnclosure':false,
        'isCover':false,
        'pic':'/re/img/re_upfile_des/upfile_icon/icon_kejian.png',
        'iscurriculum':false
    },
    'video':{
        'title':'视频',
        'upfile_video_size':50,
        'upfile_video_ext':['mp4','flv','avi','rmvb','3gp','mpeg','swf'],
        'isEnclosure':true,
        'isCover':true,
        'pic':'/re/img/re_upfile_des/upfile_icon/icon_shipin.png',
        'iscurriculum':false
    },
    'audio':{
        'title':'音频',
        'upfile_video_size':50,
        'upfile_video_ext':['mp3','wma'],
        'isEnclosure':false,
        'isCover':false,
        'pic':'/re/img/re_upfile_des/upfile_icon/icon_yinpin.png',
        'iscurriculum':false
    },
    'picture':{
        'title':'图片',
        'upfile_video_size':50,
        'upfile_video_ext':['jpg','png','bmp','gif','jpeg'],
        'isEnclosure':false,
        'isCover':false,
        'pic':'/re/img/re_upfile_des/upfile_icon/icon_tupian.png',
        'iscurriculum':false
    }
 },
 f.sourceType = [
   {"id":1,"type":"视频"},   
   {"id":2,"type":"音频"},   
   {"id":3,"type":"图书"},   
   {"id":4,"type":"题库"}   
 ],
  f.release = [
      {"id":1,"title":"全部"},
      {"id":2,"title":"已发布"},
      {"id":3,"title":"待审核"},
      {"id":4,"title":"未通过"}
    ],
 
   f.getUrlData=function(url,flag){
       url=courseware_root_url+url;
       return $http.get(url)
           .then(function(r) {
               return {"status":"ok","data":r.data};
           })
           .catch(function(err) {
               console.log('文件数据');
               return {"status":"ok","data":g_data[flag]}
           });
   }
   return f;
}]).run(['$http',function($http){
        //$http.post(accountQuery_root_url + "/accountQuery/getPhone",{});
    }])
    .controller('reConf',["$scope","$state",'getData',function($scope,$state,getData){
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
            "free_tye_name":null,     //收费  名称
            "file_name":null,        //上传名称
            "file_author":null,      //上传作者
            "file_press":null,       //上传出版社
            "file_ibsn":null,        //上传 IBSN
            "file_introduce":null,    //上传 推荐理由
            "file_explain":null,       //上传简介内容
            "file_price":null      //按节收费价格
        }
        $scope.gcss=['one','two','three',"four"];
        $scope.cmp = angular.copy($scope.cur_var);//复制模板
        $scope.cur_var = TOOL.getObject("cur_var"); //获取缓存中是数据
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
              var i = 0;
    $scope.setSourceType = function(id,name,ev){
        $scope.cmp.source_type_id = id;
        $scope.cmp.source_type_name  = name ;
        $scope.createType = 'sourcetype';
        if(id == null  || name == null){
            $('#mdModal').show();
            $("body").append('<div class="modal-backdrop fade in"></div>');
           
         }

         //移动端模拟双击事件
        i++;
        setTimeout(function () {
                 i = 0;
       }, 500);
        if (i > 1) {
                $scope.sId = $(ev.target).attr("id");  //获取当前的id
                $scope.gid = $(ev.target).siblings().attr("id"); // 获取删除的id
                $scope.NameId =  $(ev.target).parent().attr("id");// 获取父元素是id 判断 url
                $scope.SourceName = $(ev.target).html();
                $('#myModal').show();
                $("body").append('<div class="modal-backdrop fade in"></div>');
                 i = 0;
       }
    }
    //点击推荐对象
    $scope.setRecObject =function(id,name){
        $scope.cmp.rec_object_id = id;
        $scope.cmp.rec_object_name = name;
        $scope.createType = 'recobject';
        if(id == null  || name == null){
            $('#mdModal').show();
            $("body").append('<div class="modal-backdrop fade in"></div>');
           
         }
    }
    //点击书籍类型
    $scope.setBookType = function(id,name){
        $scope.cmp.book_type_id = id;
        $scope.cmp.book_type_name = name;
        if(id == null  || name == null){
            $('#mdModal').show();
            $("body").append('<div class="modal-backdrop fade in"></div>');
         }
    }

     //双击修改书籍类型
     $scope.insertSource = function(ev){
            $scope.sId = $(ev.target).attr("id");  //获取当前的id
            $scope.gid = $(ev.target).siblings().attr("id"); // 获取删除的id
            $scope.NameId =  $(ev.target).parent().attr("id");// 获取父元素是id 判断 url
            $scope.SourceName = $(ev.target).html();
            $('#myModal').show();
            $("body").append('<div class="modal-backdrop fade in"></div>');
  
        
    }
      // 添加类型 
      $scope.confirmInsert = function(){
        console.log($scope.createType)
        if( $scope.createType  == 'sourcetype' ){
          $scope.typeUrl = '/uploadType/addUploadType?uploadTypeName='+$scope.typeName;
        }else if($scope.createType  == 'recobject'){
          $scope.typeUrl = '/recommendedObject/addRecommendedObject?recommendedObjectName='+$scope.typeName;
        }else if($scope.createType  == 'booktype'){
            $scope.typeUrl = '/bookType/addBookType?bookTypeName='+$scope.typeName;
        }
        getData.getUrlData($scope.typeUrl).then(function (res){
              $("#mdModal").hide();
              $('.modal-backdrop').remove();
              location.reload();
        });
    }
    
  //点击修改模态框
  $scope.updateSource = function(){
      $('#insertModal').show();
      $('#myModal').hide();
      $("#plInsert").attr("placeholder",$scope.SourceName);
  }
  //点击删除模态框
  $scope.modalDel = function(){
      $("#delModal").show();
      $("#myModal").hide();
  }
  //确定修改类型
  $scope.sourceInsert = function(){
      if( $scope.createType  == 'sourcetype' ){
          $scope.typeUrl = '/uploadType/updateUploadType?uploadTypeName='+$scope.insertName;
        }else if($scope.createType  == 'recobject'){
          $scope.typeUrl = '/recommendedObject/updateRecommendedObject?recommendedObjectName='+$scope.insertName;
        }else if($scope.createType  == 'booktype'){
            $scope.typeUrl = '/bookType/updateBookType?bookTypeName='+$scope.insertName;
        }

        getData.getUrlData($scope.typeUrl).then(function (res){
           $('#insertModal').hide();
           $('.modal-backdrop').remove();
           location.reload();
        });
  }

  //删除书籍类型
  $scope.sourceDel = function(){
      if( $scope.createType  == 'sourcetype' ){

          $scope.typeUrl = "/uploadType/delUploadType?id="+$scope.gid;
      }else if( $scope.createType  == 'recobject' ){
          $scope.typeUrl = "/recommendedObject/delRecommendedObject?id="+$scope.gid;
       
      }else if( $scope.createType  == 'booktype' ){
          $scope.typeUrl = "/bookType/delBookType?id="+$scope.gid;
      }
        getData.getUrlData($scope.typeUrl).then(function (res){
             $("#delModal").hide();
              $('.modal-backdrop').remove();
              location.reload();
        });
     
  }

  //取消
  $scope.cancle = function(){
      $("#myModal").hide();
      $("#mdModal").hide();
      $('#insertModal').hide();
      $("#delModal").hide();
      $('.modal-backdrop').remove();
  }
    //点击发布模式
    $scope.show_free =1 ;
    $scope.setFree =function(id,name){
        $scope.cmp.free_type_id = id;
        $scope.cmp.free_type_name = name; 
        $scope.cur_var.free_type_name =  name; 
       
        $scope.showFree();
    }
    $scope.showFree = function(){
        if($scope.cur_var.free_type_name == "按节收费"){
            $(".chapter_t").css("display","block");
        }else{
            $(".chapter_t").css("display","none");
        } 
        if($scope.cur_var.free_type_name == "整套收费"){
            $(".chapter_free").css("display","block");
        }else{    
            $(".chapter_free").css("display","none");
        }
    }
    $scope.showFree();
    $scope.publishSubmit = function(){  
        if($scope.cmp.source_type_name == null || $scope.cmp.rec_object_name == null || $scope.cmp.book_type_name == null || $scope.cmp.free_type_name == null){
            layer.alert("请选择资源类型");
            return false;
        }
            TOOL.setObject("cur_var",$scope.cmp);     
            $state.go('editor');
    }
    }])