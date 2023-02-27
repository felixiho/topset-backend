import { Movie } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'
import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  QueryParam,
  Req,
} from 'routing-controllers'
import { Service } from 'typedi'
import { MoviesService } from './MoviesService'
import { AddMovieType } from './MoviesTypes'


@JsonController()
@Service()
export class MoviesController {
    constructor(private movieService: MoviesService) { }

    @Post('/movie')
    async addMovie(
        @Req() req: Request, 
        @Body() body: AddMovieType
    ): Promise<Movie[]> {
        return await this.movieService.addMovie(body)
    }


    @Get('/movies')
    async getMovies(
        @Req() req: Request,
        @QueryParam('page') page: number
    ):Promise<Movie[]>{
        return await this.movieService.getAllMovies(page)
    }


    @Get('/movies/:title')
    async findMovieByTitle(
        @Req() req: Request,
        @Param('title') title: string
    ):Promise<Movie[]>{
        return await this.movieService.findMovie(title)
    }

    @Get('/movies/genre')
    async getMoviesByGenre(
        @Req() req: Request,
        @QueryParam('genres') genres: string
    ):Promise<Movie[]>{
        return await this.movieService.getMovieByGenre(genres)
    }
}