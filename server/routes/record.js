const express = require('express');
const { ObjectId } = require('mongodb');

const recordRoutes = express.Router();

const dbo = require('../db/conn');

recordRoutes.route('/record').get((req, res) => {
  dbo.getDB().collection('customers').find({}).toArray((err, result) => {
    if(err) throw err;
    res.json(result);
  });
});

recordRoutes.route('/record/:id').get((req, res) => {
  let query = { _id: ObjectId(req.params.id) };
  dbo.getDB().collection('customers').findOne(query, (err, result) => {
    if(err) throw err;
    res.json(result);
  });
});

recordRoutes.route('/record/add').post((req, res) => {
  let myobj = {
    name: req.body.name,
    address: req.body.address,
  };
  dbo.getDB().collection('customers').insertOne(myobj, (err, result) => {
    if(err) throw err;
    console.log('1 document added to database!');
  });
});

recordRoutes.route('/record/update/:id').post((req, res) => {
  let query = { _id: ObjectId(req.params.id) };
  let newListing = {
    $set: {
      name: req.body.name,
      address: req.body.address,
    },
  };
  dbo.getDB().collection('customers').updateOne(query, newListing, (err, result) => {
    if(err) throw err;
    console.log('1 document updated on database!');
  });
});

recordRoutes.route('/record/delete/:id').delete((req, res) => {
  let query = { _id: ObjectId(req.params.id) };
  dbo.getDB().collection('customers').deleteOne(query, (err, result) => {
    if(err) throw err;
    console.log('1 document deleted from database!');
  });
});

module.exports = recordRoutes;