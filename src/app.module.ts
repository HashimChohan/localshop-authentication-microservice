import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UtilModule } from './util/util.module';
import { FirebaseModule } from './firebase/firebase.module';
import { SystemModule } from './system/system.module';
import { FileModule } from './file/file.module';
import { MongoModule } from './mongo/mongo.module';

@Module({
  imports: [AuthModule, UtilModule, FileModule, FirebaseModule, SystemModule, MongoModule ],
  providers: [AppService],
})
export class AppModule {}
