var app=angular.module("myRecharge", []);
app.controller('rechargeCtrl',function($scope,$http) {
	$.ajax({
		type:'get',
		url:luckilyListFacade_root_url + '/recharge/rechargeSource',
		contentType:"application/json; charset=UTF-8",
		dataType:"json",
		async: true,
		success: function(res) {
			$scope.rechargeList=res.msg;
			console.log(res.msg);
			// 自动加载刷新
			$scope.$apply();
		}
	});

	//随机产生getOrderId的字符串
	function getOrderId(){
		var getOrderId=new Date().getTime()+Math.random().toString(16).substr(2);
		console.log(getOrderId);
		return getOrderId;
	}

	$('.mons').change(function(){
		if($(this).prop("checked") == true) {
			alert(true);
		}else{
			alert(false);
		}
	});
	//支付余额
	var amountPrice=undefined;
	/*支付方式*/
	var payValue=undefined;
	$('.boxzhifu').change(function(){
		$(this).addClass('active');
		$('.weixin').removeClass('active');
		payValue=2;

	});
	$('.weixin').change(function(){
		$(this).addClass('active');
		$('.boxzhifu').removeClass('active');
		payValue=1;
	});
	$('.inputs').change(function(){
		if($(this).prop("checked") == true) {
			$(this).addClass("active");
			$('.recharge_Btn').show()
		}else{
			$(this).removeClass("active");
			$('.recharge_Btn').hide()
		}
	});
	$scope.recharge=function(amount_price){
		amountPrice=amount_price;
	};

	$scope.reCharge=function(){
		if(payValue==undefined){
			alert("请选择支付方式");
			return ;
		}else if(amountPrice==undefined){
			alert('请选择一个套餐进行充值');
			return ;
		}else{
			//进行积分充值"
			if(confirm("确认进行 "+amountPrice+"￥ 充值吗？")){
				window.location.href=luckilyListFacade_root_url + "/accountIntegralManagementFacade/addAccountIntegral?uid=20889&money="+amountPrice+"&payValue=2";
			}
			/*$http({
				method:"GET",
				url:luckilyListFacade_root_url + "/accountIntegralManagementFacade/addAccountIntegral?uid=20889&money="+amountPrice+"&payValue="+payValue+"",
				//data:JSON.stringify({'uid':20889,"money":amountPrice, "payValue":2}),
				//headers: { 'Content-Type': 'application/json; charset=UTF-8' },
				contentType:"application/json; charset=UTF-8",
				dataType:"JSON",
				async: true
			}).then(function(response) {
				if(response.data.status=='0'){
					alert(0123);
					//alert(response.data.statusMsg);
				}else{
					//alert(response.data.statusMsg);
				}
			}).catch(function(){
				console.log("加载超时");
			})	*/
		}
	}
});
//选择的边框颜色改变
$(document).on('click','.corolmains',function(){
	$('.corolmains').css("border-color",'#f0f0f0');
	$(this).css("border-color","#53dfa9");
})


