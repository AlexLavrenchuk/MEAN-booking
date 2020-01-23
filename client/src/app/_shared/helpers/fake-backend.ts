// import { Injectable } from '@angular/core';
// import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { Observable, of, throwError } from 'rxjs';
// import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
// // import BulletinsMok from './mokData';

// function type(value) {
//     var regex = /^\[object (\S+?)\]$/;
//     var matches = Object.prototype.toString.call(value).match(regex) || [];
  
//     return (matches[1] || 'undefined').toLowerCase();
// }

// @Injectable()
// export class FakeBackendInterceptor implements HttpInterceptor {

//     constructor() { }

//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         // array in local storage for registered users
//         let users: any[] = JSON.parse(localStorage.getItem('users')) || [];
//         let bulletins: any[] = JSON.parse(localStorage.getItem('bulletins')) || [];
//         // let bulletinsLocal: any[] = JSON.parse(localStorage.getItem('bulletins')) || [];
//         // let bulletins = bulletinsLocal.concat(BulletinsMok);

//         // wrap in delayed observable to simulate server api call
//         return of(null).pipe(mergeMap(() => {

//             // authenticate
//             if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
//                 // find if any user matches login credentials
//                 let filteredUsers = users.filter(user => {
//                     return user.userName === request.body.userName && user.password === request.body.password;
//                 });

//                 if (filteredUsers.length) {
//                     // if login details are valid return 200 OK with user details and fake jwt token
//                     let user = filteredUsers[0];
//                     let body = {
//                         id: user.id,
//                         type: user.type,
//                         userName: user.userName,
//                         userAvatar: user.userAvatar,
//                         createDate: user.createDate,
//                         token: 'fake-jwt-token'
//                     };

//                     return of(new HttpResponse({ status: 200, body: body }));
//                 } else {
//                     // else return 400 bad request
//                     return throwError({ error: { message: 'Login or password is incorrect' } });
//                 }
//             }

//             // get users
//             if (request.url.endsWith('/users') && request.method === 'GET') {
//                 // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
//                 if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
//                     return of(new HttpResponse({ status: 200, body: users }));
//                 } else {
//                     // return 401 not authorised if token is null or invalid
//                     return throwError({ error: { message: 'Unauthorised' } });
//                 }
//             }

//             // get current user
//             if (request.url.endsWith('/currentuser') && request.method === 'GET') {
//                 let currentUser = JSON.parse(localStorage.getItem('currentUser'));
//                 if (currentUser) {
//                     return of(new HttpResponse({ status: 200, body: currentUser }));
//                 } else {
//                     return throwError({ error: { message: 'current user not found' } });
//                 }
//             }

//             // get user by id
//             if (request.url.match(/\/users\/u+\w/) && request.method === 'GET') {
//                 // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
//                 if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
//                     // find user by id in users array
//                     let urlParts = request.url.split('/');
//                     let id = urlParts[urlParts.length - 1];
//                     let matchedUsers = users.filter(user => { return user.id === id; });
//                     let user = matchedUsers.length ? matchedUsers[0] : null;

//                     return of(new HttpResponse({ status: 200, body: user }));
//                 } else {
//                     // return 401 not authorised if token is null or invalid
//                     return throwError({ error: { message: 'Unauthorised' } });
//                 }
//             }

//             // register user
//             if (request.url.endsWith('/users/register') && request.method === 'POST') {
//                 // get new user object from post body
//                 let newUser = request.body;

//                 // validation
//                 let duplicateUser = users.filter(user => { return user.userName === newUser.userName; }).length;
//                 if (duplicateUser) {
//                     return throwError({ error: { message: 'Username "' + newUser.userName + '" is already taken' } });
//                 }

//                 // save new user
//                 newUser.id = `u${(+new Date).toString(16)}`;
//                 newUser.createDate = new Date();
//                 newUser.userAvatar = '';

//                 users.push(newUser);
//                 localStorage.setItem('users', JSON.stringify(users));

//                 // respond 200 OK
//                 return of(new HttpResponse({ status: 200 }));
//             }

//             // delete user
//             if (request.url.match(/\/users\/u+\w/) && request.method === 'DELETE') {
//                 // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
//                 if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
//                     // find user by id in users array
//                     let urlParts = request.url.split('/');
//                     let id = urlParts[urlParts.length - 1];
//                     for (let i = 0; i < users.length; i++) {
//                         let user = users[i];
//                         if (user.id === id) {
//                             // delete user
//                             users.splice(i, 1);
//                             localStorage.setItem('users', JSON.stringify(users));
//                             break;
//                         }
//                     }

//                     // respond 200 OK
//                     return of(new HttpResponse({ status: 200 }));
//                 } else {
//                     // return 401 not authorised if token is null or invalid
//                     return throwError({ error: { message: 'Unauthorised' } });
//                 }
//             }

//             // get bulletins
//             if (request.url.endsWith('/bulletins') && request.method === 'GET') {
//                 // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
//                 if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
//                     return of(new HttpResponse({ status: 200, body: bulletins }));
//                 } else {
//                     // return 401 not authorised if token is null or invalid
//                     return throwError({ error: { message: 'Unauthorised' } });
//                 }
//             }

//             // get bulletins by id
//             if (request.url.match(/\/bulletins\/b+\w/) && request.method === 'GET') {
//                 // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
//                 if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
//                     // find user by id in users array
//                     let urlParts = request.url.split('/');
//                     let id = urlParts[urlParts.length - 1];
//                     let matchedBulletins = bulletins.filter(bulletin => { return bulletin.id === id; });
//                     let bulletin = matchedBulletins.length ? matchedBulletins[0] : null;

//                     return of(new HttpResponse({ status: 200, body: bulletin }));
//                 } else {
//                     // return 401 not authorised if token is null or invalid
//                     return throwError({ error: { message: 'Unauthorised' } });
//                 }
//             }

//             // add bulletin
//             if (request.url.endsWith('/bulletin/add') && request.method === 'POST') {
                
//                 let currentUser = JSON.parse(localStorage.getItem('currentUser'));

//                 let newBulletin;
//                 if(type(request.body) === 'formdata') {
//                     let arrayPhotoInfo  = request.body.getAll('photo');
//                     let image = arrayPhotoInfo.map((item)=>{
//                         return "/assets/images/picture/" + item.name;
//                     });
                    
//                     newBulletin = JSON.parse(request.body.get('data'));
//                     newBulletin.image = image;
//                 } else {
//                     newBulletin = request.body;
//                     newBulletin.image = [];
//                 }

//                 newBulletin.id = `b${(+new Date).toString(16)}`;
//                 newBulletin.userName = currentUser.userName;
//                 newBulletin.userAvatar = currentUser.userAvatar;
//                 newBulletin.userId = currentUser.id;
//                 newBulletin.createDate = new Date();
//                 newBulletin.starRating = 0;
//                 newBulletin.currentLike = 0;
//                 newBulletin.currentVisibility = 0;
//                 newBulletin.new = true;

//                 bulletins.push(newBulletin);
//                 localStorage.setItem('bulletins', JSON.stringify(bulletins));

//                 // respond 200 OK
//                 return of(new HttpResponse({ status: 200, body: newBulletin }));
//             }

//             // get bulletins by UserId
//             if (request.url.match(/\/userBulletins\/u+\w/) && request.method === 'GET') {
//                 // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
//                 if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
//                     // find user bulletins by user id in bulletins array
//                     let urlParts = request.url.split('/');
//                     let userId = urlParts[urlParts.length - 1];
//                     let matchedBulletins = bulletins.filter(bulletin => bulletin.userId === userId);
//                     let userBulletin = matchedBulletins.length ? matchedBulletins : null;

//                     return of(new HttpResponse({ status: 200, body: userBulletin }));
//                 } else {
//                     // return 401 not authorised if token is null or invalid
//                     return throwError({ error: { message: 'Unauthorised' } });
//                 }
//             }

//             // delete bulletin
//             if (request.url.match(/\/bulletins\/b+\w/) && request.method === 'DELETE') {
//                 // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
//                 if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
//                     // find bulletin by id in bulletins array
//                     let urlParts = request.url.split('/');
//                     let id = urlParts[urlParts.length - 1];

//                     let deleteBulletin = bulletins.filter((bulletin, index) => {
//                         if(bulletin.id === id) bulletins.splice(index, 1)
//                         return bulletin.id === id;
//                     });

//                     if(deleteBulletin.length) {
//                         localStorage.setItem('bulletins', JSON.stringify(bulletins));
//                         return of(new HttpResponse({ status: 200, body: deleteBulletin[0] }));
//                     }

//                     return throwError({ error: { message: 'Not find bulletin in base' } });

                   
//                 } else {
//                     // return 401 not authorised if token is null or invalid
//                     return throwError({ error: { message: 'Unauthorised' } });
//                 }
//             }

//             // pass through any requests not handled above
//             return next.handle(request);
            
//         }))

//         // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
//         .pipe(materialize())
//         .pipe(delay(500))
//         .pipe(dematerialize());
//     }
// }

// export let fakeBackendProvider = {
//     // use fake backend in place of Http service for backend-less development
//     provide: HTTP_INTERCEPTORS,
//     useClass: FakeBackendInterceptor,
//     multi: true
// };