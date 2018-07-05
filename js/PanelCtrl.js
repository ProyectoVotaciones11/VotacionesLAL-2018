angular.module('votacioneslive')

.controller('PanelCtrl', function($scope, ConexionServ, $uibModal, USER, AuthServ, toastr, $state, MySocket){
    
    $scope.USER = USER;

     $scope.Admin = false;

     $scope.Puestos = false;

     $scope.Mostrar_Puestos = function(){

     if ($scope.Puestos == false) { $scope.Puestos = true; }else{$scope.Puestos = false;}

     }

    
    $scope.traer_puestos = function(){

        MySocket.emit('necesito_puestos');  

    }

    MySocket.on('toma_los_puestos', function(datos){
        console.log(datos);
    })
    
    
    ConexionServ.createTables();

    $scope.Mostrar_solo_admin = function(){

        if (USER.Tipo == 'Admin') {

            $scope.Admin = true;

        }else{

            console.log('usted no es admin')
        }

    }

     $scope.Mostrar_solo_admin();
    
    
    
    $scope.seleccionarDistrito = function () {
        var modal = $uibModal.open({
            templateUrl: '../templates/Entidades/seleccionarDistritoModal.html',
            size: 'lg',
            resolve: {
                USER: function () {
                    return $scope.USER;
                }
            },
            controller: 'SeleccionarDistritoModalCtrl'
        });
        
        modal.result.then(function (usuario_new) {
            $scope.USER = usuario_new;
        });
    }
    
    
    $scope.cerrar_sesion = function(){

                     toastr.success('Has cerradi sesion con exito');

                         localStorage.logueado   = false
                         
                         delete localStorage.USER;
 
                 $state.go('Login');
    }
    
    
    
})

