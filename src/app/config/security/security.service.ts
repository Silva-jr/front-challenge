import { Injectable } from '@angular/core';
import { UserMock } from '../mock/users';
import { Observable, of, throwError } from 'rxjs';
import { AppUser } from '../mock/auth-user';
import { LOGIN_MOCKS } from '../mock/login-mock';
import { ResponseMock } from '../mock/response';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  securityObject: UserMock = new UserMock();

  resetSecurityService(): void {
    this.securityObject.id = -1;
    this.securityObject.userName = '';
    this.securityObject.password = '';
    this.securityObject.isAdmin = false;
  }

  login(entity: AppUser): Observable< ResponseMock> {
    this.resetSecurityService();
    const foundUser = LOGIN_MOCKS.find(
      (user) => user.userName.toLowerCase() === entity.userName.toLowerCase()
    );

    if (!foundUser) {
      const errorResponse = new ResponseMock();
      errorResponse.erro= new Error('User not found')
      return new Observable((observer) => {
        observer.error(errorResponse);
      });
    }

    Object.assign(this.securityObject,foundUser);

    if (this.securityObject.userName !== '') {
      localStorage.setItem('Token', this.securityObject.beareToke);
      localStorage.setItem('cargo', JSON.stringify(this.securityObject.isAdmin))
    }
    
    const response = new ResponseMock();
    response.userMock = this.securityObject;
    return of<ResponseMock>(response);
  }

  getId() {
    return this.securityObject.id;
  }

}
