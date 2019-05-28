const db = require('./dbConfig');

module.exports = {
  add,
  addUser,
  find,
  findBy,
  findById,
  update,
  deleteUser
};

function update(id, user){
  return db('users')
    .where('id', Number(id))
    .update(users);
}

function deleteUser(id){
  return db('users')
    .where({id})
    .delete()
}

function find(){
  return db('users').select('id', 'username');
}

function findBy(){
  return db('users').where(filter);
}

async function add(user) {
  const [id] = await db('users').insert(user)
    .returning("id");
  return findById(id);
}

function addUser(user){
  const [id] = await db('users').insert(user);
  return findById(id);
}

function findBYId(id){
  return db('users')
    .where({id})
    .first();
}
