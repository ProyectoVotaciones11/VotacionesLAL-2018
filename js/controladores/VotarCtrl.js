angular.module('votacioneslive')


.controller('VotarCtrl', function($scope, $state, ConexionServ, AuthServ, $q, toastr){

	$scope.Moatrar_Contralos = false; 
	

    
    ConexionServ.createTables();

    ConexionServ.query("SELECT rowid, id,  aspiracion, descripcion  from Aspiraciones WHERE votacion_id=?", [$scope.USER.Votacion_id]).then(function(result){
		$scope.Aspiraciones = result;

		$scope.completado 	= false;
		$scope.contador 	= 0;
		
		$scope.Aspiraciones.forEach(function(aspiracion, indice){
			
			promesa = $scope.cadidatos_de_aspiracion(aspiracion);
			promesa.then(function(){

				$scope.contador 	= $scope.contador + 1;

				if ($scope.contador == $scope.Aspiraciones.length) {
					$scope.completado 				= true;
					$scope.Aspiraciones[0].activa 	= true;
				}
			}, function(er){
				console.log(er);
			});

		})

	}, function(tx){
		console.log('error', tx);
	});

	

	$scope.cadidatos_de_aspiracion = function(aspiracion){
		var defered = $q.defer();

    	ConexionServ.query("SELECT C.*, C.rowid from Candidatos C WHERE C.aspiracion_id = ? ", [aspiracion.rowid]).then(function(result){
			aspiracion.Candidatos = result;
			defered.resolve(' ');
		}, function(tx){
			console.log('error', tx);
			defered.reject('Error')
		});

    	return defered.promise;
	}

	$scope.Cambiar_active = function(numero, candidato){

	


		console.log(numero+1, candidato);

		ConexionServ.query("INSERT INTO Votos( Participantes_id, candidato_id, aspiracion_id,  fecha_hora ) VALUES( ?, ?, ?, ?)", [ $scope.USER.rowid, candidato.rowid, candidato.aspiracion_id, '12/04/2018-3:30pm']).then(function(result){
				
			console.log(result);

					if ((numero+1) == $scope.Aspiraciones.length) {

						toastr.success('Has votado');
 
						$state.go('Login');


					return
					}

					for (var i = 0; i < $scope.Aspiraciones.length; i++) {

						
						$scope.Aspiraciones[i].activa = false;
					}

					$scope.Aspiraciones[numero + 1].activa  = true;

			
		}, function(tx){
			console.log('error', tx);
			
		});


		


		
	}

	


 
});