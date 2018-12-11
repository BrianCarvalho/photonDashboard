angular.module('App')
.controller('devicesCtrl', ['$scope','$http',function($scope, $http){


function afficherDevices()
    {
        $http({
            method: 'GET',
            url: '/api/devices/'
          }).then(function successCallback(response) {
              
            //je déclare ma variable pour ma vue ( index.html)
            $scope.listDevices = response.data;
    
            console.log(response);
            
        }, function errorCallback(response) {
              
        });
    }
    afficherDevices();

}]);
