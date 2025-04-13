import { Controller, Get, Param } from '@nestjs/common';
import { FoldersService } from './folders.service';

@Controller('/folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Get()
  getFolders() {
    return this.foldersService.getFolders();
  }

  @Get(':id')
  getFolderById(@Param('id') id: string) {
    return this.foldersService.getFolderById(id);
  }
}
