
import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { UserRole } from 'src/users/user.entity';


@Injectable()
export class AuthService {
  userRepo: any;
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}


// register method


 async register(dto: RegisterDto, authHeader?: string) {
  let creatorRole = 'TECH';

  // Lire le token si présent
  if (authHeader?.startsWith('Bearer ')) {
    try {
      const token = authHeader.split(' ')[1];
      const payload = this.jwtService.verify(token);
      creatorRole = payload.role;
    } catch {}
  }

  // Définir le rôle
  let role: UserRole = 'TECH' as UserRole;
  if (dto.role === 'ADMIN' && creatorRole === 'ADMIN') {
    role = 'ADMIN' as UserRole;
  }

  const hashedPassword = await bcrypt.hash(dto.password, 10);

  //  PASSE PAR UsersService
  return this.usersService.create({
    email: dto.email,
    username: dto.username,
    password: hashedPassword,
    role,
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
