(function ($) {
    "use strict";
    $(function () {
        var mySwiper = new Swiper('.swiper-container', {
            loop: true,
            autoplay: true,
            delay: 6000,
            setWrapperSize: true,
            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
            },
        });

        // 全部活动
        $.ajax({
            url: ajaxPrefix + 'activity/searchAll',
            type: 'GET',
            cache: true,
            timeout: 6000,
            success: function (result) {
                if (result.status !== '2') {
                    renderActivity(result.msg, '#body');
                    result.msg.length < 1 ? $('#noData').fadeIn() : $('.project').fadeIn();
                } else {
                    layer.msg('查询失败！<br/>请重新刷新尝试！', {
                        icon: 2
                    });
                }
            },
            error: function (error) {
                layer.msg('获取数据失败！', {
                    icon: 2
                });
            }
        });

        // 界面点搜索跳转搜索界面
        $('.wrapper').on('click', '#searchNav', function (event) {
            window.location.hash = 'search';
        });

        // 搜索界面
        $('#searchTj div').on('click', 'li', function (event) {
            $(event.target).addClass('click').siblings().removeClass('click');
        });

        $(window).on('hashchange', function (event) {
            jumpHash();
        });

        jumpHash();

        function jumpHash() {
            var hash = window.location.hash.split('#');
            if (hash[1] === 'search') {
                $('#searchPage').slideDown();
                $('#searchPage #search').focus();
            } else {
                $('#searchPage').slideUp();
            }
        }

        // 点击搜索跳转搜索结果页
        $('#searchPage #searchBtn').on('click', function (event) {
            var searchVal = $('#search').val(),
                searchType = $('.searchType li.click').html(),
                searchLocation = $('.searchLocation li.click').html(),
                searchTime = $('.searchTime  li.click').html();

            window.location.href = './tpl/searchResult.html?sV=' + searchVal + '&sT=' + searchType +
                '&sL=' + searchLocation + '&sT=' + searchTime;
        });

        // 点击活动跳转到活动详情页
        $('body').on('click', '.project', function (event) {
            window.location.href = './tpl/activityDetail/index.html?targetId=' + event.currentTarget.dataset.id;
        });
    });

}(jQuery));