import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';

import { UserDto } from '../domains/dtos/responses/user.dto';
import { UserRepository } from '../repository/user.repository';

export interface IUserService {
  getUser(userId: string): Promise<UserDto>;
}

@Injectable()
export class UserService implements IUserService {
  public logger: Logger;

  constructor(
    @Inject('IUserRepository')
    private userRepository: UserRepository,
  ) {
    this.logger = new Logger(UserService.name);
  }

  async getUser(userId: string): Promise<UserDto> {
    try {
      const user = await this.userRepository.findUserById(userId);

      if (!user) {
        throw new NotFoundException(`User with id ${userId} not found`);
      }

      return user.toDto();
    } catch (error) {
      this.logger.error(error);

      throw error;
    }
  }
}
