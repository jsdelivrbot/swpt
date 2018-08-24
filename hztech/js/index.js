var timeId=document.getElementById("hzhead-time");
function getTime(){
	var week=new Array('星期一','星期二','星期三','星期四','星期五','星期六','星期日');
	var time=new Date();
	var day=time.getDay();
	var hour=time.getHours(); 
	var minutes=time.getMinutes();
	var now_time=week[day-1]+' '+hour+':'+minutes;
	timeId.innerHTML=now_time;	
	setTimeout("getTime();",60000);
}
getTime();
var maxdiv=document.getElementById("maxdiv");
var fra=document.getElementById("iframeid");
var loadimg=document.getElementById("loadimg");
//new QWebChannel(qt.webChannelTransport, function(channel) {
//	window.bridge = channel.objects.closeWin;
//});
function goUrlFram(url){	
	maxdiv.style.display="block";
	fra.src=url;
}
function LaunchApp(){
	loadimg.src="img/load.gif";
	setTimeout(function(){
		loadimg.src="img/3DExperiment.png";
	},5000);
}
function goClose(){	
	maxdiv.style.display="none";
	fra.src='';
}
function btnColse(){
	var pwd=prompt("请输入退出密码：");	
	if(pwd){
		if(pwd===syspwd){
			window.opener=null;
			window.open('','_self');
			window.close();
		}else{
			alert("密码错误");
		}		
	}
}
document.onkeydown=function(event){
	var e = event || window.event || arguments.callee.caller.arguments[0];
	if(e && e.keyCode==27){
		if(maxdiv.style.display=="block"){
			goClose();
		}else{
			btnColse();
			return;
			if(confirm("确定要退出程序？")){							
				 if (navigator.userAgent.indexOf("MSIE") > 0) {
					  if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
					   window.opener = null;
					   window.close();
					  } else {
					   window.open('', '_top');
					   window.top.close();
					  }
				 }
				 else if (navigator.userAgent.indexOf("Firefox") > 0) {
				  	//window.location.href = 'about:blank ';
				  	window.close();
				 } else {
					  window.opener = null;
					  window.open('', '_self', '');
					  window.close();
				 }
			}
		}
	}
}