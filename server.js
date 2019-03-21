let express = require("express");
let serveStatic = require("serve-static");
let path = require("path");

let app = express();

app.use(serveStatic("www", { index: ["index.html", "index.htm"] }));

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname + "/www/index.html"));
});

//app.listen(8080);
app.listen(process.env.PORT, "0.0.0.0");

console.log("Server started on 0.0.0.0:" + process.env.PORT);
