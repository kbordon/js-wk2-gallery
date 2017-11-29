var apiKey = require('./../.env').apiKey;
let redArr = [];
let blueArr = [];
let goldArr = [];


$(document).ready(function(){
  // this sets up API call to curate the red selections
  let promiseRed = new Promise(function(resolve, reject) {
    let requestR = new XMLHttpRequest();
    let urlR = `https://www.rijksmuseum.nl/api/en/collection?key=${apiKey}&format=json&f.normalized32Colors.hex=%20%23DE4153`;
    requestR.onload = function() {
      if (this.status === 200) {
        resolve(requestR.response);
      } else {
        reject(Error(requestR.statusText));
      }
    };
    requestR.open("GET", urlR, true);
    requestR.send();
  });

  // this sets up API call to curate the first blue selections
  let promiseBlue = new Promise(function(resolve, reject) {
    let requestB = new XMLHttpRequest();
    let urlB = `https://www.rijksmuseum.nl/api/en/collection?key=${apiKey}&format=json&f.normalized32Colors.hex=%20%234279DB`;
    requestB.onload = function() {
      if (this.status === 200) {
        resolve(requestB.response);
      } else {
        reject(Error(requestB.statusText));
      }
    };
    requestB.open("GET", urlB, true);
    requestB.send();
  });

  // this sets up an API call to curate the gold selections
  var promiseGold = new Promise(function (resolve, reject) {
    var requestG = new XMLHttpRequest();
    var urlG = `https://www.rijksmuseum.nl/api/en/collection?key=${apiKey}&format=json&material=gold%20(metal)&f.normalized32Colors.hex=%20%23E09714`;
    requestG.onload = function() {
      if(this.status === 200) {
        resolve(requestG.response);
      } else {
        reject(Error(requestG.statusText));
      }
    };
    requestG.open("GET", urlG, true);
    requestG.send();
  });


  // this executes API call to curate the red selections
  promiseRed.then(function(responseR) {
    let body = JSON.parse(responseR);
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

  promiseBlue.then(function(responseB) {
    let body = JSON.parse(responseB);
    for (let j = 1; j < body.artObjects.length; j++) {
      // console.log(body.artObjects[j]);
      if (body.artObjects[j].hasImage === true && body.artObjects[j].webImage !== null) {
        blueArr.push({ "url" : body.artObjects[j].webImage.url, "title" : body.artObjects[j].title, "artist" : body.artObjects[j].principalOrFirstMaker});
      }
    }
    console.log(blueArr);
  }, function(error){
    // add code to close blue rooma
    alert(`There was an error processing your request: ${error.message}`);
  });

  //this executes API call to curate the gold selections
  promiseGold.then(function(responseG) {
    let body = JSON.parse(responseG);
    for (let k = 0; k < body.artObjects.length; k++) {
      if (body.artObjects[k].hasImage === true && body.artObjects[k].webImage !== null) {
        goldArr.push({ "url" : body.artObjects[k].webImage.url, "title" : body.artObjects[k].title, "artist" : body.artObjects[k].principalOrFirstMaker});
      }
    }
    console.log(goldArr);
  }, function(error) {
    //add code to close gold room
    alert(`There was an error proecessing your request: ${error.message}`);
  });
});
