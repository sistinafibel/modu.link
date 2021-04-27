import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  isActive: boolean;

  @Column({ nullable: true })
  date: Date;

  static findByName(firstName: string, lastName: string) {
    // eslint-disable-next-line prettier/prettier
    return this.createQueryBuilder("user")
        .where("user.firstName = :firstName", { firstName })
        .andWhere("user.lastName = :lastName", { lastName })
        .getMany();
  }
}
