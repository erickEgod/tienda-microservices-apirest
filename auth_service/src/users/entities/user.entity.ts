import { Role } from 'src/common/enums/role.enum';
import { Column, CreateDateColumn, Entity } from 'typeorm';

@Entity()
export class User {
  @Column({ generated: true, primary: true })
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: string;

  @CreateDateColumn()
  createdAt: Date;
}
