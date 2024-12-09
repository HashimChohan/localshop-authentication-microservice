import { HttpService, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MultitenantService } from './services/multitenant-auth.service';
import { MongoBaseModule, MongoBaseService } from 'mongodb-crud-operations';
import { UtilService } from 'src/util/util.service';
import { AuthService } from './services/auth.service';
import { UtilModule } from 'src/util/util.module';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { FirebaseService } from 'src/firebase/firebase.service';
import { HttpModule } from '@nestjs/common';
import { MongoService } from 'src/mongo/mongo.service';
import { MongoModule } from 'src/mongo/mongo.module';

@Module({
  controllers: [AuthController],
  imports: [
    MongoBaseModule,
    HttpModule,
    UtilModule,
    FirebaseModule,
    MongoModule,
  ],
  providers: [
    UtilService,
    {
      provide: 'AUTHSERVICE',
      useFactory: (
        utilService: UtilService,
        mongoService: MongoBaseService,
        firebaseService: FirebaseService,
        httpService: HttpService,
        mongo: MongoService,
      ) => {
        if (process.env.SERVICE_TYPE === 'multitenant') {
          return new MultitenantService(
            utilService,
            mongoService,
            firebaseService,
            httpService,
            mongo,
          );
        } else {
          return new AuthService(
            utilService,
            mongoService,
            firebaseService,
            httpService,
            mongo,
          );
        }
      },
      inject: [
        UtilService,
        MongoBaseService,
        FirebaseService,
        HttpService,
        MongoService,
      ],
    },
  ],
})
export class AuthModule {}
