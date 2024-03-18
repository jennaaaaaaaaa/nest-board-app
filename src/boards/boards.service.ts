import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import { v1 as uuid } from 'uuid'; //v1 버전의 uuid를 사용하겠다
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto;
    const board: Board = {
      // id는 하드코딩x
      //uuid를 사용하기 위해 설치 npm i uuid --save
      id: uuid(), //유니크 값
      title: title,
      description: description,
      status: BoardStatus.PUBLIC, //기본값 public
    };
    this.boards.push(board); //private boards: Board[] = [];여기에 ; 현재 로컬에 데이터저장 하는 방식으로
    return board;
  }

  getBoardById(id: string): Board {
    return this.boards.find((board) => board.id === id);
  }

  deleteBoard(id: string): void {
    //삭제하는 로직이라 리턴을 주지 않아도 되기 때문에 리턴값을 주지 않음
    this.boards = this.boards.filter((board) => board.id !== id);
    //id가 다른 것만 boards에 넘겨줌
    //private boards: Board[] = []; 이 안에 있는 게시물을 지우는 거니까 지운다기 보단 필터링함 아이디가 같지 않은거만 가져오고 나머지는 지워지는 개념
  }

  updateBoardSatatus(id: string, status: BoardStatus): Board {
    //업데이트 하고자하는 게시글 현재 정보를 위에서 구현한 getBoardById를 가져옴
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
}
