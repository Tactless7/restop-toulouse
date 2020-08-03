const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
const getRestos = require("./helper.js").getRestos;
const updateResto = require("./helper.js").updateResto;
const writeRestos = require("./helper.js").writeRestos;

app.use(bodyParser.json()); // Used for parsing application/json

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  next();
});

app.get("/restos", (req, res) => {
  const restos = fs.readFileSync(__dirname + "/restos.json", "utf8");

  res.setHeader("Content-Type", "application/json");
  res.status(200).send(restos);
});

app.get("/restos/:id", (req, res) => {
  const id = req.params.id;

  const restos = getRestos();

  const resto = restos.filter((_) => _.id === parseInt(id))[0];

  res.setHeader("Content-Type", "application/json");
  res.status(200).send(resto);
});

app.post("/restos", (req, res) => {
  let resto = req.body;
  const restos = JSON.parse(
    fs.readFileSync(__dirname + "/restos.json", "utf8")
  );
  resto.image =
    "http://lorempixel.com/150/150/food/" + Math.floor(Math.random() * 10 + 1);
  resto.id = restos.length + 1;

  restos.push(resto);
  writeRestos(restos);
  res.status(201).send("Le restaurant a été ajouté à la liste");
});

app.put("/restos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let resto = req.body;

  if (!id) return res.status(400).send("Bad Request - You must provide an id");

  const restos = getRestos();

  const restoToUpdateIndex = restos.findIndex((_) => _.id === id);

  if (restoToUpdateIndex < 0)
    return res.status(500).send("Sorry, There was an error");

  const updatedResto = updateResto(resto, restos[restoToUpdateIndex]);

  const newRestosList = restos.filter((_) => _.id !== id).concat(updatedResto);

  writeRestos(newRestosList);

  res.send(updatedResto);
});

app.delete("/restos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (!id) return res.status(400).send("Bad Request - You must provide an id");

  const restos = getRestos();
  const newRestosList = restos.filter((_) => _.id !== id);

  writeRestos(newRestosList);

  res.status(200).send("Le restaurant a bien été supprimé");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
