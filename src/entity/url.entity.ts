import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';

@Entity('urllist')
export class UrlList extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ name: 'fullurl', type: 'text' })
  fullUrl: string;

  @Column({ name: 'shuturl', type: 'text' })
  shutUrl: string;

  @Column({ name: 'is_del', type: 'boolean', default: false })
  isDel: boolean;

  @CreateDateColumn({ name: 'writedate' })
  writeDate: Date;

  @UpdateDateColumn({ name: 'editdate' })
  editDate: Date;
}
