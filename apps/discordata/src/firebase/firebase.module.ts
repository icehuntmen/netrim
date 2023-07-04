import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { FirebaseController } from './firebase.controller';
import { FirebaseModule } from 'nestjs-firebase';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [FirebaseController],
  imports: [
    FirebaseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const fb = config.get('firebase.file');
        return {
          googleApplicationCredential: {
            projectId: fb.project_id,
            clientEmail: fb.client_email,
            privateKey: fb.private_key,
          },
          databaseURL: config.get('firebase.url'),
        };
      },
    }),
  ],
  providers: [FirebaseService],
})
export class FirebaseModules {}
