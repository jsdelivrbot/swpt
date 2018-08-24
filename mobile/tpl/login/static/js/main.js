( function ( $ ) {
    'use strict';
    $( function () {
        var user=window.localStorage['user']?JSON.parse(window.localStorage['user']):null;
        if(user!=null){
            window.location.href='/'
        }
        $( 'input' ).on( 'change', function ( event ) {
            if ( $( '.wrongMsg' ).css( 'display' ) !== 'none' ) $( '.wrongMsg' ).fadeOut();
        } );
        var code='';
        $("#getRegCode").on('click',function (event) {
            code='';
            var codeLength = 6; //验证码的长度
            var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9); //随机数
            for (var i = 0; i < codeLength; i++) { //循环操作
                var index = Math.floor(Math.random() * 10); //取得随机数的索引（0~35）
                code += random[index]; //根据索引取得随机数加到code上
            }
            $(this).val(code);
        })

        $( '#loginForm' ).submit( function ( event ) {
            event.preventDefault();
            if ( !window.localStorage.getItem( 'user' ) ) {
                //var explain = $( '#explain' ).prop( 'checked' );
                //if ( explain ) {
                    var accVal = $( '#account' ).val(),
                        pwdVal = $( '#pwd' ).val();
                    if ( accVal === '' ) {
                        $( '#account' ).focus();
                        $( '#wrongMsg' ).html( '请输入账号' ).parent().fadeIn();
                    } else if ( pwdVal === '' ) {
                        $( '#pwd' ).focus();
                        $( '#wrongMsg' ).html( '请输入密码' ).parent().fadeIn();
                    } else {
                        var tmpData = decodeURIComponent( $( '#loginForm' ).serialize() ),
                            data = {};
                        tmpData.split( '&' ).forEach( function ( key ) {
                            var tmp = key.split( '=' );
                            data[ tmp[ 0 ] ] = tmp[ 1 ];
                        } );
                        $.ajax( {
                            url: ajaxLogin + 'htUserService/login',
                            type: 'POST',
                            dataType: 'json',
                            contentType: 'application/json;charset=UTF-8',
                            cache: true,
                            timeout: 6000,
                            data: JSON.stringify( data ),
                            success: function ( result ) {
                                if ( result.status === '0' ) {
                                    window.localStorage.setItem( 'user', JSON.stringify( result.msg ) );
                                    layer.msg( '登陆成功', {
                                        icon: 1,
                                        time: 2000,
                                        end: function () {
                                            //historyUtils.back();
                                            window.parent.location.href="/";
                                        }
                                    } );
                                } else {
                                    $( '#wrongMsg' ).html( result.statusMsg ).parent().fadeIn();
                                }
                            },
                            error: function ( error ) {
                                layer.msg( '登陆失败，请重试！', { icon: 2 } );
                            }
                        } );
                    }
                //} else {
                //    $( '#explain' ).focus();
                //    $( '#wrongMsg' ).html( '请务必勾选同意下面选择框！' ).parent().fadeIn();
                //}
            } else {
                layer.msg( '您已经在登陆状态', {
                    icon: 1,
                    time: 2000,
                    end: function () {
                        //historyUtils.back();
                        window.parent.location.href="/";
                    }
                } );
            }
        } );

        /*// 获取账号
        $( '#getAcc' ).on( 'click', function ( event ) {
            console.log( event );
            layer.open( {
                type: 1,
                title: false,
                closeBtn: 0,
                area: '100%',
                skin: 'layui-layer-nobg', //没有背景色
                shadeClose: true,
                content: $( '#getAccBody' )
            } )
        } );*/
        // 注册账号
        var user_err=false;
        $( '#getAcc' ).on( 'click', function ( event ) {
            console.log( event );
            layer.open( {
                type: 1,
                title: false,
                closeBtn: 0,
                area: '100%',
                skin: 'layui-layer-nobg', //没有背景色
                shadeClose: true,
                content: $( '#regUser' )
            } )
        } );

        $( '#reg_account' ).on( 'blur', function ( event ) {
            var username=$(this).val();
            if(username==''){
                $( '#regWrongMsg' ).html( '手机号输入有误，请重新输入' ).parent().fadeIn();
                return false;
            }
            var mobileYzm =/^1(3|4|5|7|8)\d{9}$/i;
            if(!mobileYzm.test(username)){
                $( '#regWrongMsg' ).html( '手机号输入有误，请重新输入' ).parent().fadeIn();
                return false;
            }
            $.get(ajaxLogin+"htUserService/checkUserRegister?username="+username, function(data){
                if(data.msg===false){
                    $( '#regWrongMsg' ).html( '该手机号已注册，请点击登录' ).parent().fadeIn();
                }else{
                    user_err=true;
                }
            });
        });
        $( '#regUserForm' ).submit( function ( event ) {
            event.preventDefault();
            if ( !window.localStorage.getItem( 'user' ) ) {
                var accVal = $( '#reg_account' ).val(),
                    codeVal = $( '#getRegCode' ).val(),
                    pwdVal = $( '#reg_pwd' ).val(),
                    rpwdVal = $( '#reg_rpwd' ).val();
                if(pwdVal!=rpwdVal){
                    $( '#regWrongMsg' ).html( '二次输入密码不一样' ).parent().fadeIn();
                    return false;
                }
                if(accVal=='' || !user_err){
                    $( '#regWrongMsg' ).html( '手机号没填写或已经注册存在' ).parent().fadeIn();
                    return false;
                }
                if(code!=codeVal){
                    $( '#regWrongMsg' ).html( '验证码输入不正确' ).parent().fadeIn();
                    return false;
                }
                $.ajax({
                    type:"post",
                    url:ajaxLogin+"htUserService/getAddUser",
                    contentType:"application/json",
                    headers:{"Access-Control-Allow-Origin":"*"},
                    data:JSON.stringify({
                        "username":accVal,//用户名
                        "password":pwdVal, //密码
                        "identifyingCode":codeVal, //验证码
                    }),
                    success:function(data){
                        console.log(data);
                        if(data.status==0){
                            // $scope.show_company=true;
                            window.localStorage.setItem( 'user', JSON.stringify(data.msg) );
                           // var user = JSON.stringify({"id":data.msg.id,"username":accVal,"companyExit":false});
                           // localStorage.setItem("user",user);
                            alert("注册成功");
                            window.parent.location.href="/";
                            // window.history.go(-1)
                        }else{
                            alert(data.statusMsg)
                        }
                    },
                    error:function(){
                        alert('登录服务器出错')
                    }
                })
            }else {
                layer.msg( '您已经在登陆状态',{
                    icon: 1,
                    time: 2000,
                    end: function () {
                        //historyUtils.back();
                        window.parent.location.href="/";
                    }
                });
            }
        } );
    } );
} )( jQuery );
