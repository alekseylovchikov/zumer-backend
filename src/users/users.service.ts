import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { JwtService } from 'src/jwt/jwt.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<User> {
    try {
      const exists = await this.users.findOne({ email });
      if (exists) {
        throw new ConflictException('User already exists');
      }
      const user = await this.users.create({ email, password, role });
      return this.users.save(user);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.users.findOne({ email });
      if (!user) {
        throw new BadRequestException('User does not exist');
      }
      const passwordMatch = await user.checkPassword(password);
      if (!passwordMatch) {
        throw new BadRequestException('Password is incorrect');
      }
      const token = this.jwtService.sign(user.id);
      return { token };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
