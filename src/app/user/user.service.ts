import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './model/User.entity';
import { Repository } from 'typeorm';
import { UserType } from './user.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async createUser(user: {
    username: string;
    email: string;
    phone: string;
    password: string;
    address: string;
    user_type: UserType;
    college_name: string;
    TnCFlag: boolean;
    verified: boolean;
  }) {
    const newUser = await this.userRepository.save(user);

    return newUser;
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async getUser(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }
}
