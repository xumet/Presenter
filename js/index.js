"use strict";

if(localStorage["token"] === undefined ){
    localStorage["token"] = 'blank';
}

//toastr.options.progressBar = true;

document.addEventListener('DOMContentLoaded', function() {
	App.initialize();
});