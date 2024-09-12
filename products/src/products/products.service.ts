import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  //!CREAR NUEVOS PRODUCTOS
  async create(createProductDto: CreateProductDto) {
    //todo: Solid

    const productFound = await this.productRepository.findOne({
      where: { name: createProductDto.name },
    });
    if (productFound) throw new BadRequestException('Producto ya existe');

    return await this.productRepository.save(createProductDto);
  }

  //!BUSCAR TODOS LOS PRODUCTOS
  findAll() {
    return this.productRepository.find();
  }

  //!BUSCAR PRODUCTO POR ID
  async findOne(id: number) {
    const productFound = await this.productRepository.findOne({
      where: { id },
    });
    if (!productFound)
      throw new BadRequestException(
        `El producto con id:${id} no está en el inventario`,
      );
    return productFound;
  }

  //!ACTUALIZAR PRODUCTO
  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findOne(id);
    if (updateProductDto.name) {
      const productFoundName = await this.productRepository.findOne({
        where: { name: updateProductDto.name },
      });

      if (productFoundName) throw new BadRequestException('Producto ya existe');
    }
    if (Object.keys(updateProductDto).length === 0)
      throw new BadRequestException('Enviar al menos un dato para actualizar');
    return await this.productRepository.update(id, updateProductDto);
  }

  //!ELIMINAR PRODUCTO
  async remove(id: number) {
    await this.findOne(id);
    return await this.productRepository.delete(id);
  }
}
