import { Component } from '@angular/core';
import { AppUser } from '../config/mock/auth-user';
import { UserMock } from '../config/mock/users';
import { SecurityService } from '../config/security/security.service';
import { Router } from '@angular/router';
import { ResponseMock } from '../config/mock/response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  user: AppUser = new AppUser();
  securityObject: UserMock = new UserMock();

  constructor(private securityService: SecurityService, private router: Router) {}

  login() {
    this.securityService.login(this.user).subscribe((response: ResponseMock) => {
      this.securityObject = response.userMock;
      if(this.securityObject){
        this.router.navigate(['/']);
      }
    });
  }


}
