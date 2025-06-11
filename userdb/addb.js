const {Pool} = require("pg");
const bcrypt = require('bcrypt');

const Client = new Pool({
   database: 'simplestore',
   port: 5432,
   user: 'postgres',
   password: '1111',
})

async function adduser(name, email, password){
  const client  = await Client.connect();
  password = bcrypt.hashSync(password, 10);
  try {
    await client.query('INSERT INTO users  (name, email, password) VALUES  ($1, $2, $3);', [name, email, password]); 
    return 200;
  } catch (err) {
    return err;
  } finally {
    client.release();
    console.log("Connection released");
  }
}



module.exports = adduser;