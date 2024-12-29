import { Router, Request, Response } from 'express';
import { ShortenUrlService } from './shorten-url.service';

export class ShortenUrlController {
  private readonly route: Router;
  private readonly shortenUrlService: ShortenUrlService;
  constructor() {
    this.route = Router();
    this.shortenUrlService = new ShortenUrlService();
    this.shortenUrlRoutes();
  }

  public shortenUrlRoutes() {
    this.route.post('/shorten', this.createShortenUrl.bind(this));
    this.route.get('/shorten/:alias', this.redirectToOriginUrl.bind(this));
  }

  private async createShortenUrl(req: Request, res: Response) {
    try {
      const createShortUrl = await this.shortenUrlService.createShortenUrl(
        req?.body,
        res
      );
      if (createShortUrl) {
        res.status(201).json(createShortUrl);
      } else {
        res.status(400).json({ message: 'Failed to create short url' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Internal Server Error', description: error });
    }
  }

  private async redirectToOriginUrl(req: Request, res: Response) {
    try {
      const alias = req?.params?.alias;
      console.log('Params', alias);
      if (!alias) {
        return res.status(400).json({ message: 'Alias parameter is missing' });
      }
      const getUrl = await this.shortenUrlService.redirectToOriginUrl(
        req?.params?.alias
      );
      if (getUrl) {
        res.redirect(getUrl?.long_url);
      } else {
        res.status(400).json({ message: 'Failed to create short url' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Internal Server Error', description: error });
    }
  }

  public getShortenRouteInstance() {
    return this.route;
  }
}
