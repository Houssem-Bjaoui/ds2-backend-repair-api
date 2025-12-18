import { Injectable } from '@nestjs/common';
import { Device } from './entities/device.entity';
import { CreateDeviceDto } from './dto/create-device.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private readonly devicesRepository: Repository<Device>,
  ) {}

  // na3mlou appareil jdid (statut PENDING par défaut)
  create(createDeviceDto: CreateDeviceDto) {
    const device = this.devicesRepository.create(createDeviceDto);
    return this.devicesRepository.save(device);
  }

  // nraj3ou les appareils lkol
  findAll() {
    return this.devicesRepository.find();
  }

  // Supprimer  appareil(ADMIN seulement)
  remove(id: number) {
    return this.devicesRepository.delete(id);
  }
}

