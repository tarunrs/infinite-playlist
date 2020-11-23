import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import SpotifyWebApi from 'spotify-web-api-node';
import { Repository } from 'typeorm';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Song } from './entities/song.entity';

@Injectable()
export class SongsService {
  private spotifyClient: SpotifyWebApi;
  constructor(
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
  ) {
    this.spotifyClient = new SpotifyWebApi({
      clientId: 'db82d92819144ea9b362b93318bc0caf',
      clientSecret: '0a5ebcffa870477a902bd2ac7e56a79f',
      redirectUri: 'http://localhost:8888/auth/spotify/callback',
    });
  }

  async create(createSongDto: CreateSongDto) {
    this.spotifyClient.setAccessToken(
      'BQASDCDAHfvAELCB9aJF5uPunVGBhrfegLu1bf87TZbkwLa3gUorgxNmWM8rMo8mKHTEWI7jd8s--7IXucTJAI_BuSJkm3MDT8MUfAC6Xgr54pSKbe078tibgBqJ4Rsq9Yh-ywuNr6o0-TUBT0ObIXTsy1u4LdvgKqHc8mD4o8wlQ12oPGFr',
    );
    console.log(createSongDto);
    const songDetails = await this.spotifyClient.getTrack(
      createSongDto.trackId,
    );
    const songFeatures = await this.spotifyClient.getAudioFeaturesForTrack(
      createSongDto.trackId,
    );
    const artistName = songDetails.body.artists
      .map((artist) => artist.name)
      .join(', ');
    const albumName = songDetails.body.album.name;
    const artistId = songDetails.body.artists
      .map((artist) => artist.id)
      .join(', ');
    const albumId = songDetails.body.album.id;
    const albumArtUrl =
      songDetails.body.album.images[songDetails.body.album.images.length - 1]
        .url;
    const trackName = songDetails.body.name;
    const trackId = songDetails.body.id;
    const danceability = songFeatures.body.danceability;
    const energy = songFeatures.body.energy;
    const key = songFeatures.body.key;
    const loudness = songFeatures.body.loudness;
    const mode = songFeatures.body.mode;
    const speechiness = songFeatures.body.speechiness;
    const acousticness = songFeatures.body.acousticness;
    const instrumentalness = songFeatures.body.instrumentalness;
    const liveness = songFeatures.body.liveness;
    const valence = songFeatures.body.valence;
    const tempo = songFeatures.body.tempo;
    const timeSignature = songFeatures.body.time_signature;
    const parent = await this.songsRepository.findOneOrFail({
      id: createSongDto.id,
    });
    const songRecord = await this.songsRepository.insert({
      artistName: artistName,
      albumName: albumName,
      artistId: artistId,
      albumId: albumId,
      albumArtUrl: albumArtUrl,
      trackName: trackName,
      trackId: trackId,
      danceability: danceability,
      energy: energy,
      key: key,
      loudness: loudness,
      mode: mode,
      speechiness: speechiness,
      acousticness: acousticness,
      instrumentalness: instrumentalness,
      liveness: liveness,
      valence: valence,
      tempo: tempo,
      timeSignature: timeSignature,
      parent: parent,
    });
    console.log(songRecord);
    console.log(songDetails);
    return songRecord;
  }

  calculateScore(currSongValue: number, parentSongValue: number) {
    console.log(currSongValue);
    console.log(parentSongValue);
    console.log(typeof currSongValue);
    const diff = Math.abs(parseFloat(currSongValue.toString()) - parseFloat(parentSongValue.toString())); 
    if (diff <= 0.1) {
      console.log('Score!!');
      return 100;
    } else {
      return 0;
    }
  }

  getScore(currSong: Song, parentSong: Song) {
    let score = 0;
    score += this.calculateScore(
      currSong.danceability,
      parentSong.danceability,
    );
    score += this.calculateScore(currSong.energy, parentSong.energy);
    score += this.calculateScore(currSong.loudness, parentSong.loudness);
    score += this.calculateScore(currSong.speechiness, parentSong.speechiness);
    score += this.calculateScore(
      currSong.acousticness,
      parentSong.acousticness,
    );
    score += this.calculateScore(
      currSong.instrumentalness,
      parentSong.instrumentalness,
    );
    score += this.calculateScore(currSong.liveness, parentSong.liveness);
    score += this.calculateScore(currSong.tempo, parentSong.tempo);
    if (currSong.key === parentSong.key) {
      score += 100;
    }
    if (currSong.timeSignature === parentSong.timeSignature) {
      score += 100;
    }
    return score;
  }
  async findAll() {
    const songs = await this.songsRepository.find();
    return songs;
  }

  async findOne(id: number) {
    const song = await this.songsRepository.findOne({ id: id });
    return song;
  }

  update(id: number, updateSongDto: UpdateSongDto) {
    return `This action updates a #${id} song`;
  }

  remove(id: number) {
    return `This action removes a #${id} song`;
  }
}
