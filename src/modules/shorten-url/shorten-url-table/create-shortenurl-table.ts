import { DatabaseConnection } from '../../../database/database.connection';

export const CreateShortenUrlTable = async () => {
  const createTableQuery = `
        CREATE TABLE IF NOT EXISTS shorten_urls (
            id SERIAL PRIMARY KEY,
            long_url TEXT NOT NULL,
            short_url TEXT NOT NULL,
            custom_alias VARCHAR(255),
            topic VARCHAR(255),
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        )
    `;
  try {
    const dbClient = new DatabaseConnection().getClient();
    await dbClient.query(createTableQuery); // Await the query here
  } catch (error) {
    console.error('Failed to create shorten url table.', error);
  }
};
