import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from './../../services/user.service';
import { AuthenticationService } from './../../services/authentication.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public currentUser: any;
  public userAvatar: string;

  constructor(
    private userService: UserService, 
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit() {
    // this.getCurrentUser();
  }

  // private getCurrentUser(): void {
  //   this.userService.getCurrentUser().pipe(first()).subscribe(currentUserResponse => {
  //     this.currentUser = currentUserResponse;
  //     this.userAvatar = this.currentUser.userAvatar || "/assets/images/avatar/user-placeholder.png";
  //   })
  // }

  logoutUser() {
    this.authenticationService.logout()
    this.router.navigate(['/auth']);
  }


}
