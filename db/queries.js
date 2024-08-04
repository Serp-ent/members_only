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
      const result = await pool.query(`INSERT INTO users (first_name, last_name, username, password, membership_status) VALUES ($1, $2, $3, $4, $5)`, [firstName, lastName, userName, password, member]);
    } catch (err) {
      console.log('Error creating user: ', err);
      throw err;
    }
  }
};

module.exports = {
  User,
};