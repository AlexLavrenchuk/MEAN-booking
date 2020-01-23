import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from 'src/app/_shared/services/authentication.service'
import { AlertService } from 'src/app/_shared/services/alert.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./../auth.style/auth.style.scss']
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup;
  loading = false;
  hide = true;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
    ) { }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/bulletinboard'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/bulletinboard';
  }

  // convenience getter for easy access to form fields
  get f() { return this.signInForm.controls; }

  onSubmit() {
    if (this.signInForm.invalid) {
      return;
    }
    
    this.loading = true;
      this.authenticationService.login(this.signInForm.value)
        .pipe(first())
        .subscribe(
          data => {
            this.alertService.success("Success");
            this.router.navigate([this.returnUrl]);
          },
          error => {
            this.alertService.error(error.error.massage);
            this.loading = false;
          });
  }
}
