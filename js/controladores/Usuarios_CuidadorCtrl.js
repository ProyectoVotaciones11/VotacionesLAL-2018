angular.module('votacioneslive')


.controller('Usuarios_CuidadorCtrl', function($scope, $state,  AuthServ, $q, toastr, $http, MySocket, $uibModal, $filter){

	MySocket.emit('traer_clientes');

	$scope.Grupo_enviado = [];
	$scope.Participantes = [];

	MySocket.on('clientes_traidos', function(data){

		$scope.puntos= [];
		 $scope.puntos = data;		  
	});	

	$scope.Participantes_grupo = function(num_grupo){

		$scope.Grupo_enviado 		= num_grupo;
		localStorage.grupo_ciudar 	= num_grupo;
		$scope.Participantes 		= [];

		for (let i = 0; i <	 $scope.Grupo_id.length; i++) {


	      if ($scope.Grupo_id[i].Grupo_id == $scope.Grupo_enviado) {

				$scope.Participantes.push($scope.Grupo_id[i]);

				console.log($scope.puntos);

				for (let h = 0; h <	$scope.puntos.length; h++) {						      		

			      	if ($scope.puntos[h].user_data.Username == $scope.Grupo_id[i].Username) {

			      		$scope.Grupo_id[i].punto = $scope.puntos[h].nombre_punto

				  }							
			    }	

			    
			}	
	 	}
	 }

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

			if (localStorage.grupo_ciudar) {
			  	$scope.Participantes_grupo(parseInt(localStorage.grupo_ciudar));
			}

		}, function(error){
			console.log('No se pudo traer los datos', error);

		})
			
    };




    $scope.Tabla_Participantes();


	 MySocket.on('Cuidador_enviado', function(data){
		$scope.Participantes_grupo(data.cuidar_grupo.numeros);

	});	


	MySocket.on('logueado:alguien', (data)=>{
		$scope.Tabla_Participantes();


			MySocket.emit('traer_clientes');
		});

	MySocket.on('Alguien_desconect', function(data){
		

		setTimeout(function() {

			$scope.Tabla_Participantes();

			MySocket.emit('traer_clientes');
        	
		
   		 }, 2000); 
    	
		});	



    $scope.Ver_Control = function(partc){

    	if (partc.punto) {

    	}else{
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


	   
			
	} 

	
})

