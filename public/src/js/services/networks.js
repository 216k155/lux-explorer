'use strict';

angular.module('insight.networks')
	.factory('Networks',
		function(Constants, LuxCoreLib) {
			return {
				getCurrentNetwork: function () {
					return LuxCoreLib.Networks.get(Constants.NETWORK);
				}
			}
		});