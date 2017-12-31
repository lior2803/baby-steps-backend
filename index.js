var express = require('express');
var app = express();
var fs = require("fs");

app.get('/friends', function(req, res) {
  // reading JSON from file
  fs.readFile(__dirname + "/" + "baby-steps.json", 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }
    var friends = JSON.parse(data).friends;
    var result = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: []
    };

    // building a new JSON that contain list of names for every step
    friends.forEach(function(friend) {
      var name = {
        "firstName": friend.firstName,
        "lastName": friend.lastName
      };

      result[friend.babyStep].push(name);
    });

    // sorting friends by last name
    for (var i = 1; i < 8; i++) {
      result[i].sort(function(a, b) {
        if (a.lastName < b.lastName) return -1;
        if (a.lastName > b.lastName) return 1;
        return 0;
      })
    }

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.json(result);
  });
});

var server = app.listen(3001, function() {

  var port = server.address().port;

  console.log("Example app listening at http://%s:%s/friends", "localhost", port);

});
