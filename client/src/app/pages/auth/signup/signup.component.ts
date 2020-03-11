import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/_shared/services/user.service';
import { AlertService } from 'src/app/_shared/services/alert.service';
import { AuthenticationService } from 'src/app/_shared/services/authentication.service';

export interface type {
  name: string;
  value: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./../auth.style/auth.style.scss']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  loading = false;
  hide = true;
  hideReplay = true;
  returnUrl: string;
  
  // select value
  types: type[] = [
    {name: 'User', value: 'user'},
    {name: 'Client', value: 'client'},
  ];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private authenticationService: AuthenticationService
    ) { }

  validatorPasswordReplay(first: string, second: string) {
    return (group: FormGroup) => {
      if (group.controls[first].value !== group.controls[second].value) {
        return group.controls[second].setErrors({notEquivalent: true});
      } else {
        return group.controls[second].setErrors(null);
      }
    }
  }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      type: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordReplay: ['', [Validators.required, Validators.minLength(6)]]
    }, {validator: this.validatorPasswordReplay('password', 'passwordReplay')});

    // get return url from route parameters or default to '/bulletinboard'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/bulletinboard';
  }

  // convenience getter for easy access to form fields
  get f() { return this.signUpForm.controls; }

  onSubmit() {
    if (this.signUpForm.invalid) {
      return;
    }

    this.loading = true;
      this.userService.register(this.signUpForm.value)
        .pipe(first())
        .subscribe(
          data => {
            this.alertService.success("Success");
            this.loginNewUser()
          },
          error => {
            console.log(error);
            this.alertService.error(error.error.message);
            this.loading = false;
          });
  }

  private loginNewUser() {
    this.authenticationService.login(this.signUpForm.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log("data",data);
          this.alertService.success("Success");
          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log(error);
          this.alertService.error(error.error.message);
          this.loading = false;
        });
  }
}