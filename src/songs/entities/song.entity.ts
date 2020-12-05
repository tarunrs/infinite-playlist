import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './../../users/entities/user.entity';

@Entity()
export class Song extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne((type) => Song)
  @JoinColumn()
  parent: Song;

  @Column({ nullable: true })
  parentId: number;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'user' })
  user: Song;

  @Column({ nullable: false })
  artistName: string;

  @Column({ nullable: false })
  albumName: string;

  @Column({ nullable: false })
  trackName: string;

  @Column({ nullable: true })
  artistId: string;

  @Column({ nullable: true })
  trackId: string;

  @Column({ nullable: true })
  albumId: string;

  @Column({ nullable: true })
  albumArtUrl: string;

  @Column({ type: 'decimal', default: 0 })
  danceability: number;

  @Column({ type: 'decimal', default: 0 })
  energy: number;

  @Column({ type: 'decimal', default: 0 })
  key: number;

  @Column({ type: 'decimal', default: 0 })
  loudness: number;

  @Column({ type: 'decimal', default: 0 })
  mode: number;

  @Column({ type: 'decimal', default: 0 })
  speechiness: number;

  @Column({ type: 'decimal', default: 0 })
  acousticness: number;

  @Column({ type: 'decimal', default: 0 })
  instrumentalness: number;

  @Column({ type: 'decimal', default: 0 })
  liveness: number;

  @Column({ type: 'decimal', default: 0 })
  valence: number;

  @Column({ type: 'decimal', default: 0 })
  tempo: number;

  @Column({ type: 'decimal', default: 0 })
  timeSignature: number;

  @Column({ type: 'integer', default: 0 })
  score: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;
}
