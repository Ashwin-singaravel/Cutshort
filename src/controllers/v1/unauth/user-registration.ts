import { Res, JsonController, Post, Body } from 'routing-controllers';
import { Response } from 'express';
import { apiResponse } from 'src/helpers';
import { SignIn, SignUp } from 'src/types';
import { signIn, signUp } from 'src/services/v1/user-registration';

@JsonController('/register')
export default class UserRegistration {

  @Post('/signup')
  public async signUp(@Res() res: Response, @Body() body: SignUp) {
    try {

      const signUpUser = await signUp(body);

      return apiResponse(res, 200, 1000, signUpUser)

    } catch (error) {
      return apiResponse(res, 500, typeof error === "number" ? error : 1001, typeof error === "string" ? error : null);
    }
  }

  @Post('/signin')
  public async signIn(@Res() res: Response, @Body() body: SignIn) {
    try {

      const signInUser = await signIn(body);

      return apiResponse(res, 200, 1106, signInUser)

    } catch (error) {      
      return apiResponse(res, 500, typeof error === "number" ? error : 1008, typeof error === "string" ? error : null);
    }
  }

}