// setup-database.js
const pool = require('./pool');

// SQL to drop tables
const dropTables = `
    DROP TABLE IF EXISTS messages;
    DROP TABLE IF EXISTS users;
`;

// SQL to create tables
const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        membership_status BOOLEAN DEFAULT false
    );
`;

const createMessagesTable = `
    CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        text TEXT NOT NULL,
        user_id INT REFERENCES users(id) ON DELETE CASCADE
    );
`;

// SQL to insert sample data
const insertSampleData = `
    INSERT INTO users (first_name, last_name, username, password, membership_status)
    VALUES
        ('John', 'Doe', 'john.doe@example.com', 'hashed_password1', true),
        ('Jane', 'Smith', 'jane.smith@example.com', 'hashed_password2', false);

    INSERT INTO messages (title, text, user_id)
    VALUES
        ('First Message', 'This is the text of the first message.', 1),
        ('Second Message', 'This is the text of the second message.', 2);
`;

const setupDatabase = async () => {
  const client = await pool.connect();
  try {
    // Drop existing tables
    await client.query(dropTables);
    console.log('Old tables dropped successfully.');

    // Create new tables
    await client.query(createUsersTable);
    console.log('Users table created successfully.');

    await client.query(createMessagesTable);
    console.log('Messages table created successfully.');

    // Insert sample data
    await client.query(insertSampleData);
    console.log('Sample data inserted successfully.');
  } catch (err) {
    console.error('Error setting up database:', err.stack);
  } finally {
    // Release the client back to the pool
    client.release();
    // Close the pool
    await pool.end();
  }
};

// Run the script
setupDatabase();
