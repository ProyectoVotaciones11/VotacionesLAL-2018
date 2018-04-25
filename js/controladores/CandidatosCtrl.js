angular.module('votacioneslive')

.controller('CandidatosCtrl', function($scope,ConexionServ,$filter){

	$scope.Mostrar_Candidatos = false;
	$scope.Candidatos_nuevo = {};
	$scope.Mostrar_Candiatos_nuevo = false;

	ConexionServ.createTables();

	ConexionServ.query("SELECT rowid, id,  Nombres, Apellido, Sexo, Grupo_id,  Foto, aspiracion_id from Candidatos", []).then(function(result){
			$scope.Candidatos = result;
			console.log(' tabla Candidatos ', result);

		}, function(tx){
			console.log('error', tx);
		});

	$scope.Insert_Candidatos = function(crear){

		if (crear.Nombres == undefined) {
			console.log("esta nulo");
			return;
		}
		if (crear.Sexo == undefined) {
			console.log("esta nulo");
			return;
		}

		ConexionServ.query("INSERT INTO Candidatos( Nombres, Apellido, Sexo, Grupo_id,  Foto, aspiracion_id ) VALUES( ?, ?, ?, ?, ?, ?)", [crear.Nombres, crear.Apellido, crear.Sexo, crear.Grupo_id, crear.Foto, crear.aspiracion_id]).then(function(result){
		
			console.log(' Participantes creado ', result);

			$scope.Mostrar_Candiatos_nuevo = false;

			$scope.Candidatos_nuevo = {};


		}, function(tx){
			console.log('error', tx);
		});

		}

	$scope.Delete_Candidatos = function(candidatos){

		ConexionServ.query("DELETE FROM Candidatos WHERE rowid=? ", [candidatos.rowid]).then(function(result){
		
		 $scope.Candidatos = $filter('filter') ($scope.Candidatos, {rowid: '!' + candidatos.rowid})

		}, function(tx){
			console.log('error', tx);
		});

		}

	$scope.Modificar_Candidatos = function(modificar){
		if(modificar.Mostrar_Candidatos == true){
			modificar.Mostrar_Candidatos = false;

			ConexionServ.query("UPDATE Candidatos  SET  Nombres=? , Apellido=? , Sexo=? , Grupo_id=? , Foto=?, aspiracion_id=? WHERE rowid=? ", [modificar.Nombres, modificar.Apellido, modificar.Sexo, modificar.Grupo_id, modificar.Foto , modificar.aspiracion_id, modificar.rowid]).then(function(result){
				console.log("hola")

				}, function(tx){
					console.log('error', tx);
				});
			return
		}
		
		for (var i = 0; i < $scope.Candidatos.length; i++) {
			$scope.Candidatos[i].Mostrar_Candidatos = false;


		}

		modificar.Mostrar_Candidatos = true;

			

	}

	$scope.Crear_Candidatos = function(){
		
		$scope.Mostrar_Candiatos_nuevo = true;

	}


	$scope.Ocultar_Candidatos = function(){
			
		$scope.Mostrar_Candiatos_nuevo = false;

		}

	



})