import { Res, JsonController, Post } from 'routing-controllers';

@JsonController('/register')
export default class UserRegistration {

  @Post('/signup')
  public async signUp(@Res() _: Response) {

  }

}