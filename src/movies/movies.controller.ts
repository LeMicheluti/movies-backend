import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from '../entities/movie.entity';
import { ApiSecretGuard } from '../auth/api-secret.guard';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) { }

    @Get()
    find(@Query('page') page = '1', @Query('limit') limit = '10', @Query('q') q?: string) {
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        return this.moviesService.find(pageNumber, limitNumber, q);
    }

    @Get(':id')
    get(@Param('id') id: string): Promise<Movie> {
        return this.moviesService.get(+id);
    }

    @UseGuards(ApiSecretGuard)
    @Post()
    create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
        return this.moviesService.create(createMovieDto);
    }

    @UseGuards(ApiSecretGuard)
    @Put(':id')
    update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto): Promise<Movie> {
        return this.moviesService.update(+id, updateMovieDto);
    }

    @UseGuards(ApiSecretGuard)
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string): Promise<void> {
        return this.moviesService.remove(+id);
    }
}
