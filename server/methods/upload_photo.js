//var gm = Meteor.npmRequire('gm');

var resizeAndWriteAsync = function(buffer, lpath, w, h, cb) {
  var binaryPaths = process.env['PATH'].split(sep);
  var graphicsmagick = false;
var imagemagick = false;
var fs = Npm.require("fs"); 
var sep = /^win/.test(process.platform) ? ';' : ':';
var binaryPaths = process.env['PATH'].split(sep);

for (var i = 0; i < binaryPaths.length; i++) {
  var binPath = binaryPaths[i];
  console.log("Looking in", binPath)
  // If we have not found GraphicsMagic
  if (!graphicsmagick) {
    // Init
    var gmPath = path.join(binPath, 'gm');
    var gmExePath = path.join(binPath, 'gm.exe');

    // Check to see if binary found
    graphicsmagick = fs.existsSync(gmPath) || fs.existsSync(gmExePath);

    // If GraphicsMagic we dont have to check for ImageMagic
    // Since we prefer GrapicsMagic when selecting api
    if (!graphicsmagick && !imagemagick) {
      // Init paths to check
      var imPath = path.join(binPath, 'convert');
      var imExePath = path.join(binPath, 'convert.exe');

      // Check to see if binary found
      imagemagick = fs.existsSync(imPath) || fs.existsSync(imExePath);

    }
  }
}

console.log("Found GraphicsMagick", graphicsmagick)
console.log("Found ImageMagick", imagemagick)


  return gm(buffer).options({
    imageMagick: true
  }).resize(w, h + "^", ">").gravity('Center').crop(w, h, 0, 0).noProfile().write(lpath, cb);
};

var resizeAndWrite = Meteor.wrapAsync(resizeAndWriteAsync);

Meteor.methods({
  uploadImage: function(userId, data) {    
    data = new Buffer(data, 'binary');
    var name = Meteor.uuid();
    var path = Meteor.getUploadFilePath(name) + ".jpg";
    console.log('path: ' + path);
    resizeAndWrite(data, path, 1920, 1080);
    PhotosCollection.create({
    	owner: this.userId(),
    	url: path
    }, function (err, id) {
    	if (error) {
  			console.log(error.message);
		  } else {
  			form.reset();
  			console.log('Photo uploaded!');
		  }
    });
    return;
  }
});