import { Movie, Prisma } from '@prisma/client'
import { Service } from 'typedi'
import { prisma } from '../../prismaClient'

@Service()
export class MoviesRepository {

  async addMovie(body: Prisma.MovieCreateInput): Promise<Movie> {
    return await prisma.movie.create({
      data: body,
    })
  }

  async findAllMovies(skip:number, take:number): Promise<Movie[]> {
    return await prisma.movie.findMany({
      skip,
      take,
      include: {
        genre: {
          select: {
            title: true,
            id: true
          }
        }
      }
    })
  }

  async findAllMoviesByGenre(genre:string[], skip:number, take:number): Promise<Movie[]> {
    const genreIds = genre.map(genre => ({id: genre})) 
    return await prisma.movie.findMany({
      skip,
      take,
      where:{
        genre: {
          OR: genreIds
        }
      },
      include: {
        genre: {
          select: {
            title: true,
            id: true
          }
        }
      }
    })
  }

  async findMovieByTitle(title:string, skip:number, take:number): Promise<Movie[]> {
     
    return await prisma.movie.findMany({
      skip,
      take,
      where:{
        title
      },
      include: {
        genre: {
          select: {
            title: true,
            id: true
          }
        }
      }
    })
  }

}

