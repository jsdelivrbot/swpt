/*var bk=angular.module('lecture',[]);
bk.controller("lectureCtr",["$scope","$rootScope","getData","$http","$routeParams","$compile",function ($scope,$rootScope,getData,$http,$routeParams,$compile) {
  $scope.openFile = function(data){
	   var fileName = data[0].name;
        var dot = fileName.lastIndexOf(".")+1;
        var fileExt = fileName.substring(dot,fileName.length);//找到文件类型
        if(!fileName){
            alert("未选择文件!");
        }else if(fileExt != "zip"){
            alert("选择文件格式不正确")
        }else{
            var formData = new FormData($( "#upload_form" )[0]);
            console.log(formData)
			$.ajax({
			url:'http://192.168.0.251:21002/prepare/open',
			type:'POST',
			data:formData,
			async:true,
			cache:false,
			contentType:false,
			processData: false, 
			success:function(data){

			var html = "";
            var huabu = data.msg.bk_huabu;
            //遍历数据中的画布
            for (var i = 0; i < huabu.length; i++) {
                var box = huabu[i];
                html +=box;
            }

            $(html).appendTo(".viewer_wrap"); //将遍历好的所有画布添加到画布包中

            $(".viewer_wrap div:first-child").addClass("current").siblings().removeClass("current"); //默认显示第一个画布

            $(".teath_a").html(getUrlParam("userId")+"老师"); //讲课老师

            $(".lesson_b").html(data.msg.title); //讲课标题

            $("#page_count").html(huabu.length); //讲课画布长度

            $(".box").css("user-select","text"); //改变画布中组件css属性
			},
			error:function(data){
				
                  alert("未链接服务器");
			}
		})
	}

}

})
*/
// 全屏模式
//var touchable = 'createTouch' in document;  //判断是否支持移动端
function fullScreen(el) {
	var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen,
		wscript;

	if(typeof rfs != "undefined" && rfs) {
		rfs.call(el);
		return;
	}

	if(typeof window.ActiveXObject != "undefined") {
		wscript = new ActiveXObject("WScript.Shell");
		if(wscript) {
			wscript.SendKeys("{F11}");
		}
	}
}

function exitFullScreen(el) {
	var el = window.parent.document,
		cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen,
		wscript;
	if(typeof cfs != "undefined" && cfs) {
		cfs.call(el);
		return;
	}

	if(typeof window.ActiveXObject != "undefined") {
		wscript = new ActiveXObject("WScript.Shell");
		if(wscript != null) {
			wscript.SendKeys("{F11}");
		}
	}
}

//一开始进入执行
var filrUrl=window.location.search;



console.log(filrUrl.split("?")[1])
var ppt;
$.ajax({
	type: "get",
	dataType: "json",
	async: false,
	url:prepareLesson_root_url+"/prepareLesson/gethtml?fileUrl="+filrUrl,
	success: function(res) {
		ppt = res;
		console.log(res)
		initBegin(); //页面一开始进入

		//给最大的盒子增加事件监听
		function slid() {
			var nowpage = 0;
			$(".ppt_cont").swipe({

				swipe: function(event, direction, distance, duration, fingerCount) {
					if(direction == "up") {
						nowpage = nowpage + 1;
						if($('#painter').is(":visible")) {
							saveCut();
						}

					} else if(direction == "down") {
						nowpage = nowpage - 1;
					}

					if(nowpage > ppt.length) {
						nowpage = ppt.length;
					}

					if(nowpage < 0) {
						nowpage = 0;
					}

					$(".ppt_cont").animate({
						"top": nowpage * -100 + "%"
					}, 400);

					$(".page").eq(nowpage).addClass("cur").siblings().removeClass("cur");
				}
			});
		}
		slid(); //执行上下滑动事件

	}
})
//	课堂一进来
function initBegin() {
	var r;
	for(var a = 0; a < ppt.length; a++) {

		if(a == 0) {
			r += "<li class='page page" + a + " cur'>"+ppt[a]+"</li>"
		} else {
			r += "<li class='page page" + a + "'>"+ppt[a]+"</li>"
		}
	}
	r = r.replace(/^undefined/, ''); //删除某字符串
	var pptCont = "<div id='ppt'><ul class='ppt_cont ' id='target'>" + r + "</ul></div>";
//	var sumUps = "<li class=' page page" + (ppt.length) + " is_sumUp'><h3>课堂小结</h3><div class='wrap'><ul class='menu'></ul></div></li>";
	$('.show_cont').html(pptCont);
//	$('.ppt_cont').append(sumUps);
	sumCont();

	function sumCont() {
		for(var a = 2; a < ppt.length - 1; a++) {
			var tem;
			tem = ppt[a];
//			for(var b = 0; b < ppt[a].length; b++) {}
			upList = "<li><span>+</span><h4>" + ppt[a] + "</h4><ul class='child_ul ishide'><li><p>" + ppt[a] + "</p><img src=''/></li></ul></li>";

			$('.menu').append(upList);

		}
		$(".wrap>ul>li").click(function() {
			var next = $(this).children(".child_ul");
			var icon = $(this).children("span");
			icon.html("-");
			next.slideToggle('fast');
			$('.child_ul').not(next).slideUp('fast'); //不是当前点击的内容全部向上收起
			$('.wrap>ul>li').children("span").not(icon).html("+");
			return false;

		})
	}

}


//	ppt内容屏幕放大缩小 
function drgeLe(ell) {
	var oDiv = ell;
	var oParent = ell.parent();
	//初始化鼠标点击位置
	var disX = 0;
	var disY = 0;
	document.addEventListener('touchstart', candown);
	document.addEventListener('mousedown', candown);

	function candown(ev) {
		var oEvent = ev || event; //兼容ie火狐事件对象

		disX = oEvent.clientX - oDiv.offset().left; //获取鼠标点击位置
		disY = oEvent.clientY - oDiv.offset().top;
		
		document.addEventListener('touchmove', canmove);
		document.addEventListener('mousemove', canmove);
		document.addEventListener('touchend', canseup);
		document.addEventListener('mouseup', canseup);

		function canmove(ev) {
			var oEvent = ev || event;
			//定位div位置
			var l = oEvent.clientX - disX;
			var t = oEvent.clientY - disY;
			//控制div不超出可视窗口范围
			if(l < 0) {
				l = 0;
			} else if(l > oParent.width() - oDiv.width()) {

				l = oParent.width() - oDiv.width();
			}
			if(t < 0) {
				t = 0;
			} else if(t > oParent.height() - oDiv.height()) {

				t = oParent.height() - oDiv.height();
			}
			//css对div定位
			oDiv.css({
				'left': l + 'px'
			})
			oDiv.css({
				'top': t + 'px'
			})

		}

		function canseup() {
			document.removeEventListener('mousemove', canmove)
			document.removeEventListener('touchmove', canmove)
		}
		return false; //解决低版本火狐拖拽空div时的bug
	}
}
var kgImg=[];
var xfun=function(){return};
$('.is_maxGlass>p').click(function(event) {
	event.stopPropagation();
	var _this=$(this);
	var div = $('.ppt_cont .page');
	
	if(_this.index() == 0) {
		
		$('#painter').hide()
		var ii=$(div[lo]).width();
		var jj=$(div[lo]).height();
		console.log($(div[lo]).find("div *"));
        if($("#the-canvas").length>0){
            onPdfadd();
            return;
        }
		$(div[lo]).find('*').animate({
			fontSize:'+=2px',
			width:'+=20px'
		})
//			$(div[lo]).find('div').css({'transform':'scale(1.1)','width':$(div[lo]).width(),'height':$(div[lo]).height()})
			xfun=function(){
				var xDiv=$(".ppt_cont .page:eq("+lo+")>div");
				xDiv.mousedown(				
				function(event) {
					var isMove = true;
					var abs_x = event.pageX - xDiv.offset().left;
					var abs_y = event.pageY - xDiv.offset().top;
					$(document).mousemove(function(event) {
						if(isMove) {
							var obj = xDiv;
							obj.css({
								'left': event.pageX - abs_x,
								'top': event.pageY - abs_y
							});
						}
					}).mouseup(
						function() {
							isMove = false;
						}
					);
				}
			);
				
			}

//				var ii=$(div[lo]).width();
//				var jj=$(div[lo]).height();
//				
//				kgImg.push({'ii':ii,"jj":jj});

	} else {	
		console.log("缩小")
//		$(div[lo]).find('div').css('transform',"scale(0.9)")
        if($("#the-canvas").length>0){
            onPdfdec();
            return;
        }
		$(div[lo]).find('*').animate({
			fontSize:'-=2px',
			width:'-=20px'
		})
		}
})
	

var cav = $('#painter')[0];
console.log(cav);
//每次点击清除画布
function clearCanvas() {
	var cav2D = $('#painter').get(0).getContext("2d");
	cav2D.clearRect(0, 0, cav.width, cav.height);
} 
function IsPC() {//判断是pc还是移动端
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

	 cav.setAttribute('width', Math.floor($("#painter").width())); //设置宽
    cav.setAttribute('height', Math.floor($("#painter").height()));
    window.addEventListener("resize", function () {
       cav.setAttribute('width', Math.floor($("#painter").width())); //设置宽高
	      cav.setAttribute('height', Math.floor($("#painter").height()));
    }, false);

  
	
//计时器、、
times();

function lessonP(s) {
	return s < 10 ? "0" + s : s; //时间截取两位
}
var mytime;
var lessonTime = $('.time_a').find('span'); //分钟
var scoend1 = $('.page_a').find('span').eq(0);
var scoend2 = $('.page_a').find('span').eq(1); //页数
function times() {
	var timer = 0;
	var hour = 0;
	var minute = 0;
	var second = 0;
	clearInterval(mytime) //用定时器先轻定时器
	mytime = setInterval(function() {
		timer += 1;
		hour = Math.floor(timer / 3600);
		minute = Math.floor(timer / 60);
		second = Math.floor(timer % 60);
		if(minute >= 60) {
			hour += 1;
			minute = minute % 60;
		}
		lessonTime.html(lessonP(minute) + ":" + lessonP(second));
	}, 1000)
}

/*var funL = function() {
	$('.fc_riDown li:eq(0) a img').attr({
		"src": "images/shangy2.png"
	});
	$('.fc_leDown li:eq(1) a img').attr({
		"src": "images/icon_xiaoxi_s.png"
	});
	$('.fc_leDown li:eq(2) a img').attr({
		"src": "images/icon_dagang_s.png"
	});
	$('.fc_riDown ri:eq(1) a img').attr({
		"src": "images/xiaye-1.png"
	});
}
var imgfunL = [
	'images/icon_shangye.png',
	'images/icon_xiaoxi.png',
	'images/icon_dagang.png',
	'images/icon_xiaye.png'
]
*/
	var hegTop=function(){  //底部锁进
		if($('#main').hasClass("topUp")){
			 $('#main').removeClass("topUp");
			 console.log("移除")
		}else{
			 $('#main').addClass("topUp");
			 console.log("加")
		} 
	}
	
	$('.fc_riDown li').click(function() {
		$('.isol_center_slider ul').html("");
		var t = $(this).index();    
		if(t==0){
			$(this).addClass("fn_pagePre").siblings().removeClass("fn_pageNext");
			if(boxPage > 0) {
				boxPage--;
				$("#page_num").html(boxPage+1);
				
				$('video').trigger('pause');
			} else {
				alert("已经是第一张")
			}
			
			$(".viewer").eq(boxPage).addClass("current").siblings().removeClass("current");
		}else if(t==2){
				$(this).addClass("fn_pageNext").siblings().removeClass("fn_pagePre");
			if(boxPage < $(".viewer").length-1) {
				boxPage++;
				$("#page_num").html(boxPage+1);
				$('video').trigger('pause');
			} else {
				alert("已经是最后一张")
			}
			
			$(".viewer").eq(boxPage).addClass("current").siblings().removeClass("current");
		}
		
	/*	if(t == 1 || t==2) {
				$('#painter').show();
			$('#is_huabi').show();
			hegTop()
			//openFile();
		}else if(t== 2 || t==3){
			$('#painter').show();
			$('#is_huabi').show();
		}else if(t==4){
			
		}
	else if(t == 1) {
			hegTop();
			$('.chatBox').toggle().siblings().hide();;
			//	聊天框可拖动
			$('.chatBox').mousedown(
				function(event) {
					var isMove = true;
					var abs_x = event.pageX - $('div.chatBox').offset().left;
					var abs_y = event.pageY - $('div.chatBox').offset().top;
					$(document).mousemove(function(event) {
						if(isMove) {
							var obj = $('div.chatBox');
							obj.css({
								'left': event.pageX - abs_x,
								'top': event.pageY - abs_y
							});
						}
					}).mouseup(
						function() {
							isMove = false;
						}
					);
				}
			);
		} 
		else if(t == 2) {
			hegTop();
			initBegin();
			$.ajax({
				type: "get",
				dataType: "json",
				async: false,
				url: "js/lessoneList.json",
				success: function(res) {
					var lessonList = res.data;
					for(var a = 0; a < lessonList.length; a++) {
						var ls = "<li><img src='" + lessonList[a].img + "'/><p>" + lessonList[a].text + "</p></li>"
						$('.isol_center_slider ul').append(ls);
					}
					$('.isol_center_slider ul').append()
				}
			})
			//切换每一个课堂内容
			$('.isol_center_slider ul li').each(function(ind) {
				var flag = true;
				$(this).click(function() {
					lrTab(5, $('.isol_center_slider ul'), $('.isol_center_slider ul').find("li")) //切换每一个目标的内容
					var faLi = $(this).width();
					$(this).find('img').addClass('bor').siblings().removeClass('bor');
					var clss;
					$.ajax({
						type: "get",
						dataType: "json",
						async: false,
						url:"http://192.168.0.21:20891/prepareLesson/gethtml?fileUrl="+filrUrl,						
						success: function(res) {
							var classCont = res.ppt;
							for(var a = 0; a < classCont.length; a++) {
								console.log()
								if(a == 0) {
									clss += "<li style='width:" + faLi + "px' class='page page" + classCont[a] + " cur'><img src='" + classCont[a].img + "'/><p>" + classCont[a].smalltlt + "</p></li>"

								} else {
									clss += "<li style='width:" + faLi + "px' class='page page" + classCont[a] + "'><img src='" + classCont[a].img + "'/><p>" + classCont[a].smalltlt + "</p></li>"

								}
							}
						}
					})
					if(flag) {
						clss = clss.replace(/^undefined/, ''); //删除某字符串
						$(this).after("<li class='les_data'><ul style='width:" + faLi * ppt.length + "px'>" + clss + "</ul></li>");
						$(this).siblings().hide();
						$('.les_data').show();
						lrTab(4, $('.les_data ul'), $('.les_data ul').find("li")) //切换每一个目标的内容
						console.log("kai")
						//点击每一个单元的小缩略图
						llSmall();
						lrSlied() //左右切换
						flag = false;
					} else {
						flag = true;
						$('.les_data').remove();
						$(this).siblings().show();
						console.log("关")
					}

				})
			})

			$('.is_outline').toggle().siblings().hide();
		} */
		
		else {
			hegTop();
			$('#painter').hide();
		}
	
		
		/*funL();
		$('.fc_riDown li:eq(' + t + ')').find('img').attr({
			'src': imgfunL[t]
		});*/
	})
//点击每一个单元的小缩略图
function llSmall() {
	$('.les_data ul li').each(function() {
		$(this).click(function() {
			var ll = $(this).index();
			console.log(ll)
			$(".ppt_cont li img").attr({
				"src": ppt[ll].img
			});
			$(this).find('img').addClass('bor');
			$(this).siblings().find('img').removeClass('bor');
		})
	})
}
  
//	右边功能
var funR = function() {
		$('.fc_leDown li:eq(0) a img').attr({
		"src": "images/dakai-1.png"
	});
	$('.fc_leDown li:eq(1) a img').attr({
		"src": "images/bancha-2.png"
	});
	$('.fc_leDown li:eq(2) a img').attr({
		"src": "images/huabi-3.png"
	});
	$('.fc_leDown li:eq(3) a img').attr({
		"src": "images/fangda-4.png"
	});
		$('.fc_leDown li:eq(4) a img').attr({
		"src": "images/suofang-5.png"
		
	});
	$('.fc_leDown li:eq(5) a img').attr({
		"src": "images/jiangtang-6.png"
	});
}
var imgfunR = [
	'images/dakai-hover.png',
  'images/bancha-hover.png',
	'images/huabi-hover.png',
	'images/fangda-hover.png',
	'images/suofang-hover.png',
	'images/jiangtang-hover.png',
/*	'images/icon_shangye.png',
	'images/icon_xiaye.png'*/
]
var lo = 0; //当前大页下标
var loo=0;//小页的数据
var boxPage=0;

var w=0.1;
var h=0.2;
var t=10;
      //图片放大功能
	$(".fangda").click(function(){
		var width =parseInt($(".viewer_wrap .viewerImg img").width());
    var height = parseInt($(".viewer_wrap .viewerImg img").height());
	 $(".viewer_wrap .viewerImg img").width(width+t+"px")
	 $(".viewer_wrap .viewerImg img").height(height+t+"px")
		  })
	//图片缩小功能
	$(".suoxiao").click(function(){
				var width =parseInt($(".viewer_wrap .viewerImg img").width());
			  var height = parseInt($(".viewer_wrap .viewerImg img").height());
	 $(".viewer_wrap .viewerImg img").width((width-t)+"px")
	 $(".viewer_wrap .viewerImg img").height((height-t)+"px")
	})
//右侧小工具
$('.fc_leDown li').each(function() {
	$(this).click(function() {
	/*	$('#is_huabi').hide();
		$('#painter').hide();*/
		var t = $(this).index();
	 if(t == 1 || t==2) {  //橡皮擦或画笔
			$('#painter').show();
			$('#is_huabi').toggle();
		}
	 else if(t == 5){
				$('.lecture').toggle().siblings().hide();
		}

	/* else if(t == 4) { //上一页
			if(boxPage > 0) {
				boxPage--;
				$("#page_num").html(boxPage+1);
				$('video').trigger('pause');
			} else {
				alert("已经是第一张")
			}
			
			$(".viewer").eq(boxPage).addClass("current").siblings().removeClass("current");
		} else if(t == 5) { //下一页
			if(boxPage < $(".viewer").length-1) {
				boxPage++;
				$("#page_num").html(boxPage+1);
				$('video').trigger('pause');
			} else {
				alert("已经是最后一张")
			}
			
			$(".viewer").eq(boxPage).addClass("current").siblings().removeClass("current");
		}*/
		funR();
		$('.fc_leDown li:eq(' + t + ')').find('img').attr({
			'src': imgfunR[t]
		});
	})
})

//ppt模块
function outLineFn() {
	var op = 0;
	$(window).keyup(function(e) {
		clearCanvas();
		if(e.keyCode == 39) {
			op++;
			if(op < ppt.length) {
				$(".ppt_cont").animate({
					"top": op * -100 + "%"
				}, 400);
			} else {
				//				 $(".ppt_cont").animate({"top":op * -50 + "%"},400);
//				sumUp()

				function sumUp() {
					var sumUps = "<div class='is_sumUp'><h3>课堂小结</h3><div class='wrap'><ul class='menu'></ul></div></div>";
					$('.show_cont').html(sumUps);
					for(var a = 2; a < ppt.length - 1; a++) {
						console.log()
						var tem;
						for(var b = 0; b < ppt[a].smallImg.length; b++) {

							tem = ppt[a].smallImg[b].info;

						}
						console.log(tem);
						upList = "<li><span>+</span><h4>" + ppt[a].smalltlt + "</h4><ul class='child_ul ishide'><li><p>" + ppt[a].lip[0].lip + "</p><img src='" + tem + "'/></li></ul></li>";

						$('.menu').append(upList);

					}
					$(".wrap>ul>li").click(function() {
						var next = $(this).children(".child_ul");
						var icon = $(this).children("span");
						icon.html("-");
						next.slideToggle('fast');
						$('.child_ul').not(next).slideUp('fast'); //不是当前点击的内容全部向上收起
						$('.wrap>ul>li').children("span").not(icon).html("+");
						return false;

					})
				}

			}
		} else if(e.keyCode == 37) {
			op--;
			console.log(op)
			if(op >= 0) {
				$(".ppt_cont").animate({
					"top": op * -100 + "%"
				}, 400);
			}

		}
	})

}
//目标元素左右切换
function lrTab(vNum, iShow, iItems) {
	var tLen = 0;
	var vNum = vNum;
	var mNum = 1;
	var mTime = 500;
	var iShow = iShow;
	var iItems = iItems;
	var mLen = iItems.eq(0).width();
	var cLen = (iItems.length - vNum) * iItems.eq(0).width();
	$('.isol_le').click(function() {

		if(tLen > 0) {

			if(tLen > mLen) {

				iShow.animate({
					left: "+=" + mLen + "px"
				}, mTime);
				tLen -= mLen;
			} else {
				iShow.animate({
					left: "+=" + tLen + "px"
				}, mTime);
				tLen = 0;
			}
		}
	})
	$('.isol_ri').click(function() {

		if(tLen < cLen) {

			if((cLen - tLen) > mLen) {

				iShow.animate({
					left: "-=" + mLen + "px"
				}, mTime);
				tLen += mLen;
			} else {
				iShow.animate({
					left: "-=" + (cLen - tLen) + "px"
				}, mTime);
				tLen += (cLen - tLen);
			}
		}
	})
}

//手滑左右切换
function lrSlied() {
	var nowpage = 0;
	$(".les_data ul").swipe({

		swipe: function(event, direction, distance, duration, fingerCount) {
			if(direction == "left") {
				nowpage = nowpage + 1;

			} else if(direction == "right") {
				nowpage = nowpage - 1;
			}

			if(nowpage > ppt.length) {
				nowpage = ppt.length;
			}

			if(nowpage < 0) {
				nowpage = 0;
			}

			$(".les_data ul").animate({
				"left": nowpage * -100 + "%"
			}, 400);

			$(".page").eq(nowpage).addClass("cur").siblings().removeClass("cur");
		}
	});
}
lrSlied(); //执行上下滑动事件

//	切换缩略图功能
outLineFn();

//	点击li变色

/*var liCorolL = function() {

	$('.lecture ul li:eq(0) span img').attr({
		"src": "images/default/icon_zhibo.png"
	});
	$('.lecture ul li:eq(1) span img').attr({
		"src": "images/default/icon_luzhi.png"
	});
	$('.lecture ul li:eq(2) span img').attr({
		"src": "images/default/icon_jieping.png"
	});
	// $('.lecture ul li:eq(3) span img').attr({
	// 	"src": "images/default/icon_fangdajing.png"
	// });
	$('.lecture ul li:eq(3) span img').attr({
		"src": "images/default/icon_hudong.png"
	});
	$('.lecture ul li:eq(4) span img').attr({
		"src": "images/default/icon_dayi.png"
	});
	$('.lecture ul li:eq(5) span img').attr({
		"src": "images/icon_biji.png"
	});
	$('.lecture ul li:eq(6) span img').attr({
		"src": "images/icon_quanping.png"
	});
	$('.lecture ul li:eq(7) span img').attr({
		"src": "images/icon_suoping.png"
	})

	$('.lecture ul li:eq(8) span img').attr({
		"src": "images/default/icon_xiake.png"
	});

	$('.lecture ul li:eq(9) span img').attr({
		"src": "images/icon_fanhui.png"
	})

}
var imgcorolL = [
	'images/check/icon_zhibo.png',
	'images/check/icon_luzhi.png',
	'images/check/icon_jieping.png',
	// 'images/check/icon_fangdajing.png',
	'images/check/icon_hudong.png',
	'images/check/icon_dayi.png',
	'images/icon_biji.png',
	'images/icon_quanping.png',
	'images/check/icon_suoping.png',
	'images/check/icon_xiake.png',
	'images/icon_fanhui.png',
]*/

$('.lecture>ul>li').click(function(event) {
	  $(this).addClass()
	var _this = $(this).find('span').eq(1);

	if(_this.html() == '直播') { // 启动视频!
		$('.show_cont').html("<div class='palyScreen'><video id='myVideo' controls='' style='position: absolute;width:720px;height:405px;margin: 0 auto;'><source src='2.mp4' type='video/mp4'></video></div>")
	} else if(_this.html() == "录制") {
		$('.is_videoBox').toggle();
		$('.is_videoBox').parent().siblings().find('div').hide()
	} else if(_this.html() == "截屏") { // 截屏
		$('.is_screenCut').toggle();
		$('.is_screenCut').parent().siblings().find('div').hide()
		$('.is_screenCut p:eq(0)').click(function(event) { //截屏
			$('#footer').hide() //截屏时先隐藏大纲
		})

	} else if(_this.html() == "全屏") {
			$(".lecture").toggle();
			_this.html("还原");
			var s = $(".viewer_wrap")
		  fullScreen(window.parent.document.documentElement);//开启全屏
		  
		  $(window.parent.document).find("#sidebar").css("display","none");
		  $(window.parent.document).find(".lt").css("display","none");
		  //左边导航栏隐藏出现空白处理
		  var win_w=$(window.parent.document.documentElement).width();
       window.addEventListener("resize", function () {
       	 $(window.parent.document).find("#contentId").css("width",win_w);
    }, false);
	} else if(_this.html() == "还原") {
			$(".lecture").toggle();
		  _this.html("全屏");
		  exitFullScreen();
		 $(window.parent.document).find("#sidebar").css("display","block");
		 $(window.parent.document).find(".lt").css("display","block");
		 var win_w=$(window.parent.document.documentElement).width();
		 window.addEventListener("resize", function () {
        $(window.parent.document).find("#contentId").css("width",win_w-60);
    }, false);
	} else if(_this.html() == "锁屏") { // 启动锁屏
		$(".lecture").toggle()
		$(this).siblings().find('div').hide()
		$('.ifra').show();
		$('.ifra').html("<div id='slide-wrapper'><input type='hidden' value='' id='lockable'><div id='slider'><span id='label'></span><span id='lableTip'>Slide to unlock!</span></div></div>")
		var slider = new SliderUnlock("#slider", {}, function() {
			$('.ifra').hide();
		}, function() {
			$(".warn").text("index:" + slider.index + "， max:" + slider.max + ",lableIndex:" + slider.lableIndex + ",value:" + $("#lockable").val() + " date:" + new Date().getUTCDate());
		});
		slider.init();

	} else if(_this.html() == "放大镜") {
		$('.is_maxGlass').show()
		$('.is_maxGlass').parent().siblings().find('div').hide();
//		saveCut();
		//保存截图
		function saveCut() {
			event.preventDefault(); //html2Canvas方法
			html2canvas($(".ppt_cont li:eq(" + lo + ")>div "), {
				allowTaint: true,
				taintTest: true,
				onrendered: function(canvas) {
					canvas.id = "myCanvas";
					//生成base64图片数据
					var canvasUrl = canvas.toDataURL();
					var canvasImg = $(".ppt_cont li:eq(" + lo + ")");
					canvasImg.html("<div style='position: relative;margin:auto;display: flex;justify-content: center;'><img  src='"+canvasUrl+"' /></div>");																
					xfun();
				},
				
			})
		}
	
	} else if(_this.html() == "互动") {
		$(this).siblings().find('div').hide()
	} else if(_this.html() == "笔记") {
		$('.classNote').show()
	} else if(_this.html() == "下课") { //点击下课暂停
			$(".lecture").toggle()
		$(this).siblings().find('div').hide()
		$('.ifra').show(800).html("<div class='is_stop autoCom'><p class='is_stopa_a'>下课将会结束关闭该课程并保存课堂的课件，您确定下课吗？</p><p class='is_stopa_b clearfix'><span>确定</span><span>取消</span></p></div>");
		$('.is_stop p span:eq(0)').click(function() {
			$('.show_cont,.ifra').hide();
		})
	} else if(_this.html() == '返回') {
		//window.location = history.go(-1); //返回上一页
		window.location.href="../courseware/#!/beike";
	} else {
		$('.is_videoBox,.show_cont').hide()
	}
	//liCorolL();
	_this.parent().siblings().find('div').hide();
	$(this).find('a').addClass('bgwhite');
	$(this).siblings().find('a').removeClass('bgwhite');
	/*$('.ft_right ul li:eq(' + $(this).index() + ')').find('img').attr({
		'src': imgcorolL[$(this).index()]
	});*/

})
scaling()
 function scaling() {    //移动端放大缩小
	var divWidth = $(".ppt_cont .page").width();
	var isdrag = false;
	$('.ppt_cont .page').each(function() {
		var t = $(this);
		tFun(t);
	})

	function tFun(t) {
		t[0]["bei"] = 1;
		var stratBei;
		t[0].addEventListener("touchstart", startFn)
		t[0].addEventListener("mousedown", startFn)

		function startFn(e) {
		
			e = e || window.e;
			if(e.touches.length == 1) {
				if(t.find("div").width() > divWidth) {
					e.preventDefault();
					var etg = e.targetTouches || e.touches;
					var xx1 = etg[0].clientX; //手指X
					var yy1 = etg[0].clientY; //手指Y
					oW = xx1 - t.find("div").offset().left;
					oH = yy1 - t.find("div").offset().top;
					 $('.column')[0].addEventListener("touchmove", moveFnn)
					 $('.column')[0].addEventListener("mousemove", moveFnn)
					 $('.column')[0].addEventListener('touchend', upFnn);
					 $('.column')[0].addEventListener('mouseup', upFnn);
				}

			};
			e.preventDefault();
			var etg = e.targetTouches || e.touches;
			var x1 = etg[0].clientX; //手指X
			var y1 = etg[0].clientY; //手指Y
			var x2 = etg[1].clientX; //手指2X
			var y2 = etg[1].clientY; //手指2Y

			stratBei = Math.max(x1 - x2, y1 - y2);
			$('.column')[0].addEventListener("touchmove", moveFn)
			$('.column')[0].addEventListener("mousemove", moveFn)
			$('.column')[0].addEventListener('touchend', upFn);
			$('.column')[0].addEventListener('mouseup', upFn);
		}

		function moveFnn(e) {
			e = e || window.e;
			var etg = e.targetTouches || e.touches;
			var xx1 = etg[0].clientX; //手指X
			var yy1 = etg[0].clientY; //手指Y
			var oLeft = xx1 - oW;
			var oTop = yy1 - oH;
			t.find("div").css("left", oLeft + "px");
			t.find("div").css("top", oTop + "px");
		}

		function upFnn(e) {
			$('.column')[0].removeEventListener('touchmove', moveFnn);
			$('.column')[0].addEventListener("mousemove", moveFnn)
		}

		function moveFn(e) {
			e = e || window.e;
			var etg = e.targetTouches || e.touches;
			var x1 = etg[0].clientX; //手指X
			var y1 = etg[0].clientY; //手指Y
			var x2 = etg[1].clientX; //手指2X
			var y2 = etg[1].clientY; //手指2Y
			var moveBei = Math.max(x1 - x2, y1 - y2);
			var dh = (stratBei - moveBei) / divWidth;
			var bei = t[0]["bei"];
			var fbei = bei + (-dh);
			fbei = Math.max(Math.min(fbei, 2), 0);
			//	      	t.find("div").html(fbei);/*数字 想删就删*/
			//	        t[0]["be"]=fbei;
			t.find("div").css({
				transform: "scale(" + fbei + ")"
			});
			if(t.find("div").width() > divWidth) {
				isdrag = true;
				if(e.touches.length == 1) {
					// alert("拖动")
					var oLeft = x1 - oW;
					var oTop = y1 - oH;
					t.find("div").css("left", oLeft + "px");
					t.find("div").css("top", oTop + "px");
				}
			}
		}

		function upFn(e) {
			//			t[0]["bei"]=t[0]["be"];
			//			t.find("div").html(t.attr("be"));
			w.removeEventListener('touchmove', moveFn);
			w.addEventListener("mousemove", moveFn)
		}
	}
	
}
//移动端画线部分
var penWeight = 5;
var penColor = '#FF0000';
var btn = document.getElementsByTagName('huabi_c');
setBtnColor(); //初始化按钮颜色
var isEraser = false; //是否正在使用橡皮擦
var lock = false; //鼠标移动前，判断鼠标是否按下
var canvas = document.getElementById('painter');
var bbox = canvas.getBoundingClientRect();
var cvs = canvas.getContext('2d');

$('#main')[0].addEventListener('touchmove', function(event) {
//	$('#painter').show();
	var n=event.targetTouches.length;
	switch(n)
	{
	case 1:
	 brush();	
	  break;
	case 2:
	  break;
	default:
		eraser();
	}
	// if finger one touched 
	if (event.targetTouches.length == 1) { 
		event.preventDefault() ;
		brush();		
	}
	else if (event.targetTouches.length >=3) { 
		event.preventDefault() ;
		eraser();
	}
}, false);
	

$('.column')[0].addEventListener("mousedown", xiangPc);
function xiangPc(e) {
	// alert(e)
	e = e || window.e;
	e.preventDefault();
	brush();  //启用画笔		
}

function eraser() {  
//	alert("三根")
	var penWeight = 5;
	var btn = document.getElementsByTagName('huabi_c');
	var isEraser = false; //是否正在使用橡皮擦
	var lock = false; //鼠标移动前，判断鼠标是否按下
	var canvas = document.getElementById('painter');
	var cvs = canvas.getContext('2d');
	
	var t = this;
	canvas.addEventListener('touchstart', candown1);
	canvas.addEventListener('mousedown', candown1);

	function candown1(e) {
		e.stopPropagation();
		e = e || window.e;
		e.preventDefault();
		isEraser = true;
		var start_x1 = e.offsetX || e.touches[0].clientX+bbox.left*(canvas.width/bbox.width);
		var start_y1 = e.offsetY || e.touches[0].clientY+bbox.top*(canvas.height/bbox.height);
		
		cvs.clearRect(start_x1 - penWeight / 2, start_y1 - penWeight / 2, penWeight * 10, penWeight * 10);
		canvas.addEventListener('touchmove', canmove1);
		canvas.addEventListener('mousemove', canmove1);
		canvas.addEventListener('touchend', canseup1);
		canvas.addEventListener('mouseup', canseup1);
	}

	function canmove1(e) {
	
		var start_x1 = e.offsetX || e.touches[0].clientX+bbox.left*(canvas.width/bbox.width) ; //鼠标在画布上的x坐标，以画布左上角为起点
		var start_y1 = e.offsetY || e.touches[0].clientYbbox.top*(canvas.height/bbox.height); //鼠标在画布上的y坐标，以画布左上角为起点 
		cvs.clearRect(start_x1 - penWeight / 2, start_y1 - penWeight / 2, penWeight * 10, penWeight * 10);
		e.preventDefault()
	}

	function canseup1(e) {
		lock = false;
		cvs.closePath(); //结束本次绘画
		canvas.removeEventListener('mousemove', canmove1)
		canvas.removeEventListener('touchmove', canmove1)
		e.preventDefault();
	}
}
function brush() {    //画画
//	alert("一根")
	var t = this;
	canvas.addEventListener('touchstart', candown);
	canvas.addEventListener('mousedown', candown);
	function candown(e) {
		e = e || window.e;

		console.log(e)
		e.preventDefault();

		var start_x = e.offsetX || e.touches[0].clientX-bbox.left*(canvas.width/bbox.width); //鼠标在画布上的x坐标，以画布左上角为起点
	 var start_y = e.offsetY || e.touches[0].clientY-bbox.top*(canvas.height/bbox.height); //鼠标在画布上的y坐标，以画布左上角为起点
	  
		if(isEraser === false) {
			cvs.beginPath(); //开始本次绘画
			cvs.lineTo(start_x,start_y); //画笔起始点
			cvs.lineCap = 'round';
			cvs.lineJoin = "round";
			cvs.strokeStyle = penColor; //加载全局数据（画笔颜色）
			cvs.lineWidth = penWeight; //加载全局数据（画笔粗细）
			//cvs.lineTo(start_x, start_y);
			cvs.stroke(); //画一个点
		} else {
			cvs.clearRect(start_x - penWeight / 2, start_y - penWeight / 2, penWeight * 3, penWeight * 3);

		}
		canvas.addEventListener('touchmove', canmove);
		canvas.addEventListener('mousemove', canmove);
		canvas.addEventListener('touchend', canseup);
		canvas.addEventListener('mouseup', canseup);
	}

	function canmove(e) {

		console.log(e)

		var bbox = canvas.getBoundingClientRect();
		var move_x = e.offsetX || e.touches[0].clientX-bbox.left*(canvas.width/bbox.width); //鼠标在画布上的x坐标，以画布左上角为起点

		var move_y = e.offsetY || e.touches[0].clientY-bbox.top*(canvas.height/bbox.height); //鼠标在画布上的y坐标，以画布左上角为起点
	
		if(isEraser === false) {
			cvs.lineTo(move_x, move_y);
			cvs.stroke(); //渲染
			//console.log(isEraser)
		} else {
			cvs.clearRect(move_x - penWeight / 2, move_y - penWeight / 2, penWeight * 3, penWeight * 3);
			//console.log(isEraser)
		}

	}
	function canseup() {
		lock = false;
		cvs.closePath(); //结束本次绘画
		canvas.removeEventListener('mousemove', canmove)
		canvas.removeEventListener('touchmove', canmove)
	}
}

var btn_eraser = document.getElementById('eraser');
var btn_huaH = document.getElementById('huaH');
btn_eraser.onclick = function() {
	isEraser = true;
}
btn_huaH.onclick = function(e) {
	isEraser = false;
}


//随机生成按钮颜色
function setBtnColor() {
	for(var i = 0; i < btn.length; i++) {
		var random_number = Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase();
		var random_color = "#" + "000000".substring(0, 6 - random_number) + random_number;

		if(random_color == document.body.style.backgroundColor) {
			i -= 1;
			continue;
		}

		btn[i].style.backgroundColor = random_color;
	}
}

var lineDiv = document.getElementById('lineDiv'); //长线条
var minDiv = document.getElementById('minDiv'); //小方块
var vals = document.getElementById("vals");

minDiv.onselectstart = function() {
	return false;
}
vals.onselectstart = function() {
	return false;
}

var ifBool = false; //判断鼠标是否按下
//事件
var start = function(e) {
	e.stopPropagation();
	ifBool = true;
			//console.log("鼠标按下")
}
var move = function(e) {
			//	console.log("鼠标拖动")
	if(ifBool) {
		
		if(!e.touches) { //兼容移动端
			var x = e.clientX;
		} else { //兼容PC端
			var x = e.touches[0].pageX;
		}
		var lineDiv_left = getPosition(lineDiv).left; //长线条的横坐标
		var minDiv_left = x - lineDiv_left; //小方块相对于父元素（长线条）的left值 
		if(minDiv_left >= lineDiv.offsetWidth - 15) {
			minDiv_left = lineDiv.offsetWidth - 15;
		}
		if(minDiv_left < 0) {
			minDiv_left = 0;
		}
		//设置拖动后小方块的left值
		minDiv.style.left = minDiv_left + "px";
		var pen_weight_num = parseInt((minDiv_left / (lineDiv.offsetWidth - 15)) * 99 + 1);
		vals.innerText = pen_weight_num;
		penWeight = pen_weight_num;
	}
}
var end = function(e) {
	ifBool = false;
}
//鼠标按下方块
minDiv.addEventListener("touchstart", start);
minDiv.addEventListener("mousedown", start);
//拖动
window.addEventListener("touchmove", move);
window.addEventListener("mousemove", move);
//鼠标松开
window.addEventListener("touchend", end);
window.addEventListener("mouseup", end);
//获取元素的绝对位置
function getPosition(node) {
	var left = node.offsetLeft; //获取元素相对于其父元素的left值var left
	var top = node.offsetTop;
	current = node.offsetParent; // 取得元素的offsetParent
	while(current != null) {
		left += current.offsetLeft;
		top += current.offsetTop;
		current = current.offsetParent;
	}
	return {
		"left": left,
		"top": top
	};
}



/**方法二**/
/**function noUse() {
	function setGesture(el) {
		var obj = {}; //定义一个对象
		var istouch = false;
		var start = [];
		var oW, oH;
		el.addEventListener("touchstart", function(e) {
			var touches = e.touches[0];
			oW = touches.clientX - el.offsetLeft;
			oH = touches.clientY - el.offsetTop;
			if(e.touches.length >= 2) { //判断是否有两个点在屏幕上
				istouch = true;
				start = e.touches; //得到第一组两个点
				obj.gesturestart && obj.gesturestart.call(el); //执行gesturestart方法
			} else {
				isdrag = true;
			}
		}, false);
		document.addEventListener("touchmove", function(e) {
			e.preventDefault();
			var touches = e.touches[0];
			var oLeft = touches.clientX - oW;
			var oTop = touches.clientY - oH;

			if(e.touches.length >= 2 && istouch) {
				var now = e.touches; //得到第二组两个点
				var scale = getDistance(now[0], now[1]) / getDistance(start[0], start[1]); //得到缩放比例，getDistance是勾股定理的一个方法
				e.scale = scale.toFixed(2);
				obj.gesturemove && obj.gesturemove.call(el, e); //执行gesturemove方法
			} else { //移动
				el.style.left = oLeft + "px";
				el.style.top = oTop + "px";
			}
		}, false);
		document.addEventListener("touchend", function(e) {
			if(istouch) {
				istouch = false;
				obj.gestureend && obj.gestureend.call(el); //执行gestureend方法
			};
		}, false);
		return obj;
	};

	function getDistance(p1, p2) {
		var x = p2.pageX - p1.pageX,
			y = p2.pageY - p1.pageY;
		return Math.sqrt((x * x) + (y * y));
	};
	var boxGesture;
	$('.ppt_cont .page>div').each(function() {
		var div = $('.ppt_cont .page>div');
		boxGesture = setGesture(this);
		boxGesture.gesturemove = function(e) { //双指移动

			this.style.transform = "scale(" + e.scale + ")"; //改变目标元素的大小和角度

		};
		boxGesture.gestureend = function(e) { //双指移动
		};

	})
}**/

//文件上传
/*function fileUP() {
	var oFile = document.getElementById("file_upload");
	oFile.onchange = function() {
		oFile = oFile.files[0];
		var name = oFile.name;
		var dot = name.lastIndexOf(".");
		var type = name.substring(dot + 1);
		var ext = ['ppt', 'pptx', 'pdf', 'xlsx', 'xls', 'docx', 'doc', 'txt', 'jpeg', 'png', 'jpg'];
		if($.inArray(type, ext) == -1) {
			alert('不支持该文件格式');
			return false;
		};
		var formdata = document.getElementById("upload_form");
		var formData = new FormData(formdata);
		console.log(formData)
	}

}*/
  function openFile(data){
  	if($(".viewer_wrap").children().length!=0){
  		 $(".viewer_wrap").children().remove();
  		 $(".viewer_wrap").children().remove();
       clearCanvas();
  	}
   var fileName = data[0].name;
        var dot = fileName.lastIndexOf(".")+1;
        var fileExt = fileName.substring(dot,fileName.length);//找到文件类型
        if(!fileName){
            alert("未选择文件!");
        }else{
            var formData = new FormData($("#upload_form")[0]);
  switch(fileExt){
   case "zip":
			$.ajax({
			    url: _prepare_root_url+'/prepare/open',
                type: 'POST',
                data:formData, 
                async: true,  
                cache: false,  
                contentType: false,  
                processData: false, 
	   	 success:function(data){
		   	 var html = "";
            var huabu = data.msg.bk_huabu;
            //遍历数据中的画布
            for (var i = 0; i < huabu.length; i++) {
                var box = huabu[i];
                html +=box;
            } 
	            $(html).appendTo(".viewer_wrap"); //将遍历好的所有画布添加到画布包中
	            $(".viewer_wrap div:first-child").addClass("current").siblings().removeClass("current"); //默认显示第一个画布
	            // $(".viewer_wrap div:first-child").remove();
	             //$(".teath_a").html(getUrlParam("userId")+"老师"); //讲课老师
	            $(".lesson_b").html(data.msg.title); //讲课标题
	            $("#main").css("background","#0b5748")
	           
	            $("#page_count").html(huabu.length); //讲课画布长度
	               console.log($("#page_count"))
	            $(".box").css("user-select","text"); //改变画布中组件css属性
			},
		 	error:function(data){
                  alert("未链接服务器");
		 	}
	  });
	  break;
   case "pdf":
   $("#page_num").innerHTML = 1;
			 $.ajax({
			    url: _prepare_root_url+'/prepare/open',
                type: 'POST',
                data:formData, 
                async: true,  
                cache: false,  
                contentType: false,  
                processData: false, 
	   	success:function(data){
	    //var pdfurl ="http://192.168.0.251:8888/"+data.msg;
	   // window.open(pdfurl);
	    var pdfDoc = null,
			    pageNum = 1,
			    pageRendering = false,
			    pageNumPending = null,
			    pdfscale = 1,
			    pdfcanvas = document.getElementById('the-canvas'),
			    pdfctx = pdfcanvas.getContext('2d');
			//PDFJS.workerSrc = '../public/part/pdf/pdf.worker.js';
			function renderPage(num) {
			    pageRendering = true;
			    pdfDoc.getPage(num).then(function(page) {
			        var viewport = page.getViewport(pdfscale);
			        console.log(viewport);
			         pdfcanvas.height = viewport.height;
			         pdfcanvas.width = viewport.width;
			        // Render PDF page into canvas context
			        var renderContext = {
			            canvasContext: pdfctx,
			            viewport: viewport
			        };
			        var renderTask = page.render(renderContext);
			
			        // Wait for rendering to finish
			        renderTask.promise.then(function () {
			            if (pageNumPending !== null) {
			                // New page rendering is pending
			                renderPage(pageNumPending);
			                pageNumPending = null;
			            }
			        });
			    });
			    // Update page counters
			    document.getElementById('page_num').textContent = pageNum;
			}
		  var pdfurl = "pdf/"+fileName;
	 function pdf(){
			     $('.fn_pagePre1').on('click',function(){
			        var pageNum = $("#page_num").html();
			     	   onPrevPage(pageNum);
			     });
			     $('.fn_pageNext1 ').on('click',function(){
			     	  var pageNum = $("#page_num").html();
			     	 onNextPage(pageNum); 
			     	});
			    PDFJS.getDocument(pdfurl).then(function (pdfDoc_) {
			        pdfDoc = pdfDoc_;
			        document.getElementById('page_count').textContent = pdfDoc.numPages;
			        renderPage(pageNum);
			    });
			}
			pdf();
			function queueRenderPage(num) {
			    if (pageRendering) {
			        pageNumPending = num;
			    } else {
			        renderPage(num);
			    }
			}
			//Displays previous page.
			function onPrevPage(pageNum) {
			    if (pageNum <=1) {
			        return;
			        layer.alert("已经是第一张");
			    }
			    pageNum--;
			    pageRendering = false;
			     queueRenderPage(pageNum);
			   $("#page_num").html(pageNum);
			}
			
			function onPdfadd() {
			    pdfscale+=0.1;
			    renderPage(pageNum);
			}
			function onPdfdec() {
			    pdfscale-=0.1;
			    renderPage(pageNum);
			}
			
			//Displays next page.
			 
			function onNextPage(pageNum) {
			    if (pageNum >= pdfDoc.numPages) {
			        return;
			        layer.alert("已经是最后一张")
			    }
			    pageNum++;
			    pageRendering = false;
			    queueRenderPage(pageNum);
			   $("#page_num").html(pageNum);
			}
		
			$(document).on('click', '#fontadd', function(){
			 if($(".viewer_wrap").length>0){
			    onPdfadd();
			 }
			});
			$(document).on('click', '#fontdec', function(){
			     imgCount = 0;
			    if($(".viewer_wrap").length>0){
			        onPdfdec();
			    }
			});
			},
		 	error:function(data){
            alert("未链接服务器");
		 	}
	  });

	/*		$.ajax({
			    url: 'http://192.168.0.251:21002/prepare/open',
                type: 'POST',
                data:formData, 
                async: true,  
                cache: false,  
                contentType: false,  
                processData: false, 
	 	 success:function(data){
	 	 	console.log(data.msg);
		   	  var html = "";
            var pdfData = data.msg;
            //遍历数据中的画布
            var imgSrc = "http://192.168.0.251:8888/";
            for (var i = 0; i < pdfData.length; i++) {
            	console.log(pdfData[i].path)
            	console.log(i)
                var box = pdfData[i].path;
                html = '<div class="viewer viewerImg"><img src='+imgSrc+box+'></div>';
               $(".viewer_wrap").append(html); //将遍历好的所有画布添加到画布包中  
            } 
	          $("#main").css("background","#0b5748")
	 
	           $(".viewer_wrap div:first-child").addClass("current").siblings().removeClass("current"); //默认显示第一个画布
	            // $(".viewer_wrap div:first-child").remove();
	             //$(".teath_a").html(getUrlParam("userId")+"老师"); //讲课老师
	           // $(".lesson_b").html(pdfData.title); //讲课标题
	            $("#page_count").html(pdfData.length); //讲课画布长度
	            $(".box").css("user-select","text"); //改变画布中组件css属性
	          
			  },
		  	error:function(data){
             alert("未链接服务器");
			}
			
	 })	;*/
	  break;
	 case "jpg":
	 case "bmp":
	 case "png":
	 case "jpeg":
	  	$.ajax({
			    url: _prepare_root_url+'/prepare/open',
                type: 'POST',
                data:formData, 
                async: true,  
                cache: false,  
                contentType: false,  
                processData: false, 
	 	 success:function(data){
	 	 	    var imgUrl = "beike_video_url";
	 	 	    var imgData = data.msg;
	 	 	    html = '<div class="viewer viewerImg"><img  src='+imgUrl+imgData+'></div>';
	 	 	      $(".viewer_wrap").append(html);
	 	 	    $("#main").css("background","#0b5748");
	 	 	     $(".viewer_wrap div:first-child").addClass("current").siblings().removeClass("current"); //默认显示第一个画布
	 	   },
		  	error:function(data){
             alert("未链接服务器");
			}
	 })	;
	 break;
	 }
  }
 }

  
