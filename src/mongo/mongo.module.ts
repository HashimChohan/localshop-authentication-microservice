import { Module } from '@nestjs/common';
import { MongoService } from './mongo.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongoClient } from 'mongodb';

@Module({
  providers: [
    MongoService,
    {
      provide: 'mongoinstance',
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        let dbName = process.env.DATABASE_NAME ?? 'LocalShop';
        let url = process.env.MONGO_URL?? 'mongodb://host.docker.internal:27017';
        const client =  new MongoClient(url);
        const db = client.db(dbName);
        return db;
      },
    },
  ],
  imports: [ConfigModule],
  exports: [MongoService],
})
export class MongoModule {}
