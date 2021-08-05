const { MongoClient } = require('mongodb');
const url = process.env.ATLAS_URI;
const dbname = 'myFirstDatabase';

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let _db;

module.exports = {
  connectToServer: (callback) => {
    client.connect((err, db) => {
      // if(err) throw err;   // this err is displayed in server.js via callback
      if(db) {
        _db = db.db(dbname);
        console.log('Successfully connected to MongoDB!');
      }
      return callback(err);
    });
  },

  getDB: () => _db,
};