const pool = require('./pool');

class User {
  static async create(
    firstName,
    lastName,
    userName,
    password,
    member = false,
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

  static async findById(id) {
    try {
      const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
      return result.rowCount === 0 ? null : result.rows[0];
    } catch (err) {
      console.log('Error when searching for user', err);
      throw err;
    }
  }

  static async authorize(id, active = true) {
    try {
      await pool.query('UPDATE users SET membership_status = $2 WHERE id = $1;', [id, active]);

    } catch (err) {
      console.log('Error when giving membership to user', err);
      throw err;
    }
  }

  static async makeAdmin(id, active = true) {
    try {
      await pool.query('UPDATE users SET isAdmin = $2 WHERE id = $1;', [id, active]);
    } catch (err) {
      console.log('Error when giving membership to user', err);
      throw err;
    }
  }
};

class Messages {
  static async getAllWithAuthors() {
    try {
      const query = 'SELECT messages.id, messages.title, messages.text, messages.timestamp, users.username FROM messages JOIN users ON users.id = messages.user_id';
      const result = await pool.query(query);
      return result.rows;
    } catch (err) {
      console.log('Error when searching for users');
      throw err;
    }
  }

  static async createMessage(title, text, authorId) {
    try {
      const query = 'INSERT INTO messages (title, timestamp, text, user_id) VALUES ($1, $2, $3, $4)';
      await pool.query(query, [title, new Date(), text, authorId]);
    } catch (err) {
      console.log('Error when creating message');
      throw err;
    }
  }

  static async deleteMessage(id) {
    try {
      const query = 'DELETE FROM messages WHERE id = $1';
      await pool.query(query, [id]);
    } catch (err) {
      console.log('Error when deleting message');
      throw err;
    }

  }
}

module.exports = {
  User,
  Messages,
};