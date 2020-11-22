import { Controller, Get, Post, Body, Put, Param, Delete, Req, Res } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import SpotifyWebApi  from 'spotify-web-api-node';

@Controller('songs')
export class SongsController {
  private spotifyClient: SpotifyWebApi;
  constructor(private readonly songsService: SongsService) {
    this.spotifyClient = new SpotifyWebApi({
      clientId: 'db82d92819144ea9b362b93318bc0caf',
      clientSecret: '0a5ebcffa870477a902bd2ac7e56a79f',
      redirectUri: 'http://192.168.0.141:8888/auth/spotify/callback',
    });
  }

  @Post()
  create(@Body() createSongDto: CreateSongDto) {
    return this.songsService.create(createSongDto);
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
      this.spotifyClient.setAccessToken('BQAARqVOHzXEIIQdxjP7xZzttUf3Mscx9tthTfCAdcFiPAEaKvj28qBBmK_6zZ5wbmkD53K-TBPJPEf-SJzLnTPVY9csw_Yb6bJ5vCkC9Jzp_3eE1EgJX7pjcwfNPtll5mHoxQxIAPazNBN5l2yju-NaVKm3390WzSMJV6NGRNGtSVsNtAhF');
      const response = await this.spotifyClient.searchTracks(req.query.artist);
      const tracks = response.body.tracks.items.map( item => {
        const artists =  item.artists.map(artist => artist.name);
        const artist = artists.join(', '); 
        const albumArtUrl = item.album.images[item.album.images.length -1].url;
        return { name: item.name, id: item.id, artistName: artist, albumArtUrl: albumArtUrl}; 
      }) 
      return tracks;
  }

  @Get('/search/track')
    async findTrackAndArtist(@Req() req: any) {
      this.spotifyClient.setAccessToken('BQAARqVOHzXEIIQdxjP7xZzttUf3Mscx9tthTfCAdcFiPAEaKvj28qBBmK_6zZ5wbmkD53K-TBPJPEf-SJzLnTPVY9csw_Yb6bJ5vCkC9Jzp_3eE1EgJX7pjcwfNPtll5mHoxQxIAPazNBN5l2yju-NaVKm3390WzSMJV6NGRNGtSVsNtAhF');
      const response = await this.spotifyClient.searchTracks('track:' + req.query.track +' artist:' + req.query.artist);
      const songs = response.body.tracks.items.map( item => { return { name: item.name, id: item.id} }) 
      return songs;
  }
}
