var app=angular.module('gzsw',[
	"ngRoute",
	"swgetData"
])
.config(["$routeProvider",function($routeProvider){
	$routeProvider.when('/index',{
		templateUrl:"./tpl/index.html",
        controller:"homeStr"
	}).otherwise({
			redirectTo:"/index"
	});
}]).controller('homeStr',["$scope","$http","getData",function($scope,$http,getData){
    var getuid=window.localStorage['user']?JSON.parse(window.localStorage['user']):null;
    var tmp_root_url=company_root_url;
	if(getuid==null){
		//window.location.href="../login/login.html";
	}
	$scope.status='show';
	$scope.lists=null;
	$scope.setCompany=function(my,id){
		var btn_text=angular.element(my).html();
		if(btn_text=='编辑'){
            angular.element(my).html('保存');
            $('#company_sub_'+id+' input').addClass('edit');
            $('#company_sub_'+id+' textarea').addClass('edit');
		}else{
			if(!confirm("确定要更改公司信息吗?"))return false;
            angular.element(my).html('编辑');
            $('#company_sub_'+id+' input').removeClass('edit');
            $('#company_sub_'+id+' textarea').removeClass('edit');
            var frm=document.getElementById('company_sub_'+id);
            //console.log('#company_sub_'+id)
            var subdata={
            	"id":id,
                "industryId":1,
            	"companyName":frm.companyName.value,
            	"companyType":frm.companyType.value,
            	"legalRepresentative":frm.legalRepresentative.value,
            	"registeredCapital":frm.registeredCapital.value,
            	"startDate":frm.startDate.value,
            	"companyAddress":frm.companyAddress.value,
            	"operatingPeriodStart":frm.operatingPeriodStart.value,
            	"operatingPeriodEnd":frm.operatingPeriodEnd.value,
            	"businessScope":frm.businessScope.value,
            	"registrationAuthority":frm.registrationAuthority.value,
            	"registrationStatus":frm.registrationStatus.value
			}
            $.ajax({
                type: "POST",
                url: tmp_root_url+"/companyRegiserService/updateCompany",
                data:JSON.stringify(subdata),
                contentType:"application/json",
                async: false,
                success: function (data) {
                    alert(data.msg);
                    if(data.status==0){

                        //location.reload();
                        //getTreedata(data);
                    }
                    //g.deleteSelectedRow();
                    // getMembersRoleGird_02(posId);
                }
            })
		}
		/*if($scope.status=='show'){
            $scope.status='edit';
            $('input').addClass('edit');
		}else{
            $scope.status='show';
            $('input').removeClass('edit');
		}*/
	}

	//获取企业信息
	$.ajax({
		type: "GET",
		url: tmp_root_url+"/companyRegiserService/selectByApplicant?applicant="+getuid.username,
		contentType:"application/json",
		async: false,
		success: function (data) {
			//alert(data.statusMsg);
			if(data.status==0){
                $scope.lists=data.msg;
                console.log($scope.lists)
				//getTreedata(data);
			}else{
                alert(data.statusMsg);
			}
			//g.deleteSelectedRow();
			// getMembersRoleGird_02(posId);
		}
	})

		$scope.setCurCompany=function(id){
			if(id==''||id<1){
				return false;
			}
            $.ajax({
                type: "GET",
                url: tmp_root_url+"/companyRegiserService/updateIsDefaultByCompanyId",
                data:"applicant="+getuid.username+"&id="+id,
                contentType:"application/json",
                async: false,
                success: function (data) {
                    alert(data.statusMsg);
                    if(data.status==0){
                        getuid.defineCompanyId=id;
                        window.localStorage['user']=JSON.stringify(getuid);
                        window.location.href='/';
                        //location.reload();
                        //getTreedata(data);
                    }
                    //g.deleteSelectedRow();
                    // getMembersRoleGird_02(posId);
                }
            })
		}
	$scope.toExamine=function(id){
        //提交审核企业信息
		var subdata={
                "companyId":id,
                "approver": getuid.username,
                "approvalStatus":100,
                "remark":"通过"
            };
        $.ajax({
            type: "POST",
            url: company_root_url + "/companyRegiserService/approvalCompany",
            data:JSON.stringify(subdata),
            contentType:"application/json",
            async: false,
            success: function (data) {
                alert(data.statusMsg);
                if(data.status==0){
                    location.reload();
                    //getTreedata(data);
                }
                //g.deleteSelectedRow();
                // getMembersRoleGird_02(posId);
            }
        })
	}

}]).run(['$http',function($http){
        //$http.post(accountQuery_root_url    + "/accountQuery/getPhone",{});
}]);
