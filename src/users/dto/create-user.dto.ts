import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { User } from '../entities/user.entity'
import { EntityManager } from 'typeorm';

export class CreateUserDto {
    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    spotifyId: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    photoUrl: string

    @IsString()
    accessToken: string

    @IsString()
    refreshToken: string

    public static fromEntity(entity: User) {
        const it = new CreateUserDto();
        it.id = entity.id;
        it.email = entity.email;
        it.spotifyId = entity.spotifyId;
        it.name = entity.name;
        it.photoUrl = entity.photoUrl;
        it.accessToken = entity.accessToken;
        it.refreshToken = entity.refreshToken;
        return it;
    }

    public async toEntity(entityManager: EntityManager) {
        const it = new User();
        it.id = this.id;
        it.email = this.email;
        it.spotifyId = this.spotifyId;
        it.name = this.name;
        it.photoUrl = this.photoUrl;
        it.accessToken = this.accessToken;
        it.refreshToken = this.refreshToken;
        return it;
   }
}