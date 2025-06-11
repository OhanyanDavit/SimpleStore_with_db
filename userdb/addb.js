const {Pool} = require("pg");
const bcrypt = require('bcrypt');
const {generateToken, verifyToken} = require('../jwt/jwt.js');


const Client = new Pool({
   database: 'simplestore',
   port: 5432,
   user: 'postgres',
   password: '1111',
})

async function adduser(name, email, password, role = 'user'){
  const client  = await Client.connect();
  password = bcrypt.hashSync(password, 10);
  try {
    await client.query('INSERT INTO users  (name, email, password, role) VALUES  ($1, $2, $3, $4);', [name, email, password, role]); 
    return 200;
  } catch (err) {
    console.error('Error: ', err);
    return err;
  } finally {
    client.release();
    console.log("Connection released");
  }
}

async function login(name, email, password){
  const client  = await Client.connect();
  try {
    const res = await client.query('SELECT * FROM users WHERE name = $1 AND email = $2;', [name, email]);
    if (res.rows.length > 0) {
      const user = res.rows[0];
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (isPasswordValid) {
        const token = generateToken({email: user.email, role: user.role});
        return {status: 200, token: token};
      } else {
        return {status: 401, message: 'Invalid password'};
      }
    } else {
      return {status: 404, message: 'User not found'};
    }
  } catch (err) {
    return {status: 500, message: err.message};
  } finally {
    client.release();
    console.log("Connection released");
  }
}

async function DeleteUser(token) {
  try {
    const decoded = verifyToken(token);
    if (decoded) {
      if (!decoded.role || decoded.role !== 'admin') {
        return {status: 403, message: 'Access denied'};
      }else {
        const client  = await Client.connect();
        try {
          const res = await client.query('DELETE FROM users WHERE email = $1;', [decoded.email]);
          if (res.rowCount > 0) {
            return {status: 200, message: 'User deleted successfully'};
          } else {
            return {status: 404, message: 'User not found'};
          }
        } catch (err) {
          return {status: 500, message: err.message};
        } finally {
          client.release();
          console.log("Connection released");
        }
      }
      
    } else {
      return {status: 401, message: 'Invalid token'};
    }
  } catch (err) {
    return {status: 500, message: err.message};
  }
}



module.exports = {adduser, login, DeleteUser};