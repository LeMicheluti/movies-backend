import { Module } from '@nestjs/common';
import { ActorsService } from './actors.service';
import { ActorsController } from './actors.controller';
import { Actor } from '../entities/actor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Actor])],
  providers: [ActorsService],
  controllers: [ActorsController],
  exports: [ActorsService, TypeOrmModule],
})
export class ActorsModule { }
