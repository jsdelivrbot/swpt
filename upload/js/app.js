//var search_root_url='http://192.168.0.251:20897';
//var g_data=[];
var app=angular.module('upfile',['swgetData','treeControl'])
    .filter('filesize',function(){
        return function(filelength){
            var html = '';
            var m=1024*1024;
            if(filelength>m){
                html=parseInt(filelength/m)+'M';
            }else if(filelength>1024){
                html=parseInt(filelength/1024)+'KB';
            }else{
                html=filelength+'B';
            }
            return html;
        }
    })
.controller("upfilectr",["$scope","getData","$compile",function ($scope,getData,$compile) {
    var load=$("#loading_dig");
    var array = ['upfile','newfolder','pdel','movefile','delfile','newfile'];
    /*$http.get().then( function successCallback(response) {
        
    } )*/
    $scope.displayHide=function (id) {
        var len = id.length;
        for(i=0;i<len;i++) {
            angular.element("#"+id[i]).css("visibility","visible")
        }
    }
    $scope.displayHide(array);
    /*$scope.items = [
        {title: '1', show: false, id: '22'},
        {title: '2', show: false, dataTarget: '#Modalmovefile'},
        {title: '3', show: false},
        {title: '4', show: false}
    ];
    $scope.displayHide = function (item) {
        var len = $scope.items.length;
        for (var i=0;i<len;i++) {
            $scope.items[i].show = true;
        }
    }
    $scope.displayHide($scope.items);*/
    var uid=20;
    var getuid=window.localStorage['user']?JSON.parse(window.localStorage['user']):null;
    if(getuid==null){
        window.location.href="../login2/index.html";
    }else{
        uid=getuid.id;
    }
    $scope.files=null;
    $scope.selectfile=false;
    $scope.filedir_id=0;
    $scope.dirfilename='';
    $scope.sw_ids=[];
    $scope.pid=0;
    $scope.cur_dir_id=0;
    $scope.cur_dir='';
    $scope.cur_nav=[{"id":0,"dirname":"根目录"}];
    $scope.all_dir=[];
    $scope.move_dir_list=[];
	$scope.fileId = 0; // 目录ID
    var type='public';
    var rid = 200;
    function GetQueryString(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }
    var url_type=GetQueryString("type");
    if(url_type !=null && url_type.toString().length>1)
    {
        type=url_type;
    }
    var url_id=GetQueryString("id");
    if(url_id !=null && url_id.toString().length>1)
    {
        rid=url_id;
    }
    var updata={"type":type,"rid":rid,"uId":uid,"folderId":$scope.cur_dir_id};
    $scope.setNav=function(id,dirname){
        var len=$scope.cur_nav.length;
        for(var i=0;i<len;i++){
            if(id==$scope.cur_nav[i].id){
                $scope.cur_nav.splice(i+1,len-i);
                return false;
            }
        }
        $scope.cur_nav.push({
            "id":id,
            "dirname":dirname
        });
    }
	// 点击目录排序
	$scope.getSort = function(e){
		$scope.searchValue = $('#searchInput').val();
		//console.log($scope.searchValue)
		$scope.sortId = e.target.id;
		if ( e.target.id !== 'option' ) {
			if ( e.target.className === 'arrowUp' ) $scope.sort = 1;
			else $scope.sort = 0;

			getData.getUrlData("/search/resourceOrderBy?rid="+rid+"&type="+type+"&uId="+uid+"&fileId="+$scope.fileId+"&sortId="+$scope.sortId+"&sort="+$scope.sort+"&term="+$scope.searchValue,"lenssons").then(function (res){
				if(res.data.status==0){
				   $scope.files=res.data.msg;
				}
			})
		}

		//$scope.setFileList($scope.fileId);
	}
    $scope.setFileList=function(id){
        updata.folderId=id;
        getData.getUrlData("/search/resource?rid="+rid+"&type="+type+"&uId="+uid+"&fileId="+id,"lenssons").then(function (res){
            if(res.data.status==0){
               $scope.files=res.data.msg;
            }
        })
    }
    $scope.setFileList(0);
    $scope.goFileList=function(id,isdir,fpath,pid,filename){
        $scope.sw_ids=[];
        if(!isdir){
            $scope.pid=pid;
            $scope.cur_dir_id=id;
            $scope.cur_dir=filename;
            $scope.setNav(id,filename);
            $scope.setFileList(id);
			$scope.fileId = id;
        }else{
            return false;
        }
    }
    //选择所有文件
    $scope.allFileSelect=function (c) {
        for(var i=0;i<$scope.files.length;i++){
            if(c===true){
                $scope.files[i].state=true;
            }else {
                $scope.files[i].state=false;
            }
        }
    }
    //创建目录
    $scope.createDir=function(){
        if($scope.dirfilename==''){
            alert('目录名不能为空');
            return false;
        }
        //load.show();
        getData.getUrlData("/resource/createFolder?rid="+rid+"&type="+type+"&uId="+uid+"&fileId="+$scope.cur_dir_id+"&folderName="+$scope.dirfilename,"dirfilename").then(function (res){
            if(res.data.status==0){
               // alert("目录添加成功");
                $scope.getAllDir();
                $scope.setFileList($scope.cur_dir_id);
            }else if(res.data.status==2) {
				alert("文件夹重复..");
			}
			else{
                alert("服务器出错，稍后再试...");
            }
           // load.hide();
            $('#myModal').modal('hide');
        })
    }
    $('#myModal').on('hide.bs.modal', function (e) {
        /*$scope.$apply(function () {
            $scope.dirfilename='';
        });*/
		$scope.dirfilename='';
    })
    //删除文件
    $scope.del=function(id){
        if(id<1){
            alert('删除文件出错');
            return false;
        }
        getData.getUrlData("/resource/delete?rid="+rid+"&type="+type+"&uId="+uid+"&fileIds="+id,"delfile").then(function (res){
            if(res.data.status==0){
                alert("删除成功");
                $scope.setFileList($scope.cur_dir_id);
            }
        })
    }
    //删除多文件
    var delfilenum=1;
    $scope.dels=function(){
        if(!confirm("确定要删除选择文档？"))return false;
        $scope.getSwIds();
        if($scope.sw_ids.length>0){
            getData.getUrlData("/resource/delete?rid="+rid+"&type="+type+"&uId="+uid+"&fileIds="+$scope.sw_ids.join(','),"delfile").then(function (res){
                if(res.data.status==0){
                    $scope.setFileList($scope.cur_dir_id);
                }else{
                    alert("删除出异常");
                }
            })
        }
        /*var num=$scope.sw_ids.length;

        for(var i=0;i<num;i++){
            getData.getUrlData("/resource/delete?rid="+rid+"&type="+type+"&uId="+uid+"&fileIds="+$scope.sw_ids[i],"delfile").then(function (res){
                delfilenum++;
                if(delfilenum==$scope.sw_ids.length){
                    delfilenum=1;
                    $scope.setFileList($scope.cur_dir_id);
                }
            })
        }*/
        //$scope.setFileList($scope.cur_dir_id);
    }
    //上传文件
    var uploader = new plupload.Uploader({
        runtimes : 'html5,flash,silverlight,html4',
        browse_button : 'upfile',
        url : search_root_url+'/resource/uploadFile',
        multipart_params : updata,
        flash_swf_url : 'part/plupload/js/Moxie.swf',
        silverlight_xap_url : 'part/plupload/js/Moxie.xap'
    });
    uploader.init();
    uploader.bind('FilesAdded',function(up,files){
        $("#upfile").button('loading');
        $("#upfile_progress").show();
        uploader.start();
    });
    uploader.bind('UploadProgress',function(up,files){
		$('.load-bar-inner').css('width',`${files.percent}%`);
        $('#counter').html(files.percent+'%');
    })
    uploader.bind('UploadComplete',function(up,file){
        $scope.setFileList($scope.cur_dir_id);
        $("#upfile_progress").hide();
        $("#upfile").button('reset');
    });
    $scope.setSwIds=function(id){
        for(var i=0;i<$scope.sw_ids.length;i++){
            if(id==$scope.sw_ids[i]){
                $scope.sw_ids.splice(i,1);
                return false;
            }
        }
        $scope.sw_ids.push(id);
    }
    $scope.setSwIdds=function(){

    }
    $scope.getSwIds=function () {
        $scope.sw_ids=[];
		$scope.sw_paths=[];
        for(var i=0;i<$scope.files.length;i++){
            if($scope.files[i].state===true){
                $scope.sw_ids.push($scope.files[i].id);
				$scope.sw_paths.push($scope.files[i].path);
            }
        }
    }
    $scope.move_dir_id=16;
    /*function pAllDir(arr,level){
        console.log(arr);
        console.log(level);
        var line='';
        for(var j=0;j<level;j++){
            line+='--';
        }
        for(var i=0;i<arr.length;i++){
            $scope.all_dir.push(
                {
                   "id":arr[i].id,
                    "dirname":line+arr[i].name
                }
            );
            if(arr[i].child.length>0)pAllDir(arr[i].child,level+1);
        }

    }*/
    function pAllDir(arr){
        for(var i=0;i<arr.length;i++){
            $scope.all_dir.push(
                {
                    "id":arr[i].id,
                    "dirname":arr[i].text
                }
            );
        }

    }

    $scope.getAllDir=function(){
        console.log('获取目录');
        getData.getUrlData("/search/getMenuFolder?rid="+rid+"&type="+type+"&uId="+uid,"alldir").then(function (rs){
            if(rs.data.status==0){
                $scope.all_dir=[];
                $scope.move_dir_id=rs.data.msg[0].id;
                pAllDir(rs.data.msg);
            }
        })
    }
    $scope.getAllDir();
    var movenum=1;
    $scope.subMoveFile=function () {
        var num=$scope.sw_ids.length;
        load.show();
        getData.getUrlData("/resource/moveFile?rid="+rid+"&type="+type+"&uId="+uid+"&objId="+$scope.sw_ids.join(',')+"&targetId="+$scope.selectedNode,"delfile").then(function (res){
            //movenum++;
            load.hide();
            if(res.data.status==0){
                //movenum=1;
                //alert("移动文件成功");
                $('#Modalmovefile').modal('hide');
                $scope.setFileList($scope.cur_dir_id);
            }else{
                alert("移动文件出错");
            }
        })
        /*for(var i=0;i<num;i++){
            if($scope.sw_ids[i]==$scope.move_dir_id)continue;
            getData.getUrlData("/resource/moveFile?rid="+rid+"&type="+type+"&uId="+uid+"&objId="+$scope.sw_ids[i]+"&targetId="+$scope.move_dir_id,"delfile").then(function (res){
               movenum++;
                if(movenum==num+1){
                    movenum=1;
                    load.hide();
                    $('#Modalmovefile').modal('hide');
                    $scope.setFileList($scope.cur_dir_id);
                }
            })
        }*/
    }
    $scope.setMoveFileID=function(id){

    }
    $scope.fileDownload=function(id){
        if(id<1){
            return false;
        }
        console.log(search_root_url);
        //window.open(search_root_url+"/resource/download?rid="+rid+"&type="+type+"&uId="+uid+"&fileId="+id);
		getData.getUrlData("/resource/download?rid="+rid+"&type="+type+"&uId="+uid+"&fileId="+id,"delfile").then(function (res){
                    var td=res.data;
                    if(td.status==0){
                        window.open(td.msg);
                    }else{
                        alert("警告："+td.statusMsg);
                    }
                    //$scope.setFileList($scope.cur_dir_id);
        })
    }

    $scope.isSectionChild = function(id){
        if($scope.tmp==null)return false;
        for(var _i=0;_i < $scope.tmp.section_child_ids.length;_i++){
            if(id==$scope.tmp.section_child_ids[_i].id){
                return true;
                break;
            }
        }
        return false;
    };
    var ue = UE.getEditor('container');
    $scope.subNewFile=function(){
        var html=ue.getContent();
        var filename=$('input[name="new_file_name"]').val();
        $('input[name="new_file_name"]').val('');
        if(filename==''){
            //filename=new Date().getTime();
			alert('文档名不能为空');
			return false;
        }
        var data={
            "type":type,
            "rid":rid,
            "uId":uid,
            "dir_id":$scope.cur_dir_id,
            "title":filename,
            "content":html
        }
        load.show();
        /*$.post("http://test.com/test.php",data,function(d){
            console.log(d);
        },"json");*/
        $.ajax({
            type: "POST",
            url: search_root_url+"/resource/createHtmlFolder",
            data:JSON.stringify(data),
            contentType:"application/json",
            dataType:"json",
            success: function(msg){
                if(msg.status==0){
                    ue.setContent("");
                    load.hide();
                    //alert("创建文档成功");
                    $('#Modalnewfile').modal('hide');
                    $scope.setFileList($scope.cur_dir_id);
                }else{
                    load.hide();
                    alert("创建文档失败");
                }

            },
            error:function (err) {
               load.hide();
               alert("保存失败");
            }
        });
    }
    $scope.closeNewFile=function () {
        $('#Modalnewfile').modal('hide');
    }
    $('#Modalnewfile').on('hide.bs.modal', function (e) {
        ue.setContent("");
        $('input[name="new_file_name"]').val('');
    })
    $('#Modalmovefile').on('show.bs.modal', function (e) {
        $scope.sw_ids=[];
        for(var i=0;i<$scope.files.length;i++){
            if($scope.files[i].state===true){
                $scope.sw_ids.push($scope.files[i].id);
            }
        }
        if($scope.sw_ids.length<1){
            alert("没有选择移动文件");
            return false;
        }
        $scope.$apply(function () {
            var falg=true;
            $scope.move_dir_list=[];
            for(var i=0;i<$scope.all_dir.length;i++){
                if($.inArray($scope.all_dir[i].id,$scope.sw_ids)==-1 && $scope.all_dir[i].id!=$scope.cur_dir_id){
                    if(falg){
						$scope.move_dir_id=$scope.all_dir[i].id;
						falg=false;
					}
                    $scope.move_dir_list.push($scope.all_dir[i]);
                }
            }
        });

    })
    //回收站
    $scope.delfiles=[];
    $scope.delallselect=false;

    $scope.getDelFileAll=function(){
        $scope.$applyAsync(function (){
                getData.getUrlData("/resource/getISDelResourceFile?uId="+uid,"delfile").then(function (res){
                    var td=res.data;
                    if(td.status==0){
                        $scope.delfiles=td.msg;
                    }else{
                        $scope.delfiles=[];
                    }
                    $scope.setFileList($scope.cur_dir_id);
                })
        });
    }
    $('#Modaldelfile').on('show.bs.modal', function (e){
        $scope.getDelFileAll();
    })
    $scope.delFileDo=function (flag) {
        var ids=[];
        for(var i=0;i<$scope.delfiles.length;i++){
            if($scope.delfiles[i].isDel.state==true){
              ids.push($scope.delfiles[i].isDel.id);
            }
        }
        if(ids.length>0){
            load.show();
            var idstr=ids.join(',');
            if(flag=='del'){
                if(!confirm("确定要删除选择文档？"))return false;
                getData.getUrlData("/resource/getDelFolder?id="+idstr,"redelfile").then(function (res){
                    if(res.data.status==0){
                        //alert('删除文件成功');
                        $scope.getDelFileAll();
                    }else{
                        alert("删除失败");
                    }
                    load.hide();
                })
            }else if(flag=='recovery'){
                if(!confirm("确定要恢复选择文档？"))return false;
                getData.getUrlData("/resource/getUpdateIsDelFolder?id="+idstr+"&uId"+uid,"updatedelfile").then(function (res){
                    if(res.data.status==0){
                        //alert('恢复文件成功');
                        $scope.getDelFileAll();
                    }else{
                        alert("恢复文件失败");
                    }
                    load.hide();
                })
            }
        }
    }

    $scope.allDelSelect=function (c) {
        for(var i=0;i<$scope.delfiles.length;i++){
            if(c===true){
                $scope.delfiles[i].isDel.state=true;
            }else {
                $scope.delfiles[i].isDel.state=false;
            }
        }
    }
    //分享
    $scope.modalSharFile=function(id){
        $('#Modalsharfile').modal('show');
    }
    //重命名
    $scope.modalRenameFile=function(id,name){
        /*if(id<1||id==undefined){
            alert('数据有误，稍后再操作..');
            return false;
        }*/
        $('.re_oldfilename').html(name);
        $('.re_oldfilenameid').val(id);
        $('.re_newfilename').val('');
        $('#Modalrenamefile').modal('show');
    }
    $scope.subReNameFile=function () {
        var fid=$('.re_oldfilenameid').val();
        var newname=$('.re_newfilename').val();
        $('.re_newfilename').val('');
        if(fid<1 || newname==''){
            alert('文件名没有写或操作有误');
            return false;
        }
        load.show();
        $.ajax({
            type: "POST",
            url: search_root_url+"/resource/getRepeartFolderName",
            data:JSON.stringify({"id":fid,"name":newname,"uId":uid}),
            contentType:"application/json",
            dataType:"json",
            success: function(msg){
                load.hide();
                if(msg.status==0){
                    //alert("重命名文档成功");
                    $('#Modalrenamefile').modal('hide');
                    $scope.getAllDir();
                    $scope.setFileList($scope.cur_dir_id);
                }else{
                    alert("重命名文档失败");
                }
            },
            error:function (err) {
                load.hide();
                alert("重命名文档失败");
                //$('#Modalrenamefile').modal('hide');
            }
        });
        /*getData.getUrlData("/resource/getRepeartFolderName?rid="+rid+"&type="+type+"&uId="+uid+"&dids="+idstr,"rename").then(function (res){
            alert('恢复文件成功');
            load.hide();
        })*/
    }




		$scope.treeOptions = {
			nodeChildren: "children",
			dirSelectable: true,
			injectClasses: {
				ul: "a1",
				li: "a2",
				liSelected: "a7",
				iExpanded: "a3",
				iCollapsed: "a4",
				iLeaf: "a5",
				label: "a6",
				labelSelected: "a8"
			},
			isSelectable: function(node) {
				//console.log(node)
				if ( $scope.sw_ids.length > 1 ) {
					for ( var i = 0; i < $scope.sw_ids.length; i++ ) {
						return node.path.indexOf($scope.sw_paths[0]) !== 0;
					}
				} else return node.path.indexOf($scope.sw_paths[0]) !== 0;

			}
		}

		$scope.getAllFolder=function(){
        console.log('获取目录');
        getData.getUrlData("/search/getFolderList?rid="+rid+"&type="+type+"&uId="+uid,"alldir").then(function (rs){
				$scope.getSwIds();
				if(rs.data.status==0){
					$scope.dataForTheTree = rs.data.msg;
				}
			})
		}

		$scope.showSelected = function(node) {
			 $scope.selectedNode = node.id;
		};

		$("#zySearch").zySearch({
			"width":"355",
			"height":"33",
			"parentClass":"pageTitle",
			"callback":function(keyword){
				console.info("搜索的关键字:"+keyword);
				if (typeof($scope.sortId) == "undefined"){
					var sortId = 'create_time';
				}else{
					var sortId = $scope.sortId;
				}
				if (typeof($scope.sort) == "undefined"){
					var sort = 1;
				}else{
					var sort = $scope.sort;
				}
				getData.getUrlData("/search/resourceOrderBy?rid="+rid+"&type="+type+"&uId="+uid+"&fileId="+$scope.fileId+"&sortId="+sortId+"&sort="+sort+"&term="+keyword,"alldir").then(function (rs){
					if(rs.data.status==0){
						$scope.files=rs.data.msg;
					}else{
						alert(rs.data.statusMsg);
					}
				})
			}
		});



}]);