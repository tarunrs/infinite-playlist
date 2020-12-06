import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } from 'constants';
import SpotifyWebApi from 'spotify-web-api-node';
import { rootCertificates } from 'tls';
import { AdvancedConsoleLogger, Repository } from 'typeorm';
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
    this.songsRepository = songsRepository;
    this.spotifyClient = new SpotifyWebApi({
      clientId: 'db82d92819144ea9b362b93318bc0caf',
      clientSecret: '0a5ebcffa870477a902bd2ac7e56a79f',
      redirectUri: 'http://infiniteplaylist.com/api/auth/spotify/callback',
    });
  }

  async create(createSongDto: CreateSongDto) {
    this.spotifyClient.setAccessToken(
      'BQDKUPCSGDLJPTfS0iO2Mc4ggoLF0VoDic0q6J9OvQP6Qh4L7_5GKmVcEyUTrZHDMUSiqxf5V_sXijgcn3juHzr-FhWnUhnLvEIeqzIApng0dy4rmV3egTvgtihn5_H-tZgEb_gqmRkY14OidzEBhW9FGtjlQawbM2tiaCQhwVeqr-svvkE5',
    );
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
    const songRecord = {
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
      score: 0,
    };
    const retValue = this.getScore(songRecord, parent);
    songRecord.score = retValue.score;
    const tempRecord = await this.songsRepository.insert(songRecord);
    return {
      score: retValue.score,
      matches: retValue.matches,
      id: tempRecord.raw[0].id,
    };
  }

  calculateScore(currSongValue: number, parentSongValue: number) {
    const diff = Math.abs(
      parseFloat(currSongValue.toString()) -
        parseFloat(parentSongValue.toString()),
    );
    if (diff <= 0.1) {
      return true;
    } else {
      return false;
    }
  }

  getScore(currSong: any, parentSong: Song) {
    let score = 0;
    const matches = [];
    if (this.calculateScore(currSong.danceability, parentSong.danceability)) {
      score += 100;
      matches.push('danceability');
    }
    if (this.calculateScore(currSong.energy, parentSong.energy)) {
      score += 100;
      matches.push('energy');
    }
    if (this.calculateScore(currSong.loudness, parentSong.loudness)) {
      score += 100;
      matches.push('loudness');
    }
    if (this.calculateScore(currSong.speechiness, parentSong.speechiness)) {
      score += 100;
      matches.push('speechiness');
    }
    if (this.calculateScore(currSong.acousticness, parentSong.acousticness)) {
      score += 100;
      matches.push('acousticness');
    }
    if (
      this.calculateScore(
        currSong.instrumentalness,
        parentSong.instrumentalness,
      )
    ) {
      score += 100;
      matches.push('instrumentalness');
    }
    if (this.calculateScore(currSong.liveness, parentSong.liveness)) {
      score += 100;
      matches.push('liveness');
    }
    if (this.calculateScore(currSong.tempo, parentSong.tempo)) {
      score += 100;
      matches.push('tempo');
    }
    if (currSong.key === parentSong.key) {
      score += 100;
      matches.push('key');
    }
    if (currSong.timeSignature === parentSong.timeSignature) {
      score += 100;
      matches.push('timeSignature');
    }
    return { score: score, matches: matches, id: null };
  }

  createTree(songs) {
    if (songs.length === 0) {
      return;
    }
    const root = {
      song: songs[0],
      id: songs[0].id,
      parent: null,
      children: [],
      scores: [],
      maxScore: 0,
      maxChildIndex: null,
    };
    const nodeMapping = {};
    nodeMapping[root.id] = root;
    for (const song of songs) {
      if (!song.parentId) {
        continue;
      }
      const node = {
        song: song,
        id: song.id,
        parent: song.parentId,
        children: [],
        scores: [],
        maxScore: song.score,
        maxChildIndex: null,
      };
      nodeMapping[song.parentId].children.push(node);
      nodeMapping[node.id] = node;
    }
    return [root, nodeMapping];
  }

  calculateScores(root) {
    if (!root) {
      return 0;
    }
    let maxScore = root.maxScore;
    let index = 0;
    for (const node of root.children) {
      const score = node.song.score + this.calculateScores(node);
      root.scores.push(score);
      if (maxScore <= score) {
        maxScore = score;
        root.maxChildIndex = index;
      }
      index += 1;
    }
    root.maxScore = maxScore;
    return maxScore;
  }

  getMaxScoringPlaylist(root) {
    const songs = [];
    let node = root;
    while (node) {
      node.song.children = node.children.map((child) => child.song);
      songs.push(node.song);
      if (node.maxChildIndex === null) {
        break;
      }
      node = node.children[node.maxChildIndex];
    }
    return songs;
  }

  getMaxScoringPlaylistById(nodeMapping, id: number) {
    let songs = [];
    let node = nodeMapping[nodeMapping[id].parent];
    while (node) {
      node.song.children = node.children.map((child) => child.song);
      songs.push(node.song);
      node = nodeMapping[node.parent];
    }
    songs = songs.reverse();
    node = nodeMapping[id];
    while (node) {
      node.song.children = node.children.map((child) => child.song);
      songs.push(node.song);
      if (node.maxChildIndex === null) {
        break;
      }
      node = node.children[node.maxChildIndex];
    }
    return songs;
  }

  async findAll() {
    const songs = await this.songsRepository.find();
    const [tree, nodeMapping] = this.createTree(songs);
    this.calculateScores(tree);
    return this.getMaxScoringPlaylist(tree);
  }

  async findById(id: number) {
    const songs = await this.songsRepository.find();
    const [tree, nodeMapping] = this.createTree(songs);
    this.calculateScores(tree);
    return this.getMaxScoringPlaylistById(nodeMapping, id);
  }

  async findOne(id: number) {
    const song = await this.songsRepository.findOne({ id: id });
    return song;
  }

  async findChildren(id: number) {
    const parent = await this.songsRepository.findOne({ id: id });
    const songs = await this.songsRepository.find({ parent: parent });
    return songs;
  }

  update(id: number, updateSongDto: UpdateSongDto) {
    return `This action updates a #${id} song`;
  }

  remove(id: number) {
    return `This action removes a #${id} song`;
  }
}
