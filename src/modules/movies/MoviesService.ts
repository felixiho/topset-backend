import { Movie } from '@prisma/client';
import { Inject, Service } from 'typedi'
import { NotFoundError } from '../../core/errors';
import { logger } from '../../core/logging/logger';
import { GenreRepository } from '../genres/GenresRepository';
import { MoviesRepository } from './MoviesRepository';
import { AddMovieType, FullMovie } from './MoviesTypes';


@Service()
export class MoviesService {

    private moviesPerPage: number

    @Inject()
    private movieRepo: MoviesRepository

    @Inject()
    private genreRepo: GenreRepository

    constructor() {
        this.moviesPerPage = 9
    }

    async addMovie(body: AddMovieType): Promise<Movie[]> {
        const isGenreValid = await this.verifyGenres(body.genre)
        if (!isGenreValid) {
            logger.error("Invalid genre selected", {
                genres: body.genre
            })
            throw new NotFoundError("Invalid genre selected.")
        }
        await this.movieRepo.addMovie({
            title: body.title,
            coverImage: body.coverImage,
            rating: body.rating,
            description: body.description,
            genre: {
                connect: {
                    id: body.genre
                }
            }
        })

        return await this.movieRepo.findAllMovies(0, this.moviesPerPage)
    }

    async verifyGenres(genre: string): Promise<boolean> {
        const isGenreValid = await this.genreRepo.findGenreById(genre)
        if (!isGenreValid) {
            return false

        }
        return true
    }

    async getAllMovies(page: number = 1): Promise<Movie[]> {
        const skip = page === 1 ? 0 : (page - 1) * this.moviesPerPage
        return await this.movieRepo.findAllMovies(skip, this.moviesPerPage)
    }

    async getMovieByGenre(genres: string, page: number = 1): Promise<Movie[]> {
        const skip = page === 1 ? 0 : (page - 1) * this.moviesPerPage
        const trimmedGenres = genres ? genres.split(',') : []
        return await this.movieRepo.findAllMoviesByGenre(trimmedGenres, skip, this.moviesPerPage)
    }

    async findMovie(title: string, page: number = 1): Promise<Movie[]> {
        const skip = page === 1 ? 0 : (page - 1) * this.moviesPerPage
        return await this.movieRepo.findMovieByTitle(title, skip, this.moviesPerPage)
    }


}