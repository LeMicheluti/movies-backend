import 'reflect-metadata';
import { DataSource, DeepPartial } from 'typeorm';
import { Movie } from './src/entities/movie.entity';
import { Actor } from './src/entities/actor.entity';
import { Rating } from './src/entities/rating.entity';

const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'db.movies',
    entities: [Movie, Actor, Rating],
    synchronize: true,
});

async function seed() {
    await AppDataSource.initialize();

    const movieRepository = AppDataSource.getRepository(Movie);
    const actorRepository = AppDataSource.getRepository(Actor);
    const ratingRepository = AppDataSource.getRepository(Rating);

    const actors = actorRepository.create([
        { name: 'Tom Hanks' },
        { name: 'Emma Stone' },
        { name: 'Leonardo DiCaprio' },
        { name: 'Scarlett Johansson' },
        { name: 'Brad Pitt' },
        { name: 'Natalie Portman' },
        { name: 'Robert Downey Jr.' },
        { name: 'Jennifer Lawrence' },
        { name: 'Morgan Freeman' },
        { name: 'Anne Hathaway' },
    ]);

    await actorRepository.save(actors);

    const moviesData = [
        { title: 'Forrest Gump', description: 'Life is like a box of chocolates.', actors: [actors[0]] },
        { title: 'La La Land', description: 'A jazz musician falls in love with an aspiring actress.', actors: [actors[1]] },
        { title: 'Inception', description: 'A thief who steals corporate secrets through dream-sharing.', actors: [actors[2], actors[0], actors[3]] },
        { title: 'Fight Club', description: 'An insomniac office worker forms an underground fight club.', actors: [actors[4]] },
        { title: 'Black Swan', description: 'A ballerina descends into madness.', actors: [actors[5]] },
        { title: 'Iron Man', description: 'A billionaire builds a high-tech suit to fight evil.', actors: [actors[6]] },
        { title: 'The Hunger Games', description: 'A girl fights for survival in a televised battle.', actors: [actors[7]] },
        { title: 'The Shawshank Redemption', description: 'Two imprisoned men bond over a number of years.', actors: [actors[8]] },
        { title: 'The Devil Wears Prada', description: 'A young woman lands a job at a prestigious fashion magazine.', actors: [actors[9]] },
        { title: 'Catch Me If You Can', description: 'A con artist is pursued by an FBI agent.', actors: [actors[0], actors[2]] },
        { title: 'Lucy', description: 'A woman unlocks full brain capacity.', actors: [actors[3]] },
        { title: 'The Curious Case of Benjamin Button', description: 'A man ages in reverse.', actors: [actors[4]] },
        { title: 'V for Vendetta', description: 'A masked vigilante fights against a totalitarian regime.', actors: [actors[5]] },
        { title: 'Avengers: Endgame', description: 'The final battle against Thanos.', actors: [actors[6], actors[3]] },
        { title: 'Silver Linings Playbook', description: 'A man with bipolar disorder meets a mysterious girl.', actors: [actors[7]] },
        { title: 'Bruce Almighty', description: 'A man receives God’s powers.', actors: [actors[8]] },
        { title: 'Interstellar', description: 'A team of explorers travel through a wormhole in space.', actors: [actors[9], actors[4]] },
        { title: 'Cast Away', description: 'A man is stranded on an uninhabited island.', actors: [actors[0]] },
        { title: 'Easy A', description: 'A high school student’s life takes a turn due to rumors.', actors: [actors[1]] },
        { title: 'The Revenant', description: 'A frontiersman fights for survival.', actors: [actors[2]] },
        { title: 'Marriage Story', description: 'A couple goes through a painful divorce.', actors: [actors[3]] },
        { title: 'Troy', description: 'A retelling of the Trojan War.', actors: [actors[4]] },
        { title: 'Jackie', description: 'The story of First Lady Jackie Kennedy.', actors: [actors[5]] },
        { title: 'Sherlock Holmes', description: 'The adventures of the famous detective.', actors: [actors[6]] },
        { title: 'Passengers', description: 'Two passengers wake up too early on a space journey.', actors: [actors[7]] },
        { title: 'Se7en', description: 'Detectives hunt a serial killer.', actors: [actors[8]] },
        { title: 'Les Misérables', description: 'A prisoner is hunted for years after breaking parole.', actors: [actors[9]] },
        { title: 'Saving Private Ryan', description: 'A team rescues a soldier during WWII.', actors: [actors[0], actors[4]] },
        { title: 'Crazy, Stupid, Love', description: 'A man learns how to date again after a divorce.', actors: [actors[1], actors[4]] },
        { title: 'The Wolf of Wall Street', description: 'The rise and fall of a stockbroker.', actors: [actors[2]] },
    ];

    const movieEntities = movieRepository.create(moviesData);
    await movieRepository.save(movieEntities);

    const ratings: DeepPartial<Rating>[] = [];

    for (const movie of movieEntities) {
        ratings.push(
            { score: Math.floor(Math.random() * 3) + 8, comment: 'Great movie!', movie: { id: movie.id } },
            { score: Math.floor(Math.random() * 4) + 6, comment: 'Really enjoyed it.', movie: { id: movie.id } }
        );
    }

    await ratingRepository.save(ratings);

    console.log('✅ Seed completed successfully with 30 movies.');
    process.exit(0);
}

seed().catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
});
