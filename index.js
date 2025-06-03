const path = require('path')
const express = require("express");
const app = express();
const port = 3000;
const contactRouter = require('./routes/contact');
const clientRouter = require('./routes/clients');
const companyRouter = require('./routes/company');
const catalogRouter = require('./routes/catalog');

app.use(express.json());

app.use('/api/', contactRouter);
app.use('/api/', clientRouter);
app.use('/api/', companyRouter);
app.use('/api/', catalogRouter);

app.listen(port, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});