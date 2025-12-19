import { Module } from '@nestjs/common';
import { InterventionsController } from './interventions.controller';
import { InterventionsService } from './interventions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Intervention } from './entities/intervention.entity';
import { Device } from 'src/devices/entities/device.entity';
import { SparePart } from 'src/parts/entities/spare-part.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Intervention, Device, SparePart]),
  ],

  controllers: [InterventionsController],
  providers: [InterventionsService]
})
export class InterventionsModule {}
