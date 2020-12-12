import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import SpotifyWebApi from 'spotify-web-api-node';

@Injectable()
export class UsersService {
  private spotifyClient: SpotifyWebApi;
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    this.spotifyClient = new SpotifyWebApi({
      clientId: 'db82d92819144ea9b362b93318bc0caf',
      clientSecret: '0a5ebcffa870477a902bd2ac7e56a79f',
      redirectUri: 'http://infiniteplaylist.com/api/auth/spotify/callback',
    });
  }

  async create(createUserDto: CreateUserDto, entityManager: EntityManager) {
    const userEntity = await createUserDto.toEntity(entityManager);
    const dbEntity = await this.usersRepository.save(userEntity);
    const retEntity = CreateUserDto.fromEntity(dbEntity);
    return retEntity;
  }

  async findOrCreate(
    spotifyId: string,
    email: string,
    name: string,
    photoUrl: string,
    accessToken: string,
    refreshToken: string,
    entityManager: EntityManager,
  ) {
    const user = await this.usersRepository.findOne({
      where: { spotifyId: spotifyId },
    });
    if (!user) {
      const dto = new CreateUserDto();
      dto.spotifyId = spotifyId;
      dto.email = email;
      dto.name = name;
      dto.photoUrl = photoUrl;
      dto.accessToken = accessToken;
      dto.refreshToken = refreshToken;
      return this.create(dto, entityManager);
    } else {
      const dto = CreateUserDto.fromEntity(user);
      dto.accessToken = accessToken;
      dto.refreshToken = refreshToken;
      return this.create(dto, entityManager);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async refreshToken(userId: string, entityManager: EntityManager) {
    const user = await this.findOne(userId);
    this.spotifyClient.setAccessToken(user.accessToken);
    this.spotifyClient.setRefreshToken(user.refreshToken);
    const data = await this.spotifyClient.refreshAccessToken();
    const dto = CreateUserDto.fromEntity(user);
    dto.accessToken = data.body['access_token'];
    //dto.refreshToken = data.body['refresh_token'];
    return this.create(dto, entityManager);
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne(id);
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
