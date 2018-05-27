angular.module('votacioneslive')

.controller('ParticipantesCtrl', function($scope,ConexionServ,$filter){

	$scope.Mostrar_Participantes = false;
	$scope.Participante_nuevo = {};
	$scope.Mostrar_tabla_crear = false;

	ConexionServ.createTables();

	$scope.Tabla_Participantes = function(){

		ConexionServ.query("SELECT P.*, P.rowid, V.Nombre, V.Alias from Participantes P INNER JOIN votaciones V ON P.Votacion_id = V.rowid", []).then(function(result){

			$scope.Participantes = result;
		

		}, function(tx){
			console.log('error', tx);
		});
	
}
	

		$scope.Tabla_Participantes();

		ConexionServ.query("SELECT rowid, id,  Nombre,  Alias, descripcion, Username, Password from votaciones", []).then(function(result){

				$scope.votaciones = result;
			

			}, function(tx){
				console.log('error', tx);
			});

	$scope.Insert_Participantes = function(crear){

		if (crear.Nombres == undefined) {
			console.log("esta nulo");
			return;
		}
		if (crear.Sexo == undefined) {
			console.log("esta nulo");
			return;
		}

			ConexionServ.query("INSERT INTO Participantes( Nombres, Apellidos, Username, Password, Sexo, Grupo_id, Votacion_id, Tipo ) VALUES( ?, ?, ?, ?, ?, ?, ?, ?)", [crear.Nombres, crear.Apellidos, crear.Username, crear.Password, crear.Sexo, crear.Grupo_id, crear.Votacion_id, crear.Tipo]).then(function(result){
			
					

					$scope.Mostrar_tabla_crear = false;

					$scope.Participante_nuevo = {};

					$scope.Tabla_Participantes();

				}, function(tx){
					console.log('error', tx);
				});

		}

	$scope.Delete_Participantes = function(participantes){

		ConexionServ.query("DELETE FROM Participantes WHERE rowid=? ", [participantes.rowid]).then(function(result){
		
				 $scope.Participantes = $filter('filter') ($scope.Participantes, {rowid: '!' + participantes.rowid})

				 $scope.Tabla_Participantes();

			}, function(tx){
				console.log('error', tx);
			});

		}

	$scope.Modificar_Participante = function(modificar){

		if(modificar.Mostrar_Participante == true){
			modificar.Mostrar_Participante = false;

			ConexionServ.query("UPDATE Participantes  SET  Nombres=? , Apellidos=? , Username=?, Password=?, Sexo=? , Grupo_id=? , Votacion_id=? , Tipo=? WHERE rowid=? ", [modificar.Nombres, modificar.Apellidos, modificar.Username, modificar.Password, modificar.Sexo, modificar.Grupo_id, modificar.Votacion_id, modificar.Tipo , modificar.rowid]).then(function(result){
					
					

					$scope.Tabla_Participantes();

				}, function(tx){
					console.log('error', tx);
				});
			return
		}
		
		for (var i = 0; i < $scope.Participantes.length; i++) {
			$scope.Participantes[i].Mostrar_Participante = false;


		}

		modificar.Mostrar_Participante = true;

			

	}

	$scope.Ocultar_Tabla_de_Editar = function(modificar){
		
		if(modificar.Mostrar_Participante == true){
			modificar.Mostrar_Participante = false;

				};

		}

	$scope.Mostrar_tabla_De_Crear = function(){
		
		$scope.Mostrar_tabla_crear = true;

		}

	$scope.Ocultar_Candidato = function(){
			
		$scope.Mostrar_tabla_crear = false;

		}



})
