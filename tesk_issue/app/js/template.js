function task_Info(id,imgSrc,title,taskType,prin,status){
    let statusName=['计划','筹备','进行中','完成'];
    return `
    <div onclick="this_details('${id}');" style="margin-top:10px; border-bottom:0.5px solid;border-color: rgba(242, 242, 242, 1); height: 80px; width: 100%;padding: 0 !important;" class="container taskInfo">
        <div class="col-xs-2" style="height: 100%;padding: 0 !important;">
            <img src="${imgSrc==""?"../images/u16.png":imgSrc}" alt="图片" style="width: 50px;height: 50px;position: relative; left: 50%;margin-left: -25px;top:50%;margin-top:-25px; ">
        </div>
        <div class="col-xs-10 " style="height: 100%;;">
            <div class="row" style="height: 50%;line-height: 40px;">
                <div class="col-xs-8" style="color: darkseagreen;">${title==""?"无标题":title}</div>
                <div class="col-xs-4" style="color: darkseagreen;">
                    <span style="height: 20px;border-radius:8px;background-color: rgba(255, 153, 0, 0.692);color: #ffffff;padding: 3px;padding-left: 6px;padding-right: 6px;">
                    ${taskType==""?"单任务":taskType}</span>
                </div>
            </div>
            <div class="row" style="height: 50%;line-height: 40px;">
                <div class="col-xs-8" style="color: darkseagreen;">${prin==""?"暂无发布人":prin}</div>
                <div class="col-xs-4" style="color: darkseagreen;">${statusName[(parseInt(status)-1)]}</div>
            </div>
        </div>
    </div>
    `;
}

function peoject_Info(imgSrc,title,prin,status){
    return `
        <div class="projectinfo" style=" margin-top: 10px;border-bottom:0.5px solid;border-color: rgba(242, 242, 242, 1); height: 80px; width: 100%;padding: 0 !important;"
        class="container">
            <div class="col-xs-2" style="height: 100%;padding: 0 !important;">
                <img src="${imgSrc==""?"../images/u16.png":imgSrc}" alt="图片" style="width: 50px;height: 50px;position: relative; left: 50%;margin-left: -25px;top:50%;margin-top:-25px; ">
            </div>
            <div class="col-xs-10 " style="height: 100%;;">
                <div style="height: 50%;line-height: 40px;">
                    <span style="color: darkseagreen;">${title==""?"无标题":title}</span>
                </div>
                <div style="height: 50%;line-height: 40px;">
                    <div style="color: darkseagreen;float: left;">${prin==""?"暂无负责人":prin}</div>
                    <div style="color: darkseagreen;float:right;margin-right: 30px;">${status==""?"未完成":status}</div>
                </div>
            </div>
        </div>
    `;
}

function select_option(name,value){
    return `
    <li>
        <input id="chk_this_id_${value}" onclick="selcoop_option(this,true);" name="user" type="checkbox" data-value="${value}" data-name="${name}">${name}
    </li>
    `;
}