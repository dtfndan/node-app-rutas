const path = require('path')
const express = require("express");
const router = express.Router();


const companys = [
  {
    id: 1,
    name: "Empresa 1",
  },
  {
    id: 2,
    name: "Empresa 2",
  },
  { 
    id: 3,
    name: "Empresa 3",
},
  { 
    id: 4,  
    name: "Empresa 4",
},
  { 
    id: 5,
    name: "Empresa 5",
  },
];
let ids = 0;

router.get("/", (req, res) => {
  res.send("Aqui van las empresas");
});

function getCompanyById(id) {
  return companys.find((company) => company.id === id);
}

function getCompanyByNameAndId(name, id) {
  return companys.find((company) => company.name === name && company.id === id);
}

function getCompanyByName(name) {
  return companys.find((company) => company.name === name);
}

router.get('/companys', function (req, res) {
  res.json(companys);
});

router.get("/companys/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const company = getCompanyById(id);
  if (company) {
    res.json(company);
  } else {
    res.status(404).send("Company not found");
  }
});

router.get("/companys/:name/:id", (req, res) => {
  const { name, id } = req.params;
  const company = getCompanyByNameAndId(name, parseInt(id));
  if (company) {
    res.json(company);
  } else {
    res.status(404).send("company not found");
  }
}); 

router.post("/companys", function (req, res) {
    const name = req.body.name;

    if(name !== undefined && name.trim().length > 0){
        const company = getCompanyByName(name);
        if (company) {
            res.status(400).json({ message: `El nombre ${name} ya esta en uso` });
        } 

       const lastID = companys.length > 0 ? companys[companys.length - 1].id : 0;

        ids = lastID + 1;
        companys.push({
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

  router.delete("/companys/", (req, res) => {
  const id = req.body.id;
  const company = getCompanyById(id);
  
  if (company) {
    const index = companys.findIndex((c) => c.id === company.id);
    const deletedCompany = companys.splice(index, 1);

    return res.json(deletedCompany);
  }
    res.status(404).json({ message: `El id : ${id} no existe`, code: 404 });
});


module.exports = router;