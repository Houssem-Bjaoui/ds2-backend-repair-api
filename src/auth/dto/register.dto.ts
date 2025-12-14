import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string; //lezem ykoun email valide

  @IsNotEmpty()
  username: string; // lezem mykounch fergh

  @MinLength(6)
  password: string; // minimum 6 caractères
}
