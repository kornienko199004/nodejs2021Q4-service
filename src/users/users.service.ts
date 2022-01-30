import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashPassword } from '../helpers/hashHelper';
import { TasksService } from '../tasks/tasks.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private tasksService: TasksService
  ) {}

  /**
   * Creates new user
   * @param createUserDto payload for new user creation
   * @returns Promise<User>
   */
  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const hashedPassword = await hashPassword(createUserDto.password);
    const user = this.usersRepository.create({ ...createUserDto, password: hashedPassword });
    await this.usersRepository.save(user);
    return { name: user.name, login: user.login, id: user.id };
  }

  /**
   * Returns all users
   * @returns Promise<User[]>
   */
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  /**
   * Returns user by id
   * @param id user id
   * @returns Promise<User | undefined>
   */
  findOne(id: string): Promise<User | undefined> {
    return this.usersRepository.findOne(id);
  }

  /**
   * Returns user by login
   * @param login user login
   * @returns Promise<User | undefined>
   */
  async findOneByLogin(login: string): Promise<User | null> {
    const users = await this.usersRepository.find({ where: { login } });
    if (users) {
      return users[0];
    }
    return null;
  }

  /**
   * Updates user by id
   * @param id user id
   * @param user updated user value
   * @returns Promise<User | null>
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersRepository.findOne(id);
    if (user) {
      if (updateUserDto.password) {
        // eslint-disable-next-line no-param-reassign
        updateUserDto.password = await hashPassword(updateUserDto.password);
      }
      this.usersRepository.merge(user, updateUserDto);
      const results = await this.usersRepository.save(user);
      return { name: results.name, login: results.login, id: results.id };
    }
    return null;
  }

  /**
   * Removes user by id
   * @param id user id
   * @returns Promise<User | null>
   */
  async remove(id: string): Promise<User | null> {
    await this.tasksService.unassignUser(id);
    const user = await this.usersRepository.findOne(id);
    const results = await this.usersRepository.delete(id);
  
    if (results && user) {
      return user;
    }
    return null;
  }
}
