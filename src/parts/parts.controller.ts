import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { PartsService } from './parts.service';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@UseGuards(AuthGuard('jwt')) // JWT obligatoire l routes lkol
@Controller('parts')
export class PartsController {
  constructor(private readonly partsService: PartsService) {}

  // Voir le stock (users connectée)
  @Get()
  findAll() {
    return this.partsService.findAll();
  }

  // Créer une pièce (ADMIN seulement)
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Post()
  create(@Body() createPartDto: CreatePartDto) {
    return this.partsService.create(createPartDto);
  }

  // Modifier une pièce (ADMIN seulement)
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updatePartDto: UpdatePartDto,
  ) {
    return this.partsService.update(id, updatePartDto);
  }

  // Supprimer une pièce (ADMIN seulement)
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.partsService.remove(id);
  }
}
