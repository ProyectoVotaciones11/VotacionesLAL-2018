angular.module('votacioneslive')

.controller('ParticipantesCtrl', function($scope,ConexionServ,$filter){

	$scope.Mostrar_Participantes = false;
	$scope.Participante_nuevo = {};
	$scope.Mostrar_Crear_participante = false;

	ConexionServ.createTables();

	ConexionServ.query("SELECT rowid, id,  Nombres, Apellido, Sexo, Grupo_id, Votacion_id, Tipo from Participantes", []).then(function(result){
			$scope.Participantes = result;
			console.log(' tabla Participantes ', result);

		}, function(tx){
			console.log('error', tx);
		});

		ConexionServ.query("SELECT rowid, id,  Nombres,  Alias, descripcion, Username, Password from votaciones", []).then(function(result){
			$scope.votaciones = result;
			console.log(' tabla votaciones ', result);

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

		
		ConexionServ.query("INSERT INTO Participantes( Nombres, Apellido, Sexo, Grupo_id, Votacion_id, Tipo ) VALUES( ?, ?, ?, ?, ?, ?)", [crear.Nombres, crear.Apellido, crear.Sexo, crear.Grupo_id, crear.Votacion_id, crear.Tipo]).then(function(result){
		
			console.log(' Participantes creado ', result);

			$scope.Mostrar_Crear_participante = false;

			$scope.Participante_nuevo = {};

		}, function(tx){
			console.log('error', tx);
		});



		}

	$scope.Delete_Participantes = function(participantes){

		

			ConexionServ.query("DELETE FROM Participantes WHERE rowid=? ", [participantes.rowid]).then(function(result){
		
		 $scope.Participantes = $filter('filter') ($scope.Participantes, {rowid: '!' + participantes.rowid})

		}, function(tx){
			console.log('error', tx);
		});

		

		

		}

	$scope.Modificar_Participante = function(modificar){
		if(modificar.Mostrar_Participante == true){
			modificar.Mostrar_Participante = false;

			ConexionServ.query("UPDATE Participantes  SET  Nombres=? , Apellido=? , Sexo=? , Grupo_id=? , Votacion_id=? , Tipo=? WHERE rowid=? ", [modificar.Nombres, modificar.Apellido, modificar.Sexo, modificar.Grupo_id, modificar.Votacion_id, modificar.Tipo , modificar.rowid]).then(function(result){
				console.log("hola")

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

	$scope.Crear_participante = function(){
		
		$scope.Mostrar_Crear_participante = true;

		}

	$scope.Ocultar_participantes = function(){
			
		$scope.Mostrar_Crear_participante = false;

		}
	



})
