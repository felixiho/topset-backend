import { Genre, Prisma } from '@prisma/client'
import { Service } from 'typedi' 
import { prisma } from '../../prismaClient'

@Service()
export class GenreRepository {

  async createGenre(body: Prisma.GenreCreateInput): Promise<Genre> {
    return await prisma.genre.create({ 
      data: {
        title: body.title
      },
    })
  }

  async findAllGenres(): Promise<Genre[]> {
    return await prisma.genre.findMany()
  }

}

