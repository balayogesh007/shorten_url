import { DatabaseConnection } from '../../database/database.connection';

export const CreateAnalyticsTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS analytics (
        id SERIAL PRIMARY KEY,
        os_type VARCHAR(15) NOT NULL, 
        user_id INT NOT NULL, 
        device_name VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        CONSTRAINT foreign_key_user FOREIGN KEY(user_id) REFERENCES users(id)
    )
`;
  try {
    const dbClient = new DatabaseConnection().getClient();
    await dbClient.query(createTableQuery); // Await the query here
  } catch (error) {
    console.error('Failed to create analytics table.', error);
  }
};
