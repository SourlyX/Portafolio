const mariadb = require('mariadb')

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: '0852',
  database: 'restaurante'
})

async function getInfo(){
  try {
    let conn = await pool.getConnection();
    let rows = await conn.query("")
    console.log(rows)
  } catch (error) {
    console.log(error)
  }
}

export default getInfo