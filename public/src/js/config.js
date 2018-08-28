'use strict';

angular.module('insight')
.constant('Constants', {

	CURRENCY: {
		LUX : 'LUX',
		USD : 'USD',
		mBTC : 'mBTC',
		bits : 'bits'
	},
	QRCOLOR : { 
		color: '#071434',
		background: '#ffffff'
	},
	BLOCKS_AMOUNT: 15,
	TRANSACTION_DISPLAYED: 10,
	BLOCKS_DISPLAYED: 5,
	CHART_DAYS: 14,
	STORAGE_ROWS: 5,
    NETWORK: window.current_network ? window.current_network : 'livenet',
    DEFAULT_LANGUAGE: localStorage.getItem('insight-language') || 'en',
    DEFAULT_CURRENCY: localStorage.getItem('insight-currency') || 'LUX',
	NODEMAP_LINK: window.nodemapLink
});

//Setting up route
angular.module('insight').config(function($routeProvider) {
	$routeProvider.
	when('/block/:blockHash', {
		templateUrl: 'views/block.html',
		title: 'Quantum Block '
	}).
	when('/block-index/:blockHeight', {
		controller: 'BlocksController',
		templateUrl: 'views/redirect.html'
	}).
	when('/tx/send', {
		templateUrl: 'views/transaction_sendraw.html',
		title: 'Broadcast Raw Transaction'
	}).
	when('/tx/:txId/:v_type?/:v_index?', {
		templateUrl: 'views/transaction.html',
		title: 'Quantum Transaction '
	}).
	when('/', {
		templateUrl: 'views/index.html',
		title: 'Home'
	}).
	when('/blocks', {
		templateUrl: 'views/block_list.html',
		title: 'Quantum Blocks solved Today'
	}).
	when('/blocks-date/:blockDate/:startTimestamp?', {
		templateUrl: 'views/block_list.html',
		title: 'Quantum Blocks solved '
	}).
	when('/address/:addrStr', {
		templateUrl: 'views/address.html',
		title: 'Quantum Address '
	}).
	when('/contracts/:contractAddressStr', {
		templateUrl: 'views/contract.html',
		title: 'Quantum Contract '
	}).
	when('/status', {
		templateUrl: 'views/status.html',
		title: 'Status'
	}).
	when('/messages/verify', {
		templateUrl: 'views/messages_verify.html',
		title: 'Verify Message'
	}).
	when('/charts', {
		templateUrl: 'views/charts.html',
		title: 'Charts'
	}).
	when('/stats', {
		templateUrl: 'views/statistics.html',
		title: 'Stats'
	}).
	when('/stats/:type/:days', {
		controller: 'StatisticsController',
		templateUrl: 'views/chart.html',
		title: 'Statistics'
	}).
	when('/tokens/search', {
		controller: 'TokensSearchController',
		templateUrl: 'views/tokens_search.html',
		title: 'Tokens Search'
	}).
	when('/token/:address/:tab?', {
		controller: 'TokenController',
		templateUrl: 'views/token/token.html',
		title: 'Token'
	}).
    when('/e404', {
        templateUrl: 'views/404.html',
        title: 'Error'
    }).
    when('/rich-list', {
        controller: 'RichListController',
        templateUrl: 'views/rich_list.html',
        title: 'Rich List'
    }).
	otherwise({
		templateUrl: 'views/404.html',
		title: 'Error'
	});
});

//Setting HTML5 Location Mode
angular.module('insight')
	.config(function($locationProvider) {
		$locationProvider.html5Mode(true);
		$locationProvider.hashPrefix('!');
	})
	.run(function($rootScope, $route, $location, $routeParams, $anchorScroll, gettextCatalog, amMoment, Constants) {

        var original = $location.path;
        $location.path = function (path, reload) {
            if (reload === false) {
                var lastRoute = $route.current;
                var un = $rootScope.$on('$locationChangeSuccess', function () {
                    $route.current = lastRoute;
                    un();
                });
            }
            return original.apply($location, [path]);
        };


		gettextCatalog.currentLanguage = Constants.DEFAULT_LANGUAGE;
		amMoment.changeLocale(Constants.DEFAULT_LANGUAGE);

		$rootScope.$on('$routeChangeSuccess', function() {

			//Change page title, based on Route information
			$rootScope.titleDetail = '';
			$rootScope.title = $route.current.title;
			$rootScope.isCollapsed = true;
			$rootScope.currentAddr = null;

			$location.hash($routeParams.scrollTo);
			$anchorScroll();
		});
	});
