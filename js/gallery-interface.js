var apiKey = require('./../.env').apiKey;
let redArr = [];
let blueArr = [];
let goldArr = [];


$(document).ready(function(){
  let promiseRed = new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    let url = `https://www.rijksmuseum.nl/api/en/collection?key=${apiKey}&format=json&f.normalized32Colors.hex=%20%23DE4153`;
    request.onload = function() {
      if (this.status === 200) {
        resolve(request.response);
      } else {
        reject(Error(request.statusText));
      }
    };
    request.open("GET", url, true);
    request.send();
  });

  promiseRed.then(function(response) {
    let body = JSON.parse(response);
    for (let i = 0; i < body.artObjects.length; i++) {
      if (body.artObjects[i].hasImage === true && body.artObjects[i].webImage !== null) {
        redArr.push({ "url" : body.artObjects[i].webImage.url, "title" : body.artObjects[i].title, "artist" : body.artObjects[i].principalOrFirstMaker});
      }
    }
    console.log(redArr);
  }, function(error){
    // add code to close this room
    alert(`There was an error processing your request: ${error.message}`);
  });

});
