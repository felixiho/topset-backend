
import { Movie } from '@prisma/client';
import { Inject, Service } from 'typedi'
import { FullMovie } from './MoviesTypes';


@Service()
export class MoviesResponseBuilder {

    async build(movies: Movie[]): Promise<null> {
        const allMovies = movies.map
        return null

    }

}