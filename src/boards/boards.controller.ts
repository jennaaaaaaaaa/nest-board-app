import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './boards.model';
import { title } from 'process';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
  // boardService: BoardsService
  // constructor(boardService: BoardsService) {
  //   this.boardService = boardService
  // }

  //암묵적인 프로퍼티 선언
  constructor(private boardsService: BoardsService) {}

  @Get('/')
  getAllBoards(): Board[] {
    return this.boardsService.getAllBoards();
  }

  //유효성검사 추가
  //를 위한 모듈들 설치 npm i class-validator class-transformer --save
  @Post('/')
  createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    //:Board는 리턴값 타입
    return this.boardsService.createBoard(createBoardDto);
  }

  @Get('/:id')
  //여러개의 param을 가져올 때는 @Param() params: string[] 이런식으로 구현
  getBoardById(@Param('id') id: string): Board {
    //리턴타입 잊지말기
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id: string): void {
    return this.boardsService.deleteBoard(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id') id: string,
    @Body('status') status: BoardStatus,
  ) {
    //여기서는 왜 return 타입을 명시 안 했을까
    return this.boardsService.updateBoardSatatus(id, status);
  }
}
