import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateInterventionDto } from './dto/create-intervention.dto';
import { InterventionsService } from './interventions.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('TECH') // TECH uniquement
@Controller('interventions')
export class InterventionsController {
  constructor(
    private readonly interventionsService: InterventionsService,
  ) {}

  @Post()
  create(
    @Body() dto: CreateInterventionDto,
    @Req() req,
  ) {
    // req.user vient du token JWT
    return this.interventionsService.create(dto, req.user);
  }
}

