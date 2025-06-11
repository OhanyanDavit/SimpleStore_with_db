const express = require('express');
const usersRouter = require("./userdb/dbuser")
const prodRouter = require("./productdb/dbprodread")

const app = express();
app.use(express.json());

app.use('/users', usersRouter);
app.use('/prods', prodRouter);


app.listen(3000, () => {
  console.log(`Server runing on port ${3000}`);
});

