import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Req,
  Res,
  Bind,
  UseGuards,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import SpotifyWebApi from 'spotify-web-api-node';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { EntityManager, Transaction, TransactionManager } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Controller('songs')
export class SongsController {
  private spotifyClient: SpotifyWebApi;
  constructor(
    private readonly songsService: SongsService,
    private readonly usersService: UsersService,
  ) {
    this.spotifyClient = new SpotifyWebApi({
      clientId: 'db82d92819144ea9b362b93318bc0caf',
      clientSecret: '0a5ebcffa870477a902bd2ac7e56a79f',
      redirectUri: 'http://infiniteplaylist.com/api/auth/spotify/callback',
    });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Bind(Req())
  @Transaction()
  async create(
    @Req() req: any,
    @Body() createSongDto: CreateSongDto,
    @TransactionManager() manager: EntityManager,
  ) {
    const user = <User>req.user;
    console.log("User record in create:");
    console.log(user);
    //const userRecord = await this.usersService.refreshToken(user.id, manager);
    const retValue = await this.songsService.create(
      createSongDto,
      user,
      manager,
    );
    return retValue;
  }

  @Get()
  findAll() {
    return this.songsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.songsService.findById(parseInt(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSongDto: UpdateSongDto) {
    return this.songsService.update(+id, updateSongDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.songsService.remove(+id);
  }

  @Get('/search/artist')
  @UseGuards(JwtAuthGuard)
  @Bind(Req())
  @Transaction()
  async findTrack(
    @Req() req: any,
    @TransactionManager() manager: EntityManager,
  ) {
    const user = <User>req.user;
    console.log(user);
    const userRecord = await this.usersService.refreshToken(user.id, manager);
    this.spotifyClient.setAccessToken(userRecord.accessToken);
    const response = await this.spotifyClient.searchTracks(req.query.artist);
    const tracks = response.body.tracks.items.map((item) => {
      const artists = item.artists.map((artist) => artist.name);
      const artist = artists.join(', ');
      const albumArtUrl = item.album.images[item.album.images.length - 1].url;
      return {
        name: item.name,
        id: item.id,
        artistName: artist,
        albumArtUrl: albumArtUrl,
      };
    });
    return tracks;
  }
}
