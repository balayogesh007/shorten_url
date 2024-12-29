import { Pool } from 'pg';

export class DatabaseConnection {
  private readonly client: Pool;
  constructor() {
    this.client = this.createDBClient();
  }

  private createDBClient() {
    return new Pool({
      user: process.env.DB_USERNAME,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT),
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
  }

  public async connectDatabase() {
    try {
      await this.client.connect();
    } catch (err: unknown) {
      console.error(`Error: Failed to connect Database`);
      throw new Error(`${err}`);
    }
  }

  public getClient(): Pool {
    return this.client;
  }
}
