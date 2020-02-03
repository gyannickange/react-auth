import Datastore from 'nedb'
const config = require('../config');

var db = {}

db.users = new Datastore ({
  filename: `${config.apiURL}/path/users.db`,
  autoload: true,
  timestampData: true,
})

db.users.loadDatabase()

console.log(`${config.apiURL}/path/users.db`);

const insert = function(table, item, callback) {
  db[table].insert(item, callback);
}

const find = function (table, callback) {
  db[table].find({}, callback)
}

const findOne = function(table, id, callback) {
  db[table].findOne({
    _id: id
  }, {}, callback);
}

const findParams = function(table, params, callback) {
  db[table].findOne(params, {}, callback);
}

const findByEmail = function(table, email, callback) {
  db[table].findOne({
    email: email
  }, {}, callback);
}

const remove = function(table, id, callback) {
  db[table].remove({
    _id: id,
  }, { multi: true }, callback);
}

const update = function (table, id, item, callback) {
  db[table].update({ _id: id }, item, { multi: true }, callback)
}

export default {
  insert,
  find,
  findOne,
  findParams,
  findByEmail,
  remove,
  update,
}