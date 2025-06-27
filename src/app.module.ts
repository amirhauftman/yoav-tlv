import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './user/user.module';
import { TagModule } from './tag/tag.module';
import { SuggestedTaskModule } from './suggested-task/suggested-task.module';
import { CallRecordModule } from './call-record/call-record.module';
import { CallTaskModule } from './call-task/call-task.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: '****',
      password: '****',
      database: 'yoav',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Set to false in production!
    }),
    TagModule,
    SuggestedTaskModule,
    CallRecordModule,
    CallTaskModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
