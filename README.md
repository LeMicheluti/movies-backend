# Movies Backend API

This is the backend for a movie management system, built with [NestJS](https://nestjs.com/) and [SQLite](https://www.sqlite.org/). It provides endpoints to manage movies, actors, and ratings.

## Database

- Type: SQLite
- File: `db.movies`
- ORM: TypeORM

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 3. Seed the database with test data
To populate the database with initial data, run:
```bash
npm run seed
```
The SQLite database file will be automatically created as `db.movies` in the root directory.

### 4. Run the application
```bash
npm run start:dev
```

## Technologies

- NestJS
- TypeORM
- SQLite
- Class Validator
- Jest (for testing)
- API protected with custom `ApiSecretGuard`

## Authentication

Some endpoints require an API key header:

```
x-api-key: your-secret-key
```

Make sure to configure your `.env` file accordingly.

## Endpoints
http://localhost:3001

### Actors

#### Get actor by ID
```http
GET /actors/1
```

#### Get paginated list of actors (optional search)
```http
GET /actors?page=1&limit=10&q=leo
```

#### Get movies by actor
```http
GET /actors/1/movies
```

#### Create an actor
```http
POST /actors
Headers:
x-api-key: your-secret-key

Body:
{
  "name": "Leonardo DiCaprio"
}
```

#### Update an actor
```http
PUT /actors/1
Headers:
x-api-key: your-secret-key

Body:
{
  "name": "Leonardo Wilhelm DiCaprio"
}
```

#### Delete an actor
```http
DELETE /actors/1
Headers:
x-api-key: your-secret-key
```

### Movies

#### Get movie by ID
```http
GET /movies/1
```

#### Get paginated list of movies (optional search)
```http
GET /movies?page=1&limit=10&q=Inception
```

#### Create a movie
```http
POST /movies
Headers:
x-api-key: your-secret-key

Body:
{
  "title": "Inception",
  "description": "A mind-bending thriller",
  "actors": [
    { "id": 1 },
    { "id": 2 }
  ]
}
```

#### Update a movie
```http
PUT /movies/1
Headers:
x-api-key: your-secret-key

Body:
{
  "title": "Inception (Updated)",
  "actors": [
    { "id": 1 }
  ]
}
```

#### Delete a movie
```http
DELETE /movies/1
Headers:
x-api-key: your-secret-key
```

### Ratings

#### Get rating by ID
```http
GET /ratings/1
```

#### Create a rating
```http
POST /ratings
Headers:
x-api-key: your-secret-key

Body:
{
  "movieId": 1,
  "score": 4,
  "comment": "Amazing movie!"
}
```

#### Update a rating
```http
PUT /ratings/1
Headers:
x-api-key: your-secret-key

Body:
{
  "score": 5,
  "comment": "Nice movie!"
}
```

#### Delete a rating
```http
DELETE /ratings/1
Headers:
x-api-key: your-secret-key
```