angular.module('votacioneslive')

.controller('ResultadosCtrl', function($scope, ConexionServ, $uibModal, USER, AuthServ, toastr, $q){

	
  ConexionServ.query("SELECT rowid, id,  aspiracion, descripcion  from Aspiraciones WHERE votacion_id=?", [$scope.USER.Votacion_id]).then(function(result){
		$scope.Aspiraciones = result;
		
		$scope.Aspiraciones.forEach(function(aspiracion, indice){
			$scope.cadidatos_de_aspiracion(aspiracion);
		})

	}, function(tx){
		console.log('error', tx);
	});

	$scope.cadidatos_de_aspiracion = function(aspiracion){
		
		consulta = "SELECT C.*, C.rowid, count(v.rowid) as cantidad from Candidatos C "+
			"LEFT JOIN Votos v ON v.candidato_id = C.rowid "+
			" WHERE C.aspiracion_id = ? GROUP BY C.rowid ";

    	ConexionServ.query(consulta, [aspiracion.rowid]).then(function(result){
			aspiracion.Candidatos = result;
			console.log(' tabla Candidatos ', result);

		}, function(tx){
			console.log('error', tx);
		});

	}

    
})