import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { SongsModule } from './songs/songs.module';
import { SpotifyStrategy } from './spotify.strategy';
import { AuthModule } from './auth.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'ip',
      password: '',
      database: 'infinite_playlist',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      migrationsTableName: 'custom_migration_table',
      migrations: ['migration/*.js'],
      cli: {
        migrationsDir: 'migration',
      },
    }),
    UsersModule,
    SongsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, SpotifyStrategy, JwtStrategy],
})
export class AppModule {}
