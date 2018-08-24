/**
 * Created by Administrator on 2018/4/20.
 */
var utfId = window.location.href.split('=')[1]
$(function () {
    var content = $(".bodyContent")

    $.ajax({
        type: "GET",
        url: getPageContent + utfId,
        async: false,
        success: function (result) {
            var parseData, // 解析的对象
                fields = [], // 所有的字段
                // 装载内容的容器
                checkboxs = 0, // div的id，循环生成唯一值
                source = 'ueditor';
            var parseData = result.msg;
            var parse = parseData.phoneParse;
            var NODENAME = -1
            //var parse = parseData.parse, // 数据字段内容
            var datas = parseData.data; // 当前数据详细内容
            $.each(datas, function (index, value) {
                if (value.parse_name) { // chekcbox 解析出来的name是不一样的
                    fields.push(value.parse_name);
                } else {
                    fields.push(value.name);
                }
            })
            for (var i = 0; i < fields.length; i++) {
                var dataType = datas[i].leipiplugins,
                    showData, // 变为预览状态的临时变量
                    data = datas[i],
                    // numTimes = false,
                    inputValue = '';
                // console.log( data )
                // 将解析的数据变为预览状态
                if (dataType == "text") { //! 文本框
                    // orgtype -- 没用
                    var dataHide, // input是否隐藏
                        dataThide, // input边框是否隐藏
                        dataBghide, // input底色是否隐藏
                        type, // input的类型判断
                        max, min,
                        placeholder;
                    switch (data.orgtype) {
                        case 'email':
                            // placeholder = '请输入正确的 “邮箱” 地址';
                            type = 'email';
                            break;
                        case 'int':
                            // placeholder = '请输入 “整数” 类型';
                            type = 'number';
                            break;
                        case 'float':
                            // placeholder = '请输入 “浮点数” 类型';
                            type = 'text';
                            break;
                        case 'idcard':
                            // placeholder = '请输入正确的 “身份证” 号码';
                            type = 'number';
                            max = 999999999999999999;
                            break;
                        default:
                            // placeholder = '请输入 “文本” ';
                            type = 'text';
                            break;
                    }
                    data.value === '' ? placeholder = '' : placeholder = data.value;
                    data.orghide == 0 ? dataHide = "inline-block" : dataHide = "none";
                    if (datas[i].groupcon != null && datas[i].groupcon != "null" && source !== 'datatable') { //如果是组合控件中的热区
                        showData = "<p leipiplugins='" + data.leipiplugins + "' groupCon='" + nodeId + "'type=" + type +
                            " max='" + max + "' title='" + data.title + "' id='" +
                            data.name + "' name='" + data.name + "' orgheight='" + data.orgheight + "' orgwidth='" + data.orgwidth +
                            "' placeholder='" + placeholder + "' orgthide='" + data.orgthide + "' orgbghide='" +
                            data.orgbghide + "' datasource = " + data.datasource + "></p>"
                    } else if (datas[i].groupcon === '' && source !== 'datatable' && datas[i].datasource === "") { //如果是组合控件中的热区
                        showData = "<p leipiplugins='" + data.leipiplugins + "' groupCon='" + nodeId + "'type=" + type +
                            " max='" + max + "' title='" + data.title + "' id='" +
                            data.name + "' name='" + data.name + "' orgheight='" + data.orgheight + "' orgwidth='" + data.orgwidth +
                            "' placeholder='" + placeholder + "' orgthide='" + data.orgthide + "' orgbghide='" +
                            data.orgbghide + "' datasource = " + data.datasource + "></p>"
                    } else {
                        showData = "<input class='searchData' leipiplugins='" + data.leipiplugins + "' onclick='clearInputValue(event)' orgtype=" + data.orgtype + " type=" + type +
                            " max='" + max + "' title='" + data.title + "' id='" +
                            data.name + "' name='" + data.name + "' orgheight='" + data.orgheight + "' orgwidth='" + data.orgwidth +
                            "' style='text-align:" + data.orgalign + ";height:" + data.orgheight + ";width:" + data.orgwidth +
                            ";display:" + dataHide + ";border:" + dataThide + ";background:" + dataBghide +
                            ";box-shadow:none;" + data.style + "' placeholder='" + placeholder + "' orgthide='" + data.orgthide + "' orgbghide='" +
                            data.orgbghide + "' datasource = " + data.datasource + ">";
                    }
                } else if (dataType == "textarea") { //! 多行文本框
                    if (NODENAME > -1) {
                        numTimes = false;
                        // !!!!!!!!!!!!!  ordrich -- 是否富文本格式  暂时没弄 迟点弄
                        showData = "<div leipiplugins='" + data.leipiplugins + "' id='" + data.name + "' name='" + data.name + "' title='" + data.title +
                            "' style='font-size:" + data.orgfontsize + ";width:" + data.orgwidth + "px;height:" + data.orgheight +
                            "px;box-sizing:border-box;" + data.style + "' datasource=" + data.datasource + " sqldata=" + data.sqldata + ">" + data.value + "</div>";
                    } else {
                        numTimes = false;
                        // !!!!!!!!!!!!!  ordrich -- 是否富文本格式  暂时没弄 迟点弄
                        showData = "<textarea leipiplugins='" + data.leipiplugins + "' id='" + data.name + "' name='" + data.name + "' title='" + data.title +
                            "' style='font-size:" + data.orgfontsize + ";width:" + data.orgwidth + "px;height:" + data.orgheight +
                            "px;box-sizing:border-box;" + data.style + "' datasource=" + data.datasource + " sqldata=" + data.sqldata + ">" + data.value + "</textarea>"
                    }
                } else if (dataType == "select") { //! 下拉菜单
                    // selected -- 没用
                    showData = "<select leipiplugins='" + data.leipiplugins + "' datasource='" + data.datasource + "' id='" + data.name + "' name='" + data.name + "' title='" + data.title +
                        "' size='" + data.size +
                        "' selected='" + data.selected + "' style='" + data.style + "'>";
                    var dataValue = data.value.split(","); // 控件内容 -- 把字符串分割为数组
                    $.each(dataValue, function (key, value) {
                        if (value == data.selected) {
                            showData += "<option value='" + value + "' selected=''>" + value + "</option>"
                        } else {
                            showData += "<option value='" + value + "'>" + value + "</option>"
                        }
                    })
                    showData += "</select>";
                } else if (dataType == "radios") { //! 单选框
                    var orderby = "inline-block"; // 排序方式
                    data.orderby == "0" ? orderby = "block" : orderby = "inline-block";
                    showData = "";
                    showData += "<div leipiplugins='" + data.leipiplugins + "' style='display: inline-block';" + data.style + ";>";
                    $.each(data.options, function (key, value) {
                        if (value.checked != undefined) {
                            showData += "<label style='display:" + orderby + ";" + data.style + ";'><input type='radio' name='" +
                                value.name + "' value='" + value.value +
                                "' checked='checked'>" + value.value + "&nbsp;&nbsp;</label>";
                        } else {
                            showData += "<label style='display:" + orderby + ";" + data.style + ";'><input type=radio name=" +
                                value.name + " value='" + value.value +
                                "'>" + value.value + "&nbsp;&nbsp;</label>";
                        }
                    })
                    showData += '</div>';
                } else if (dataType == "checkboxs") { //! 复选框
                    var orderby = "inline-block"; // 排序方式
                    data.orderby == "0" ? orderby = "block" : orderby = "inline-block";
                    checkboxs++;
                    showData = "";
                    showData += "<div leipiplugins='" + data.leipiplugins + "' id='checkboxs" + checkboxs + "' style='display: inline-block'>";
                    $.each(data.options, function (key, value) {
                        if (value.checked != undefined) {
                            showData += "<label style='display:" + orderby + ";" + data.style + ";'><input type='" + value.type + "' name='" +
                                value.name + "' value='" + value.value +
                                "' checked='checked' onchange='selectChange(event)'>" + value.value + "&nbsp;&nbsp;</label>";
                        } else {
                            showData += "<label style='display:" + orderby + ";" + data.style + ";'><input type='" + value.type + "' name='" +
                                value.name + "' value='" + value.value +
                                "' onchange='selectChange(event)'>" + value.value + "&nbsp;&nbsp;</label>";
                        }
                    })
                    showData += '<input type="hidden" name=' + data.name1 + ' types="checkboxs" value="" />'
                    showData += '</div>';
                } else if (dataType == "macros") { //! 宏控件
                    var dataHide; // 隐藏属性
                    data.orghide == 0 ? dataHide = "inline-block" : dataHide = "none";
                    var orgType = data.orgtype, // 数据orgtype
                        dataOrgType; // 属于哪种形式
                    var d = new Date(); // 获取时间

                    switch (orgType) {
                        case "sys_datetime":
                            dataOrgType = d.getFullYear() + "-" + ( d.getMonth() + 1 ) + "-" + d.getDate() + "&nbsp;" + d.getHours() +
                                ":" + d.getMinutes() + "";
                            break;

                        case "sys_date":
                            dataOrgType = d.getFullYear() + "-" + ( d.getMonth() + 1 ) + "-" + d.getDate();
                            break;

                        case "sys_date_cn":
                            dataOrgType = d.getFullYear() + "年" + ( d.getMonth() + 1 ) + "月" + d.getDate() + "日";
                            break;

                        case "sys_date_cn_short1":
                            dataOrgType = d.getFullYear() + "年" + ( d.getMonth() + 1 ) + "月";
                            break;

                        case "sys_date_cn_short2":
                            dataOrgType = ( d.getMonth() + 1 ) + "月" + d.getDate() + "日"
                            break;

                        case "sys_date_cn_short3":
                            dataOrgType = d.getFullYear() + "年";
                            break;

                        case "sys_date_cn_short4":
                            dataOrgType = d.getFullYear();
                            break;

                        case "sys_time":
                            dataOrgType = d.getHours() + ":" + d.getMinutes()
                            break;

                        case "sys_week":
                            switch (d.getDay()) {
                                case 1:
                                    dataOrgType = "星期一";
                                    break;
                                case 2:
                                    dataOrgType = "星期二";
                                    break;
                                case 3:
                                    dataOrgType = "星期三";
                                    break;
                                case 4:
                                    dataOrgType = "星期四";
                                    break;
                                case 5:
                                    dataOrgType = "星期五";
                                    break;
                                case 6:
                                    dataOrgType = "星期六";
                                    break;
                                default:
                                    dataOrgType = "星期日"
                                    break;
                            }
                            break;

                        default:
                            dataOrgType = "出错啦~请重试..."
                            break;
                    }

                    data.orgfontsize ? data.orgfontsize : data.orgfontsize = "14px";
                    if (datas[i].groupcon === null && source !== 'datatable') {
                        showData = "<p leipiplugins='" + data.leipiplugins + "' groupCon='" + nodeId + "' name=" + data.name + ">" + dataOrgType + "</p>"
                    } else {
                        showData = "<input leipiplugins='" + data.leipiplugins + "' name=" + data.name + " type=" + data.type + " title=" + data.title +
                            " value=" + dataOrgType + " style='display:" + dataHide + ";font-size:" + data.orgfontsize +
                            ";width:" + data.orgwidth +
                            ";'>";
                    }
                } else if (dataType == "progressbar") { //! 进度条
                    if (source === 'datatable') {
                        showData = "<input name='" + data.name + "' type='text'>";
                    } else {
                        showData = "<div leipiplugins='" + data.leipiplugins + "' class='progress progress-striped'><div class='bar " + data.orgsigntype +
                            "' style='width:" + data.orgvalue + "%;" + data.style + ";'></div></div>"
                    }
                } else if (dataType == "qrcode") { //! 二维码
                    // !!!!!!!!!!!!!  目前只是个假的二维码 只有图片
                    if (source === 'datatable') {
                        showData = "<input name='" + data.name + "' type='text'>";
                    } else {
                        showData = "<img leipiplugins='" + data.leipiplugins + "' src='images/qrcode.gif' id=" + data.name + " name=" + data.name + " style='width:" +
                            data.orgwidth + ";height:" + data.orgheight + ";'>";
                    }
                } else if (dataType == "listctrl") { //! 列表控件

                    var dataColtype = data.orgcoltype.split('`'), // 类型
                        dataColtypeLen = dataColtype.length - 1, // 类型的长度
                        dataColvalue = data.orgcolvalue.split('`'), // 默认值
                        dataSum = data.orgsum.split('`'), // 合计数据
                        dataTitle = data.orgtitle.split('`'), // 表头名称
                        dataUnit = data.orgunit.split('`'), // 单位
                        dataRowvalue = data.orgrowvalue.split('`'), // 追加的内容的数据
                        sumDisplay = 'none', // 最后一行合计的显示
                        dataSumvalue = data.orgsumvalue.split('`');
                    $('#submitBtn').show(); // 列表控件的时候，将提交按钮显示出来。
                    for (var j = 0; j < dataSum.length; j++) {
                        if (dataSum[j] === '1') sumDisplay = 'table-footer-group';
                    }
                    dataRowvalue.pop(); // 把最后多的一个删除
                    var dataAverValueLen = dataRowvalue.length / dataColtypeLen; // 用 默认值的长度 除 类型的长度，知道分了几组

                    showData = "<table leipiplugins='" + data.leipiplugins + "' name=" + data.name + " id=" + data.name +
                        " cellspacing='0' class='table table-bordered table-condensed' style='width:" + data.orgwidth +
                        "'>";
                    showData += "<thead><tr><th colspan=" + ( dataColtypeLen + 1 ) + " style='text-align:left;'>" + data.title +
                        "<span class='pull-right'><button class='btn btn-small btn-primary' type='button' onclick='tdAddRow(" +
                        data.name + ", event)'>新增一行</button></span></th></td><tr>";
                    // --------- 第一行标题
                    for (var j = 0; j < dataColtypeLen; j++) {
                        showData += "<th>" + dataTitle[j] + "</th>";
                    }
                    showData += "<th>操作</th>";
                    showData += "</tr></thead><tbody class='template cContainer'><tr>";
                    // --------- 第二行内容
                    for (var j = 0; j < dataColtypeLen; j++) {
                        if (dataColtype[j] == "text") {
                            showData += "<td><input class='input-medium' name='list0" + j + "' type=" + dataColtype[j] +
                                " value=" + dataColvalue[j] +
                                "> " + dataUnit[j] + "</td>"
                        } else if (dataColtype[j] == "textarea") {
                            showData += "<td><textarea class='input-medium' name='list0" + j + "' type=" + dataColtype[j] +
                                ">" + dataColvalue[j] +
                                "</textarea> " + dataUnit[j] + "</td>"
                        } else {
                            showData += "<td><input onchange='changeSum(event)' class='input-medium sum' name='list0" + j +
                                "' type='number' value=" +
                                dataColvalue[j] +
                                " > " +
                                dataUnit[j] +
                                "</td> ";
                        }
                    }
                    showData += "<td></td></td></tbody>";
                    // --------- 第二行追加的内容
                    var tmpLen = 0;
                    for (var j = 0; j < dataAverValueLen; j++) {

                        var valueArr = dataRowvalue.slice(tmpLen, ( tmpLen + dataColtypeLen ));
                        tmpLen = tmpLen + dataColtypeLen;
                        showData += "<tbody class='cContainer add'><tr>";
                        for (var k = 0; k < valueArr.length; k++) {
                            if (dataColtype[k] === 'text') {
                                showData += "<td><input class='input-medium' name='list" + ( j + 1 ) +
                                    k + "' type=" + dataColtype[k] + " value=" + valueArr[k] + "></td>";
                            } else {
                                showData += "<td><input onchange='changeSum(event)' class='input-medium sum' name='list" + ( j + 1 ) +
                                    k + "' type=" + dataColtype[k] + " value=" + valueArr[k] + "></td>";
                            }

                        }
                        showData += "<td><a href='javascript:;' onclick='tdDelRow(this)'>删除</a></td></tbody></tr>";
                    }
                    showData += "<tbody class='fContainer' style='display:" + sumDisplay + "'><tr>";

                    // --------- 第三行合计
                    for (var j = 0; j < ( dataColtypeLen + 1 ); j++) {
                        // if( dataSumvalue[ j ] !== null || dataSumvalue[ j ] !== '' ) sumValue = dataSumvalue[ j ];

                        if (dataSum[j] == "1") {
                            var sumValue = dataColvalue[j];
                            // --------- 第三行合计的数量的赋值
                            if (dataSumvalue[j]) {
                                sumValue = dataSumvalue[j];
                                console.log(dataSumvalue[j])

                            }

                            showData += "<td>合计：<input class='total' readonly='readonly' type='text' name='list" + j + "total' class='input-small' value=" +
                                sumValue + "> " +
                                dataUnit[j] + "</td> "
                        } else {
                            showData += "<td><input class='total' type='hidden' value=''></td>";
                        }
                    }
                    showData += "</tr></tbody></table>";
                } else if (dataType == "addimage") { //! 图片上传
                    isSrc = true;
                    isAddImageSrc = ( data.identity );
                    if (isAddImageSrc === '图片上传' || data.title === '图片上传') {
                        isSrcs += data.name + ",";
                    }

                    if (source === 'datatable' && method !== 'watch') { // 如果是数据表进来，就显示上传的按钮
                        // data.identity 是唯一标识 data.title 不是
                        if (data.identity === '图片上传' || data.title === '图片上传') {
                            showData = "<div><input name=" + data.name + " id=" + data.name + " type='hidden'><a leipiplugins='" + data.leipiplugins + "' class='btn btn-primary btn-small uploadImage' data-toggle='modal'>" + data.title + "</a></div>";
                        } else if (data.identity === '视频上传' || data.title === '视频上传') {
                            showData = "<div><input name=" + data.name + " id=" + data.name + " type='hidden'><a leipiplugins='" + data.leipiplugins + "' class='btn btn-primary btn-small uploadVideo' data-toggle='modal'>" + data.title + "</a></div>";
                        } else if (data.identity === '文件上传' || data.title === '文件上传') {
                            showData = "<div><input name=" + data.name + " id=" + data.name + " type='hidden'>" +
                                "<label class='btn btn-primary btn-small' for='uploadData' title=" + data.title + ">" + data.title +
                                "<input leipiplugins='" + data.leipiplugins + "' type='file' id='uploadData' style='display: none;' name='fileVideo'>" +
                                "</label></div>";
                        }
                    } else if (source === 'datatable' && method === 'watch') { // 如果是数据表进来的，是点了 查看 某条数据的话，显示为一个图片
                        if (data.identity === '图片上传' || data.title === '图片上传') {
                            showData = "<img leipiplugins='" + data.leipiplugins + "' datasource='" + data.datasource + "' allowupload='" + data.allowupload + "' style='width:71px;height:99px !important;' src=" + idData['msg']['data']['data' + ( i + 1 )] + " />";
                        } else if (data.identity === '视频上传' || data.title === '视频上传') {
                            showData = "<video leipiplugins='" + data.leipiplugins + "' datasource='" + data.datasource + "' allowupload='" + data.allowupload + "' style='width:71px;height:99px !important;' src=" + idData['msg']['data']['data' + ( i + 1 )] + "></video>";
                        } else if (data.identity === '文件上传' || data.title === '文件上传') {
                            showData = "<div leipiplugins='" + data.leipiplugins + "' datasource='" + data.datasource + "' allowupload='" + data.allowupload + "' style='width:71px;height:99px !important;' src=" + idData['msg']['data']['data' + ( i + 1 )] + "></div>";
                        }
                    } else if (NODENAME > -1) {
                        if (data.identity === '图片上传' || data.title === '图片上传') {
                            showData = "<img src='' leipiplugins='" + data.leipiplugins + "' groupCon='" + nodeId + "' name=" + data.name + " id=" + data.name + " >"
                        } else if (data.identity === '视频上传' || data.title === '视频上传') {
                            showData = "<video src='' leipiplugins='" + data.leipiplugins + "' groupCon='" + nodeId + "' name=" + data.name + " id=" + data.name + " ></video>"
                        } else if (data.identity === '文件上传' || data.title === '文件上传') {
                            showData = "<div leipiplugins='" + data.leipiplugins + "' groupCon='" + nodeId + "' name=" + data.name + " id=" + data.name + " ></div>";
                        }
                    } else {
                        if (data.identity === '图片上传' || data.title === '图片上传') {
                            showData = "<img src='' style='width:90px;height:60px;' leipiplugins='" + data.leipiplugins + "' name=" + data.name + " id=" + data.name + " >"
                        } else if (data.identity === '视频上传' || data.title === '视频上传') {
                            showData = "<video src='' style='width: 90px;height: 60px;border: 1px solid #ccc;vertical-align: middle;' leipiplugins='" + data.leipiplugins + "' name=" + data.name + " id=" + data.name + "></video>"
                        } else if (data.identity === '文件上传' || data.title === '文件上传') {
                            showData = "<span style='width: 90px;height: 60px;border: 1px solid #ccc;vertical-align: middle;display: inline-block' leipiplugins='" + data.leipiplugins + "' name=" + data.name + " id=" + data.name + ">文件上传</span>"
                        }
                    }

                } else if (dataType == 'pinglun') { //评论
                    console.log(data)
                    showData = "<ul leipiplugins='" + data.leipiplugins + "' groupCon='" + nodeId + "' name='" + data.name + "'id='" + data.name + "'datasource='" + data.datasource + "'></ul>"
                } else if (dataType == "iframerouter") { //! 内嵌路由控件
                    var nChecked = data.orgchecked.split('`'),
                        nSrc = data.orgsrc.split('`'),
                        nTarget = data.orgtarget.split('`'),
                        nTitle = data.orgtitle.split('`');
                    var routerPosition, // 路由位置
                        defaultUrl = ''; // 默认选择的Url
                    nTitle.pop();
                    nSrc.pop();
                    nTarget.pop();
                    nChecked.pop();
                    showData = '';
                    for (var j = 0; j < nTitle.length; j++) {
                        if (nChecked[j] === 'true') {
                            defaultUrl = nTarget[j];
                        }
                    }
                    if (data.orderby === '0') routerPosition = 'bottom';
                    else routerPosition = 'top';
                    showData += "<div class='iframeRouterContainer " + routerPosition + "'><div class='top'><iframe allowfullscreen='true' allowtransparency='true' id='iframeRouter' src='" + defaultUrl + "'></iframe></div>" +
                        "<div class='bottom'>";
                    for (var j = 0; j < nTitle.length; j++) {
                        var url = nTarget[j];
                        showData += "<div class='btnContainer' data-url=" + url + "><span>";
                        if (nSrc[j] !== '') showData += "<img src=" + nSrc[j] + "></img>";
                        if (nChecked[j] === 'true') showData += "<p class='routerClick'>" + nTitle[j] + "</p></span></div>"
                        else showData += "<p>" + nTitle[j] + "</p></span></div>";
                    }
                    showData += "</div></div>";
                } else if (dataType == 'reportcontrol') { // 报表控件
                    var parsingData, // 后台传入数据
                        dataBody, // 表格内容
                        dataHead, // 表头
                        fieldsHead, // 列头
                        columnsLength; // 列长
                    if (source === 'ueditor') {
                        var nodeId = window.opener.document.getElementById('node_id').value
                        $.ajax({ // 这是获取模板。
                            url: prevent_HOST + `pageDesignQueryFacade/getPageContent?id=${nodeId}`,
                            type: 'GET',
                            dataType: 'json',
                            contentType: 'application/json; charset=UTF-8',
                            async: false,
                            success: function (res) {
                                parsingData = res['msg'];
                            }
                        })
                    } else parsingData = parseData;
                    if (parsingData.data[i]['leipiplugins'] === 'reportcontrol') {
                        dataBody = parsingData.data[i].data;
                        dataHead = parsingData.data[i];
                    }
                    fieldsHead = JSON.parse(dataHead.fields);
                    columnsLength = Object.keys(fieldsHead).length;
                    var inx;
                    if (dataHead.visualreport === 'tableCommon' || dataHead.visualreport === 'tableCommones') {
                        inx = 'bb';
                        numTimes = false;
                        showData =
                            "<table class='tableT' style='text-align:center;'>" +
                            // 表头
                            "<td class='titleT' style='font-weight:bold' colspan=" + columnsLength + ">" + dataHead.title + "</td>" +
                            // 标题
                            "<tr class='menuT'>";
                        // 标题数据
                        for (var j = 0; j < columnsLength; j++) {
                            showData += "<th>" + fieldsHead[Object.keys(fieldsHead)[j]] + "</th>";
                        }
                        showData += "</tr>";
                        // 表格内容数据
                        for (var j = 0; j < dataBody.length; j++) {
                            var columns = Object.keys(dataBody[j]).filter(function (e) {
                                return e.indexOf("data") === 0;
                            })
                            showData += "<tr>"
                            for (var x = 0; x < columns.length; x++) {
                                var y = columns[x]
                                showData += "<td>" + dataBody[j][y] + "</td>"
                                // console.log( dataBody[ j ][ y ] )
                            }
                            showData += "</tr>"
                        }
                        showData += "</table>";
                    } else {
                        inx = 'tb';
                        showData = '<div style="height:250px;width:100%;" id="lineChart' + i + '"></div>';
                        numTimes = true;
                        elemId = 'lineChart';
                        var legendData = [],
                            items, columnData = [],
                            sumArr = []
                        // 图例数据
                        for (var j = 0; j < columnsLength; j++) {
                            legendData.push(fieldsHead[Object.keys(fieldsHead)[j]]);
                        }
                        for (var j = 0; j < dataBody.length; j++) {
                            var columns = Object.keys(dataBody[j]).filter(function (e) {
                                return e.indexOf("data") === 0;
                            })
                        }
                        for (var j = 0; j < columns.length; j++) {
                            columnData[j] = [];
                            for (var k = 0; k < dataBody.length; k++) {
                                columnData[j].push(dataBody[k][columns[j]])
                            }
                        }

                        showCharts = function () {
                            reportId.push('lineChart' + i); // 保存对应图表Id，以便有多个图表的时候重新渲染。
                            var lineOption = {
                                title: {
                                    text: dataHead.title
                                },
                                tooltip: {
                                    trigger: 'axis'
                                },
                                legend: {
                                    // data: []
                                    // data: [ "多行文本框123", "多行文本框456" ]
                                },
                                grid: {
                                    left: '3%',
                                    right: '4%',
                                    bottom: '3%',
                                    containLabel: true
                                },
                                toolbox: {
                                    feature: {
                                        saveAsImage: {}
                                    },
                                    right: '4%'
                                },
                                xAxis: {
                                    show: true,
                                    type: 'category',
                                    // boundaryGap: false,
                                    data: []
                                },
                                yAxis: {
                                    show: true,
                                    type: 'value'
                                },
                                series: []
                            };
                            lineOption.legend.data = legendData;
                            // 折线图、柱状图
                            for (var j = 0; j < columnData.length; j++) {
                                items = 'item_' + j;
                                var chartType;
                                if (dataHead.visualreport === 'line') {
                                    items = {
                                        type: 'line',
                                        data: columnData[j],
                                        // barWidth: '30%',
                                        label: {
                                            normal: {
                                                show: true,
                                            }
                                        },
                                        name: legendData[j] // 这是我想了TM一下午都想不到的一个操作。瞎了狗眼了操。
                                    }
                                    lineOption.series.push(items);
                                } else if (dataHead.visualreport === 'bar') {
                                    items = {
                                        type: 'bar',
                                        data: columnData[j],
                                        barWidth: '30%',
                                        label: {
                                            normal: {
                                                show: true,
                                            }
                                        },
                                        name: legendData[j] // 这是我想了TM一下午都想不到的一个操作。瞎了狗眼了操。
                                    }
                                    lineOption.series.push(items);
                                }
                                var sum = 0;
                                for (var k = 0; k < columnData[j].length; k++) {
                                    sum += parseInt(columnData[j][k])
                                }
                                sumArr.push(sum);
                            }
                            // 饼状图
                            if (dataHead.visualreport === 'pie') {
                                items = {
                                    name: dataHead.title,
                                    type: 'pie',
                                    radius: '55%',
                                    center: ['50%', '60%'],
                                    data: [],
                                    itemStyle: {
                                        emphasis: {
                                            shadowBlur: 10,
                                            shadowOffsetX: 0,
                                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                                        }
                                    }
                                };
                                for (var j = 0; j < columnData.length; j++) {
                                    pieData = 'pieData_' + j;
                                    pieData = {
                                        value: sumArr[j],
                                        name: legendData[j]
                                    };
                                    items.data.push(pieData);
                                }
                                lineOption.tooltip.trigger = 'item';
                                lineOption.tooltip.formatter = '{a} <br/>{b} : {c} ({d}%)';
                                lineOption.xAxis.show = false;
                                lineOption.yAxis.show = false;
                                lineOption.series.push(items);
                            }
                            reportData.push(lineOption); // 保存对应图表数据，以便有多个图表的时候重新渲染。

                            for (var k = 0; k < reportId.length; k++) {
                                var myChart = echarts.init(document.getElementById(reportId[k]));
                                myChart.setOption(reportData[k]);
                            }
                        }
                    }
                } else if (dataType == 'button') { //! 按钮控件
                    var flexDirection;
                    data.orderby === '1' ? flexDirection = 'column-reverse' : flexDirection = 'column';
                    if (data.mode === '0') showData = "<div id='buttonBtn' style='color:" + data.orgfontcolor + ";";
                    else showData = "<div id='buttonBtn' style='color:" + data.orgfontcolor + ";background:" + data.orgbgcolor + ";";
                    showData += "float:left;box-sizing:border-box;padding:3px;width:" + data.orgwidth + "; height:" + data.orgheight + "; display:inline-block;' name='leipiNewField' leipiplugins='button' orgname='" + data.orgname + "' orderby='" + data.orderby + "' mode='" + data.mode + "' orgtitle='" + data.orgtitle + "'";
                    showData += "orgwidth='" + data.orgwidth + "' orgheight='" + data.orgheight + "' orgsrc='" + data.orgsrc + "' orgurl='" + data.orgurl + "'";
                    showData += "orgbgcolor='" + data.orgbgcolor + "' orgFontColor='" + data.orgfontcolor + "'>";
                    showData += "<div style='display:flex;flex-direction:" + flexDirection + "'>";
                    if (data.mode === '0') showData += "<div style='width:100%;height:100%;text-align:center;'><img src='" + data.orgsrc + "' style='width:60%;height:100%;'></div>";
                    showData += "<div style='display:inline-block;width:100%;height:100%;text-align:center;'><p style='font-size:1rem;margin-top:5px;'>" + data.orgtitle + "</p></div>"
                    showData += "</div></div>";
                }

                function parseShow(obj) {
                    return obj.replace(`{${fields[i]}}`, showData);
                }

                var parsen, // parse临时变量 i 为 0 1 时使用
                    parsec; // 临时变量
                if (i == 0) {
                    parsen = parseShow(parse);
                    content.html(parsen);

                } else if (i == 1) {
                    parsec = parseShow(parsen);
                } else {
                    parsec = parseShow(parsec);
                }
                content.html(parsec);

                /* var renderHTML;
                 if ( i == 0 ) {
                 renderHTML = parseShow( parse );
                 content.html( renderHTML );
                 } else {
                 renderHTML = parseShow( $( '.bodyContent' ).html() );
                 content.html( renderHTML );
                 } */

            }
//            $('.bodyContent').append(content);
        }
    })
    var inputArr = $('input')
    inputArr.each(function(){
        $(this).attr('autocomplete','off')
    })
})