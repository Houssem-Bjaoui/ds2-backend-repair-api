
import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { UserRole } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService:JwtService,
  ) {}



  async register(registerDto: RegisterDto) {
    const { email, password, username } = registerDto;

    // nchoufou email mawjoud wale 
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email déjà utilisé');
    }

    // ncryptiw mote de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    //  na3mlou create lel user jdid (role par défaut TECH)
    return this.usersService.create({
      email,
      username,
      password: hashedPassword,
      role: UserRole.TECH,
    });
  }


  // login method
  
  async login(loginDto: { email: string; password: string }) {
    const { email, password } = loginDto;

    // nlawjou 3la user b email
    const user =await this.usersService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('Email ou mot de passe incorrect');
    }

    // ncompariw mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('mot de passe incorrect');
  }


  // ncreateiw payload mta3 JWT
  // payload ykoun fih les donnees li n7ebou ykounou fi token

  const payload ={
    sub: user.id,
    email: user.email,
    role: user.role,
  }

  // generer token
  const token = this.jwtService.sign(payload);
  
// nraj3ou token
  return {
    access_token: token,
  };
  }






}
