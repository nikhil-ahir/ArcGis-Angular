/**
 * Created by sharadau on 17-06-2015.
 */
var scripts = document.getElementsByTagName("script")
var currentScriptPath = scripts[scripts.length-1].src;
angular.module("arcgis-map")
    .directive("arcgisSearch", ["$q","mapRegistry", function ($q,mapRegistry) {
        return {
            restrict:'E',
            scope:{
                mapid:"@"

            },
            // define an interface for working with this directive
            controller: function ($scope, $element, $attrs) {
                var mappromise = mapRegistry.get($scope.mapid);
                ///$element.attr("id","legendId")
                mappromise.then(function(map){
                    require([
                        'esri/dijit/Search'], function (Search) {
                        var s = new Search({
                            map: map
                        },"searchWidgetId");
                        s.startup();
                    });

                });
            },
            templateUrl:currentScriptPath.substring(0, currentScriptPath.lastIndexOf('/') + 1)
            + 'templates/searchWidget.html'

        };
    }]);/**
 * Created by synerzip on 17/06/15.
 */
