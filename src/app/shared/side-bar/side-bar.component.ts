import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserMock } from 'src/app/config/mock/users';
import { SecurityService } from 'src/app/config/security/security.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {

  userObject: UserMock = new UserMock();
  constructor(
    private router: Router,
    private securityService: SecurityService,
  ) {
    this.userObject = securityService.securityObject
  }


  logout() {
    localStorage.removeItem('Token');
    localStorage.removeItem('cargo');
    this.securityService.resetSecurityService();
    this.router.navigate(['/login']);
  }
}
