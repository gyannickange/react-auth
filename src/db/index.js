import Datastore from 'nedb'

var db = {}

db.users = new Datastore ({
  filename: `https://app-jetcake.herokuapp.com/path/users.db`,
  autoload: true,
  timestampData: true,
})

db.users.loadDatabase()

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

const updatePassword = function (table, id, password, callback) {
  db[table].update({ _id: id }, { password: password }, { multi: true }, callback)
}

export default {
  insert,
  find,
  findOne,
  findParams,
  findByEmail,
  remove,
  update,
  updatePassword
}