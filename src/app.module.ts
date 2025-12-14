import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PartsModule } from './parts/parts.module';
import { DevicesModule } from './devices/devices.module';
import { InterventionsModule } from './interventions/interventions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'ds2_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    PartsModule,
    DevicesModule,
    InterventionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
