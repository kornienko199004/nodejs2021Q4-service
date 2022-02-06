import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateUserDto {
  @IsOptional()
  id?: string;

  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  login!: string;

  @IsNotEmpty()
  password!: string;
}
