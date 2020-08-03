const fs = require("fs");

module.exports.getRestos = () => {
  return JSON.parse(fs.readFileSync(__dirname + "/restos.json", "utf8"));
};

module.exports.writeRestos = (restos) => {
  fs.writeFileSync(__dirname + "/restos.json", JSON.stringify(restos), "utf8");
};

module.exports.updateResto = (newResto, restoToUpdate) => {
  return {
    id: restoToUpdate.id,
    nom: newResto.nom || restoToUpdate.nom,
    type: newResto.type || restoToUpdate.type,
    image: restoToUpdate.image,
    adresse: newResto.adresse || restoToUpdate.adresse,
    telephone: newResto.telephone || restoToUpdate.telephone,
    plats: newResto.plats || restoToUpdate.plats,
  };
};
