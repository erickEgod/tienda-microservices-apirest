import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from "class-validator";

export class CreateProductsGwDto {
  @ApiProperty({
    example: "Iphone 14 case",
    description: "The name of the product",
  })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ example: "200", description: "Quantity of products" })
  @IsNumber()
  @IsPositive()
  @IsInt()
  quantity: number;

  @ApiProperty({ example: "16,50", description: "Price of the product" })
  @IsPositive()
  price: number;
}
