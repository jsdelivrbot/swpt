/**
 * Created by Administrator on 2018/1/19.
 */
var app = angular.module( 'gzsw', [] )
    .controller( 'myController', [ "$scope", function ( $scope ) {
        $scope.show = true;
        $scope.userState = true;
        $scope.userInfo = window.localStorage[ 'user' ] ? JSON.parse( window.localStorage[ 'user' ] ) : null;
        if ( $scope.userInfo !== null ) {
            $scope.userState = false;
            $scope.userName = $scope.userInfo[ 'username' ];
        }

        $scope.outLogin = function () {
            var storage = window.localStorage;
            storage.clear();
            parent.location.reload();
        }
        //android APP 下载触发事件
        $scope.downloadFile = function(){
            var android =  navigator.userAgent.toLowerCase();
            var bool = false
            if(android.indexOf('android') > -1){
                bool = true
            }
            if(bool){
                // window.loginMessage.unLogin()
                window.loginMessage.downloadFile()
            }
        }
    } ] )
