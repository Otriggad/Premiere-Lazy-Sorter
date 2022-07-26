(function () {
 'use strict';
 var path, slash;
 path = location.href;
	if(getOS() == "MAC") {
		slash = "/";
		path = path.substring(0, path.length - 11);
	}
	if(getOS() == "WIN") {
		slash = "/";
		path = path.substring(8, path.length - 11);
	}

 }());


function getOS() {
 		var userAgent = window.navigator.userAgent,
 		platform = window.navigator.platform,
 		macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
 		windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
 		os = null;

 		if(macosPlatforms.indexOf(platform) != -1) {
 			os = "MAC";
 		} else if(windowsPlatforms.indexOf(platform) != -1) {
 			os = "WIN";
 		}
 		return os;
 	}

function pushAnchor(id) {
	var csInterface = new CSInterface();
	csInterface.evalScript("applyToSelectedClip(" + id + ")");
}

function pushAlignment(id) {
	console.log("push")
	var csInterface = new CSInterface();
	csInterface.evalScript("applyAlignToSelectedClip(" + id.slice(-1) + ")");
}