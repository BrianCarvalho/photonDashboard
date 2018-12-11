var app = angular.module("App",['ngRoute']);
app.config(['$routeProvider',
    function($routeProvider) { 

        // Système de routage
        $routeProvider

        .when('/led', {
            templateUrl: '/static/view/led.html',
            controller: 'ledCtrl'
        })
        .when('/devices', {
            templateUrl: '/static/view/devices.html',
            controller: 'devicesCtrl'
        })
        .when('/detailsDevices', {
            templateUrl: '/static/view/detailsDevices.html',
            controller: 'detailsDevicesCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
    }
]);