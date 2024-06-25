import { Forbidden } from "@tsed/exceptions";
import {Middleware, MiddlewareMethods} from "@tsed/platform-middlewares";
import { AuthenticationService } from "../modules/authentication/AuthenticationService";

@Middleware()
export class AuthenticationMiddleware implements MiddlewareMethods {
  constructor(private authService: AuthenticationService) {
  }

  use() {
    const isValidUser = this.authService.isValidUser();
    if (!isValidUser) {
      throw new Forbidden('Not Allowed');
    }
  }

}
