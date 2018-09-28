angular.module('votacioneslive')

.controller('PanelCtrl', function($scope, $uibModal, USER, AuthServ, toastr, $state, MySocket, $http){
    
    $scope.USER = USER;

    console.log($scope.USER);

     $scope.Admin = false;

     $scope.Puestos = false;

     
    setTimeout(function() {
        MySocket.emit('toma_mis_datos', {usuario: $scope.USER});  
    }, 1000); 

    MySocket.emit('Prueba', );  

    /* $scope.traer_datos = function(){
        $http.get('::Dashboard').then (function(result){
            $scope.pruebas= result.data ;
            
            console.log('Se trajo los datos con exito', result);
        }, function(error){
            console.log('No se pudo traer los datos', error);

        })
    };

        $scope.traer_datos(); */  


      
    
         MySocket.on('Secion_cerrada', function(r){

             $scope.id_recivido = r;

            console.log(r);
     
                    
               if ($scope.id_recivido == $scope.USER.rowid) {

                        toastr.success('Tu sesion a caducado');

                             localStorage.logueado   = false
                             
                             delete localStorage.USER;
     
                         $state.go('Login');

                    }else{ console.log("hola");}; 
                 
        
        }); 


     $scope.Mostrar_Puestos = function(){

     if ($scope.Puestos == false) { $scope.Puestos = true; }else{$scope.Puestos = false;}

     }

    
    $scope.traer_puestos = function(){

        MySocket.emit('necesito_puestos');  


    }

    MySocket.on('toma_los_puestos', function(datos){
        console.log(datos);
    })
    
    
   
    $scope.Mostrar_solo_admin = function(){

        if (USER.Tipo == 'Admin') {

            $scope.Admin = true;

        }else{

            
        }

    }

     $scope.Mostrar_solo_admin();
    
    
    
    
    
    $scope.cerrar_sesion = function(){

                     toastr.success('Has cerradi sesion con exito');

                         localStorage.logueado   = false
                         
                         delete localStorage.USER;
 
                 $state.go('Login');
    }
    
    
    
})

