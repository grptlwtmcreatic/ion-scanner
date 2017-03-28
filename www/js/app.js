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

//Controleur pour saisir ou modifier une fiche produit.

.controller('saisirController', ['$scope', '$http','$state', function($scope, $http, $state){

//On lance le scanner et on récupère dans data l'adresse encodée.

   $scope.onSuccess = function(data) {

      $read = data;
      console.log(data);

//On récupère l'id unique du QR pour le mettre dans le formulaire

      id_qr_code = $read.replace("http://quai-lab.com/?pr_inventory=product&pr_qrcode=","");
      $('input[type=hidden]').val(id_qr_code);
      $('#id_qr_code1').html("Le QR Code est récupéré.");
        
      if (id_qr_code != null){
                    
          console.log(id_qr_code);

//On récupère le json associé à l'adresse encodée et si il n'est pas vide, on remplit les champs du formulaire.

          var json = $.getJSON($read);
                    
          if (json != null){
            $read = $read.replace("product", "quickview");
            $.getJSON($read, function(data) {
              $('#libelle').val(data.title);
              $('#description').val(data.description);
              $img = data.img;
              jQuery('#img').attr('src', $img);
            });
          }
      }

        
        /*$scope.save = function(){
          
          console.log("je suis dans la fonction save")

            
         // J'empêche le comportement par défaut du navigateur, c-à-d de soumettre le formulaire
 
        
 
          libelle = $('#libelle').val();
          image = $('#image').val();
          description = $('#description').val();
          qrcode = $('#qrcode').val();
 
          
         /*$http.post(
            'http://quai-lab.com/?pr_inventory=add',
            {'libelle ': libelle, 'description' : description, 'image' : image, 'qrcode' : qrcode},
            'contenttype'
          ).then(function successCallback(response) {
              // this callback will be called asynchronously
              // when the response is available
              console.log('OK' + response)
            }, function errorCallback(response) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
              console.log('Erreur' + response)
            });*/

            //console.log(image)
            /*$.ajax({
                url: "http://quai-lab.com/?pr_inventory=add",
                type: "POST",
                data: {libelle : libelle, description : description, qrcode : qrcode},
                
                success: function(response, statut) {
                    console.log(response)
                    if(response == true) {
                        console.log("j'ai bien envoyé");
                        
                        
                        
                    } else {
                        console.log('Erreur : '+ response);
                    }
                },
                error: function(response, statut) {
                  console.log('ahhh' +response)
                  
                },

                complete : function(resultat, statut){
                  $state.go('home');
                }

            });
                
          
          
        }*/


    };
    $scope.onError = function(error) {
        console.log(error);
    };
    $scope.onVideoError = function(error) {
        console.log(error);
    }; 

    $(function(){
          $('#saisirF').on('submit', function(e){
            e.preventDefault();

            var $form = $(this);
            var formdata = (window.FormData) ? new FormData($form[0]) : null;
            var data = (formdata !== null) ? formdata : $form.serialize();

            $.ajax({
              url: $form.attr('action'),
              type: $form.attr('method'),
              contentType: false,
              processData: false,
              dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
              data: data,
              success: function (response) {
                console.log("success")
              },

              error: function(response) {
                console.log("error")
                console.log(response)
              },

              complete : function(resultat, statut){
                  $state.go('home');
                }
            });
            
            
            
            
          });
        });

}])

//Scan pour s'authentifier.

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
