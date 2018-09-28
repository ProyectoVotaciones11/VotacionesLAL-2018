angular.module('votacioneslive')


.controller('LoginCtrl', function($scope, $state, ConexionServ, AuthServ, $http, MySocket, toastr){

      MySocket.on('cliente_traido', function(data){

        console.log(data);

         toastr.success(data);
        
        

      });  
    
    $scope.user ={};
    
    if (localStorage.servidor) {
    	$scope.servidor = localStorage.servidor
    } else {
    	$scope.servidor = location.hostname
    }
  	

  	$scope.mostrarCambiarServ = function(){
  		$scope.mostrar_cambiar_serv = !$scope.mostrar_cambiar_serv;
  	}

    
  	$scope.cambiar_servidor = function(servidor){
  		localStorage.servidor = servidor;

  		$scope.mostrarCambiarServ();
  	}


    $scope.entrar = function(user){
           
        AuthServ.loguear(user).then(function(){
            $state.go('panel.Votar')
        }, function(){
            alert('Datos incorrectos');
        })    
    }
    
    ConexionServ.createTables();


	
	
 
})