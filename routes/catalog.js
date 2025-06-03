const path = require('path')
const express = require("express");
const router = express.Router();


const items = [
  {
    id: 1,
    name: "item 1",
    description: "Descripcion del item 1",
  },
  {
    id: 2,
    name: "item 2",
    description: "Descripcion del item 2",
  },
  { 
    id: 3,
    name: "item 3",
    description: "Descripcion del item 3",
},
  { 
    id: 4,  
    name: "item 4",
    description: "Descripcion del item 4",
},
  { 
    id: 5,
    name: "item 5",
    description: "Descripcion del item 5",
  },
];
let ids = 0;

router.get("/", (req, res) => {
  res.send("Aqui van los catalogos");
});

function getItemById(id) {
  return items.find((item) => item.id === id);
}

function getItemByNameAndId(name, id) {
  return items.find((item) => item.name === name && item.id === id);
}

function getItemByName(name) {
  return items.find((item) => item.name === name);
}

router.get('/catalogs', function (req, res) {
  res.json(items);
});

router.get("/catalogs/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = getItemById(id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).send("Company not found");
  }
});

router.get("/catalogs/:name/:id", (req, res) => {
  const { name, id } = req.params;
  const item = getItemByNameAndId(name, parseInt(id));
  if (item) {
    res.json(item);
  } else {
    res.status(404).send("Item not found");
  }
}); 

router.post("/catalogs", function (req, res) {
    const name = req.body.name;

    if(name !== undefined && name.trim().length > 0){
        const item = getItemByName(name);
        if (item) {
            res.status(400).json({ message: `El nombre ${name} ya esta en uso` });
        } 

       const lastID = items.length > 0 ? items[items.length - 1].id : 0;

        ids = lastID + 1;
        items.push({
            id: ids,
            name: name,
            description: req.body.description
        });
        return res.json({
                id: ids,
                name: name,
                description: req.body.description
        });
        }res.status(400).json({
            message: "El nombre es obligatorio"})
    });

  router.delete("/catalogs/", (req, res) => {
  const id = req.body.id;
  const item = getItemById(id);
  
  if (item) {
    const index = items.findIndex((c) => c.id === item.id);
    const deletedItem = items.splice(index, 1);

    return res.json(deletedItem);
  }
    res.status(404).json({ message: `El id : ${id} no existe`, code: 404 });
});


module.exports = router;