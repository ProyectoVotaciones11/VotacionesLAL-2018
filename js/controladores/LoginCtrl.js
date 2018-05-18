angular.module('votacioneslive')


.controller('LoginCtrl', function($scope, $state, ConexionServ, AuthServ){
    
    $scope.user = {}

    $scope.entrar = function(user){
           
        AuthServ.loguear(user).then(function(){
            $state.go('panel')
        }, function(){
            alert('Datos incorrectos');
        })    
    }
    
    ConexionServ.createTables();
	
    $scope.insertar_datos_iniciales = function() {
		
    	consulta = "SELECT * from Participantes ";
   		ConexionServ.query(consulta, []).then(function(result) {
			if (result.length == 0) {
				
				//Candidatos

				consulta = "INSERT INTO Participantes(Nombre, Apellido, Username, Password, Tipo, Sexo) VALUES(?,?,?,?,?,?) ";
				ConexionServ.query(consulta, ['JORGE', 'CELEDON', 'jorge',  '123', 'Admin', 'M']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
				
				ConexionServ.query(consulta, ['JUAN CAMILO', 'MANRRIQUE', 'juan',  '123', 'Admin', 'M']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
					
				ConexionServ.query(consulta, ['DANIEL', 'GRANDAS', 'daniel',  '123', 'Participante', 'M']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
					
				ConexionServ.query(consulta, ['EDILSON', 'MARQUEZ', 'edilson',  '123', 'Participante', 'M']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
					
				ConexionServ.query(consulta, ['FELIX', 'DÍAZ', 'felix',  '123', 'Pastor', 'M']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});

				//Candidatos

				consulta = "INSERT INTO Candidatos( Nombres, Apellidos,  Foto, aspiracion_id, Sexo ) VALUES( ?, ?, ?, ?, ?) ";
				ConexionServ.query(consulta, ['JORGE', 'CELEDON', '2', '3', 'M']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
				
				ConexionServ.query(consulta, ['DANIEL', 'GRANDAS','2', '1', 'M']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
					
				ConexionServ.query(consulta, ['DANIEL', 'GRANDAS', '3',  '2',  'M']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
					
				ConexionServ.query(consulta, ['EDILSON', 'MARQUEZ', '4',  '3', 'M']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
					
				ConexionServ.query(consulta, ['FELIX', 'DÍAZ', '1',  '2',  'M']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});

				// VOTACIONES

				consulta = "INSERT INTO Votaciones( Nombre, Alias, Descripcion, Password) VALUES( ?, ?, ?, ?) ";
				ConexionServ.query(consulta, ['VOTACIONES ESTUDIANTILES 2019', 'VOT19', 'Para eligir personero y demás.', 123]).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
				

			}
			
        }, function(tx) {
          console.log("", tx);
		});
		
	};
	
	$scope.insertar_datos_iniciales();
	
 
})