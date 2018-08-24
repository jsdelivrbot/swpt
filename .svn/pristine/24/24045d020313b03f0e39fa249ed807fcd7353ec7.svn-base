/**
 * Created by Administrator on 2018/4/19.
 */
$(function(){
      var url = window.location.search.replace(/^(\?obj=)/,'')
      var h = window.innerHeight
     $('.modal').css({
         'height':h
     })
      var uid = JSON.parse(localStorage.getItem('user')).id
      var fn = {
          block:function(){
              $('.bodies').css({
                  "display":"block"
              })
              $('.footer').css({
                  "display":"block"
              })
          },
          none:function(){
              $('.bodies').css({
                  "display":"none"
              })
              $('.footer').css({
                  "display":"none"
              })
          },
          loading:function(num){
              switch (num){
                  case 'none':
                      $('.loading').css({
                          'display':'none'
                      })
                      break;
                  case 'block':
                      $('.loading').css({
                          'display':'block'
                      })
                      break
              }
          },
          modal: function (name) {
              $('.modal').css({
                  'zIndex': '999',
                  'opacity': '1'
              })
              $('.modal_box').css({
                  'width': '4rem',
                  'height': '2rem'
              })
              $(name).css({
                  'display': 'block'
              })
              setTimeout(function () {
                  $('.modal').css({
                      'zIndex': '-1',
                      'opacity': '0'
                  })
                  $('.modal_box').css({
                      'width': '0',
                      'height': '0'
                  })
                  $(name).css({
                      'display': 'none'
                  })
              }, 1000)
          }
      }
      fn.loading('none')
      if(url){
          var obj = JSON.parse(decodeURIComponent(url))

          var data={
              classname:obj.classname,
              method:"getById",
              node_id:obj.nodeid,
              record:obj.variableid
          }
          var bol = Object.keys(obj).every(function(item,index){
              return !!obj[item]
          })
          $('.repeal_btn').on('touchstart',function(){
              $.ajax({
                  url:withdraw+obj.processInId,
                  type:'get',
                  success:function(res){
                      fn.modal('.a')
                      setTimeout(function(){
                          window.location.href = '../myinitiator/index.html'
                      },400)
                  }
              })
          })
          switch (obj.start){
              case '已审批':
                  $('.state').addClass('audit')
                  break;
              case '待审批':
                  $('.state').addClass('pass')
                  break
          }
          request()
          $('.reminder_btn').on('touchend',function(){
              window.location.href = '../reminder/index.html?msg='+encodeURIComponent(obj.processInId)
          })
      }else{
          $('.nothing').css({
              'display':'block'
          })
      }
      //相应成功函数
      function request() {
          $('.alterable').text(data.classname)
          $('.firstflow .flowtime').text(getTime(obj.time)+'发送')
          $('.loading').css({
              'display':'block'
          })

          $.ajax({
              type:'get',
              url:selectUserById+uid,
              success:function(suc){
                  if(suc.status === '1'){
                      var user = suc.msg.user
                      $.ajax({
                          type:'POST',
                          url:selectFormRecord,
                          headers : {'Content-Type':'application/json'},
                          data:JSON.stringify(data),
                          success:function(res){
                              if(res.status == '0'){
                                  $('.loading').css({
                                      'display':'none'
                                  })
                                  fn.block()
                                  var html = tpl('state',obj,user,res.msg.data,res.msg.selected,res.msg.title)
                                  console.log(html)
                                  $('.details').append(html)
                              }else{
                                  $('.loading').css({
                                      'display':'none'
                                  })
                                  fn.block()
                              }
                          }
                      })
                  }
              }
          })
          $.ajax({
              type:'get',
              url:activitiTrack+obj.processInId+'&uid=0',
              success:function(res){
                  if(res.isLogin === 'yes'){
                      var html = ''
                      var arr = res.activitiTrackList
                      arr.splice(0,1)
                      if(arr[arr.length-1].name==='结束')arr.pop()
                      arr.forEach(function(item){
                          if(item.commentMessage==='申请人已撤回'){
                              $('.repeal_btn').remove()
                              $('.reminder').remove()
                          }
                      })
                      arr.forEach(function(item){
                          html+=flowTpl(item)
                      })
                      $('.firstflow').after(html)
                  }
              }
          })
      }
      //模板函数,方法传入6个参数,分别是跳转页面的审批状态,传入对象,用户信息,百度编辑器的三个参数
      function tpl(name,obj,user,data,selected,title) {
          var stateDom = document.getElementsByClassName(name)
          $('.flow_name').text(user.chinese_name)
          for(var i=0;i<stateDom.length;i++){
              stateDom[i].innerText = obj.start
              switch(obj.start){
                  case '待审批':
                      $(stateDom[i]).addClass('pass')
                      break;
                  case '已审批':
                      $(stateDom[i]).addClass('audit')
                      break
              }
          }
          var uptpl = '<p class="name f17">姓名:&nbsp;'+user.chinese_name+'</p>' +
              '<p class="phone">电话:&nbsp;'+user.family_phone+'</p>' +
              '<p class="number">审批编号:&nbsp;' + obj.processInId + '</p>'

          var downtpl = ''
          Object.keys(selected).reverse().forEach(function (item, index) {
              downtpl += '<p>' + title[index] + ':&nbsp;' + data[item] + '</p>'
          })
          return uptpl + downtpl
      }
    function flowTpl(obj){
        var createTime = getTime(obj.createTime)
        var state = !!obj.lastUpdateTime?'已同意':'待审核'
        var span = !!obj.lastUpdateTime?'转交':'发送'
        var cls = !!obj.lastUpdateTime?"audit":"pass"
        if(obj.commentMessage === '申请人已撤回'){
            var tpl = '<div class="lastflow">' +
                '<div class="flowphoto">' +
                '<img src="" alt="">' +
                '<div class="flowborder"></div>' +
                '</div>' +
                '<div class="flowname"><span class='+cls+'>申请人已撤回</span>' +
                '</div>' +
                '<div class="flowtime">'+createTime+'撤回</div>' +
                '</div>'
        }else{
            var tpl = '<div class="lastflow">' +
                '<div class="flowphoto">' +
                '<img src="" alt="">' +
                '<div class="flowborder"></div>' +
                '</div>' +
                '<div class="flowname">'+obj.assigneeName+'&nbsp;&nbsp;<span class='+cls+'>'+state+'</span>' +
                '</div>' +
                '<div class="flowtime">'+createTime+span+'</div>' +
                '</div>'
        }
        return tpl
    }
    //时间函数
    function getTime(data) {
        var date = new Date(data)
        var Y = date.getFullYear()
        var M = date.getMonth() + 1
        var D = date.getDate()
        return Y + '-' + M + '-' + D
    }
})