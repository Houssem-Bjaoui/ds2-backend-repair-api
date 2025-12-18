import { PartialType } from '@nestjs/mapped-types';
import { CreatePartDto } from './create-part.dto';

// PartialType m3ntha les champs de craetePartDto  optionnel
export class UpdatePartDto extends PartialType(CreatePartDto) {}
