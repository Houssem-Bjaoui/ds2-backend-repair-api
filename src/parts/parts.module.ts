import { Module } from '@nestjs/common';
import { PartsController } from './parts.controller';
import { PartsService } from './parts.service';
import { SparePart } from './entities/spare-part.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SparePart])],
  controllers: [PartsController],
  providers: [PartsService]
})
export class PartsModule {}
