import { Column, CreateDateColumn, Entity } from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @Column({ primary: true, generated: true })
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @CreateDateColumn()
  createdAt: Date;
}
