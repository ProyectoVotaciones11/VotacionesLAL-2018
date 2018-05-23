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

				consulta = "INSERT INTO Participantes(Nombres, Apellidos, Username, Password, Tipo, Sexo) VALUES(?,?,?,?,?,?) ";
				ConexionServ.query(consulta, ['jorge', 'cardenas', 'jorge',  '123', 'Admin', 'M']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
				
				ConexionServ.query(consulta, ['pedro', 'romero', 'juan',  '123', 'Participante', 'M']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
					
				ConexionServ.query(consulta, ['Kevin', 'Eslava', 'kedaesva',  '123', 'admin', 'M']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
					
				ConexionServ.query(consulta, ['Marques', 'Gutieere<', 'maquez',  '123', 'Participante', 'M']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
					
				ConexionServ.query(consulta, ['jhan', 'ruda', 'jhan0018',  '123', 'admin', 'M']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});

				//Candidatos

				consulta = "INSERT INTO Candidatos( Nombres, Apellidos,  Foto, aspiracion_id, Sexo ) VALUES( ?, ?, ?, ?, ?) ";
				ConexionServ.query(consulta, ['pedro', 'romero', '2', '3', 'M']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
				
				ConexionServ.query(consulta, ['jhan', 'ruda','2', '1', 'M']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
					
				ConexionServ.query(consulta, ['toloza', 'calvo', '3',  '2',  'M']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
					
				ConexionServ.query(consulta, ['marta', 'prada', '4',  '3', 'M']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
					
				ConexionServ.query(consulta, ['kevin', 'eslava', '1',  '2',  'M']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});

				// VOTACIONES

				consulta = "INSERT INTO Votaciones( Nombre, Alias, Descripcion, Password) VALUES( ?, ?, ?, ?) ";
				ConexionServ.query(consulta, ['VOTACIONES ESTUDIANTILES 2019', 'VOT19', 'Para eligir personero y demás.', 123]).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});

				// VOTACIONES

				consulta = "INSERT INTO Aspiraciones( aspiracion, descripcion) VALUES( ?, ? )";
				ConexionServ.query(consulta, ['Personero', 'Representa al colegio']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});

				ConexionServ.query(consulta, ['Representante', 'Representa a los estudiantes']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});

				ConexionServ.query(consulta, ['Contralor', 'Se encarga del dinero.']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});


				consulta = "INSERT INTO Votos( Participantes_id, candidato_id, aspiracion_id, fecha_hora) VALUES( ?, ?, ?, ?) ";
				ConexionServ.query(consulta, ['1', '1', '1.', 123]).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});

				ConexionServ.query(consulta, ['2', '2', '2.', 123]).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});

					ConexionServ.query(consulta, ['3', '3', '3.', 123]).then(function(result) {
		
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