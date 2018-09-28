angular.module('votacioneslive')


.controller('ControlCtrl', function($scope, $state,  AuthServ, $q, toastr, $http, MySocket, $uibModal){



	  MySocket.emit('traer_clientes');

	MySocket.on('me_recibieron_logueo', function(data){
		
		MySocket.emit('traer_clientes');

	});	  

	

	MySocket.on('logueado:alguien', (data)=>{
		MySocket.emit('traer_clientes');
	});


	MySocket.on('clientes_traidos', function(data){

		 
		 data.nombre_punto  = "hola" ;	

		 $scope.puntos = data;	 
	});	

	

	 

	$scope.Ver_Usuario = function(punto){

	    var modalInstance = $uibModal.open({
	        templateUrl: 'templates/Usuario_puntos.html',
	        resolve: {
		        punto: function () {
		        	return  punto;
		        }
		    },
	        controller: 'Usuario_punto'  
	    });

	    modalInstance.result.then(function (result) {

	    	 MySocket.emit('Cerrar_sesion', {id: result});

			
	    }, function(r2){
	    	$scope.traerDatos();
	    });
			
	} 
})

.controller("Usuario_punto", function($uibModalInstance, $scope, punto, ConexionServ, toastr, $filter) {

    $scope.punto = punto; 
    


    $scope.CErrar = function (Id) {

    	$scope.id = Id;

        $uibModalInstance.close($scope.id);
    };

   

    $scope.ok = function () {
        $uibModalInstance.close('Cerrado');
    };

    return ;
})