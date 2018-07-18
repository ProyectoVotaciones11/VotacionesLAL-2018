angular.module('votacioneslive')


.controller('ControlCtrl', function($scope, $state,  AuthServ, $q, toastr, $http, MySocket){

	MySocket.on('conectado:alguien', function(data){
		
		 console.log(data);

	});	    
 
});