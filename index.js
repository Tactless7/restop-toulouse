const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json()); // used for parsing application/json

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  next();
});

app.get('/restos', (req, res) => {
  const restos = fs.readFileSync(__dirname + '/restos.json', 'utf8');
  res.setHeader('Content-Type', 'application/json');
  res.send(restos);
});

app.post('/restos', (req, res) => {
  const resto = req.body;
  const restos = JSON.parse(
    fs.readFileSync(__dirname + '/restos.json', 'utf8'),
  );
  restos.push(resto);
  fs.writeFileSync(__dirname + '/restos.json', JSON.stringify(restos), 'utf8');
  res.send('Le restaurant a été ajouté à la liste');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
