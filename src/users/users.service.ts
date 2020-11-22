import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    ) {}

  async create(createUserDto: CreateUserDto, entityManager: EntityManager) {
    const userEntity = await createUserDto.toEntity(entityManager);
    const dbEntity = await this.usersRepository.save(userEntity);
    const retEntity = CreateUserDto.fromEntity(dbEntity);
    return retEntity;
  }

  async findOrCreate(spotifyId: string, email: string, name: string, photoUrl: string, accessToken: string, refreshToken: string, entityManager: EntityManager) {
    const user = await this.usersRepository.findOne({ where: { spotifyId: spotifyId } });
    if (!user) {
      const dto = new CreateUserDto();
      dto.spotifyId = spotifyId;
      dto.email = email;
      dto.name = name;
      dto.photoUrl = photoUrl;
      dto.accessToken = accessToken;
      dto.refreshToken = refreshToken;
      console.log(dto);
      return this.create(dto, entityManager);
    } else {
      return user;
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
