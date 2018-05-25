angular.module('votacioneslive', [
	'ngSanitize', 
	'ngTouch',
	'ngAnimate',
	'ui.router', 
	'ui.bootstrap',
	'ui.select',
	'ui.grid',
	'ui.grid.edit',
	'ui.grid.resizeColumns',
	'ui.grid.exporter',
	'ui.grid.selection',
	'ui.grid.cellNav',
	'ui.grid.autoResize',
	'ui.grid.pinning',
	'ui.grid.expandable',
	'ui.grid.moveColumns',
	'toastr'
])

.config(['$stateProvider','$urlRouterProvider', function ($stateProvider, $urlRouterProvider ){


	var panel = {
		name: 'panel',
		url: '/panel',
		templateUrl: 'templates/panel.html',
		controller: 'PanelCtrl',
		resolve: {
			USER: ['AuthServ', function(AuthServ){
				return AuthServ.verificar_user_logueado();
			}]
		}
	}

	var Login = {
		name: 'Login',
		url: '/Login',
		templateUrl: 'templates/Login.html',
		controller:'LoginCtrl'
	}

	var Votar = {
		name: 'panel.Votar',
		url: '/Votar',
		templateUrl: 'templates/Votar.html',
		controller:'VotarCtrl'
	}

	var Participantes = {
		name: 'panel.Participantes',
		url: '/alumnos',
		templateUrl: 'templates/Participantes.html',
		controller:'ParticipantesCtrl'
	}
	var candidatos = {
		name: 'panel.candidatos',
		url: '/candidatos',
		templateUrl: 'templates/candidatos.html',
		controller:'CandidatosCtrl'
	}
	var Votaciones = {
		name: 'panel.Votaciones',
		url: '/Votaciones',
		templateUrl: 'templates/Votaciones.html',
		controller:'VotacionesCtrl'
	}

	var Aspiraciones = {
		name: 'panel.Aspiraciones',
		url: '/Aspiraciones',
		templateUrl: 'templates/aspiraciones.html',
		controller:'AspiracionesCtrl'
	}

	var Votos = {
		name: 'panel.Votos',
		url: '/Votos',
		templateUrl: 'templates/Votos.html',
		controller:'VotosCtrl'
	}

  $stateProvider.state(panel);
  $stateProvider.state(Login);
  $stateProvider.state(Votar);
  $stateProvider.state(Participantes);
  $stateProvider.state(candidatos);
  $stateProvider.state(Votaciones);
  $stateProvider.state(Aspiraciones);
  $stateProvider.state(Votos);
 

   $urlRouterProvider.otherwise('/Login');

}])


.run(function($state){
	$state.defaultErrorHandler(function(error) {

	   $state.go('Login', { errorMessage: error }); 
	});
});