/**
 * Created by synerzip on 15/06/15.
 */

var scripts = document.getElementsByTagName("script")
var currentScriptPath = scripts[scripts.length-1].src;

angular.module("arcgis-map")
    .directive("layerWidget", ["$q", "mapRegistry","$window", function ($q, mapRegistry,$window) {
        return {
            restrict: 'E',
            scope: {
                mapid: "@"
            },

            templateUrl:currentScriptPath.substring(0, currentScriptPath.lastIndexOf('/') + 1)
            + 'templates/layerWidget.html',

            compile:function($element,$attrs){



            },
            controller: function ($scope) {
                $scope.searchFilterQuery = null;
                $scope.stoploading = false;
                $scope.layers = mapRegistry.getLayers("myMapId");
                $scope.$watch("layers",function(newarray,oldarray){
                    $scope.layers = newarray;

                });


                $scope.$on("layerAdded",function(event,layer){

                    $scope.stoploading = false;
                    $scope.$apply(function(){
                        if(!$scope.layers){
                            $scope.layers = [layer];
                        }else{
                            $scope.layers.push(layer);
                        }
                        $scope.stoploading = true;
                    });

                });

                $scope.layerFilter = function (item) {
                    return $scope.searchFilterQuery ? (item.name.toLowerCase().indexOf($scope.searchFilterQuery.toLowerCase()) >= 0) : true;
                };
            }

        };


    }]);