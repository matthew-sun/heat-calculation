/*global angular */

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

angular.module('heatcalculation')
	.controller('heatCtrl', function heatCtrl($scope, $location, $filter, todoStorage) {

		// 初始化items
		// $scope.cache = [];

        var calCache = $scope.calCache = todoStorage.get();

        $scope.$watch('calCache', function (newValue, oldValue) {
            if (newValue !== oldValue) { // This prevents unneeded calls to the local storage
                todoStorage.put(calCache);
            }
        }, true);

        console.log(calCache)

		// angular.forEach(HEAT_CONSUMPTION_DATA,function(value,key) {

		// 	var item = {};
		// 	item.name = key;
		// 	item.K = value;
		// 	item.minute = '';

		// 	this.push(item);

		// },$scope.cache);

		// // 消耗卡路里值
		// // $scope.outResult = (function(){

		// // 	var result = 0;

  // //           if(calCache.items) {
  // //               for( var i=0,len=calCache.items.length; i<len; i++ ) {
  // //                   result += Math.floor( calCache.weight * calCache.items[i].minute/60 * calCache.items[i].K );
  // //               }
  // //           }

		// // 	return result;

		// // })();

		// // // sure item
		// // $scope.sureItem = function() {
		// // 	var turn = false;
  // //           var tips = '请选择一项运动！';

		// // 	for(var i=0,len=$scope.cache.length; i<len; i++) {
		// // 		if( $scope.cache[i].minute != '' ) {
  // //                   if( $scope.cache[i].minute > 0 ) {
  // //                       turn = true;
  // //                   }else {
  // //                       tips = '请输入正确的时间！';
  // //                   }
		// // 		}
		// // 	}

  // //           if( turn ) {

  // //               for(var i=0,len=$scope.cache.length; i<len; i++) {
  // //                   if( $scope.cache[i].minute != '' ) {
  // //                       if(!calCache.items) {
  // //                           calCache.items = [];
  // //                       }
  // //                       calCache.items.push([$scope.cache[i].name,$scope.cache[i].minute]);
  // //                   }
  // //               }

  // //           }else {
  // //               alert(tips);
  // //           }

  // //           // console.log(calCache)
  // //           $location.path('/')

		// // }

	});