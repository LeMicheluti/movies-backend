import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, ParseIntPipe } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { ApiSecretGuard } from '../auth/api-secret.guard';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ratingsService.get(id);
  }

  @UseGuards(ApiSecretGuard)
  @Post()
  create(@Body() createRatingDto: CreateRatingDto) {
    return this.ratingsService.create(createRatingDto);
  }

  @UseGuards(ApiSecretGuard)
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateRatingDto: UpdateRatingDto) {
    return this.ratingsService.update(id, updateRatingDto);
  }

  @UseGuards(ApiSecretGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ratingsService.remove(id);
  }
}
