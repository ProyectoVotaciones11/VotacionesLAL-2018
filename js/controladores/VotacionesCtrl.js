angular.module('votacioneslive')

.controller('VotacionesCtrl', function($scope,ConexionServ,$filter){

	$scope.Mostrar_Votaciones = false;
	$scope.Votaciones_nuevo = {};
	$scope.Mostrar_tabla_crear = false;
	$scope.Cambiar_contrasena = false;
	$scope.Primera_password = false;
	$scope.Comfirmar_Primera_password = false;


		ConexionServ.createTables();

		$scope.Tabla_Votaciones = function(){

			ConexionServ.query("SELECT rowid, id,  Nombre,  Alias, descripcion, Username, Password from votaciones", []).then(function(result){
					$scope.votaciones = result;
					console.log(' tabla votaciones ', result);

				}, function(tx){
					console.log('error', tx);
				});

		}

		$scope.Tabla_Votaciones();	

	$scope.Insert_Votaciones = function(crear){

		if (crear.Nombres == undefined) {
			console.log("esta nulo");
			return;
		}
		if (crear.Alias == undefined) {
			console.log("esta nulo");
			return;
		}

			ConexionServ.query("INSERT INTO votaciones( Nombre,  Alias, descripcion, Username, Password ) VALUES( ?, ?, ?, ?, ?)", [crear.Nombre, crear.Alias, crear.descripcion, crear.Username, "123"]).then(function(result){
			
					console.log(' Participantes creado ', result);

					$scope.Mostrar_tabla_crear = false;

					$scope.Votaciones_nuevo = {};

					$scope.Tabla_Votaciones();	

				}, function(tx){
					console.log('error', tx);
				});

		}

	$scope.Delete_Votaciones = function(votaciones){
		
		var res = confirm('Seguro que dese');

		if (res) {
			ConexionServ.query("DELETE FROM Votaciones WHERE rowid=? ", [votaciones.rowid]).then(function(result){
		
				$scope.votaciones = $filter('filter') ($scope.votaciones, {rowid: '!' + votaciones.rowid})

				$scope.Tabla_Votaciones();	

		   }, function(tx){
			   console.log('error', tx);
		   });

		}
			
	}

	$scope.Modificar_Votaciones = function(modificar){

		if(modificar.Mostrar_Votaciones == true){
			modificar.Mostrar_Votaciones = false;

			ConexionServ.query("UPDATE Votaciones  SET  Nombre=? , Alias=? , descripcion=? , Username=? , Password=? WHERE rowid=? ", [modificar.Nombre, modificar.Alias, modificar.descripcion, modificar.Username, modificar.Password,  modificar.rowid]).then(function(result){
				console.log("hola")

				$scope.Tabla_Votaciones();	

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
	
	
	$scope.ver_aspiraciones = function(votacion){
		
		ConexionServ.query("SELECT a.rowid, a.*  FROM Aspiraciones a WHERE votacion_id=?", [votacion.rowid]).then(function(result){
			$scope.Aspiraciones = result;
			console.log(' tabla Aspiraciones ', result);

		}, function(tx){
			console.log('error', tx);
		});
			
	}


	$scope.Ocultar_Tabla_de_Editar = function(modificar){
		
		if(modificar.Mostrar_Votaciones == true){
			modificar.Mostrar_Votaciones = false;
			
				};
		}

	$scope.Mostrar_tabla_De_Crear = function(){
		
		$scope.Mostrar_tabla_crear = true;

		}

	$scope.Ocultar_Votacion = function(){
			
		$scope.Mostrar_tabla_crear = false;

		}

	$scope.Mostrar_Cambiar_contrasena = function(modificar, Primera_password, Comfirmar_Primera_password){

		if(modificar.Cambiar_contrasena == true){
			modificar.Cambiar_contrasena = false;

			if (modificar.Primera_password == modificar.Comfirmar_Primera_password) {

				ConexionServ.query("UPDATE Votaciones  SET  Password=? WHERE rowid=? ", [ modificar.Primera_password,  modificar.rowid]).then(function(result){
				console.log("hola")

						$scope.Tabla_Votaciones();	

					}, function(tx){
						console.log('error', tx);
					});

			}else{
				console.log("nulo")
			}

			return
		}

			for (var i = 0; i < $scope.votaciones.length; i++) {
			$scope.votaciones[i].Cambiar_contrasena = false;
		}
		modificar.Cambiar_contrasena = true;


		}

	$scope.ocultar_Cambiar_contrasena = function(modificar){
		
		modificar.Cambiar_contrasena = false;

	}

})