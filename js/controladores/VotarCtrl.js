angular.module('votacioneslive')


.controller('VotarCtrl', function($scope, $state, ConexionServ, AuthServ){
    
    ConexionServ.createTables();
		
 
});