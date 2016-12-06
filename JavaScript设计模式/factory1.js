var countdown = {};
countdown.leftPad = function(n, len) {};
countdown.timeToSecond = function(t) {};
/**
 * 倒计时工厂
 * @param  {[object]} obj 倒计时配置信息
 * @return {[object]}     返回一个倒计时对象
 */
countdown.create = function(obj) {
    var o = {};
    o.dom = document.getElementById(obj.id);
    o.startMS = +new Date(obj.startTime || 0);
    o.endMS = +new Date(obj.endTime || 0);
    obj.totalTime && (o.totalTime = countdown.timeToSecond(obj.totalTime));

    var newCountdown = new countdown.style[obj.style](o);

    newCountdown.go = function(callback) {
        callback && (newCountdown.callback = callback);
        newCountdown.render();
        clearInterval(newCountdown.timer);
        newCountdown.timer = setInterval(newCountdown.render, 1000);
    };
    return newCountdown;
};
countdown.style.style1 = function(obj) {
    this.dom = obj.dom;
    this.startMS = obj.startMS;
    this.endMS = obj.endMS;
    var _this = this;
    this.render = function() {
        var currentMS = +new Date();
        var diff = (_this.endMS - currentMS) / 1000;
        var d = parseInt(diff / 60 / 60 / 24);
        d = countdown.leftPad(d, 3);
        d = d.replace(/(\d)/g, '<span>$1</span>');
        _this.dom.innerHTML = '距离国庆节还有：' + d + '天';
        if (currentMS > _this.endMS) {
            clearInterval(_this.timer);
            if (_this.callback) {
                _this.callback();
            } else {
                _this.dom.innerHTML = '国庆节倒计时结束';
            }
        }
    };
};
countdown.style.style2 = function(obj) {};
countdown.style.style3 = function(obj) {};
countdown.create({id:"clock3",totalTime:'82:23',style:'style1'}).go(function(){alert('It is over');});