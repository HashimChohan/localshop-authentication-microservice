import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { Constants } from './constants';

async function bootstrap() {
  const port = process.env.PORT ? parseInt(process.env.PORT) : 2333;
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: port,
    },
  });

  let serviceAccount: ServiceAccount = {
    projectId: process.env.PROJECT_ID ?? Constants.projectId,
    clientEmail: process.env.CLIENT_EMAIL ?? Constants.CLIENT_EMAIL,
    privateKey: process.env.PRIVATE_KEY
      ? process.env.PRIVATE_KEY.replace(/\\n/g, '\n')
      : Constants.PRIVATE_KEY.replace(/\\n/g, '\n'),
  };
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL ?? Constants.DATABASE_URL,
    storageBucket: process.env.STORAGE_BUCKET ?? Constants.STORAGE_BUCKET,
  });
  if (!process.env.DATABASE_NAME) {
    process.env.DATABASE_NAME = Constants.DATABASE_NAME;
  }

  PRIVATE_KEY: app.listen(() =>
    console.log('Authentication Microservice is listening at Port: ' + port),
  );
}
bootstrap();
