import { 
    IsString, 
  } from 'class-validator'



export class CreateGenreType {
    @IsString()
    title: string
}