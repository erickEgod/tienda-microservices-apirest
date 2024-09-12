import { PartialType } from '@nestjs/mapped-types';
import { CreateProductsGwDto } from './create-products_gw.dto';

export class UpdateProductsGwDto extends PartialType(CreateProductsGwDto) {}
