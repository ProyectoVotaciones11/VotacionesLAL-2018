angular.module('votacioneslive')

.controller('PanelCtrl', function($scope, ConexionServ, $uibModal, USER, AuthServ){
    
    $scope.USER = USER;

     $scope.Admin = false;



    console.log(USER.Tipo)
    
    
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
        AuthServ.cerrar_sesion();
    }
    
    
    
})

