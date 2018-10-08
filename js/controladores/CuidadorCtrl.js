angular.module('votacioneslive')

.controller('CuidadorCtrl', function($scope, $state,  AuthServ, $q, toastr, $http, MySocket, $uibModal, $filter){

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
			MySocket.on('Usuarios_cuidador', function(data){
				 $scope.puntos = data;				  
			});	
					for (let i = 0; i <	 result.data.length; i++) {
				      if (result.data[i].Tipo == "Cuidador") {
							$scope.Participantes.push(result.data[i] );
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
	    })
	    modalInstance.result.then(function (result) {
	    		$scope.cuidador = result
	    			console.log(result);
	    	MySocket.emit('traer_cliente', {id: result});
	    	$scope.Segundo_modal($scope.cuidador);		
	    }, function(r2){
	    	$scope.traerDatos();
	    });			
	} 

	 $scope.Segundo_modal = function(Cuid){
	    var modalInstance = $uibModal.open({
	        templateUrl: 'templates/Grupo_cuidador.html',
	        resolve: {
		        punto: function () {
		        	return   $scope.puntos;
		        	 },
		        Cuidador: function(){
		        	return   Cuid;
		          }		       
		    },
	        controller: 'Control2'  
	    });
	    modalInstance.result.then(function (result) {	    	
	    			console.log(result);	
	    	MySocket.emit('Enviar_cuidador', {id: result});
	    }, function(r2){
	    	$scope.traerDatos();
	    });		
	} 
})

.controller("Control", function($uibModalInstance, $scope, punto, ConexionServ, toastr, $filter, part) {

	$scope.puntos = punto; 

	$scope.Enviar_Cuidador = function (Mens) {
		$scope.usuario = Mens;
		$scope.usuario.user_data = part;
		$uibModalInstance.close($scope.usuario);	      
    };
	$scope.ok = function () {
        $uibModalInstance.close('Cerrado');
    };

    return ;   
})

.controller("Control2", function($uibModalInstance, $scope, punto, ConexionServ, toastr, $filter, Cuidador) {

	$scope.puntos = punto; 

	$scope.Grupos_Mostrar = false; 

	$scope.grupos = [ {numeros: 1 }, {numeros: 2}, {numeros: 3 }, {numeros: 4}, 
					  {numeros: 5 }, {numeros: 6}, {numeros: 7 }, {numeros: 8},
					  {numeros: 9 }, {numeros: 10}, {numeros: 11 }]; 

	$scope.Enviar_Grupo = function (grup) {
		$scope.usuario = Cuidador;
		$scope.usuario.cuidar_grupo = grup;
		$uibModalInstance.close($scope.usuario);	       
    };


	$scope.ok = function () {
        $uibModalInstance.close('Cerrado');
    };
    return ;  
})