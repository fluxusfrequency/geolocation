const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public'));

app.use('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

const port = process.env.PORT || 8000;
app.listen(port, function() {
  console.log(`Server listening on ${port}!`);
});

module.exports = app;
