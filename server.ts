
import Express, { Request, Response} from 'express';
import 'dotenv/config';
import { DatabaseConnection } from './src/database/database.connection';


async function bootStart(){
    try {
        const expressApp = Express();
        const PORT = process.env.PORT ?? 4030;
    
        //Database Instance
        const dbInstance = new DatabaseConnection();
        await dbInstance.connectDatabase();
        //health check
        expressApp.get('/health', (req: Request, res: Response) => {
            res.send('Health Check Success');
        })
    
        expressApp.listen(PORT, () => {
            console.log(`Server Running on port -> ${PORT}`)
        })
    } catch (error) {
        console.error('Error->', error);
    }
}

bootStart();