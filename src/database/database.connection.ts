
import {Client} from 'pg';

export class DatabaseConnection {
    private readonly client: Client;
    constructor(){
        this.client = this.createDBClient();
    }

    private createDBClient(){
        return new Client({
            user: process.env.DB_USERNAME,
            database: process.env.DB_NAME,
            port: Number(process.env.DB_PORT),
            host: process.env.DB_HOST,
            password: process.env.DB_PASSWORD
        });
    }

    public async connectDatabase(){

        try{
            await this.client.connect();
        } catch(err: unknown){
            console.error(`Error: Failed to connect Database`)
            throw new Error(`${err}`);
        }

    }

    public getClient(): Client { return this.client; }
}