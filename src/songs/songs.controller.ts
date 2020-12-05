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
    const retValue = await this.songsService.create(createSongDto);
    console.log(retValue);
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
  async findTrack(@Req() req: any) {
    this.spotifyClient.setAccessToken(
      'BQC2uJ-PNDBeyd1XIpSiFEb40xyN7go-V7A9PLWLbCBog9-k8Owj8NSkMNnRK6IgkSkpQMAnSG-OzUqFngwACvQLGmPrgt-SsHemY-0sqP9orEfHTZn21kH2SGVZLSpriPcpa0xSUAPbZlAZsXqxV0OK4F1GZvrJTFxsmi8kz4EGzqkFCJYF',
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
}
