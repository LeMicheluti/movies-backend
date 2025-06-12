import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, ILike, In } from 'typeorm';
import { Movie } from '../entities/movie.entity';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Actor } from 'entities/actor.entity';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(Movie)
        private moviesRepository: Repository<Movie>,
        @InjectRepository(Actor)
        private actorsRepository: Repository<Actor>,
    ) { }

    async create(createDto: CreateMovieDto): Promise<Movie> {
        const { actors, ...rest } = createDto;

        const movie = this.moviesRepository.create({
            ...rest,
            actors: actors.map(actorIdDto => {
                const actor = new Actor();
                actor.id = actorIdDto.id;
                return actor;
            }),
        });

        return this.moviesRepository.save(movie);
    }

    async get(id: number): Promise<Movie> {
        const movie = await this.moviesRepository.findOne({
            where: { id },
            relations: ['actors', 'ratings'],
        });
        if (!movie) {
            throw new NotFoundException(`Movie with ID ${id} not found`);
        }
        return movie;
    }

    async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
        const movie = await this.moviesRepository.findOne({
            where: { id },
            relations: ['actors'], // necessário se quiser substituir a lista
        });

        if (!movie) {
            throw new NotFoundException(`Movie with id ${id} not found`);
        }

        // Atualiza campos simples
        movie.title = updateMovieDto.title ?? movie.title;
        movie.description = updateMovieDto.description ?? movie.description;

        // Atualiza os atores, se enviados
        if (updateMovieDto.actors) {
            const actorIds = updateMovieDto.actors.map(a => a.id);
            movie.actors = await this.actorsRepository.findBy({ id: In(actorIds) });
        }

        return this.moviesRepository.save(movie);
    }

    async remove(id: number): Promise<void> {
        await this.moviesRepository.delete(id);
    }

    async find(page = 1, limit = 10, q?: string): Promise<{ data: Movie[]; total: number; page: number; lastPage: number }> {
        const skip = (page - 1) * limit;

        const queryOptions: any = {
            skip,
            take: limit,
        };

        if (q) {
            queryOptions.where = {
                title: Like(`%${q}%`),
            };
        }

        const [data, total] = await this.moviesRepository.findAndCount(queryOptions);

        const lastPage = Math.ceil(total / limit);

        return { data, total, page, lastPage };
    }
}
