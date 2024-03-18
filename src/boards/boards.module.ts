import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

@Module({
  controllers: [BoardsController], //BoardsController를 사용하기 위해
  providers: [BoardsService], //BoardsService를 사용하기 위해
})
export class BoardsModule {}
