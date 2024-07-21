import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiProperty } from '@nestjs/swagger';

export class InputRequest {
  @ApiProperty()
  input: string;
}

export class AppResponse {
  @ApiProperty()
  content: string;
}

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('chat1')
  async create(@Body() inputRequest: InputRequest) : Promise<AppResponse> {
    let response = new AppResponse();
    response.content = inputRequest.input;
    return response;
  }   
}
