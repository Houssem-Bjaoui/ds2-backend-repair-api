import { Controller, Get, UseGuards, Req, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('users')
export class UsersController {

  @Get('profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  // kn admin 3ndou access lel profile mte3ou
  @Roles('ADMIN')
  getProfile(@Req() req) {
    // req.user vient du JwtStrategy
    return req.user;
  }


}





