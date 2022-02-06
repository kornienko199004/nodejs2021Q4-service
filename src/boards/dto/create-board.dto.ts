import { IsNotEmpty, IsOptional } from "class-validator";
import { BoardColumn } from "../entities/column.entity";

export class CreateBoardDto {
  @IsOptional()
  id?: string;

  @IsNotEmpty()
  title!: string;

  @IsOptional()
  columns?: BoardColumn[];
}
