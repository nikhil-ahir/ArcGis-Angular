/**
 * Created by synerzip on 13/06/15.
 */

angular.module("arcgis-map")
    .directive("arcgisLegend", ["$q","mapRegistry", function ($q,mapRegistry) {
        return {
            restrict:'E',
            scope:{
                mapid:"@"

            },
            // define an interface for working with this directive
            controller: function ($scope, $element, $attrs) {
                var mappromise = mapRegistry.get($scope.mapid);
                var legendWdgt = null;
                ///$element.attr("id","legendId")
                mappromise.then(function(map){
                    require([
                        'esri/dijit/Legend'], function (Legend) {
                        legendWdgt = new Legend({
                            map: map
                        },"legendWidgetId");

                        legendWdgt.startup();
                    });

                });

                $scope.$on('$destroy', function(){
                    if(legendWdgt){
                        legendWdgt.destroy();
                    }
                });
            },
            templateUrl:"../src/template/legendWidget.html"

        };
    }]);/**
 * Created by synerzip on 17/06/15.
 */
