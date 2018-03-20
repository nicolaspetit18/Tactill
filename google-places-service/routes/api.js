var express = require('express');
var GooglePlaces = require('google-places');
var router = express.Router();
var url = require('url');

/* GET api listing. */
router.get('/', function(req, res) {
  res.send('respond with a api');
});

router.get('/getPlaces', function(req, res) {
  console.log("/api/getPlaces");
  var queryData = url.parse(req.url, true).query;

  var places = new GooglePlaces('AIzaSyBvWGCTr9Vr1eUgn2zaWtn5rYiJUW2M9s4');
  if (queryData.name && queryData.latitude && queryData.longitude)
  {
    let parameters = {
        location: [queryData.latitude, queryData.longitude],
        keyword: [ queryData.name ],
        language: 'fr',
        radius: 500
    };

    places.search(parameters, function(err, response)
    {
      let places = [];
      for (i = 0; i < response.results.length; ++i)
      {
        let place = response.results[i];
        let placeToSave = {
          location : place.geometry.location,
          name : place.name,
          address : place.vicinity
        };
        places.push(placeToSave);
      }
      console.log("search: ", places);
      res.send(places);
    });
  }
  else {
    res.send("No localisation data provided");
  }
});

/* Say Something */
router.post('/saysomt', function(req, res){
 try
 {
  var data = req.body;
  res.send(composeGreet(data.name));
 }catch(e)
 {
  res.send('something bad happen');
 }
});

var composeGreet= function(name)
{
  return "hello " + name +"\n";
};


module.exports = router;
module.exports.composeGreet = composeGreet;
