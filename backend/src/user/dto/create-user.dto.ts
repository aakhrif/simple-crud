import { IsBoolean, IsNotEmpty } from "class-validator"

export class CreateUserDto {
//   @IsNotEmpty()
//   @IsEmail()
//   @Validate(UniqueEmailValidator)
  // email: string

  @IsNotEmpty()
  firstName: string

  @IsNotEmpty()
  lastName: string

//   @IsNotEmpty()
//   @Length(8, 24)
  // password: string

//   @IsNotEmpty()
//   @Validate(PasswordConfirmValidator, ['password'])
  // password_confirmation: string

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean
}