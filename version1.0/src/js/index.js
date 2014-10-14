/**
 * @author matthewsun
 *
 * @description 运动热量卡路里计算器
 * @version 1.0 初版
 * 
 * @link matthew-sun@foxmail.com
 * @date 2014/10/13
 */

/**
 * 获取键值
 * 
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */

var keys = function(obj) {
    var keys = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) keys.push(key)
    }
    return keys;
}

/**
 * 判断是不是数字
 * @param  {[type]}  val 判断的值
 * @return {Boolean}     [description]
 */

var isNumber = function(val) {
    return !isNaN(val) ? true : false; 
}

/**
 * 事件绑定
 * @param  {[type]}   obj 对象
 * @param  {[type]}   ev  事件
 * @param  {Function} fn  回调函数
 */

var bindEvent = function(obj, ev, fn) {
    obj.addEventListener ? obj.addEventListener(ev, fn, false) : obj.attachEvent('on' + ev, fn);
}

/**
 * 运动卡路里消耗数据
 * 单位（小时）：卡路里/公斤
 */

HEAT_CONSUMPTION_DATA = {
    
    // 日常活动
    '休息' : 1.1 ,
    '园艺' : 4.02 ,
    '扫地' : 2.01 ,
    '拖地' : 3.35 ,
    '烫衣服' : 4.02 ,
    '洗碗' : 1.74 ,
    '洗衣服' : 1.34 ,
    '走路(散步)' : 3.35 ,
    '走路(平路—快走,8公里/小时)' : 9.38 ,
    '走路上山，5.6公里/小时' : 6.7 ,
    '走路下山，4公里/小时' : 1.74 ,
    '在硬地上走路，中等步伐，4.8公里/小时' : 3.08 ,
    '在硬地上轻快的走路，6.4公里/小时' : 5.36 ,
    '下楼梯' : 2.68 ,
    '逛街' : 1.34 ,
    '郊游' : 2.01 ,
    '骑脚踏车(25.7-30.6公里/小时，赛车)' : 14.74 ,
    '骑脚踏车(16-19公里小时，慢慢骑)' : 6.7 ,
    '骑脚踏车(19-22.4公里/小时，放松骑)' : 9.38 ,

    // 体育活动
    '仰卧起坐' : 9.38 ,
    '一般健美操' : 4.02 ,
    '减肥健美操，强度较大' : 6.7 ,
    '芭蕾，现代舞，扭摆舞，爵士舞，踢踏舞，吉特巴舞' : 5.09 ,
    '快速跳舞' : 6.03 ,
    '慢慢跳舞（华尔兹，狐步）' : 2.68 ,
    '爱尔兰舞，波尔卡' : 4.69 ,
    '一般舞蹈，草裙舞，希腊舞，佛拉明哥舞，摇摆舞' : 4.69 ,
    '慢速游泳，自由式，中低强度' : 8.04 ,
    '游泳(侧泳)' : 9.38 ,
    '游泳(仰式)' : 8.04 ,
    '蛙泳，一般' : 12.06 ,
    '跑步，速度8公里/小时' : 9.38 ,
    '跑步，速度8.4公里/小时' : 10.72 ,
    '跑步，速度9.7公里/小时' : 12.06 ,
    '跑步，速度10.8公里/小时' : 13.4 ,
    '快速跳绳' : 14.74 ,
    '爬山' : 8.04 ,
    '排球，非比赛，一般' : 4.02 ,
    '棒球' : 5.36 ,
    '篮球比赛' : 9.38 ,
    '网球' : 9.38 ,
    '足球' : 9.38 ,
    '羽毛球' : 8.04 ,
    '乒乓球' : 4.02 ,
    '保龄球' : 2.68 ,
    '爬山' : 8.04 ,
    '高尔夫球' : 4.02 ,
    '垒球' : 5.36 ,
    '溜冰' : 1.34 ,
    '滑雪' : 8.04 ,
    '划船(独木舟)' : 4.02 ,
    '划船(一般)' : 2.68 ,
    '骑马(小跑)' : 4.02 ,
    '蝶泳，一般' : 13.4 ,
    '快速狗刨，（68米/分钟），高强度' : 13.4 ,
    '游泳，慢速狗刨（46米/分钟），中低强度' : 9.38 ,
    '慢速游泳，自由式，中低强度' : 8.04 ,
    '游泳，快速踩水，高强度' : 12.06 ,
    '跑步，速度11.3公里/小时' : 14.07 ,
    '跑步，速度12.1公里/小时' : 15.41 ,
    '跑步，速度12.9公里/小时' : 16.75 ,
    '跑步，速度13.8公里/小时' : 17.42 ,
    '跑步，速度14.5公里/小时' : 18.76 ,
    '跑步，速度16公里/小时' : 20.1 ,
    '跑步，速度17.5公里/小时' : 22.78 ,
    '跳绳，中等强度' : 12.6 ,
    '慢速跳绳' : 9.38 ,
    '排球比赛' : 9.38 ,
    '篮球，一般（非比赛）' : 6.7 ,
    '篮球，投篮' : 4.69 ,
    '网球，双打' : 5.36 ,
    '足球比赛' : 10.72 ,
    '羽毛球，双打' : 4.69 ,
    '台球' : 2.01
}

// 数据缓存
var cache = [];

/**
 * 初始化select框
 */

var initSelect = (function() {
    var oSelect = document.getElementById('J_selectOptions'),
        aKeys = keys(HEAT_CONSUMPTION_DATA),
        pushHtml = '';

    for( var i=0,len=aKeys.length; i<len; i++) {
        pushHtml += '<option value="'+ i +'">'+ aKeys[i] +'</option>';
    }

    oSelect.innerHTML = pushHtml; 

})();

/**
 * 添加事件
 */

var addEvent = (function() {
    var oAddBtn = document.getElementById('J_add') ,
        minute = document.getElementById('d_minutes'),
        oCalculate = document.getElementById('J_calculate');

    bindEvent(oAddBtn,'click',function() {
        addItem();
    })

    bindEvent(minute,'keyup',function(e) {
        if( e.keyCode == 13 ) {
            addItem();
        }
    })

    bindEvent(oCalculate,'click',function() {
        calculate();
    })

})();

/**
 * 增加一个项
 */
function addItem() {
    var oSelect = document.getElementById('J_selectOptions') ,
        option = oSelect.options[oSelect.selectedIndex].text ,
        minute = document.getElementById('d_minutes').value ,
        oUl = document.getElementById('J_output');
        pushHtml = '' ,
        aData = [] ;

    if( option === '' ) {
        alert('请选择一项运动');
        return ;
    }else if( !isNumber(minute) ) {
        alert('请输入正确的运动的时间');
        return ;
    }

    pushHtml = '<li>运动：'+ option +'，时间：'+ minute +'分钟<a href="javascript:;" onclick="removeItem(event);">删除</a></li>';
    
    aData.push(option);
    aData.push(minute);
    cache.push(aData);

    oUl.innerHTML += pushHtml;

}

/**
 * 删除一个项
 */
function removeItem(event) {
    var oUl = document.getElementById('J_output') ,
        aLi = oUl.getElementsByTagName('li') ,
        position = -1;

    Array.prototype.forEach.call(aLi,function(li,index){
        if( event.target.parentNode == li ) {
            position = index;
        }
    })

    if( position === -1) {
        return ;
    }else {
        cache.splice(position,1);
    }

    oUl.removeChild(event.target.parentNode);
}

/**
 * 计算所消耗热量
 * 单位：卡路里
 */

function calculate() {

    var weight = document.getElementById('d_weight').value ,
        oResult = document.getElementById('J_outResult') ,
        result = 0;

    if( !isNumber(weight) ) {
        alert('请输入您正确的体重！');
        return ;
    }

    for(var i=0,len=cache.length; i<len; i++) {
        result += Math.floor(weight*HEAT_CONSUMPTION_DATA[cache[i][0]]*cache[i][1]/60);
    }

    oResult.innerText = result;

}