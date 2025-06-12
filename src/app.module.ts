import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { ActorsModule } from './actors/actors.module';
import { RatingsModule } from './ratings/ratings.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.movies',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    MoviesModule,
    ActorsModule,
    RatingsModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
