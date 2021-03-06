// Changes relative css url()'s to point at the right location if they are going
// to be loaded.
var transformActiveSource = require("../node/transform_active_source");
var path = require('path'),
	url = require('url');

var isAbsoluteOrData = function( part ) {
	return /^(data:|http:\/\/|https:\/\/|\/)/.test(part);
};

module.exports = function(bundle, outPath){
	var outDirname = path.dirname(outPath);
	
	if(bundle.buildType === 'css') {
		
		bundle.nodes.forEach(function(node){

			// path from out to the css file
			var pathToCss = path.relative(outDirname, path.dirname(node.load.address) )+"/";
			transformActiveSource(node,"normalized-"+outPath, function(node, source){
				return source.replace(/url\(['"]?([^'"\)]*)['"]?\)/g, function( whole, part ) {
					if(isAbsoluteOrData(part)) {
						return whole;
					} else {
						return "url(" +url.resolve( pathToCss, part) + ")";
					}
				});
			});
		});
	}
	
};
