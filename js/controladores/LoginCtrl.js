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
				
				//Participantes

				consulta = "INSERT INTO Participantes(Nombres, Apellidos, Username, Password, Tipo, Sexo, Votacion_id, Grupo_id) VALUES(?,?,?,?,?,?,?,?) ";
				ConexionServ.query(consulta, ['jorge', 'cardenas', 'jorge',  '123', 'Admin', 'M', '2', 11]).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
				
				ConexionServ.query(consulta, ['pedro', 'romero', 'juan',  '123', 'Participante', 'M', '2', 11]).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
					
				ConexionServ.query(consulta, ['Kevin', 'Eslava', 'kedaesva',  '123', 'admin', 'M', '1', 11]).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
					
				ConexionServ.query(consulta, ['Marques', 'Gutieere<', 'maquez',  '123', 'Participante', 'M', '1', 11 ]).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
					
				ConexionServ.query(consulta, ['jhan', 'ruda', 'jhan0018',  '123', 'admin', 'M', '2', 10]).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});

				//Candidatos

				consulta = "INSERT INTO Candidatos( Nombres, Apellidos,  Foto, aspiracion_id, Sexo, Grupo_id ) VALUES( ?, ?, ?, ?, ?,?) ";
				ConexionServ.query(consulta, ['pedro', 'romero', 'images/users/1.jpg', '2', 'M', 11]).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
				
				ConexionServ.query(consulta, ['jhan', 'ruda','images/users/2.jpg', '1', 'M', 10]).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
					
				ConexionServ.query(consulta, ['toloza', 'calvo', 'images/users/3.jpg',  '3',  'M', 9]).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
					
				ConexionServ.query(consulta, ['marta', 'prada', 'images/users/4.jpg',  '4', 'M', 10]).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
					
				ConexionServ.query(consulta, ['kevin', 'eslava', 'images/users/5.jpg',  '5',  'M', 10]).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});

				ConexionServ.query(consulta, ['Martin', 'giz', 'images/users/6.jpg',  '6',  'M', 10]).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});

				// Votaciones

				consulta = "INSERT INTO Votaciones( Nombre, Alias, Descripcion, Password, Username) VALUES( ?, ?, ?, ?, ?) ";
				ConexionServ.query(consulta, ['VOTACIONES ESTUDIANTILES 2019', 'VOT19', 'Para eligir personero y demás.', 123, 'VOTA32']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});

				ConexionServ.query(consulta, ['VOTACIONES 2017', 'VOT17', 'Para eligir notas.', 123, 'VOTA23']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});

				// Aspiraciones

				consulta = "INSERT INTO Aspiraciones( aspiracion, descripcion, votacion_id) VALUES( ?,?,? )";
				ConexionServ.query(consulta, ['Personero', 'Representa al colegio', 1]).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});

				ConexionServ.query(consulta, ['Representante', 'Representa a los estudiantes', 1]).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});

				ConexionServ.query(consulta, ['Contralor', 'Se encarga del dinero.', 1]).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});

				ConexionServ.query(consulta, ['Contralor2017', 'Se encarga del dinero.', 2]).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});


				ConexionServ.query(consulta, ['Representante2017', 'Representa a los estudiantes', 2]).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});

				ConexionServ.query(consulta, ['Personero2017', 'Representa al colegio', 2]).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});



				// Votos


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