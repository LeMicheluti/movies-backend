import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Actor } from './actor.entity';
import { Rating } from './rating.entity';

@Entity()
export class Movie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    description: string;

    @ManyToMany(() => Actor, actor => actor.movies, { cascade: true })
    @JoinTable()
    actors: Actor[];

    @OneToMany(() => Rating, rating => rating.movie, { cascade: true })
    ratings: Rating[];
}
