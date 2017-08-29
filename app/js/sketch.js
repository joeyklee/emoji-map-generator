// declare the leaflet map object
var mymap;
// @MODIFY: CHANGE THE POINT DENSITY OF THE EMOJIS, HIGHER NUMBERS MEAN LESS EMOJIS
var pointDensity = 10;
// declare the emoji map object
var myEmojiMap;


/****
@ main setup
****/
// set up your canvas
function setup() {
    createCanvas(520, 520);

    // add the leaflet map object and tiles
    // @MODIFY: THE LAT/LON AND ZOOM HERE IF YOU'D LIKE
    mymap = L.map('mymap').setView([40.703271, -73.993723], 17);
    mymap.scrollWheelZoom.disable();

    var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mymap);



    // create a new EmojiMapFromTiles Object
    myEmojiMap = new EmojiMapFromTiles(mymap);

    // don't loop it 60x a second
    noLoop();
}

// draw
function draw() {
    $("#defaultCanvas0").appendTo("#emojimap")
    // start the drawing out with a map
    myEmojiMap.makeEmojiMap();
}

// when the generator button is clicked
$('#generator').on('click', function() {
        myEmojiMap.makeEmojiMap();
})


/****
@ EmojiMapFromTiles Object
****/
function EmojiMapFromTiles(_mapObj) {
    var that = this;
    that.mapObj = _mapObj;


    /****
    @ make
    * get the tiles and call the make function
    ****/
    // get the tiles and call the make function
    this.makeEmojiMap = function() {
        leafletImage(that.mapObj, function(err, canvas) {
            // once you get back the canvas of pixels
            // read them into p5js with LoadImage
            var dimensions = that.mapObj.getSize();
            console.log(dimensions)

            loadImage(canvas.toDataURL(), function(t) {
                // get the text inputs
                var params = that.getInputs();
                // throw the results right on to the canvas
                that.make(t, dimensions.x, dimensions.y, params);
            })
        });
    }

    /****
    @ make
    * get the tiles and call the make function
    * uses params from the inptu
    ****/

    that.make = function(myImage, imageWidth, imageHeight, _params) {
        // load in the pixels from the image
        // @MODIFY: IF YOU DON'T WANT AN IMAGE BELOW THE EMOJIS COMMENT THE IMAGE() FUNCTION
        image(myImage, 0,0);
        myImage.loadPixels();
        // run through each pixel of the image
        for (var x = 0; x < imageWidth; x += pointDensity) {
            for (var y = 0; y < imageHeight; y += pointDensity) {
                // Calculate the 1D location from a 2D grid
                // 4 because you get rgba
                var loc = (x + y * imageHeight) * 4;
                // Get the R,G,B values from image
                var r, g, b;
                r = myImage.pixels[loc];
                g = myImage.pixels[loc + 1];
                b = myImage.pixels[loc + 2];

                // check for these rgb pixel values and 
                // assign the emoji to that x,y location
                if (_params){
                  for(var i = 0; i < Object.keys(_params.emojis).length-2; i++){
                    var myColors = that.getRGB(_params.rgbs[i].value);
                    if (r === myColors.r && g === myColors.g && b === myColors.b) {
                        push();
                        translate(x, y);
                        text(_params.emojis[i].value, 0, 0);
                        pop();
                    }
                  }
                } else{
                  if (r === 217 && g === 208 && b === 201) {
                      push();
                      translate(x, y);
                      text('🏠', 0, 0);
                      pop();
                  }

                  if (r === 170 && g === 211 && b === 223) {
                      push();
                      translate(x, y);
                      text('🌊', 0, 0);
                      pop();
                  }
                  if (r === 223 && g === 252 && b === 226) {
                      push();
                      translate(x, y);
                      text('🌲', 0, 0);
                      pop();
                  }
                }
                
            }
        }
    }

    //  get the inputs from the text fields
    that.getInputs = function(){
      var eInputs = $("input[type=text].emoji-input");
      var cInputs = $("input[type=text].color-input");
      console.log({emojis: eInputs, rgbs: cInputs})
      return {emojis: eInputs, rgbs: cInputs};
    }

    // convert rgb string to object
    that.getRGB = function(rgbstring){
      var colorVals = rgbstring.split(/[(),]+/)
      var output = {r:int(colorVals[1]), g:int(colorVals[2]), b:int(colorVals[3]) }
      return output;
    }
    
} // END OF OBJECT
