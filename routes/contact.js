const path = require('path')
const express = require("express");
const router = express.Router();


const contacts = [
  {
    id: 1,
    name: "Juan Perez",
    email: "juan@mail.com",
    phone: "123-456-7890",
  },
  {
    id: 2,
    name: "Omar Ramirez",
    email: "omar@mail.com",
    phone: "123-456-7890",
  },
  { 
    id: 3,
    name: "Cesar Sosa",
    email: "cesar@mail.com",
    phone: "123-456-7890" 
},
  { 
    id: 4,  
    name: "Luis German",
    email: "luis@mail.com",
    phone: "123-456-7890" 
},
  { 
    id: 5,
    name: "Ana Estevez",
    email: "ana@mail.com",
    phone: "123-456-7890" 
  },
];
let ids = 0;

router.get("/", (req, res) => {
  res.send("Aqui van los contactos");
});

function getContactById(id) {
  return contacts.find((contact) => contact.id === id);
}

function getContactByNameAndId(name, id) {
  return contacts.find((contact) => contact.name === name && contact.id === id);
}

function getContactByName(name) {
  return contacts.find((contact) => contact.name === name);
}

router.get('/contacts', function (req, res) {
  res.json(contacts);
});

router.get("/clients/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const contact = getContactById(id);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).send("Contact not found");
  }
});

router.get("/contacts/:name/:id", (req, res) => {
  const { name, id } = req.params;
  const contact = getContactByNameAndId(name, parseInt(id));
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).send("Contact not found");
  }
}); 

router.post("/contacts", function (req, res) {
    const name = req.body.name;

    if(name !== undefined && name.trim().length > 0){
        const contact = getContactByName(name);
        if (contact) {
            res.status(400).json({ message: `El nombre ${name} ya esta en uso` });
        } 

       const lastID = contacts.length > 0 ? contacts[contacts.length - 1].id : 0;

        ids = lastID + 1;
        contacts.push({
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

  router.delete("/contacts/", (req, res) => {
  const id = req.body.id;
  const contact = getContactById(id);
  
  if (contact) {
    const index = contacts.findIndex((c) => c.id === contact.id);
    const deletedContact = contacts.splice(index, 1);

    return res.json(deletedContact);
  }
    res.status(404).json({ message: `El id : ${id} no existe`, code: 404 });
});


module.exports = router;