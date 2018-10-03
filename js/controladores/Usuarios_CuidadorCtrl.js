angular.module('votacioneslive')


.controller('Usuarios_CuidadorCtrl', function($scope, $state,  AuthServ, $q, toastr, $http, MySocket, $uibModal, $filter){


	  MySocket.emit('traer_clientes');

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



			for (let i = 0; i <	 result.data.length; i++) {

		      if (result.data[i].Tipo == "Cuidador") {


					$scope.Participantes.push(result.data[i] );
 

         			console.log($scope.Participantes);

        
			      }	

			  }

	
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

.controller("Control", function($uibModalInstance, $scope, punto, ConexionServ, toastr, $filter, part) {

	$scope.puntos = punto; 

	

	$scope.Enviar_Usuario = function (Mens) {

		Mens.user_data = part;

			

        $uibModalInstance.close(Mens);
    };

	$scope.ok = function () {
        $uibModalInstance.close('Cerrado');
    };

    return ;

   
})