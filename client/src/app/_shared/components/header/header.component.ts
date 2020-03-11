import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from './../../services/user.service';
import { AuthenticationService } from './../../services/authentication.service';
import { User } from './../../models/user';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public currentUser: User;
  public userAvatar: string;

  constructor(
    private userService: UserService, 
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  private getCurrentUser(): void {
    this.userService.getCurrentUser().pipe(first()).subscribe((currentUserResponse: User) => {
      this.currentUser = currentUserResponse;
      this.userAvatar = this.currentUser.userAvatar;
    }, error => console.log(error.error.message));
  }

  logoutUser() {
    this.authenticationService.logout()
    this.router.navigate(['/auth']);
  }


}
