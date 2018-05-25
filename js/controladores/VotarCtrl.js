angular.module('votacioneslive')


.controller('VotarCtrl', function($scope, $state, ConexionServ, AuthServ){

	$scope.Moatrar_Contralos = false; 
				
    
    ConexionServ.createTables();

    ConexionServ.query("SELECT rowid, id,  aspiracion, descripcion  from Aspiraciones WHERE aspiracion=?", ['Personero']).then(function(result){
		$scope.Aspiraciones = result;
		
		$scope.Aspiraciones.forEach(function(aspiracion, indice){
			$scope.cadidatos_de_aspiracion(aspiracion);
		})

	}, function(tx){
		console.log('error', tx);
	});

	$scope.ver_Representante = function(){
		
				

		    ConexionServ.query("SELECT rowid, id,  aspiracion, descripcion  from Aspiraciones WHERE aspiracion=?", ['Representante']).then(function(result){
				$scope.Aspiraciones = result;

				$scope.Moatrar_Contralos = true; 
				
				$scope.Aspiraciones.forEach(function(aspiracion, indice){
					$scope.cadidatos_de_aspiracion(aspiracion);
				})

			}, function(tx){
				console.log('error', tx);
			});

		}

		$scope.ver_Contralor = function(){
		
				

		    ConexionServ.query("SELECT rowid, id,  aspiracion, descripcion  from Aspiraciones WHERE aspiracion=?", ['Contralor']).then(function(result){
				$scope.Aspiraciones = result;
 
				$scope.Moatrar_Contralos = false; 

				$scope.Aspiraciones.forEach(function(aspiracion, indice){
					$scope.cadidatos_de_aspiracion(aspiracion);
				})

			}, function(tx){
				console.log('error', tx);
			});

		}

	$scope.cadidatos_de_aspiracion = function(aspiracion){
		
    	ConexionServ.query("SELECT C.*, C.rowid from Candidatos C WHERE C.aspiracion_id = ? ", [aspiracion.rowid]).then(function(result){
			aspiracion.Candidatos = result;
			console.log(' tabla Candidatos ', result);

		}, function(tx){
			console.log('error', tx);
		});

	}

	


 
});