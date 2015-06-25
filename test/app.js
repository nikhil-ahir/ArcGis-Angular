/**
 * Created by yogeshp on 6/12/2015.
 */

angular.module("myApp",["layout-containers","arcgis-map","dndLists","ngRoute"])
    .controller('MapController', function ($scope,$route, $routeParams, $location) {
        //Widget selection and order
        $scope.widgetConfigs = {
            "allowedTypes":["left","right"],
            "leftNavItems":[
                {
                    "name": "Layers",
                    "iconClass": "mdi-maps-layers red-text accent-2",
                    "id":"layerWidget",
                    selected:true
                },
                {
                    "name": "Legend",
                    "iconClass": "mdi-maps-map purple-text accent-2",
                    "id":"legendWidget",
                    selected:false
                },
                {
                    "name": "Basemap",
                    "iconClass": "mdi-maps-satellite green-text accent-2",
                    "id":"basemapWidget",
                    selected:false
                },
                {
                    "name": "Direction",
                    "id":"directionWidget",
                    "iconClass": "mdi-maps-navigation green-text accent-2",
                    selected:false
                }
            ],
            "rightNavItems":[
                {
                    "name": "Chart",
                    "id": "chartWidget",
                    "iconClass": "mdi-av-equalizer blue-text accent-2"

                },
                {
                    "name": "Credit",
                    "id": "creditWidget",
                    "iconClass": "mdi-social-school amber-text darken-3"

                },
                {
                    "name": "Drawing",
                    "id": "drawingWidget",
                    "iconClass": "mdi-editor-format-paint green-text accent-2"
                },
                {
                    "name": "Search",
                    "id": "searchWidget",
                    "iconClass": "small mdi-action-search green-text accent-2"
                }
            ]
        };
        $scope.drawingselected = false;

        $scope.collapsedRight = true;

        $scope.contentClosed = false;

        $scope.rightContentClosed = true;

        $scope.selectSearch = function(){
            $scope.collapsedRight = false;
        };

        $scope.selectLeft = function(itemId){
            $scope.openContent();
            var selectedItem;
            for (var item in $scope.widgetConfigs.leftNavItems){
                $scope.widgetConfigs.leftNavItems[item].selected = false;
                if($scope.widgetConfigs.leftNavItems[item].id == itemId){
                    selectedItem = $scope.widgetConfigs.leftNavItems[item];
                }
            }

            selectedItem.selected = true;
        };

        $scope.closeContent = function(){
            $scope.contentClosed = true;
            $scope.basemapselected = false;
            $scope.legendselected = false;
            $scope.layerseleted = false;
        };

        $scope.closeRightContent = function(){
            $scope.rightContentClosed = true;
        };

        $scope.openRightContent = function(){
            $scope.rightContentClosed = false;
        };

        $scope.openContent = function(){
            $scope.contentClosed = false;
        };
        $scope.map = {
            center: {
                lng: -96.53,
                lat: 38.374
            },
            zoom: 14,
            basemap: 'topo',
            layers: null,
            options: {
                navigationMode: 'classic', //css-transforms
                sliderOrientation: 'horizontal',
                sliderPosition: 'top-right',
                fadeOnZoom: false,
                resizeDelay: 500
            }
        };

        $scope.setHideLeft = function(){
            $scope.hideleft = !$scope.hideleft;
            $scope.$broadcast("resizemap");
        };
        $scope.hideleft = false;

        $scope.selectDrawing = function(){
            $scope.openRightContent();
            $scope.directionselected = false;
            $scope.drawingselected = true;
        };

    })
    .controller('WidgetSettingController', function($scope, $routeParams) {

    })
    .controller('DashboardController', function($scope, $routeParams) {



    })
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/dashboard', {
                templateUrl: 'dashboard.html',
                controller: 'DashboardController',

            })
            .when('/settings', {
                templateUrl: 'settings.html',
                controller: 'WidgetSettingController'
            });

        // configure html5 to get links working on jsfiddle
        //$locationProvider.html5Mode(true);
    });;


