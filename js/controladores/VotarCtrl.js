angular.module('votacioneslive')


.controller('VotarCtrl', function($scope, $state,  AuthServ, $q, toastr, $http){

	$scope.Moatrar_Contralos = false; 
    
   

    $http.get('::votar', {params: {Votacion_id: $scope.USER.Votacion_id}}).then(function(result){
		$scope.Aspiraciones = result.data;

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
		console.log('error 1', tx);
	});

	

	$scope.cadidatos_de_aspiracion = function(aspiracion){



		var defered = $q.defer();


    	$http.get('::votar/CandidatoAspiracion',  {params: {id: aspiracion.rowid}}).then(function(result){
			aspiracion.Candidatos = result.data;

			console.log(aspiracion.Candidatos);

			defered.resolve(' ');
		}, function(tx){
			console.log('error 2', tx);
			defered.reject('Error 4')
		});

    	return defered.promise;
	}

	$scope.Cambiar_active = function(numero, candidato){

		var res = confirm('Quieres votar por'+' '+ candidato.Nombres+' '+candidato.Apellidos );

		if (res) {

			console.log(numero+1, candidato);
			
			fecha = '12/04/2018 3:30pm';

			$http.get('::votar/Cambiaractive', {params: { user_id: $scope.USER.rowid, id: candidato.rowid, aspiracion_id: candidato.aspiracion_id, fecha: fecha}}).then(function(result){
					
				console.log(result);

				if ((numero+1) == $scope.Aspiraciones.length) {

					toastr.success('Gracias por tu voto');

					 localStorage.logueado   = false
					 
	   				 delete localStorage.USER;

					$state.go('Login');
					return
				}

				for (var i = 0; i < $scope.Aspiraciones.length; i++) {

					
					$scope.Aspiraciones[i].activa = false;
				}

				$scope.Aspiraciones[numero + 1].activa  = true;

					
				}, function(tx){
					console.log('error 3', tx);
					
				});

		}


	}

	


 
});