angular.module('votacioneslive')


.controller('CuidadorCtrl', function($scope, $state,  AuthServ, $q, toastr, $http, MySocket, $uibModal){


	  MySocket.emit('traer_clientes');

	MySocket.on('me_recibieron_logueo', function(data){
		
		MySocket.emit('traer_clientes');

	});	  

	

	MySocket.on('logueado:alguien', (data)=>{
		MySocket.emit('traer_clientes');
	});


	MySocket.on('clientes_traidos', function(data){

		 $scope.puntos = data;	 
	});	
	 


	$scope.Tabla_Participantes = function(){

		
		$http.get('::usuarios').then (function(result){
			$scope.Participantes = result.data ;

		
	
		}, function(error){
			console.log('No se pudo traer los datos', error);

		})
			
    };

    $scope.Tabla_Participantes();


    $scope.Ver_Control = function(){

	    var modalInstance = $uibModal.open({
	        templateUrl: 'templates/Control_modal.html',
	        resolve: {
		        punto: function () {
		        	return   $scope.puntos;
		        }
		    },
	        controller: 'Control'  
	    });

	    modalInstance.result.then(function (result) {


	    	MySocket.emit('traer_cliente', {id: result});
	   

			
	    }, function(r2){
	    	$scope.traerDatos();
	    });
			
	} 

	
})

.controller("Control", function($uibModalInstance, $scope, punto, ConexionServ, toastr, $filter) {

	$scope.puntos = punto; 

	

	$scope.Enviar_Usuario = function (Mens) {

		

        $uibModalInstance.close(Mens);
    };

	$scope.ok = function () {
        $uibModalInstance.close('Cerrado');
    };

    return ;

   
})