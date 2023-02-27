import { Genre } from '@prisma/client';
import { Inject, Service } from 'typedi'
import { GenreRepository } from './GenresRepository';
import { CreateGenreType } from './GenreTypes';
 

@Service()
export class GenresService {
    @Inject()
    private genreRepo: GenreRepository

    async createGenre(body: CreateGenreType): Promise<Genre> {
        console.log("herererere")
        return await this.genreRepo.createGenre(body)
    }

    async getAllGenres(): Promise<Genre[]> {
        return await this.genreRepo.findAllGenres()
    }
}