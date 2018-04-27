//存放主要交互逻辑js代码
//javascript 模块化

var seckill = {
    //封装秒杀相关ajax的url
    URL: {
        now: function () {
            return '/seckill/time/now';
        },
        exposer: function(seckillId) {
               return '/seckill/'+seckillId+'/exposer';
        },
        execution: function (seckillId, md5) {
            return '/seckill/' + seckillId + '/' + md5 + '/execution';
        }
    },
    // 验证手机号
    validationPhone: function (phone) {
        return !!(phone && phone.length === 11 && !isNaN(phone));
    },
    handleSeckillkill: function (seckillId, node) {
        //获取秒杀地址，控制显示逻辑，执行秒杀
        node.hide()
            .html('<button class="btn btn-primary btn-lg" id="killBtn">开始秒杀</button>'); //按钮
        $.post(seckill.URL.exposer(seckillId),{},function (result) {
            //在回调函数中，执行交互流程
            if(result && result['success']){
                var exposer = result['data'];
                if(exposer['exposed']){
                    //开启秒杀
                    //获取秒杀地址。
                    var md5 = exposer['md5'];
                    var killUrl = seckill.URL.execution(seckillId, md5);
                    console.log("killUrl:" + killUrl);
                    //绑定一次点击事件
                    $('#killBtn').one('click', function () {
                        //执行秒杀请求的操作
                        //1:先禁用按钮
                        $(this).addClass('disabled');
                        $.post(killUrl,{},function (result) {
                            if(result && result['success']){
                                var killResult = result['data'];
                                //var state = killResult['state'];
                                var stateInfo = killResult['stateInfo'];
                                //显示秒杀结果
                                node.html('<span class="label label-success">' + stateInfo + '</span>');
                            }
                        });
                    });
                    node.show();
                }else{
                    //未开始秒杀,用户系统时间快了
                    var now = exposer['now'];
                    var start = exposer['start'];
                    var end = exposer['end'];
                    //重新计算计时逻辑 因为当计时足够长的时候游览器的时间与服务器的时间可能不一样
                    //相当于将游览器执行的js脚本的时间与服务器同步
                    seckill.countdown(seckillId, now, start, end);
                }
            } else {
                console.log('result'+result);
            }
        })
    },
    countdown: function (seckillId, nowTime, startTime, endTime) {
        var  seckillBox= $('#seckill-box');
      //时间判断
        if (nowTime > endTime) {
            //秒杀结束
            console.log("enddddddddddddddd");
            seckillBox.html("秒杀结束！");
            seckillBox.css({display:"contents"})
            //todo
        } else if (nowTime < startTime) {
            //秒杀未开始，计时事件绑定
            var killTime = new Date(startTime + 1000);
            seckillBox.countdown(killTime,function (event) {
                //时间格式
                var format = event.strftime('秒杀倒计时： %D天 %H时 %M分 %S秒');
                seckillBox.html(format);
            }).on('finish.countdown', function () {
                //获取秒杀地址，控制显示逻辑，执行秒杀
                seckill.handleSeckillkill(seckillId, seckillBox);
            });
        } else {
            //秒杀开始
            seckill.handleSeckillkill(seckillId, seckillBox);
        }
    },
    //详情页秒杀逻辑
    detail: {
        //详情页初始化
        init: function (params) {
            //    手机验证登录和 计时交互
            //    规划我们的交互流程
            //    在cookie中查找手机号
            var killPhone = $.cookie('killPhone');
            //验证手机号
            if (!seckill.validationPhone(killPhone)) {
                //绑定phone
                //控制输出
                var killPhoneModal = $('#killPhoneModal');
                killPhoneModal.modal({
                    show: true, //显示弹出层
                    backdrop: false, //禁止位置关闭
                    keyboard: false //关闭键盘事件
                });
                $('#killPhoneBtn').click(function () {
                    var inputPhone = $('#killPhoneKey').val();
                    //console.log("killPhoneKey: ", inputPhone)
                    if (seckill.validationPhone(inputPhone)) {
                        //写入电话进入cookie
                        $.cookie('killPhone', inputPhone, {expires: 7, path: '/seckill'});
                        //刷新页面
                        window.location.reload();
                    } else {
                        $('#killPhoneMessage').hide().html('<label class="label label-danger">手机号错误!</label>').show(300)
                    }
                });
            }
            //已经登录
            //计时交互
            var startTime = params['startTime'];
            var endTime = params['endTime'];
            var seckillId = params['seckillId'];
            $.get(seckill.URL.now(), {}, function (result) {
               if (result && result['success']){
                   var nowTime = result['data'];
                   //时间判断countdown 计时交互
                   seckill.countdown(seckillId, nowTime, startTime, endTime);
               } else{
                   console.log('result:' + result);
               }
            });

        }
    }
};