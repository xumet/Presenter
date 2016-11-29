var App = (function(App){
    "use strict";

    App.enviroment = {
    "debug" : true,
    "width" : null,
    "height" : null,
    "testing_on_desktop" : null
	}

    App.initialize = function() {

    	if(App.enviroment.debug){
            App.debugOutput = document.createElement('div');
            App.debugOutput.id = 'debugOutput';
            document.body.appendChild(App.debugOutput);
        }
        
        App.debug('-------------------------');
        App.debug('--  Launching the App  --');
        App.debug('-------------------------');
    }

    App.debug = function(text){
        if(App.enviroment.debug){
            console.log("Presenter-> " + text);
            App.debugOutput.innerHTML += ( text + "<br>" );
        }
    }

    return App;

})(App || {});