/**
 * Services that persists and retrieves TODOs from localStorage
 */
angular.module('heatcalculation')
	.factory('todoStorage', function () {


		return {
			get: function (STORAGE_ID) {
				return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
			},

			put: function (calCache,STORAGE_ID) {
				localStorage.setItem(STORAGE_ID, JSON.stringify(calCache));
			}
		};
	});
