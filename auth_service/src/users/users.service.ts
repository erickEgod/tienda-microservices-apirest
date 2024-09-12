import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/common/enums/role.enum';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  //!Registrar
  async register({ name, email, password }: RegisterUserDto) {
    const userFound = await this.userRepository.findOne({ where: { email } });
    if (userFound) throw new BadRequestException('Email ya registrado');
    //*encryptar psw y guardar
    const newUser = await this.userRepository.save({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });

    return this.generateToken(newUser.id, newUser.role);
  }

  //!Loguear
  async login({ email, password }: LoginUserDto) {
    const userFound = await this.userRepository.findOne({ where: { email } });
    if (!userFound) throw new BadRequestException('Credenciales incorrectas e');
    const comparePsw = await bcrypt.compare(password, userFound.password);
    if (!comparePsw)
      throw new BadRequestException('Credenciales incorrectas p');

    return this.generateToken(userFound.id, userFound.role);
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, { name, email, password }: UpdateUserDto) {
    if (email) {
      const sameEmail = await this.userRepository.findOne({ where: { email } });
      if (sameEmail) throw new BadRequestException('Email ya registrado');
    }
    const updateUser = await this.userRepository.update(id, {
      name: name ? name : undefined,
      email,
      password: password ? await bcrypt.hash(password, 10) : undefined,
    });
    return updateUser;
  }

  async remove(id: number) {
    const userFound = await this.userRepository.findOne({ where: { id } });
    if (!userFound) throw new BadRequestException('Usuario no encontrado');
    return await this.userRepository.delete(id);
  }

  //-------------------
  async generateToken(id: number, role: string) {
    const payload = { id: id, role: role };
    return await this.jwtService.signAsync(payload);
  }
}
