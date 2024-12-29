import { Response } from 'express';
import { CreateShortenUrlInput } from './dto/shorten-url.input';
import { DatabaseConnection } from '../../database/database.connection';
import { nanoid } from 'nanoid';

export class ShortenUrlService {
  constructor(
    private readonly dbClient = new DatabaseConnection().getClient()
  ) {}

  async createShortenUrl(createUrlInput: CreateShortenUrlInput, res: Response) {
    const aliasName = nanoid(15);
    const createShortenUrl = await this.dbClient.query(
      'INSERT into shorten_urls (long_url,short_url,custom_alias, topic) values($1,$2,$3,$4) RETURNING*',
      [
        createUrlInput?.longUrl,
        `www.tinyurl.com/${aliasName}`,
        createUrlInput?.customAlias ?? aliasName,
        createUrlInput?.topic ?? null,
      ]
    );
    return createShortenUrl?.rows[0];
  }

  async redirectToOriginUrl(aliasName: string) {
    const getUrlByAlias = await this.dbClient.query(
      `SELECT * FROM shorten_urls WHERE custom_alias = $1`,
      [aliasName]
    );
    if (!getUrlByAlias?.rowCount) {
      throw new Error('URL not found for the given alias.');
    }
    return getUrlByAlias?.rows[0];
  }
}
