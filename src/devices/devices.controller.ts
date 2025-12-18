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

import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';


@UseGuards(AuthGuard('jwt')) // JWT obligatoire
@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  // Enregistrer un appareil  (kol user connecté)
  @Post()
  create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.devicesService.create(createDeviceDto);
  }

  // Liste des appareils (kol user connecté)
  @Get()
  findAll() {
    return this.devicesService.findAll();
  }

  // Supprimer un appareil (ADMIN seulement)
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.devicesService.remove(id);
  }
}
