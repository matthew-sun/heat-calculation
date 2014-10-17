/*global angular */

angular.module('heatcalculation', ['ngRoute'])
	.config(function ($routeProvider) {
		'use strict';

		$routeProvider.when('/',{
			controller : 'heatCtrl',
			templateUrl : 'heat-index.html'
		}).when('/add',{
			controller : 'heatCtrl',
			templateUrl : 'heat-additem.html'
		}).otherwise({
			redirectTo : '/'
		});

	});
