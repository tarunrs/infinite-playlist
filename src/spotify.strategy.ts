import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-spotify';
import { UsersService } from './users/users.service';
import { EntityManager, Transaction, TransactionManager } from 'typeorm';

@Injectable()
export class SpotifyStrategy extends PassportStrategy(Strategy, 'spotify') {
  constructor(
      private readonly usersService: UsersService,
    ) {
    super({
        clientID: 'db82d92819144ea9b362b93318bc0caf',
        clientSecret: '0a5ebcffa870477a902bd2ac7e56a79f',
        callbackURL: 'http://192.168.0.141:8888/auth/spotify/callback',
        scope: ['user-read-email', 
                'user-read-private',
                'streaming',
                'user-library-read',
                'user-library-modify',
                'user-read-playback-state',
                'user-modify-playback-state'],
        showDialog: true
    });
  }

  @Transaction()
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
    @TransactionManager() manager: EntityManager,
  ): Promise<any> {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    const email = profile.emails && profile.emails.length ? profile.emails[0].value : '';
    const user = await this.usersService.findOrCreate(profile.id, email, profile.displayName, profile.photos[0], accessToken, refreshToken, manager);
    const payload = {
      user,
      accessToken,
    };
    done(null, payload);
  }
}