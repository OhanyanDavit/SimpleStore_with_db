const {Pool} = require("pg");

const Client = new Pool({
   database: 'simplestore',
   port: 5432,
   user: 'postgres',
   password: '1111',
})

async function addprod(name, price, color){
  const client = await Client.connect();

  try {
    await client.query('INSERT INTO products (name, price, color) VALUES ( $1, $2, $3);', [name, price, color]); 
    return 200;
  } catch (err) {
    return err;
  }  finally {
    client.release();
    console.log("Connection released");
  }
}
async function readprod(){
  const client = await Client.connect();

  try {
    const a = await client.query(`SELECT * FROM products`); 
    const stat = 200;
    return {stat, a};
  } catch (err) {
    return err;
  }  finally {
    client.release();
    console.log("Connection released");
  }
}




module.exports = {addprod, readprod};