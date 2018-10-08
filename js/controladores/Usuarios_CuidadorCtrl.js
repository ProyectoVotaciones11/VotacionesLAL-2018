angular.module('votacioneslive')


.controller('Usuarios_CuidadorCtrl', function($scope, $state,  AuthServ, $q, toastr, $http, MySocket, $uibModal, $filter){


	  MySocket.emit('traer_clientes');

	  MySocket.on('Cuidador_enviado', function(data){

	  	$scope.Grupo_enviado = [];

	  	$scope.Grupo_enviado.push(data.cuidar_grupo.numeros);


	});	

	  	$scope.Participantes = [];

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

			$scope.Grupo_id = result.data;

			 MySocket.on('Cuidador_enviado', function(data){


						$scope.Grupo_enviado = data.cuidar_grupo.numeros;

					for (let i = 0; i <	 result.data.length; i++) {


					      if ($scope.Grupo_id[i].Grupo_id == $scope.Grupo_enviado) {


								$scope.Participantes.push($scope.Grupo_id[i]);

								console.log($scope.Participantes);

			        
						}	

					  }



				});	

		}, function(error){
			console.log('No se pudo traer los datos', error);

		})
			
    };

    $scope.Tabla_Participantes();


    $scope.Ver_Control = function(partc){


	    var modalInstance = $uibModal.open({
	        templateUrl: 'templates/Control_modal.html',
	        resolve: {
		        punto: function () {
		        	return   $scope.puntos;
		        	 },
		        part: function(){
		        	return   partc;
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

