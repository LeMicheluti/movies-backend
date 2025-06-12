import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, ParseIntPipe, Query } from '@nestjs/common';
import { ActorsService } from './actors.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { ApiSecretGuard } from '../auth/api-secret.guard';

@Controller('actors')
export class ActorsController {
    constructor(private readonly actorsService: ActorsService) { }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.actorsService.get(id);
    }

    @UseGuards(ApiSecretGuard)
    @Post()
    create(@Body() createActorDto: CreateActorDto) {
        return this.actorsService.create(createActorDto);
    }

    @UseGuards(ApiSecretGuard)
    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateActorDto: UpdateActorDto) {
        return this.actorsService.update(id, updateActorDto);
    }

    @UseGuards(ApiSecretGuard)
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.actorsService.remove(id);
    }

    @Get()
    find(@Query('page') page = '1', @Query('limit') limit = '10', @Query('q') q?: string) {
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        return this.actorsService.find(pageNumber, limitNumber, q);
    }

    @Get(':id/movies')
    async getMoviesByActor(@Param('id') id: number) {
        return this.actorsService.getMoviesByActor(id);
    }
}
