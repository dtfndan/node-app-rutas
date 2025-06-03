const path = require('path')
const express = require("express");
const router = express.Router();


const clients = [
  {
    id: 1,
    name: "Eduardo vargas",
    email: "juan@mail.com",
    phone: "123-456-7890",
    dir: "Calle Falsa 123",
  },
  {
    id: 2,
    name: "Jesus Tejada",
    email: "omar@mail.com",
    phone: "123-456-7890",
    dir: "Calle Real 456",
  },
  { 
    id: 3,
    name: "Gustavp almonte",
    email: "cesar@mail.com",
    phone: "123-456-7890",
    dir: "Avenida Libertad 789",
},
  { 
    id: 4,  
    name: "Pablo Marmol",
    email: "luis@mail.com",
    phone: "123-456-7890",
    dir: "Calle Independencia 101",
},
  { 
    id: 5,
    name: "Juanita Perez",
    email: "ana@mail.com",
    phone: "123-456-7890",
    dir: "Calle San Martin 202",
  },
];
let ids = 0;

router.get("/", (req, res) => {
  res.send("Aqui van los clientes");
});

function getClientById(id) {
  return clients.find((client) => client.id === id);
}

function getClientByNameAndId(name, id) {
  return clients.find((client) => client.name === name && client.id === id);
}

function getClientByName(name) {
  return clients.find((client) => client.name === name);
}

router.get('/clients', function (req, res) {
  res.json(clients);
});

router.get("/clients/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const client = getClientById(id);
  if (client) {
    res.json(client);
  } else {
    res.status(404).send("client not found");
  }
});

router.get("/clients/:name/:id", (req, res) => {
  const { name, id } = req.params;
  const client = getClientByNameAndId(name, parseInt(id));
  if (client) {
    res.json(client);
  } else {
    res.status(404).send("client not found");
  }
}); 

router.post("/clients", function (req, res) {
    const name = req.body.name;

    if(name !== undefined && name.trim().length > 0){
        const client = getClientByName(name);
        if (client) {
            res.status(400).json({ message: `El nombre ${name} ya esta en uso` });
        } 

       const lastID = clients.length > 0 ? clients[clients.length - 1].id : 0;

        ids = lastID + 1;
        clients.push({
            id: ids,
            name: name,
            email: req.body.email,
            phone: req.body.phone
        });
        return res.json({
                id: ids,
                name: name,
                email: req.body.email,
                phone: req.body.phone
        });
        }res.status(400).json({
            message: "El nombre es obligatorio"})
    });

  router.delete("/clients/", (req, res) => {
  const id = req.body.id;
  const client = getClientById(id);
  
  if (client) {
    const index = clients.findIndex((c) => c.id === client.id);
    const deletedClient = clients.splice(index, 1);

    return res.json(deletedClient);
  }
    res.status(404).json({ message: `El id : ${id} no existe`, code: 404 });
});


module.exports = router;