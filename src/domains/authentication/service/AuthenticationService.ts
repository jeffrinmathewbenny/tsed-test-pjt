import { Injectable } from '@tsed/di';

@Injectable()
export class AuthenticationService {
  isValidUser() {
    return true;
  }
}
