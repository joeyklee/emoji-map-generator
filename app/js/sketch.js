var mymap;
var img1;
var pointDensity = 6;
var img;

var emojiInput1, emojiInput2, emojiInput3,
    rgbInput1, rgbInput2, rgbInput3;

function setup() {
  createCanvas(600, 400);

  // $('body').append("<div id='mymap'></div>");
  // $('body').append("<div id='images'></div>");
  mymap = L.map('mymap').setView([51.505, -0.09], 16);
  mymap.scrollWheelZoom.disable();

  var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(mymap);


  // console.log(mymap.getSize());
  noLoop();
}





function draw() {

function getImageTiles() {
  leafletImage(mymap, function(err, canvas) {
      // now you have canvas
      // example thing to do with that canvas:
      img = document.createElement('img');
      dimensions = mymap.getSize();
      img.width = dimensions.x;
      img.height = dimensions.y;
      img.src = canvas.toDataURL();

      // document.getElementById('images').innerHTML = '';
      // document.getElementById('images').appendChild(img);

      // img1 = loadImage(img.src);
      // image(image1, 0, 0);

      // var canvas = document.getElementById("defaultCanvas0");
      // var ctx = canvas.getContext("2d");

      // var image = new Image();
      // image.onload = function() {
      //     ctx.drawImage(image, 0, 0);

      //  make(image, width, height);
      // };

      // image.src = img.src

      loadImage(img.src, function(t) {
          make(t, dimensions.x, dimensions.y);
      })


    });
  }

  $('#generator').on('click', function() {
    getImageTiles();

  })

}

function make(myImage, imageWidth, imageHeight) {
  emojiInput1 = $("input[type=text][name=emoji-input1]").val();
  emojiInput2 = $("input[type=text][name=emoji-input2]").val();
  emojiInput3 = $("input[type=text][name=emoji-input3]").val();

  rgbInput1 = getRGB($("input[type=text][name=rgb-input1]").val());
  rgbInput2 = getRGB($("input[type=text][name=rgb-input2]").val());
  rgbInput3 = getRGB($("input[type=text][name=rgb-input3]").val());
  
  console.log(rgbInput1)
  console.log(rgbInput2)
  console.log(rgbInput3)

  image(myImage, 0,0, imageWidth, imageHeight);
  myImage.loadPixels();
  for (var x = 0; x < imageWidth; x += pointDensity) {
  for (var y = 0; y < imageHeight; y += pointDensity) {
      // Calculate the 1D location from a 2D grid
      var loc = (x + y * imageWidth) * 4;
      // Get the R,G,B values from image
      var r, g, b;
      r = myImage.pixels[loc];
      g = myImage.pixels[loc + 1];
      b = myImage.pixels[loc + 2];

      

      // feature 1
      // rgb(224, 223, 223)
      // rgb(217, 208, 201)
      if (r === rgbInput1.r && g === rgbInput1.g && b === rgbInput1.b) {
          push();
          translate(x, y);
          text(emojiInput1, 0, 0); 
          pop();
      }

      
      // feature 2
      // rgb(181, 208, 208)
      if (r === rgbInput2.r && g === rgbInput2.g && b === rgbInput2.b) {
          push();
          translate(x, y);
          text(emojiInput2, 0, 0);
          pop();
          }

      
      // feature 3
      // rgb(116, 121, 121)
      // rgb(223, 252, 226)
      if (r === rgbInput3.r && g === rgbInput3.g && b === rgbInput3.b) {
          push();
          translate(x, y);
          text(emojiInput3, 0, 0);
          pop();
      }

    }
  }
}

function getRGB(rgbstring){
  var colorVals = rgbstring.split(/[(),]+/)
  var output = {r:int(colorVals[1]), g:int(colorVals[2]), b:int(colorVals[3]) }
  return output;
}