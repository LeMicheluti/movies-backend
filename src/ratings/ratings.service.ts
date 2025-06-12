import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rating } from '../entities/rating.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RatingsService {
    constructor(
        @InjectRepository(Rating)
        private ratingsRepository: Repository<Rating>,
    ) { }

    async create(ratingData: Partial<Rating>): Promise<Rating> {
        const rating = this.ratingsRepository.create(ratingData);
        return this.ratingsRepository.save(rating);
    }

    async get(id: number): Promise<Rating> {
        const rating = await this.ratingsRepository.findOne({
            where: { id },
            relations: ['movie'],
        });
        if (!rating) {
            throw new NotFoundException(`Rating with ID ${id} not found`);
        }
        return rating;
    }

    async update(id: number, updateData: Partial<Rating>): Promise<Rating> {
        const existing = await this.ratingsRepository.preload({
            id,
            ...updateData,
        });

        if (!existing) {
            throw new NotFoundException(`Rating with id ${id} not found`);
        }

        return this.ratingsRepository.save(existing);
    }

    async remove(id: number): Promise<void> {
        await this.ratingsRepository.delete(id);
    }
}
