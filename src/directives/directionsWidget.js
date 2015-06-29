/**
 * Created by sujatah on 6/17/2015.
 */
var scripts = document.getElementsByTagName("script")
var currentScriptPath = scripts[scripts.length-1].src;
angular.module("arcgis-map")
    .directive("arcgisDirections", ["$q","mapRegistry", function ($q,mapRegistry) {
        return {
            restrict:'E',
            scope:{

            },
            // define an interface for working with this directive
            controller: function ($scope, $element, $attrs) {
                var mappromise = mapRegistry.get($attrs.mapid);
                var directions = null;
                mappromise.then(function(map) {
                    require([
                        "esri/dijit/Directions"
                    ], function (Directions) {
                        //all requests could/should be routed through a proxy to avoid making people sign in...

                        var geocoderOptions = {
                            autoComplete: true,
                            arcgisGeocoder: {
                                url: "http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer",
                                name: "Esri World Geocoder",
                                sourceCountry: "USA"
                            }
                        };
                        directions = new Directions({
                             map: map,
                             routeTaskUrl: "http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Network/USA/NAServer/Route",
                             showClearButton: true,
                             geocoderOptions: geocoderOptions
                         },"directionId");
                         directions.startup();
                     });
                });

                $scope.$on('$destroy', function(){
                    if(directions){
                        directions.destroy();
                    }
                });
            },
            templateUrl:currentScriptPath.substring(0, currentScriptPath.lastIndexOf('/') + 1)
            + 'templates/directionsWidget.html'

        };
    }]);
