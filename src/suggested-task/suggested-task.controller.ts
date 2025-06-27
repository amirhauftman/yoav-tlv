import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';

import { SuggestedTaskService } from './suggested-task.service';
import { CreateSuggestedTaskDto } from './dto/create-suggested-task.dto';
import { UpdateSuggestedTaskDto } from './dto/update-suggested-task.dto';
import { UserRole } from 'src/user/entities/user.entity';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('suggested-tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SuggestedTaskController {
  constructor(private suggestedTaskService: SuggestedTaskService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() createSuggestedTaskDto: CreateSuggestedTaskDto) {
    return this.suggestedTaskService.create(createSuggestedTaskDto);
  }

  @Get()
  findAll(@Query('tagId') tagId?: string) {
    if (tagId) {
      return this.suggestedTaskService.findByTag(tagId);
    }
    return this.suggestedTaskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suggestedTaskService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updateSuggestedTaskDto: UpdateSuggestedTaskDto) {
    return this.suggestedTaskService.update(id, updateSuggestedTaskDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.suggestedTaskService.remove(id);
  }
}