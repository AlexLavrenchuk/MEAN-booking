import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { 
  HttpClientModule, 
  HTTP_INTERCEPTORS 
} from '@angular/common/http';

// used to create fake backend
// import { fakeBackendProvider } from './_shared/helpers/fake-backend';

// app-routing
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// guard
import { AuthGuard } from './_shared/guard/auth.guard';
import { AdminGuard } from './_shared/guard/admin.guard';

// helpers
// import { JwtInterceptor } from './_shared/helpers/jwt.interceptor';
// import { ErrorInterceptor } from './_shared/helpers/error.interceptor';

// services
import { AuthenticationService } from './_shared/services/authentication.service';
import { UserService } from './_shared/services/user.service';
import { BulletinService } from './_shared/services/bulletin.service';
import { HeaderService } from './_shared/services/header.service';
import { AlertService } from './_shared/services/alert.service';
import { ModalService } from './_shared/services/modal.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
    AdminGuard,
    AuthenticationService,
    UserService,
    BulletinService,
    HeaderService,
    AlertService,
    ModalService,
    // { 
    //   provide: HTTP_INTERCEPTORS, 
    //   useClass: JwtInterceptor, 
    //   multi: true 
    // },
    // { 
    //   provide: HTTP_INTERCEPTORS, 
    //   useClass: ErrorInterceptor, 
    //   multi: true 
    // },

    // provider used to create fake backend
    // fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
