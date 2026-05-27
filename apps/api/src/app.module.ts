import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BullModule } from '@nestjs/bull'
import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/users/users.module'
import { PatientsModule } from './modules/patients/patients.module'
import { DoctorsModule } from './modules/doctors/doctors.module'
import { ConsultationsModule } from './modules/consultations/consultations.module'
import { DocumentsModule } from './modules/documents/documents.module'
import { PaymentsModule } from './modules/payments/payments.module'
import { AiModule } from './modules/ai/ai.module'
import { VideoModule } from './modules/video/video.module'
import { AdminModule } from './modules/admin/admin.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../../.env' }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true,
        logging: config.get('NODE_ENV') === 'development',
      }),
    }),

    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        redis: config.get<string>('REDIS_URL'),
      }),
    }),

    AuthModule,
    UsersModule,
    PatientsModule,
    DoctorsModule,
    ConsultationsModule,
    DocumentsModule,
    PaymentsModule,
    AiModule,
    VideoModule,
    AdminModule,
  ],
})
export class AppModule {}
