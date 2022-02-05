import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateTaskDto {
  @IsOptional()
  id?: string;

  @IsNotEmpty()
  title!: string;

  @IsNotEmpty()
  description!: string;

  @IsOptional()
  userId?: string;

  @IsOptional()
  boardId?: string;

  @IsOptional()
  columnId?: string;

  @IsNotEmpty()
  order!: number;
}
