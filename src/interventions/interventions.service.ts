import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInterventionDto } from './dto/create-intervention.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SparePart } from 'src/parts/entities/spare-part.entity';
import { Device, DeviceStatus } from 'src/devices/entities/device.entity';
import { Intervention } from './entities/intervention.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InterventionsService {
  constructor(
    @InjectRepository(Intervention)
    private readonly interventionRepo: Repository<Intervention>,

    @InjectRepository(Device)
    private readonly deviceRepo: Repository<Device>,

    @InjectRepository(SparePart)
    private readonly partsRepo: Repository<SparePart>,
  ) {}

  async create(dto: CreateInterventionDto, user: any) {
    // Récupérer l’appareil
    const device = await this.deviceRepo.findOneBy({ id: dto.deviceId });
    if (!device) {
      throw new NotFoundException('Appareil introuvable');
    }


    //  Récupérer les pièces
    const parts = await this.partsRepo.findByIds(dto.sparePartsIds);


    //  Vérifier le stock
    for (const part of parts) {
      if (part.stock < 1) {
        throw new BadRequestException(
          `Stock insuffisant pour ${part.name}`,
        );
      }
    }

    //  Décrémenter le stock
    for (const part of parts) {
      part.stock -= 1;
      await this.partsRepo.save(part);
    }

    // Passer le device à REPAIRING
    device.status = DeviceStatus.REPAIRING;
    await this.deviceRepo.save(device);

    // Créer l’intervention
    const intervention = this.interventionRepo.create({
      date: new Date(),
      description: dto.description,
      technician: user,
      device: device,
      spareParts: parts,
    });

    return this.interventionRepo.save(intervention);
  }
}
