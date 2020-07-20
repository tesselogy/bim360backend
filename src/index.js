const http = require("http");
const express = require("express");
const app = express();
var port = process.env.PORT || "3000";

var server = http.createServer(app);
var io = require("socket.io").listen(server);

server.listen(port);
console.log("listen on " + port);
app.disable("x-powered-by");

const getprojects = require("./getprojects");

var projects = [
  {
    id: "992375b6-0e4d-4308-804b-8d0eec8ee174",
    site: "Московский",
    name: "СОШ1100"
  },
  {
    id: "40a56457-d165-423f-b7f6-f2859d382df7",
    site: "Рассказовка",
    name: "К5"
  },
  {
    id: "3f226478-1af7-43f3-b31d-6930320d03ca",
    site: "Рассказовка",
    name: "СОШ2100"
  },
  {
    id: "6d98de6d-4a13-4235-ba49-f036b440887d",
    site: "Резиденции Сколково",
    name: "3.1-3.2"
  }
];

io.on("connection", function(socket) {
  console.log(socket.id);
  socket.on("request", function() {
    var token =
      "eyJhbGciOiJIUzI1NiIsImtpZCI6Imp3dF9zeW1tZXRyaWNfa2V5In0.eyJzY29wZSI6WyJ1c2VyLXByb2ZpbGU6cmVhZCIsImRhdGE6d3JpdGUiLCJkYXRhOnJlYWQiLCJkYXRhOmNyZWF0ZSIsImRhdGE6c2VhcmNoIiwiY29kZTphbGwiLCJhY2NvdW50OnJlYWQiLCJhY2NvdW50OndyaXRlIl0sImNsaWVudF9pZCI6IlRncGs0WTNvU1lPSnlBNnFrQzl2NFBHbEFTdDJIcU8zIiwiZ3JhbnRfaWQiOiJUamZYWFdmSXI2U0plSFVlMVpldUM5ZE9IMkRVdlFJSyIsImF1ZCI6Imh0dHBzOi8vYXV0b2Rlc2suY29tL2F1ZC9qd3RleHA2MCIsImp0aSI6InA1TWxDQVpXZ2N0dlRDUWFURllwV2ZGdmY5SHZYSUdVbU9QUkxIdnVWRUtjemU5SEJPeEdST1ZHNERaNkI1SVoiLCJ1c2VyaWQiOiJGS1NHTERGRFFXUVEiLCJleHAiOjE1OTUyNTc0NDB9.R4s0Cz-EDGsU-jYhflTxUcqVKbiz6YEvya6LX3kRzvk";
    projects.forEach(function(d) {
      getprojects(token, d.id, function(callback) {
        socket.emit("ListUpdate", { list: callback.results });
      });
    });
  });
});
