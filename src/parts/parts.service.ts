import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SparePart } from './entities/spare-part.entity';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';

@Injectable()
export class PartsService {
  constructor(
    // Injection repository de SparePart
    @InjectRepository(SparePart)
    private readonly partsRepository: Repository<SparePart>,
  ) {}

  // bch nraj3ou les pieces lkol  (accessible ll users connectée)
  findAll() {
    return this.partsRepository.find();
  }

  // bch na3mou ajout d'une nouvelle pièce (ADMIN)
  create(createPartDto: CreatePartDto) {
    const part = this.partsRepository.create(createPartDto);
    return this.partsRepository.save(part);
  }

  // Modifier stock wela l prix mte3 pièce (ADMIN)
  update(id: number, updatePartDto: UpdatePartDto) {
    return this.partsRepository.update(id, updatePartDto);
  }

  // Supprimer une pièce (ADMIN)
  remove(id: number) {
    return this.partsRepository.delete(id);
  }
}
