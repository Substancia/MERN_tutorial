const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config({ path: './config.env' });

const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(require('./routes/record'));
const dbo = require('./db/conn');

app.listen(port, () => {
  dbo.connectToServer((err) => {
    if(err) throw err;
  });
  console.log('Server is running on port: ', port);
});