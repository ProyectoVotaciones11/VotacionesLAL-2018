angular.module('votacioneslive')

.controller('VotosCtrl', function($scope,ConexionServ,$filter){

	$scope.Mostrar_Votos = false;
	$scope.Votos_nuevo = {};
	$scope.Mostrar_tabla_crear = false;

	ConexionServ.createTables();

	$scope.Tabla_Votos = function(){

		ConexionServ.query("SELECT V.*, V.rowid, a.aspiracion, C.Nombres, C.Apellidos, P.Nombres as Participantes_Nombres, P.Apellidos as Participantes_Apellidos from Votos V INNER JOIN Aspiraciones a ON V.aspiracion_id = a.rowid INNER JOIN Candidatos C ON V.candidato_id = C.rowid INNER JOIN Participantes P ON V.Participantes_id = P.rowid ", []).then(function(result){
			$scope.Votos = result;
			console.log(' tabla Candidatos ', result);

		}, function(tx){
			console.log('error', tx);
		});


	}

	$scope.Tabla_Votos();

	ConexionServ.query("SELECT *, rowid from Aspiraciones", []).then(function(result){
			$scope.Aspiraciones = result;
			console.log(' tabla Aspiraciones ', result);

		}, function(tx){
			console.log('error', tx);
		});

	ConexionServ.query("SELECT *, rowid from Candidatos", []).then(function(result){
			$scope.Candidatos = result;
			console.log(' tabla Candidatos ', result);

		}, function(tx){
			console.log('error', tx);
		});

	ConexionServ.query("SELECT *, rowid from Participantes", []).then(function(result){
			$scope.Participantes = result;
			console.log(' tabla Participantes ', result);

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

					$scope.Tabla_Votos();

					$scope.Mostrar_Votos_nuevo = false;

					$scope.Votos_nuevo = {};



				}, function(tx){
					console.log('error', tx);
				});

		}

	$scope.Delete_Votos = function(votos){

		ConexionServ.query("DELETE FROM Votos WHERE rowid=? ", [votos.rowid]).then(function(result){
		
				 $scope.Votos = $filter('filter') ($scope.Votos, {rowid: '!' + votos.rowid})

				 $scope.Tabla_Votos();

			}, function(tx){
				console.log('error', tx);
			});

		}

	$scope.Modificar_Votos = function(modificar){

		if(modificar.Mostrar_Votos == true){
			modificar.Mostrar_Votos = false;

			ConexionServ.query("UPDATE Votos  SET  id=? , Participantes_id=? , candidato_id=? , aspiracion_id=? , fecha_hora=? WHERE rowid=? ", [modificar.id, modificar.Participantes_id, modificar.candidato_id, modificar.aspiracion_id, modificar.fecha_hora, modificar.rowid]).then(function(result){
				
				console.log("hola")

				$scope.Tabla_Votos();

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

	$scope.Ocultar_Tabla_de_Editar = function(modificar){
		
		if(modificar.Mostrar_Votos == true){
			modificar.Mostrar_Votos = false;

				};

		}

	$scope.Mostrar_tabla_De_Crear = function(){
		
		$scope.Mostrar_tabla_crear = true;

		}

	$scope.Ocultar_Candidato = function(){
			
		$scope.Mostrar_tabla_crear = false;

		}

	



})