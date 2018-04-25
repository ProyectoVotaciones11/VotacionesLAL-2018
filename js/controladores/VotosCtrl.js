angular.module('votacioneslive')

.controller('VotosCtrl', function($scope,ConexionServ,$filter){

	$scope.Mostrar_Votos = false;
	$scope.Votos_nuevo = {};
	$scope.Mostrar_Votos_nuevo = false;

	ConexionServ.createTables();

	ConexionServ.query("SELECT rowid, id,  Participantes_id, candidato_id, aspiracion_id, fecha_hora from Votos", []).then(function(result){
			$scope.Votos = result;
			console.log(' tabla Votos ', result);

		}, function(tx){
			console.log('error', tx);
		});

	$scope.Insert_Votos = function(crear){

		if (crear.Participantes_id == undefined) {
			console.log("esta nulo");
			return;
		}
		if (crear.candidato_id == undefined) {
			console.log("esta nulo");
			return;
		}

		ConexionServ.query("INSERT INTO Votos( id, Participantes_id, candidato_id, aspiracion_id,  fecha_hora ) VALUES( ?, ?, ?, ?, ?)", [crear.id, crear.Participantes_id, crear.candidato_id, crear.aspiracion_id, crear.fecha_hora]).then(function(result){
		
			console.log(' Participantes creado ', result);

			$scope.Mostrar_Votos_nuevo = false;

			$scope.Votos_nuevo = {};


		}, function(tx){
			console.log('error', tx);
		});

		}

	$scope.Delete_Votos = function(votos){

		ConexionServ.query("DELETE FROM Votos WHERE rowid=? ", [votos.rowid]).then(function(result){
		
		 $scope.Votos = $filter('filter') ($scope.Votos, {rowid: '!' + votos.rowid})

		}, function(tx){
			console.log('error', tx);
		});

		}

	$scope.Modificar_Votos = function(modificar){
		if(modificar.Mostrar_Votos == true){
			modificar.Mostrar_Votos = false;

			ConexionServ.query("UPDATE Votos  SET  id=? , Participantes_id=? , candidato_id=? , aspiracion_id=? , fecha_hora=? WHERE rowid=? ", [modificar.id, modificar.Participantes_id, modificar.candidato_id, modificar.aspiracion_id, modificar.fecha_hora, modificar.rowid]).then(function(result){
				console.log("hola")

				}, function(tx){
					console.log('error', tx);
				});
			return
		}
		
		for (var i = 0; i < $scope.Votos.length; i++) {
			$scope.Votos[i].Mostrar_Votos = false;


		}

		modificar.Mostrar_Votos = true;

			

	}

	$scope.Crear_Votos = function(){
		
		$scope.Mostrar_Votos_nuevo = true;

	}


	$scope.Ocultar_Votos = function(){
			
		$scope.Mostrar_Votos_nuevo = false;

		}

	



})