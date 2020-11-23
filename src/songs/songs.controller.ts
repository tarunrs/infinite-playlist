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
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import SpotifyWebApi from 'spotify-web-api-node';

@Controller('songs')
export class SongsController {
  private spotifyClient: SpotifyWebApi;
  constructor(private readonly songsService: SongsService) {
    this.spotifyClient = new SpotifyWebApi({
      clientId: 'db82d92819144ea9b362b93318bc0caf',
      clientSecret: '0a5ebcffa870477a902bd2ac7e56a79f',
      redirectUri: 'http://localhost:8888/auth/spotify/callback',
    });
  }

  @Post()
  async create(@Body() createSongDto: CreateSongDto) {
    const temp = await this.songsService.create(createSongDto);
    const currSong = await this.songsService.findOne(temp.identifiers[0].id);
    const parentSong = await this.songsService.findOne(createSongDto.id);
    console.log(parentSong);
    console.log(currSong);
    const score = this.songsService.getScore(currSong, parentSong);
    return { score: score };
  }

  @Get()
  findAll() {
    return this.songsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.songsService.findOne(+id);
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
  async findTrack(@Req() req: any) {
    this.spotifyClient.setAccessToken(
      'BQASDCDAHfvAELCB9aJF5uPunVGBhrfegLu1bf87TZbkwLa3gUorgxNmWM8rMo8mKHTEWI7jd8s--7IXucTJAI_BuSJkm3MDT8MUfAC6Xgr54pSKbe078tibgBqJ4Rsq9Yh-ywuNr6o0-TUBT0ObIXTsy1u4LdvgKqHc8mD4o8wlQ12oPGFr',
    );
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

  @Get('/search/track')
  async findTrackAndArtist(@Req() req: any) {
    this.spotifyClient.setAccessToken(
      'BQCp7wAu8S9xxdn3nVl0RTYrRDP5HxuYotLcu_h9Tq4tFH9bZMTky7OO1pcIcoOXlux6WkdKv2tleavU9fnFoA-1jmPAX4PVsWHiff5yoHb4aYxrWXfLa8GKZzTL8kr-hQiq17D6Oozp2Jt466g872hkBVDbDHwdArqm0m6Mf3iDiCsYDDX-',
    );
    const response = await this.spotifyClient.searchTracks(
      'track:' + req.query.track + ' artist:' + req.query.artist,
    );
    const songs = response.body.tracks.items.map((item) => {
      return { name: item.name, id: item.id };
    });
    return songs;
  }
}
