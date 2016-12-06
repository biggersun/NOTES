var EventNotifys = [];
var Event = {
    notify:function(eventName, data){},
    subscribe: function (eventName, callback) {},
    unsubscribe: function (eventName, callback) {}
};
var timer = null;

$.countDown = function(deadline,domParam){
    var that = this,
        MILLS_OFFSET = 15;
    function CountDown(){
        this.deadline = deadline;
        this.domParam = domParam;
    };
    CountDown.prototype = {
        leftPad: function(n){},
        /**
        * 计算时差
        * @returns {{sec: string, mini: string, hour: string, day: string, month: string, year: string}}
        */
        caculate: function(){},
        /*刷新dom*/
        refresh: function(){}
    };
    
    var countDown = new CountDown();
    /**
     * 启动定时器
     * @param first 是否首次进入
     */
    function startTimer(first){
        !first&&Event.notify('TIMER');
        //若是首次进入，则根据当前时间的毫秒数进行纠偏，延迟1000-当前毫秒数达到整数秒后开始更新UI
        //否则直接1秒后更新UI
        //若当前毫秒数大于MILLS_OFFSET 15，则修正延时数值与系统时间同步
        mills = new Date().getMilliseconds();
        timer = setTimeout(arguments.callee,first?(1000 -mills):(mills>MILLS_OFFSET?(1000-mills):1000));
        console.log(new Date().getMilliseconds());
    }
    /**
     * 订阅一次事件
     */
    Event.subscribe('TIMER',countDown.refresh.bind(countDown));
    //首次初始化时启动定时器
    !timer && startTimer(true);
};

/*dom结构和样式与js分离，这里指定倒计时的dom节点信息作为配置*/
$.countDown('20160517 220451',{
    sec: $("#seconds6"),
    mini: $("#minute6"),
    hour: $("#hour6"),
    day: $("#day6"),
    month: $("#month6"),
    year: $("#year6")
});