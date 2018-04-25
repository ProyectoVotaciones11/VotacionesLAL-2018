angular.module('votacioneslive')

.controller('AspiracionesCtrl', function($scope,ConexionServ,$filter){

	$scope.Mostrar_Aspiraciones = false;
	$scope.nueva_Aspiraciones = {};
	$scope.Mostrar_Crear_Aspiraciones = false;

	ConexionServ.createTables();

	ConexionServ.query("SELECT rowid, id,  aspiracion, descripcion  from Aspiraciones", []).then(function(result){
			$scope.Aspiraciones = result;
			console.log(' tabla Aspiraciones ', result);

		}, function(tx){
			console.log('error', tx);
		});

		

	$scope.Insert_Aspiraciones = function(crear){

		if (crear.aspiracion == undefined) {
			console.log("esta nulo");
			return;
		}
		if (crear.descripcion == undefined) {
			console.log("esta nulo");
			return;
		}

		
		ConexionServ.query("INSERT INTO Aspiraciones( id, aspiracion, descripcion) VALUES( ?, ?, ?)", [crear.id, crear.aspiracion, crear.descripcion]).then(function(result){
		
			console.log(' Aspiraciones creado ', result);

			$scope.Mostrar_Crear_Aspiraciones = false;

			$scope.nueva_Aspiraciones = {};

		}, function(tx){
			console.log('error', tx);
		});



		}

	$scope.Delete_Aspiraciones = function(aspiraciones){

		

			ConexionServ.query("DELETE FROM Aspiraciones WHERE rowid=? ", [aspiraciones.rowid]).then(function(result){
		
		 $scope.Aspiraciones = $filter('filter') ($scope.Aspiraciones, {rowid: '!' + aspiraciones.rowid})

		}, function(tx){
			console.log('error', tx);
		});

		

		

		}

	$scope.Modificar_Aspiraciones = function(modificar){
		if(modificar.Mostrar_Aspiraciones == true){
			modificar.Mostrar_Aspiraciones = false;

			ConexionServ.query("UPDATE Aspiraciones  SET  id=? , aspiracion=? , descripcion=? WHERE rowid=? ", [modificar.id, modificar.aspiracion, modificar.descripcion, modificar.rowid]).then(function(result){
				console.log("hola")

				}, function(tx){
					console.log('error en modificar', tx);
				});
			return
		}
		
		for (var i = 0; i < $scope.Aspiraciones.length; i++) {
			$scope.Aspiraciones[i].Mostrar_Aspiraciones = false;


		}

		modificar.Mostrar_Aspiraciones = true;

			

	}

	$scope.Crear_Aspiraciones = function(){
		
		$scope.Mostrar_Crear_Aspiraciones = true;

		}

	$scope.Ocultar_Aspiraciones = function(){
			
		$scope.Mostrar_Crear_Aspiraciones = false;

		}
	



})