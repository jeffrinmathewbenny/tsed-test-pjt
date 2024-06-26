import { join } from 'path';
import { Configuration, Inject } from '@tsed/di';
import { PlatformApplication } from '@tsed/common';
import '@tsed/platform-express'; // /!\ keep this import
import '@tsed/ajv';
import '@tsed/swagger';
import { config } from './config/index';
import * as modules from './domains/index';
import * as pages from './pages/index';
import { GlobalErrorHandlerMiddleware } from './util/error/GlobalErrorHandlerMiddleware';

@Configuration({
  ...config,
  acceptMimes: ['application/json'],
  httpPort: `${process.env.HOST}:${process.env.PORT}` || 8083,
  httpsPort: false, // CHANGE
  disableComponentsScan: true,
  ajv: {
    returnsCoercedValues: true,
  },
  mount: {
    '/v1': [...Object.values(modules)],
    '/': [...Object.values(pages)],
  },
  swagger: [
    {
      path: '/doc',
      specVersion: '3.0.1',
    },
  ],
  middlewares: [
    'cors',
    'cookie-parser',
    'compression',
    'method-override',
    'json-parser',
    { use: 'urlencoded-parser', options: { extended: true } },
  ],
  views: {
    root: join(process.cwd(), '../views'),
    extensions: {
      ejs: 'ejs',
    },
  },
  exclude: ['**/*.spec.ts'],
})
export class Server {
  @Inject()
  protected app: PlatformApplication;

  @Configuration()
  protected settings: Configuration;

  $afterRoutesInit() {
    this.app.use(GlobalErrorHandlerMiddleware);
  }
}
