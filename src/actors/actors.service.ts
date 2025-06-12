import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from '../entities/actor.entity';
import { Repository, ILike } from 'typeorm';

@Injectable()
export class ActorsService {
    constructor(
        @InjectRepository(Actor)
        private actorsRepository: Repository<Actor>,
    ) { }

    async create(actorData: Partial<Actor>): Promise<Actor> {
        const actor = this.actorsRepository.create(actorData);
        return this.actorsRepository.save(actor);
    }

    async get(id: number): Promise<Actor> {
        const actor = await this.actorsRepository.findOne({
            where: { id },
            relations: ['movies'],
        });
        if (!actor) {
            throw new NotFoundException(`Actor with ID ${id} not found`);
        }
        return actor;
    }

    async update(id: number, updateData: Partial<Actor>): Promise<Actor> {
        await this.actorsRepository.update(id, updateData);
        return this.get(id);
    }

    async remove(id: number): Promise<void> {
        await this.actorsRepository.delete(id);
    }

    async find(page = 1, limit = 10, q?: string): Promise<{ data: Actor[]; total: number; page: number; lastPage: number }> {
        const skip = (page - 1) * limit;

        const queryOptions: any = {
            skip,
            take: limit,
            relations: ['movies'],
        };

        if (q) {
            queryOptions.where = {
                name: ILike(`%${q}%`),
            };
        }

        const [data, total] = await this.actorsRepository.findAndCount(queryOptions);

        const lastPage = Math.ceil(total / limit);

        return { data, total, page, lastPage };
    }

    async getMoviesByActor(actorId: number) {
        const actor = await this.actorsRepository.findOne({
            where: { id: actorId },
            relations: ['movies'],
        });

        if (!actor) {
            throw new NotFoundException('Actor not found');
        }

        return actor.movies;
    }
}
