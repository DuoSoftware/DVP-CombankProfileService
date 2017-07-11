/*
fs.readFile(image_origial, function(err, original_data){
    fs.writeFile('image_orig.jpg', original_data, function(err) {});
    var base64Image = original_data.toString('base64');
    var decodedImage = new Buffer(base64Image, 'base64');
    fs.writeFile('image_decoded.jpg', decodedImage, function(err) {});
});*/
