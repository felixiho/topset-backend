import { Genre, Movie } from "@prisma/client"
import { IsArray, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator"

export class AddMovieType {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    coverImage: string

    @IsNumber()
    @Min(1)
    @Max(5)
    rating: number

    @IsString()
    @IsNotEmpty()
    description: string

    @IsString()
    @IsNotEmpty()
    genre: string
}

export type FullMovie  = Movie & {
    genre: {
        title: string
    }
}

