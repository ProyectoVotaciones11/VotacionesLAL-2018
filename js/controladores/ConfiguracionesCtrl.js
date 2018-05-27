angular.module('votacioneslive')

.controller('ConfiguracionesCtrl', function($scope, ConexionServ, $uibModal, USER, AuthServ, toastr){

	ConexionServ.createTables()

		$scope.Tabla_Participantes = function(){

		ConexionServ.query("SELECT P.*, P.rowid, V.Nombre, V.Alias from Participantes P INNER JOIN votaciones V ON P.Votacion_id = V.rowid", []).then(function(result){

			$scope.Participantes = result;
		

		}, function(tx){
			console.log('error', tx);
		});


	
}

$scope.Tabla_Participantes()
    
    $scope.Modificar_perfil = function(crear){

    	ConexionServ.query("UPDATE Participantes  SET  Nombres=? , Apellidos=? , Username=?, Password=?, Sexo=? WHERE rowid=? ", [crear.Nombres, crear.Apellidos, crear.Username, crear.Password, crear.Sexo, crear.rowid]).then(function(result){

    		toastr.success('Has cambiado con exito tus datos');



		}, function(tx){
			console.log('error', tx);
		});

    }
 
    
})
