angular.module('votacioneslive', ['ui.router'])

.config(['$stateProvider','$urlRouterProvider', function ($stateProvider, $urlRouterProvider ){


	var panel = {
		name: 'panel',
		url: '/panel',
		templateUrl: 'templates/panel.html'
	}

	var alumnos = {
		name: 'panel.alumnos',
		url: '/alumnos',
		templateUrl: 'templates/alumnos.html',
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
  $stateProvider.state(alumnos);
  $stateProvider.state(candidatos);
  $stateProvider.state(Votaciones);
  $stateProvider.state(Aspiraciones);
  $stateProvider.state(Votos);

  $urlRouterProvider.otherwise('/panel');

}]);