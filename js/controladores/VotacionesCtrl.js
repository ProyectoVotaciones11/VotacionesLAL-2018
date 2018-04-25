angular.module('votacioneslive')

.controller('VotacionesCtrl', function($scope,ConexionServ,$filter){

	$scope.Mostrar_Votaciones = false;
	$scope.Votaciones_nuevo = {};
	$scope.Mostrar_Crear_Votaciones = false;

	ConexionServ.createTables();

	ConexionServ.query("SELECT rowid, id,  Nombres,  Alias, descripcion, Username, Password from votaciones", []).then(function(result){
			$scope.votaciones = result;
			console.log(' tabla votaciones ', result);

		}, function(tx){
			console.log('error', tx);
		});

	

	$scope.Insert_Votaciones = function(crear){

		if (crear.Nombres == undefined) {
			console.log("esta nulo");
			return;
		}
		if (crear.Alias == undefined) {
			console.log("esta nulo");
			return;
		}

		
		ConexionServ.query("INSERT INTO votaciones( Nombres,  Alias, descripcion, Username, Password ) VALUES( ?, ?, ?, ?, ?)", [crear.Nombres, crear.Alias, crear.descripcion, crear.Username, crear.Password]).then(function(result){
		
			console.log(' Participantes creado ', result);

			$scope.Mostrar_Crear_Votaciones = false;

			$scope.Votaciones_nuevo = {};

		}, function(tx){
			console.log('error', tx);
		});

		}

	$scope.Delete_Votaciones = function(votaciones){


			ConexionServ.query("DELETE FROM Votaciones WHERE rowid=? ", [votaciones.rowid]).then(function(result){
		
		 $scope.votaciones = $filter('filter') ($scope.votaciones, {rowid: '!' + votaciones.rowid})

		}, function(tx){
			console.log('error', tx);
		});

		

		}

	$scope.Modificar_Votaciones = function(modificar){

		if(modificar.Mostrar_Votaciones == true){
			modificar.Mostrar_Votaciones = false;

			ConexionServ.query("UPDATE Votaciones  SET  Nombres=? , Alias=? , descripcion=? , Username=? , Password=? WHERE rowid=? ", [modificar.Nombres, modificar.Alias, modificar.descripcion, modificar.Username, modificar.Password,  modificar.rowid]).then(function(result){
				console.log("hola")

				}, function(tx){
					console.log('error', tx);
				});
			return
		}
		
		for (var i = 0; i < $scope.votaciones.length; i++) {
			$scope.votaciones[i].Mostrar_Votaciones = false;


		}

		modificar.Mostrar_Votaciones = true;

			

	}

	$scope.Crear_Votaciones = function(){
		
		$scope.Mostrar_Crear_Votaciones = true;

		}

	$scope.Ocultar_Votaciones = function(){
			
		$scope.Mostrar_Crear_Votaciones = false;

		}
	



})