angular.module('App')
.controller('ledCtrl', ['$scope','$http',function($scope, $http){
      
    // LED
    $scope.valider = function(params) {
        $http.post(
         'https://api.particle.io/v1/devices/1b0024000f47363333343437/led?access_token=00c0bb8d81b2561bd710e7ae774913d727a0f559',
        {arg: params},
        {headers : { 'Content-Type': 'application/json' }} 
        )
          .then(function(data) {
              console.log(data);
              
                if(data.data.return_value == 1){
                    
                    $scope.led_on = true;
                    alert('Lumiere allumée ! ');
                    
                }
                else if (data.data.retun_value == 0) {
                    
                    $scope.led_off = true;
                    alert('Lumiere eteint ! ');
                    
                }
                else if (data.data.return_value == -1) {
                    alert('Erreur -1');
                }

              

            }, function errorCallback(err) {
                console.log(err)
                
              });
    };

}]);