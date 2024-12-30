import { DatabaseConnection } from '../../database/database.connection';

export const CreateUserTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email_id VARCHAR(255) NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    )
`;
  try {
    const dbClient = new DatabaseConnection().getClient();
    await dbClient.query(createTableQuery); // Await the query here
  } catch (error) {
    console.error('Failed to create users table.', error);
  }
};
