import Express, { Request, Response } from 'express';
import 'dotenv/config';
import { DatabaseConnection } from './src/database/database.connection';
import { createShortenUrlTable } from './src/modules/shorten-url/shorten-url-table/create-shortenurl-table';
import { ShortenUrlController } from './src/modules/shorten-url/shorten-url.controller';
import { LoggerMiddleware } from './src/middlewares/logger.middleware';

async function bootStart() {
  try {
    const expressApp = Express();
    const PORT = process.env.PORT ?? 4030;

    //JSON parse
    expressApp.use(Express.json());
    //Logger
    expressApp.use(new LoggerMiddleware().logger);

    //Database Instance
    const dbInstance = new DatabaseConnection();
    await dbInstance.connectDatabase();

    //Table Creation
    await createShortenUrlTable();
    //health check
    expressApp.get('/health', (req: Request, res: Response) => {
      res.send('Health Check Success');
    });

    expressApp.use(
      '/api',
      new ShortenUrlController().getShortenRouteInstance()
    );

    expressApp.listen(PORT, () => {
      console.log(`Server Running on port -> ${PORT}`);
    });
  } catch (error) {
    console.error('Error->', error);
  }
}

bootStart();
