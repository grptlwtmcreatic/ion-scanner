// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','qrScanner'])
//angular.module('scanner.controllers', [])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.controller('stopVideo', function($scope){

})

.controller('saisirController', function($scope){

   $scope.onSuccess = function(data) {
              
       $('#saisir').css({"display":"block"})
       $('#read').html(data);
        $read = data;
        console.log(data);
       id_qr_code = $read.replace("http://quai-lab.com/?pr_inventory=product&pr_qrcode=", "");
      var idq = id_qr_code;
       $('input[type=hidden]').val(idq);
       $('#id_qr_code1').html("La QR Code est récupéré.");
       
       if (idq != null){
         $('#reader').remove();
         $('#change').remove();
                    
          console.log(idq);
          var json = $.getJSON($read);
                    
          if (json != null){
            $read = $read.replace("product", "quickview");
            $.getJSON($read, function(data) {
              $('#lib').val(data.title);
              $('#description').val(data.description);
              $img = data.img;
              jQuery('#img').attr('src', $img);
            });
          }
        }
    };
    $scope.onError = function(error) {
        console.log(error);
    };
    $scope.onVideoError = function(error) {
        console.log(error);
    }; 
})


.controller('authentification', ['$scope', '$http', '$state', function($scope, $http, $state) {

    $scope.onSuccess = function(data) {
        console.log(data)
        $http({
          method: 'GET',
          url: 'http://www.quai-lab.com/?pr_inventory=check_admin&pr_qrcode=' + data
        }).then(function successCallback(response) {
          console.log(response)
          if (response.data == "1"){
            console.log("OKKKKKKK")
            $state.go('Saisir');
          }
          else{
            console.log("PAS OKKKKKKK")
          }
          }, function errorCallback(response) {
            console.log("CaCA")
            
          });
                 
        
    };
    $scope.onError = function(error) {
        console.log(error);
    };
    $scope.onVideoError = function(error) {
        console.log(error);
    };

    $scope.stopVideo = function(){
      console.log("Video eteinte");
    };
}])


.controller('scanController', ['$scope', function($scope) {

    $scope.onSuccess = function(data) {
        
        console.log(data);
        $read = data;
        $("#read").attr('href', $read);
              $read = $read.replace("product", "quickview");
                  $.getJSON($read, function(data) {
                      $('#title').html(data.title);
                      $img = data.img;
                      $('#quickview').attr('src', $img);
                  });

        
    };
    $scope.onError = function(error) {
        console.log(error);
    };
    $scope.onVideoError = function(error) {
        console.log(error);
    };

    $scope.stopVideo = function(){
      console.log("Video eteinte");
    };
}])

//http://quai-lab.com/?pr_inventory=product&pr_qrcode=584e5ff437551
//

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('home',{ url:'/home', templateUrl:'views/home.html'})

  .state('Saisir',{ url:'/Saisir', templateUrl:'views/Saisir.html', controller:'saisirController'})

  .state('authentification',{ url:'/authentification', templateUrl:'views/authentification.html', controller:'authentification'})

  .state('Scan',{ url:'/Scan', templateUrl:'views/Scan.html' ,controller: 'scanController'})
  ;
  $urlRouterProvider.otherwise('/home');
})
