import { Request, Response, NextFunction } from 'express'
import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  Req,
} from 'routing-controllers'
import { Service } from 'typedi'


@JsonController()
@Service()
export class MoviesController {


}