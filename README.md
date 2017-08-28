# Map, Image, Emoji

![app interface screenshot](assets/img/app-01.png)

## Workshop 

Title: Let's Make Emoji Maps!
With: Joey Lee (tw: @leejoeyk)

About: 
Let's Make Emoji Maps! Emojis are an expressive (and fun) means of representing emotions and actions as well as physical features. There's plenty of great examples of people using emojis in maps like the Emoji Weather Maps (https://blog.darksky.net/emoji-maps/) or the Emoji Atlas (https://twitter.com/emojiatlas?lang=de), all of which use emojis as a way to symbolize various things in geography. In this workshop, we will use emoji mapping as a way to explore some new ways of representing space as well as some concepts around data processing (e.g. pixel matching!). 

This workshop will be a fun evening of tweaking code and creating emoji maps that mean something different for each of us. I'd ❤️ to 👀 you!



***

# Setup

## Materials

If you're reading this, then you've found all the materials you need for the workshop!

## A quick note on browsers

### Chrome

* things should work fine here without any fiddling. 

### Firefox

* Note if you are using firefox, you will have to disable hardware acceleration to get your emoji's to show up. You can find out more here. 
* to disable: preferences > general > performance: uncheck "use hardware acceleration when possible"

## A simple webserver

* There's a bunch of ways to get a webserver running in your machine. 
* I'd suggest:

On mac:

```
python -m SimpleHTTPServer
```

or any platform that can run Node.js, use the `http-server` npm module:

```
# install the module
npm install http-server -g

# run, user the --cors flag in case you get cross-origin issues
http-server 

# check http://127.0.0.1:8080 
```

***


# Overview

* a few slides maybe?
* Two simple examples images
* code overview
* how-to
* remix and reuse code
* P5js
* color tool plugin for the browser

# Short Introduction

In this workshop we are going to take advantage of `leaflet.js` and `openstreetmap` as our web mapping and data source and the functionality of `p5.js` as a creative coding tool to produce our emoji maps. 

The principle idea we will be working with is the concept of "pixel matching". Pixel matching is the process of reading through each pixel in an image and match it with something, like emojis, based on some conditions we specify.

By applying the principle of pixel matching onto static map images, we can then match our emojis onto the map based on rgb pixel values of interest. That means you might apply a 🌳 to a park with rgb(0, 255, 0) which is green or a 🌊 to rgb(0, 0, 255) which is blue.

Taken further, you might then think about generating or supplying your own maps where certain rgb colors are associated with emotions 😍 / 😭 and therefore represent explore more social geographies.



# Part 1: [Examples](examples/)

We're going to go through the examples incrementally in the `examples/` directory to get a better idea about how leaflet.js and p5.js all fit together. Let's dive in 🏊‍♀️!

## [Example 1: 01-simple-image](examples/01-simple-image/)

This is a simple example that takes in a static image in a folder → reads it into p5's canvas object  → then says, "for the following pixel values, assign emoji A to rgb 1,2,3, then emoji B to rgb 2,3,4 and so on"

## [Example 2: 02-static-map](examples/02-static-map)

This is a simple example that takes in a static image tile based on the openstreetmap tile specified by a lat/lon/zoom → reads it into p5's canvas object  → then says, "for the following pixel values, assign emoji A to rgb 1,2,3, then emoji B to rgb 2,3,4 and so on"

## [Example 3: 03-dynamic-map](examples/03-dynamic-map)

This is a simple example that takes in set of image tiles dynamically based on the openstreetmap tile specified by the viewport of the interactive map → reads it into p5's canvas object → then says, "for the following pixel values, assign emoji A to rgb 1,2,3, then emoji B to rgb 2,3,4 and so on" 

A new map can then be generated for different viewports. If you wish to change the rgb values and the emojis represented, you must change the code.


### The `EmojiMapFromTiles` Object

This is a quick shout out to Object Oriented Programming (OOP) - it can be really cool. Here we create an object that contains the functionality of our emoji generating activities. 
 
# Part 2: [App](app/)

The app extends [Example 3: 03-dynamic-map](examples/03-dynamic-map) by creating an interface around it. You can now change the parameters using the simple and silly user interface provided.


# Notes/Resources:

* link to dan shiffmans coding train - channel
* link to dan shiffmans coding train - pixel matching tutorial
* p5.js community
* leaflet.js
