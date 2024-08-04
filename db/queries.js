const pool = require('./pool');

class User {
  static async create(
    firstName,
    lastName,
    userName,
    password,
    member = 'active',
  ) {
    try {
      const result = await pool.query('INSERT INTO users (first_name, last_name, username, password, membership_status) VALUES ($1, $2, $3, $4, $5)',
        [firstName, lastName, userName, password, member]);
    } catch (err) {
      console.log('Error creating user: ', err);
      throw err;
    }
  }

  static async findByUsername(username) {
    try {
      const result = await pool.query(`SELECT * FROM users WHERE username = $1`, [username]);
      return result.rowCount === 0 ? null : result.rows[0];
    } catch (err) {
      console.log('Error when searching for user', err);
      throw err;
    }
  }
};

module.exports = {
  User,
};