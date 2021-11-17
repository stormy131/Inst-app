require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import seq from './database/connection';
import {readFileSync} from 'fs';
import createAssociations from './database/associations';
// import RefTokens from './database/models/refTokens';
import server from './http/server';

async function bootstrap() {
  createAssociations();

  const httpsOptions = {
    key: readFileSync('./rootCA-key.pem'),
    cert: readFileSync('./rootCA.pem')
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions
  });
  await seq.sync({force: true});

  server.listen(process.env.HTTP_PORT);
  await app.listen(process.env.PORT);
}
bootstrap();
