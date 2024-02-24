import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryManagerService } from 'src/database/db-manager/category-manager/category-manager.service';
import { Category } from 'src/database/entities/Category.entity';
import { UpsertCategoryDto } from './dto/upsert-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private _categoryManagerService: CategoryManagerService) {}
  @Get(':id')
  public get(@Param('id') id: number): Promise<Category> {
    id = Number(id);
    return this._categoryManagerService.get(id);
  }

  @Get()
  public list(): Promise<Category[]> {
    return this._categoryManagerService.list();
  }

  @Post()
  public insert(@Body() data: UpsertCategoryDto): Promise<Category> {
    return this._categoryManagerService.insert(data);
  }

  @Put(':id')
  public update(
    @Param('id') id: number,
    @Body() data: UpsertCategoryDto,
  ): Promise<Category> {
    id = Number(id);
    return this._categoryManagerService.update(parseInt(id as any), data);
  }

  @Delete(':id')
  public softDelete(@Param('id') id: number): Promise<Category> {
    return this._categoryManagerService.softDelete(id);
  }
}
