angular.module('votacioneslive')

.controller('ResultadosCtrl', function($scope,  $uibModal, USER, AuthServ, toastr, $q, $http){

	
  $http.get('::resultado',  {params: {Votacion_id: $scope.USER.Votacion_id}}).then(function(result){
		$scope.Aspiraciones = result.data;

		console.log($scope.Aspiraciones);
		
		$scope.Aspiraciones.forEach(function(aspiracion, indice){
			$scope.cadidatos_de_aspiracion(aspiracion);
		})

	}, function(tx){
		console.log('error', tx);
	});

	$scope.cadidatos_de_aspiracion = function(aspiracion){
		
		console.log(aspiracion);
		
    	 $http.get('::resultado/CandidatoAspiracion',  {params: {id: aspiracion.rowid}}).then(function(result){
			aspiracion.Candidatos = result.data;
			console.log(' tabla Candidatos ', result);

		}, function(tx){
			console.log('error', tx);
		});

	}

    
})