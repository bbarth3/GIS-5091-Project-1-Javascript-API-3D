
    require([
      "esri/WebScene",
      "esri/layers/FeatureLayer",
      "esri/views/SceneView",
      "esri/Camera",
      "esri/widgets/Home",
      "dojo/domReady!"
    ], function(WebScene, FeatureLayer, SceneView, Camera, Home) {

    
      /*var map = new Map({
        basemap: "streets",
        ground: "world-elevation"
      });*/
      var scene = new WebScene({
        portalItem:{
         id:"8046207c1c214b5587230f5e5f8efc77" 
        }
      });
      
      var camera = new Camera({
        position: [
          -87.623177, // lon
          41.881832, // lat
          5000// elevation in meters
        ],
        tilt:60,
        heading: -30
      })
      
      var camera2 = new Camera({
        position: {
          x: 116.4074,
          y: 39.9042,
          z: 5000000
        },
        tilt: 0,
        heading: 0
      });

      var view = new SceneView({
        container: "viewDiv",
        map: scene,
        viewingMode:"global",
        camera: camera,
        environment: {
            lighting: {
              date: new Date(),
              directShadowsEnabled: true,
              // don't update the view time when user pans.
              // The clock widget drives the time
              cameraTrackingEnabled: false
            }
        },
    });
    
    var homeBtn = new Home({
        view: view
      });

      // Add the home button to the top left corner of the view
    view.ui.add(homeBtn, "top-left");
      
 
    
   
var template = { // autocasts as new PopupTemplate()
        title: "Library",
        content: [{
          // It is also possible to set the fieldInfos outside of the content
          // directly in the popupTemplate. If no fieldInfos is specifically set
          // in the content, it defaults to whatever may be set within the popupTemplate.
          type: "fields",
          fieldInfos: [{
            fieldName: "community",
            label: "Community: ",
            visible: true
          }
                      ]
        }]
      };

     var symbol = {
      type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
      url: "data:image/png;base64,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",
      width: "10px",
      height: "10px"
};
  var renderer = {
      type: "simple",  // autocasts as new SimpleRenderer()
      symbol: symbol
    };
  
      // Reference the popupTemplate instance in the
      // popupTemplate property of FeatureLayer
      var featureLayer = new FeatureLayer({
        url: "https://services.arcgis.com/aScBVpZOvioggfOZ/arcgis/rest/services/Libraries_Location_and_Operation_Hours_within_Neighborhoods_of_Chicago/FeatureServer/0",
        outFields: ["*"],
        popupTemplate: template,
        renderer:renderer
      });
  
      scene.add(featureLayer);

const featureLayer1 = new FeatureLayer({
          url: "https://services.arcgis.com/aScBVpZOvioggfOZ/arcgis/rest/services/Libraries_Location_and_Operation_Hours_within_Neighborhoods_of_Chicago/FeatureServer/0"
        });

        scene.add(featureLayer1);
  
  const featureLayer2 = new FeatureLayer({
          url: "https://services3.arcgis.com/8mRVhBBtAu5eqZUu/arcgis/rest/services/Chicago_IndProp/FeatureServer/0"
        });

        scene.add(featureLayer2);

    });
