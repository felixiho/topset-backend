import { Genre } from '@prisma/client'
import { Request } from 'express'
import {
    Body, 
    Get,
    JsonController, 
    Post, 
    Req,
} from 'routing-controllers'
import { Service } from 'typedi'
import { GenresService } from './GenresService'
import { CreateGenreType } from './GenreTypes'


@JsonController()
@Service()
export class GenresController {
    constructor(private genreService: GenresService) { }

    @Post('/genre')
    async create(
        @Req() req: Request,
        @Body() body: CreateGenreType
    ): Promise<Genre> {
        return await this.genreService.createGenre(body)
    }

    @Get('/genres')
    async getGenres(
        @Req() req: Request, 
    ): Promise<Genre[]> {
        return await this.genreService.getAllGenres()
    }
}

