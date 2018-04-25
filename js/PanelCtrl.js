angular.module('votacioneslive')

.controller('AlumnosCtrl', function($scope,ConexionServ,$filter){

	ConexionServ.query("SELECT id,  Nombres, Apellido, Sexo, Grupo_id, Votacion_id, Tipo from Participantes", []).then(function(result){
			$scope.Participantes = result;
			console.log(' tabla Participantes ', result);

		}, function(tx){
			console.log('error', tx);
		});

})

.controller('AlumnosCtrl', function($scope,ConexionServ,$filter){

	ConexionServ.query("SELECT id,  Nombres, Apellido, Sexo, Grupo_id, Votacion_id, Tipo from Participantes", []).then(function(result){
			$scope.Participantes = result;
			console.log(' tabla Participantes ', result);

		}, function(tx){
			console.log('error', tx);
		});

})

.controller('PanelCtrl', function($scope,ConexionServ,$filter){

	$scope.Aspiraciones = false;
	$scope.Participantes = false;
	$scope.Candidatos = false;
	$scope.votaciones = false;
	$scope.Votos = false;

	ConexionServ.createTables();

		
		ConexionServ.query("SELECT id, Nombres, Apellido, Sexo, Grupo_id, Foto, aspiracion_id from Candidatos", []).then(function(result){
			$scope.Candidatos = result;
			console.log(' tabla Candidatos ', result);

		}, function(tx){
			console.log('error', tx);
		});

		ConexionServ.query("SELECT  Nombres,  Alias, descripcion, Username, Password from votaciones", []).then(function(result){
			$scope.votaciones = result;
			console.log(' tabla votaciones ', result);

		}, function(tx){
			console.log('error', tx);
		});

		ConexionServ.query("SELECT  Participantes_id,  candidato_id, aspiracion_id, fecha_hora from Votos", []).then(function(result){
			$scope.Votos = result;
			console.log(' tabla Votos ', result);

		}, function(tx){
			console.log('error', tx);
		});

		ConexionServ.query("SELECT  aspiracion,  descripcion from Aspiraciones", []).then(function(result){
			$scope.Aspiraciones = result;
			console.log(' tabla Aspiraciones ', result);

		}, function(tx){
			console.log('error', tx);
		});

		$scope.Mostrar_Participantes = function(){

			$scope.Participantes = true;
			$scope.Aspiraciones = false;
			$scope.Candidatos = false;
			$scope.votaciones = false;
			$scope.Votos = false;

		}

		$scope.Mostrar_Candidatos = function(){

			$scope.Candidatos = true;
			$scope.Participantes = false;
			$scope.Aspiraciones = false;
			$scope.votaciones = false;
			$scope.Votos = false;
		}

		$scope.Mostrar_votaciones = function(){

			$scope.votaciones = true;
			$scope.Participantes = false;
			$scope.Aspiraciones = false;
			$scope.Candidatos = false;
			$scope.Votos = false;
		}

		$scope.Mostrar_Votos = function(){

			$scope.Votos = true;
			$scope.Participantes = false;
			$scope.Aspiraciones = false;
			$scope.Candidatos = false;
			$scope.votaciones = false;
		}

		$scope.Mostrar_Aspiraciones = function(){

			$scope.Aspiraciones = true;
			$scope.Participantes = false;
			$scope.Candidatos = false;
			$scope.votaciones = false;
			$scope.Votos = false;
		}


		$scope.Insert_Participantes = function(){

		ConexionServ.query("INSERT INTO Participantes(   Nombres, Apellido, Sexo, Grupo_id, Votacion_id, Tipo ) VALUES( ?, ?, ?, ?, ?, ?)", ["jhanc118","123", "solo","jhanc118","123", "123"]).then(function(result){
		
			console.log(' Participantes creado ', result);

		}, function(tx){
			console.log('error', tx);
		});

		}

		$scope.Insert_Candidatos = function(){

		ConexionServ.query("INSERT INTO Candidatos( Nombres, Apellido, Sexo, Grupo_id, Foto, aspiracion_id ) VALUES( ?, ?, ?, ?, ?, ?)", ["jhanc118","123", "solo","jhanc118","123", "123"]).then(function(result){
		
			console.log(' Candidatos creado ', result);

		}, function(tx){
			console.log('error', tx);
		});
		}

		$scope.Insert_votaciones = function(){

		ConexionServ.query("INSERT INTO votaciones( Nombres,  Alias, descripcion, Username, Password ) VALUES( ?, ?, ?, ?, ?)", ["jhanc118","123", "solo","jhanc118","123"]).then(function(result){
		
			console.log(' votaciones creado ', result);

		}, function(tx){
			console.log('error', tx);
		});
		}

		$scope.Insert_Votos = function(){

			ConexionServ.query("INSERT INTO Votos( Participantes_id,  candidato_id, aspiracion_id, fecha_hora) VALUES( ?, ?, ?, ?)", ["2","123","1","12we3"]).then(function(result){
		
			console.log(' Votos creado ', result);

		}, function(tx){
			console.log('error', tx);
		});
		
		}

		$scope.Insert_Aspiraciones = function(){

			ConexionServ.query("INSERT INTO Aspiraciones(  aspiracion,  descripcion ) VALUES( ?, ?)", ["jhanc118","123"]).then(function(result){
		
			console.log(' Aspiraciones creado ', result);

		}, function(tx){
			console.log('error', tx);
		});
		}

		






	/*consulta = 'SELECT  Nombres, Username, Contrasena from Usuarios'
		ConexionServ.query(consulta, []).then(function(result){
			$scope.usuarios = result;
			console.log(' tabla usuarios ', result);

		}, function(tx){
			console.log('error', tx);
		});

		consulta = 'INSERT INTO Usuarios(Nombres, Username, Contraseña) VALUES(?, ?, ?)'
		ConexionServ.query(consulta, ["solo","jhanc118","123"]).then(function(result){
		
			console.log(' Usuario creado ', result);

		}, function(tx){
			console.log('error', tx);
		});*/

})