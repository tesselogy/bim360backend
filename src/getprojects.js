const axios = require("axios");

module.exports = function(token, pid, callback) {
  var urlStart = "https://developer.api.autodesk.com/dm/v2/projects/";
  var urlEnd = "/reviews";
  axios({
    method: "get",
    url: urlStart + pid + urlEnd,
    headers: {
      cookie: token
    }
  }).then(function(response) {
    if (response.data.results) {
      response.data.results.forEach(function(d, i) {
        var nameString = "";
        var assignedString = "";
        var inwork = false;
        if (d.actionBy && d.actionBy.claimedBy) {
          inwork = true;
          d.actionBy.claimedBy.forEach(function(dd0) {
            assignedString = assignedString + " " + dd0.name;
          });
        } else {
          inwork = false;
        }

        if (d.actionBy && d.actionBy.candidates) {
          if (d.actionBy.candidates.roles) {
            d.actionBy.candidates.roles.forEach(function(dd1) {
              nameString = nameString + " " + dd1.name;
            });
          }
        }

        if (d.actionBy && d.actionBy.candidates) {
          if (d.actionBy.candidates.users) {
            d.actionBy.candidates.users.forEach(function(dd2) {
              nameString = nameString + " " + dd2.name;
            });
          }
        }

        if (d.actionBy && d.actionBy.candidates) {
          if (d.actionBy.candidates.companies) {
            d.actionBy.candidates.companies.forEach(function(dd3) {
              nameString = nameString + " " + dd3.name;
            });
          }
        }

        response.data.results[i].nameString = nameString;
        response.data.results[i].assignedString = assignedString;
        response.data.results[i].inwork = inwork;
      });
    }
    callback(response.data);
  });
};
