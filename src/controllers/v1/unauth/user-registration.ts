import { Res, JsonController, Post, Body, Req } from 'routing-controllers';
import { Response, Request } from 'src/types/express';
import { apiResponse } from 'src/helpers';
import { SignIn, SignUp } from 'src/types';
import { signIn, signUp } from 'src/services/v1/user-registration';
import { Auth, RefreshAuth } from 'src/auth/v1';
import { DecodedToken } from 'src/types/v1';
import config from 'src/config';

@JsonController('/register')
export default class UserRegistration {

  @Post('/signup')
  public async signUp(@Res() res: Response, @Body() body: SignUp) {
    try {

      const signUpUser = await signUp(body);

      return apiResponse(res, 200, 1000, signUpUser)

    } catch (error) {
      return apiResponse(res, 500, 1001, error);
    }
  }

  @Post('/signin')
  public async signIn(@Res() res: Response, @Body() body: SignIn) {
    try {

      const signInUser = await signIn(body);

      const refreshToken = RefreshAuth.createToken({ userIdentifier: signInUser._id });

      res.cookie(config.app.cookieLabel, refreshToken, config.cookieOptions);

      return apiResponse(res, 200, 1106, {
        token: Auth.createToken({ userIdentifier: signInUser._id }),
        user: signInUser
      });

    } catch (error) {
      return apiResponse(res, 500, 1008, error);
    }
  }

  @Post('/refresh')
  public async refreshToken(@Req() req: Request, @Res() res: Response) {
    try {

      if (req.headers.cookie) {
        const jwt = req.headers.cookie.split('=')[1]
        const data = await RefreshAuth.verifyToken<DecodedToken>(jwt);

        return apiResponse(res, 200, 1203, {
          token: Auth.createToken({ userIdentifier: data.userIdentifier }),
        });

      } else {
        throw Error();
      }

    } catch (error) {
      return apiResponse(res, 401, 1202, error);
    }
  }

}