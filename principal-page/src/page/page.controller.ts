import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PageService } from './page.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';

@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Get()
  findAllProducts() {
    return this.pageService.findAllProducts();
  }
  @Get('/:id')
  findOneProducts(@Param('id') id: number) {
    return this.pageService.findOneProduct(id);
  }
}
