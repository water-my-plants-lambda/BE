const db = require('./dbConfig');

module.exports = {
  find,
  findBy,
  findPlant,
  addPlant,
  findById,
  deletePlantById
}

function find() {
  return db('plants').select('name', 'description');
}

function findBy(filter) {
  return db('plabts').where(filter);
}

function findPlant(user_id) {
  return db('plants').where({user_id})
}

async function addPlant(user_ud, plantinfo) {
  const [id] = await db('plants')
    .insert({user_id, name: plantinfo.name, description: plantinfo.description})
    .returning("id");
    return findById(id);
}

function findById(id) {
  return db('plants').select('id', 'name', 'description', 'user_id')
    .where({ id })
    .first();
}

function deletePlantById(id) {
  return db('plants')
    .where({ id })
    .delete();
}
