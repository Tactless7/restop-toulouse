const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json()); // for parsing application/json

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
