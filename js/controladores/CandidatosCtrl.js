angular.module('votacioneslive')

.controller('CandidatosCtrl', function($scope,ConexionServ,$filter){

	$scope.Mostrar_Candidatos = false;
	$scope.Candidatos_nuevo = {};
	$scope.Mostrar_tabla_crear = false;

	ConexionServ.createTables();

	$scope.Tabla_candidatos = function(){

		ConexionServ.query("SELECT C.*, C.rowid, a.aspiracion from Candidatos C INNER JOIN Aspiraciones a ON C.aspiracion_id = a.rowid ", []).then(function(result){
			$scope.Candidatos = result;
			console.log(' tabla Candidatos ', result);

		}, function(tx){
			console.log('error', tx);
		});

	}

	$scope.Tabla_candidatos();

	ConexionServ.query("SELECT *, rowid from Aspiraciones", []).then(function(result){
			$scope.Aspiraciones = result;
			console.log(' tabla Aspiraciones ', result);

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

		ConexionServ.query("INSERT INTO Candidatos( Nombres, Apellidos, Sexo, Grupo_id,  Foto, aspiracion_id ) VALUES( ?, ?, ?, ?, ?, ?)", [crear.Nombres, crear.Apellidos, crear.Sexo, crear.Grupo_id, crear.Foto, crear.aspiracion_id]).then(function(result){
		
			console.log(' Participantes creado ', result);

			$scope.Tabla_candidatos();

			$scope.Mostrar_tabla_crear = false;

			$scope.Candidatos_nuevo = {};


		}, function(tx){
			console.log('error', tx);
		});

	}

	$scope.Delete_Candidatos = function(candidatos){

		ConexionServ.query("DELETE FROM Candidatos WHERE rowid=? ", [candidatos.rowid]).then(function(result){
				
				 $scope.Candidatos = $filter('filter') ($scope.Candidatos, {rowid: '!' + candidatos.rowid})

				 $scope.Tabla_candidatos();

			}, function(tx){
				console.log('error', tx);
			});

		}

	$scope.Modificar_Candidatos = function(modificar){

		if(modificar.Mostrar_Candidatos == true){
			modificar.Mostrar_Candidatos = false;

				ConexionServ.query("UPDATE Candidatos  SET  Nombres=? , Apellidos=? , Sexo=? , Grupo_id=? , Foto=?, aspiracion_id=? WHERE rowid=? ", [modificar.Nombres, modificar.Apellidos, modificar.Sexo, modificar.Grupo_id, modificar.Foto , modificar.aspiracion_id, modificar.rowid]).then(function(result){
								
								$scope.Tabla_candidatos();

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

	$scope.Ocultar_Tabla_de_Editar = function(modificar){
		
		if(modificar.Mostrar_Candidatos == true){
			modificar.Mostrar_Candidatos = false;

				};

		}

	$scope.Mostrar_tabla_De_Crear = function(){
		
		$scope.Mostrar_tabla_crear = true;

		}

	$scope.Ocultar_Candidato = function(){
			
		$scope.Mostrar_tabla_crear = false;

		}

})