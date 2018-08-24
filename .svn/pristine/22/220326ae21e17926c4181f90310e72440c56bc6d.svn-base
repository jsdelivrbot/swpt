var cur=angular.module('cur-ctr',[]);
var tmp_url=_tmp_url;
cur.controller("listCtr",["$scope","$compile","getData",function ($scope,$compile,getData) {
    var toptime=25200;
    var weekday=["MON|周一","TUE|周二","WED|周三","THU|周四","FRI|周五","SAT|周六","SUN|周日"];
    var le_color=["#94cb32","#767ff6","#36b4dc","#95CB38","#18A9D6"];
    var td=new Date();
    var cur_weekday=td.getDay();
    var lists=[];
    $scope.week_data=[];
    $scope.curr_data=null;
    $scope.show_class_details=false;

    $scope.curr_lesson={
        "flag":false,
        "subject_name": "数学",
        "startTime": 28800,
        "endTime": 28800,
        "timeLength": 45,
        "addressNumber": "A905",
        "address": "教学大楼A栋",
        "teacherId": 21,
        "teacher_name": "龙傲天",
        "lessonExplain": "数学在线学习一对一 针对学科薄弱点 个个突破 量身制定辅导课程"
    };

    $scope.getCurriculum=function(){
        getData.getUrlData(tmp_url+"/scheduleTableM/getTable?classId=20","curriculum").then(function (rs){
            console.log(rs);
            if(rs.data.status==0){
                lists=[];
                var list=rs.data.msg;
                var listhtml='';
                var style='';
                var title='';
                var week=1;
                var left_w=0;
                var le_time_h=0;
                var le_time_m=0;
                var le_time_t=0;
                var le_top=0;
                var color="#94cb32";
                for(var v in list){
                    week=v;
                    if(week==0){
                        left_w=90*6;
                    }else{
                        left_w=90*(week-1);
                    }
                    var curriculum=list[v];
                    for(var i=0;i<curriculum.length;i++){
                        le_time_h=parseInt(curriculum[i].startTime/3600);
                        le_time_m=parseInt((curriculum[i].startTime%3600)/60);
                        le_time_t=(curriculum[i].startTime-25200)/60;
                        color=le_color[parseInt(Math.random()*5)];
                        lists.push({
                            "id":curriculum[i].id,
                            "week":week,
                            "subject_name":curriculum[i].subject_name,
                            "startTime": curriculum[i].startTime,
                            "timehtml": le_time_h+':'+le_time_m,
                            "timeLength": curriculum[i].timeLength,
                            "addressNumber": curriculum[i].addressNumber,
                            "address": curriculum[i].address,
                            "teacher_name": curriculum[i].teacher_name,
                            "lessonExplain": curriculum[i].lessonExplain
                        });
                        le_time_h=le_time_h<10?'0'+le_time_h:le_time_h;
                        le_time_m=le_time_m<10?'0'+le_time_m:le_time_m;
                        title=le_time_h+':'+le_time_m+' '+curriculum[i].teacher_name+'在'+curriculum[i].addressNumber+'上'+curriculum[i].subject_name;
                        style='height: '+curriculum[i].timeLength+'px;left: '+left_w+'px;top: '+le_time_t+'px;background-color: '+color+';';
                        listhtml+='<div class="lesson lesson_st1" style="'+style+'" title="'+title+'" ng-click="showClassDetails('+curriculum[i].id+')">'+le_time_h+':'+le_time_m+'<h2>'+curriculum[i].subject_name+'</h2></div>';
                    }
                }
                /*for(var i=0;i<list.length;i++){
                    week=list[i].week;
                    le_time_h=parseInt(list[i].start_hour/3600);
                    le_time_m=parseInt((list[i].start_hour%3600)/60);
                    title=le_time_h+':'+le_time_m+' '+list[i].teacher+'在'+list[i].short_addr+'上'+list[i].course_name;
                    if(week==0){
                        left_w=90*6;
                    }else{
                        left_w=90*(week-1);
                    }
                    style='height: '+list[i].class_time+'px;left: '+left_w+'px;top: 270px;';

                    if(list[i].type==2){
                        listhtml+='<div class="lesson lesson_st'+list[i].type+'" style="'+style+'"><h2>'+list[i].course_name+'</h2><div class="lesson_change" ng-click="showClassDetails('+list[i].id+')"><span>'+list[i].newcourse_name+'</span></div><h3>'+list[i].short_addr+'</h3></div>';
                    }else{
                        listhtml+='<div class="lesson lesson_st'+list[i].type+'" style="height: 40px;left: 180px;top: 0;" title="'+title+'" ng-click="showClassDetails('+list[i].id+')"><h2>'+list[i].course_name+'</h2><h3>'+list[i].short_addr+'</h3></div>';
                    }
                }*/
                $("#loading").hide();
                $(".cl_main_lesson").append($compile(listhtml)($scope));
            }
            // $scope.doTeacher();
        })
    }

    $scope.doDate=function(mydate){
        $scope.week_data=[];
        var createDate=new Date();
        if(mydate==null||mydate==undefined){
            createDate=new Date();
        }else{
            createDate=new Date(mydate);
        }
        $scope.curr_data=createDate.getFullYear() + '-' + (createDate.getMonth()+1) + '-' + createDate.getDate();
        var now_time = createDate.getTime() ;
        var day = createDate.getDay();
        var one_day_long = 24*60*60*1000;
        var monday_time = now_time - (day-1)*one_day_long;
        var monday = new Date(monday_time);
        var daynum=null;
        var istoday=false;
        for(var i=0;i<7;i++){
            istoday=false;
            daynum=monday.getDate();
            console.log(daynum);
            if(cur_weekday==i+1){
                istoday=true;
            }else if(cur_weekday==0 && daynum==6){
                istoday=true;
            }
            $scope.week_data.push(
                {
                    "day":daynum,
                    "weekday":weekday[i],
                    "today":istoday
                }
            );
            monday.setDate(monday.getDate() + 1);
        }

        console.log($scope.week_data);
        //$scope.$apply("week_data");
        //$scope.$degist("week_data");

    }
    $scope.goUpWeek=function(){
        var createDate=new Date($scope.curr_data);
        createDate.setDate(createDate.getDate() - 7);
        $scope.doDate(createDate.getFullYear() + '-' + (createDate.getMonth()+1) + '-' + createDate.getDate());
    }
    $scope.goNextWeek=function(){
        var createDate=new Date($scope.curr_data);
        createDate.setDate(createDate.getDate() + 7);
        $scope.doDate(createDate.getFullYear() + '-' + (createDate.getMonth()+1) + '-' + createDate.getDate());
    }
    $scope.showClassDetails=function(id){
        $scope.show_class_details=true;
        var le_time_h=0;
        var le_time_m=0;
        for(var i=0;i<lists.length;i++){
            if(id==lists[i].id){
                var time=lists[i].startTime+(lists[i].timeLength*60);
                le_time_h=parseInt(time/3600);
                le_time_m=parseInt((time%3600)/60);
                $scope.curr_lesson.flag=true;
                $scope.curr_lesson.subject_name=lists[i].subject_name;
                $scope.curr_lesson.startTime=lists[i].timehtml;
                $scope.curr_lesson.endTime=le_time_h+':'+le_time_m;
                $scope.curr_lesson.timeLength=lists[i].timeLength;
                $scope.curr_lesson.addressNumber=lists[i].addressNumber;
                $scope.curr_lesson.address=lists[i].address;
                $scope.curr_lesson.teacher_name=lists[i].teacher_name;
                $scope.curr_lesson.lessonExplain=lists[i].lessonExplain;
            }
        }
    }
    $scope.openColse=function(){
        $scope.show_class_details=false;
    }
    $scope.setDataCh=function(d){
        $scope.$apply(function() {
            $scope.doDate(d);
        });
    }
    $scope.doDate();
    $("#datepicker").datepicker({
        numberOfMonths:1,//显示几个月
        dateFormat: 'yy-mm-dd',//日期格式
        yearSuffix: '年', //年的后缀
        showMonthAfterYear:true,//是否把月放在年的后面
        minDate:'2016-01-01',//最小日期
        maxDate:'2022-12-30',//最大日期
        monthNames: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
        dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
        dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
        dayNamesMin: ['日','一','二','三','四','五','六'],
        showOn: "button",
        buttonImage: "css/images/calendar.gif",
        buttonImageOnly: true,
        onSelect: function(selectedDate) {//选择日期后执行的操作
            $scope.setDataCh(selectedDate);
        }
    });
    $scope.getCurriculum();

}])
.controller("addCtr",["$scope","getData",function ($scope,getData) {
        $scope.hour=[];
        $scope.minute=[];
        $scope.subject=[];
        $scope.teacher=[];
        $scope.subject_id=0;
        $scope.school_period=getData.school_period;
        for(var i=10;i<60;i++){
            $scope.minute.push(i);
            if(i<24){
                $scope.hour.push(i);
            }
        }

        $scope.getTeacher=function(id){
            console.log("科目ID："+id);
            getData.getUrlData(tmp_url+"/scheduleTableM/getTeachers?classId=20&subjectId="+id,"teacher").then(function (rs){
                $scope.teacher=rs.data.msg;
                console.log($scope.teacher);
               // $scope.doTeacher();
            })
        }

        //获取科目
        getData.getUrlData(root_url+"/node/nextNodes?pId="+$scope.school_period[2].id+"&isKno=0","subject").then(function (res){
            $scope.subject_id=res.data.msg[0].id;
            $scope.subject=res.data.msg;
            console.log($scope.subject);
            //获取教师
            $scope.getTeacher($scope.subject[0].id);
        });
        /*//获取教师
        getData.getUrlData("/scheduleTableM/getTeachers?classId=18&isStudent=0&subjectId="+$scope.subject_id,"teacher").then(function (res){

        })
        //获取科目
        getData.getUrlData("/node/nextNodes?pId="+$scope.cur_teaching.semester_id+"&isKno=0","section").then(function (res){

        })*/

        $scope.doSubmit=function(){
            var form = document.getElementById('add_curriculum');
            //var formdata = new FormData(form);
            var mydata={
                "week":form.week.value,
                "course_name":form.course_name.value,
                "start_hour":form.start_hour.value,
                "start_minute":form.start_minute.value,
                "class_time":form.class_time.value,
                "short_addr":form.short_addr.value,
                "long_addr":form.long_addr.value,
                "teacher_id":form.teacher_id.value,
                "describe":form.describe.value,
                "class_id":form.class_id.value
            };

            /*$.post(_tmp_url + "/scheduleTableM/addTable",JSON.stringify(mydata),function(d){
                console.log(d);
            },"json");*/
            $.ajax({
                /*url: 'http://test.com/test.php',*/
                /*url:root_url+'/uploadFile/resource/file.do',*/
                url:tmp_url+'/scheduleTableM/addTable',
                type: 'POST',
                data: JSON.stringify(mydata),
                dataType:'JSON',
                contentType: "application/json",
                processData: false,
                success: function (d) {
                    //window.location.href="/re/#!/re_upfile";
                    if(d.status==0){
                        alert('添加成功');
                        window.location.href="#!/list";
                    }else{
                        alert('添加失败');
                    }

                },
                error: function (XMLHttpRequest,textStatus,errorThrown) {
                    console.log('error');
                    console.log(XMLHttpRequest.status);
                    console.log(XMLHttpRequest.readyState);
                    console.log(textStatus);
                }
            });
        }
 }])
.controller("curriculumCtr",["$scope","getData","$http",function ($scope,getData,$http) {
    var toptime=25200;
    var weekday=["周日","周一","周二","周三","周四","周五","周六"];
    var le_color=["#94cb32","#767ff6","#36b4dc","#95CB38","#18A9D6"];
    $scope.lists=[];
    $scope.getCurriculum=function(){
        getData.getUrlData(tmp_url+"/scheduleTableM/getTable?classId=20","curriculum").then(function (rs){
            if(rs.data.status==0){
                $scope.lists=[];
                var list=rs.data.msg;
                var listhtml='';
                var style='';
                var title='';
                var week=1;
                var left_w=0;
                var le_time_h=0;
                var le_time_m=0;
                var le_time_t=0;
                var le_top=0;
                var color="#94cb32";
                var week_name='周一';
                for(var v in list){
                    week=v;
                    if(week==0){
                        left_w=90*6;
                    }else{
                        left_w=90*(week-1);
                    }
                    var curriculum=list[v];
                    for(var i=0;i<curriculum.length;i++){
                        le_time_h=parseInt(curriculum[i].startTime/3600);
                        le_time_m=parseInt((curriculum[i].startTime%3600)/60);
                        le_time_t=(curriculum[i].startTime-25200)/60;
                        color=le_color[parseInt(Math.random()*5)];
                        $scope.lists.push({
                            "id":curriculum[i].id,
                            "week":week,
                            "week_name":weekday[week],
                            "subject_name":curriculum[i].subject_name,
                            "startTime": curriculum[i].startTime,
                            "timehtml": le_time_h+':'+le_time_m,
                            "timeLength": curriculum[i].timeLength,
                            "addressNumber": curriculum[i].addressNumber,
                            "address": curriculum[i].address,
                            "teacher_name": curriculum[i].teacher_name,
                            "lessonExplain": curriculum[i].lessonExplain
                        });
                    }
                }
            }
        })
    }
    $scope.getCurriculum();
    $scope.del=function (id) {
        if (confirm("你确定删除？")) {
            $http.get(tmp_url+"/scheduleTableM/delete?tableId="+id)
                .then(function(r) {
                    alert('删除成功');
                    $scope.getCurriculum();
                })
                .catch(function(err) {
                    alert('删除失败');
                });
        }
    }
}])
.controller("editCtr",["$scope","$routeParams","getData",function ($scope,$routeParams,getData) {
    $scope.id=$routeParams.id;
    $scope.hour=[];
    $scope.minute=[];
    $scope.subject=[];
    $scope.teacher=[];
    $scope.subject_id=0;
    $scope.school_period=getData.school_period;
    $scope.week_name='';
    $scope.week=["周日","周一","周二","周三","周四","周五","周六"];
    $scope.kc=null;
    $scope.le_time_h=0;
    $scope.le_time_m=0;
    for(var i=10;i<60;i++){
        $scope.minute.push(i);
        if(i<24){
            $scope.hour.push(i);
        }
    }
    $scope.getTeacher=function(id){
        console.log("科目ID："+id);
        getData.getUrlData(tmp_url+"/scheduleTableM/getTeachers?classId=20&subjectId="+id,"teacher").then(function (rs){
            $scope.teacher=rs.data.msg;
            console.log($scope.teacher);
            // $scope.doTeacher();
        })
    }

    //获取科目
    $scope.getSubject=function(){
        getData.getUrlData(root_url+"/node/nextNodes?pId="+$scope.school_period[2].id+"&isKno=0","subject").then(function (res){
            $scope.subject=res.data.msg;
            console.log($scope.subject);
            //获取教师
            $scope.getTeacher($scope.subject_id);
        });
    }
    //获取课程
    getData.getUrlData(tmp_url+"/scheduleTableM/getOneTable?id="+$scope.id,"teacher").then(function (rs){
        if(rs.data.status==0){
            $scope.kc=rs.data.msg;
            $scope.subject_id=rs.data.msg.subjectName;
            $scope.week_name=$scope.week[$scope.kc.weekDay];
            $scope.le_time_h=parseInt($scope.kc.startTime/3600);
            $scope.le_time_m=parseInt(($scope.kc.startTime%3600)/60);
            $scope.getSubject();
        }else{
            alert("获取数据出错");
        }
        // $scope.doTeacher();
    })

    $scope.doSubmit=function(){
        var form = document.getElementById('add_curriculum');
        //var formdata = new FormData(form);
        var mydata={
            "id":form.id.value,
            "weekDay":form.week.value,
            "subjectName":form.course_name.value,
            "startTime":form.start_hour.value*60*60+form.start_minute.value*60,
            "timeLength":form.class_time.value,
            "addressNumber":form.short_addr.value,
            "address":form.long_addr.value,
            "teacherId":form.teacher_id.value,
            "lessonExplain":form.describe.value,
            "classId":form.class_id.value
        };
        $.ajax({
            url:tmp_url+'/scheduleTableM/update',
            type: 'POST',
            data: JSON.stringify(mydata),
            dataType:'JSON',
            contentType: "application/json",
            processData: false,
            success: function (d) {
                if(d.status==0){
                    alert('修改成功');
                    window.location.href="#!/list";
                }else{
                    alert('修改失败');
                }
            },
            error: function (XMLHttpRequest,textStatus,errorThrown) {
                console.log('error');
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
            }
        });
    }
}])