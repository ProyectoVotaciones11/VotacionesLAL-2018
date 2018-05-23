angular.module('votacioneslive')

.factory('AuthServ', function($q, $http, $timeout, ConexionServ, $state) {

   var consulta_user = 'SELECT p.rowid, p.id, p.Nombres, p.Apellidos, p.Tipo, p.Username, p.Sexo, p.Grupo_id, p.Votacion_id, ' +
                'v.Nombre as Nombre_votacion, v.alias, v.descripcion, v.Username as Username_votacion, v.Password '+
            'FROM Participantes p '+
            'LEFT JOIN Votaciones v ON v.rowid=p.Votacion_id '+
            'WHERE  ';


                
    result = {
          
        verificar_user_logueado: function(){
            var defered = $q.defer();
            
            if (localStorage.logueado){
                if (localStorage.logueado == 'true'){
                    
                    usu = localStorage.USER;
                    usu = JSON.parse(usu);
                    defered.resolve(usu);
                    
                }else{
                    $state.go('login');
                    defered.reject('No logueado');
                }
            }else{
                $state.go('login');
                defered.reject('No logueado')
            }
            
  
            return defered.promise;
        
        },
          
        loguear: function(datos){
            var defered = $q.defer();
            
            var consulta_user = 'SELECT p.rowid, p.id, p.Nombres, p.Apellidos, p.Tipo, p.Username, p.Sexo, p.Grupo_id, p.Votacion_id, ' +
                'v.Nombre as Nombre_votacion, v.alias, v.descripcion, v.Username as Username_votacion, v.Password '+
            'FROM Participantes p '+
            'LEFT JOIN Votaciones v ON v.rowid=p.Votacion_id '+
            'WHERE  ';

            ConexionServ.query(consulta_user+' p.username=? and p.password=? ', [datos.username, datos.password]).then(function(result){
                
                if (result.length > 0) {
                    localStorage.logueado   = true
                    localStorage.USER       = JSON.stringify(result[0]);
                    defered.resolve(result[0]);
                }else{
                    defered.reject('DATOS INVÁLIDOS')
                }
                
            }, function(){
                console.log('Error logueando');
                defered.reject('Error logueando')
            })
  
            return defered.promise;
        
        },
        
        get_user: function(){
            
            if (localStorage.logueado){
                if (localStorage.logueado == 'true'){
                    
                    usu = localStorage.USER;
                    usu = JSON.parse(usu);
                    return usu;
                }else{
                    $state.go('login');
                }
            }else{
                $state.go('login');
            }
            
        
        },
        
        update_user_storage: function(datos){
            var defered = $q.defer();
            
            ConexionServ.query(consulta_user+' u.rowid=? ', [datos.rowid]).then(function(result){

                if (result.length > 0) {
                    localStorage.logueado   = true
                    localStorage.USER       = JSON.stringify(result[0]);
                    defered.resolve(result[0]);
                }else{
                    console.log('Cero usuarios');
                    defered.reject('Cero usuarios')
                }
                
            }, function(){
                console.log('Error logueando');
                defered.reject('Error logueando')
            })
            
            return defered.promise;
            
        },
        
        cerrar_sesion: function(datos){
            localStorage.logueado   = false
            delete localStorage.USER;
            $state.go('login');
        },
          
    }
    
    
    return result;

});