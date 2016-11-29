var THREEx = THREEx || {}

// shim
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL;

/**
 * Grab camera
 * @constructor
 */
THREEx.WebcamGrabbing = function(){

	//////////////////////////////////////////////////////////////////////////////////
	//		Comments
	//////////////////////////////////////////////////////////////////////////////////
    // create video element
    var domElement = document.createElement('video')
    domElement.setAttribute('autoplay', true);

    // http://stackoverflow.com/questions/15925010/stop-the-webcam-streaming-of-getusermedia-without-page-refreshing
    var localStream = false;

	// window.domElement = video
	domElement.style.zIndex = -1;
    domElement.style.position = 'absolute'

	domElement.style.top = '0px'
	domElement.style.left = '0px'
	domElement.style.width = '100%'
	domElement.style.height = '100%'

    /**
     * Resize video element.
     * - Made complex to handle the aspect change
     * - it is frequently when the mobile is changing orientation
     * - after a search on the internet, it seems hard/impossible to prevent browser from changing orientation
     */
    function onResize(){
        // is the size of the video available ?
        if( domElement.videoHeight === 0 )   return

        var videoAspect = domElement.videoWidth / domElement.videoHeight
        var windowAspect = window.innerWidth / window.innerHeight
    }

    window.addEventListener('resize', function(event){
            onResize()
    })

    // just to be sure - resize on mobile is funky to say the least
    setInterval(function(){
        onResize()
    }, 500)

    // get the media sources
    MediaStreamTrack.getSources(function(sourceInfos) {
        // define getUserMedia() constraints
        var constraints = {
                video: true,
                audio: false,
        }
        // to mirror the video element when it isnt 'environment'
        // domElement.style.transform   = 'scaleX(-1)'

        // it it finds the videoSource 'environment', modify constraints.video
        for (var i = 0; i < sourceInfos.length; ++i) {
            var sourceInfo_ = sourceInfos[i];
            console.log("kind " + sourceInfo_.kind);
            console.log("facing " + sourceInfo_.facing);
            console.log("id " + sourceInfo_.id);
            console.log("----->> " + sourceInfos.length);
            //var s = JSON.stringify(sourceInfo);
            //console.log(s);
            //console.log("+++++ ");
            

            //if(sourceInfo.kind == "video" && sourceInfo.facing == "environment") {
            if(sourceInfo_.kind == "video" ) {
                    constraints.video = {
                            optional: [{sourceId: sourceInfo_.id}]
                    }
                    // not to mirror the video element when it is 'environment'
                    // domElement.style.transform   = ''
            }

            //db5af386fa7f8d3057ad3d915f6abe012b0b9872cfd56a1b9b1d18c928b10716'
        }

        // try to get user media
        navigator.getUserMedia( constraints, function(stream){
            domElement.src = URL.createObjectURL(stream);
            domElement.track  = stream.getVideoTracks()[0];
        }, function(error) {
                console.error("Cant getUserMedia()! due to ", error);
        });
    });


	this.domElement = domElement;
}

