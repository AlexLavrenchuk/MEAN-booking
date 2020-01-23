import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

//models
import { User } from 'src/app/_shared/models/user';
import { Bulletin } from 'src/app/_shared/models/bulletin';

//service
import { UserService } from 'src/app/_shared/services/user.service';
import { AlertService } from 'src/app/_shared/services/alert.service';
import { ModalService } from 'src/app/_shared/services/modal.service';
import { BulletinService } from 'src/app/_shared/services/bulletin.service';

@Component({
  selector: 'app-bulletin-board',
  templateUrl: './bulletin-board.component.html',
  styleUrls: ['./bulletin-board.component.scss']
})
export class BulletinBoardComponent implements OnInit{
  private subscription: Subscription;
  loader: boolean = false;

  currentUser: User;
  users: User[] = [];
  bulletins = [];

  // MatPaginator Inputs
  length: number = 0;
  pageSize: number = 5;
  pageSizeOptions: number[] = [5, 10, 15, 20];

  pageStart:number = 0;
  pageEnd:number = 5;
  viewModule: boolean = true;
  searchValue: string = "";

  constructor(
    private router: Router,
    private userService: UserService, 
    private alertService: AlertService,
    private modalService: ModalService,
    private bulletinService: BulletinService,
    ) {
  }

  ngOnInit() {
    // this.loadAllUsers();
    this.bulletinAllUsers();

    // this.subscription = this.modalService.getData().subscribe(data => {
    //   if(data.type === "approval") {
    //     this.bulletinService.delete(data.data.id);
    //   }
    // });
    
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  // private loadAllUsers() {
  //   this.userService.getAll().pipe(first()).subscribe(users => { 
  //       this.users = users; 
  //   });
  // }
  // deleteUser(id: number) {
  //   this.userService.delete(id).pipe(first()).subscribe(() => { 
  //       this.loadAllUsers() 
  //   });
  // }
  private convertStringDataInObjectData(arr: []) {
    return arr.map((bulletin: any)=> {
      bulletin.createDate = new Date(bulletin.createDate);
      return bulletin;
    })
  }

  private bulletinAllUsers() {
    this.loader = true;
    this.bulletinService.getAll().pipe(first()).subscribe(
      (response: any) => { 
        this.bulletins = this.convertStringDataInObjectData(response);
        this.loader = false;
      },
      error => {
        this.alertService.error(error.error.massage)
        this.loader = false;
      }
    );
  }

  private inputChange(event) {
    this.searchValue = event.target.value;
    console.log([].indexOf(1));
  }
  private getBulletinsBySearchValue() {
    if(this.searchValue) {
      this.bulletinService.getOnlySearch(this.searchValue).subscribe((searchBulletins: []) => {
        this.bulletins = this.convertStringDataInObjectData(searchBulletins);
      },
      error=> this.alertService.error(error.error.massage || "no result search")
      )
    } else {
      this.bulletinAllUsers();
    }
    
  }

  private pageEvent(e) {
    this.pageStart = (e.pageSize * e.pageIndex);
    this.pageEnd = (this.pageStart + e.pageSize);
  }
  private toggleView(value) {
    this.viewModule = value;
  }
  private details(event) {
    let id = event.target.closest(".card").dataset.bulletin_id;
    this.router.navigate([`/bulletinboard/${id}`]);
  }

  // private openModal(event) {
  //   this.modalService.open({title: "Open new modal", text: "Do you know new subscribe?"});
  // }

  private booking(event) {
    let id = event.target.closest(".card").dataset.bulletin_id;

    this.bulletinService.getById(id).pipe(first()).subscribe(bulletin => { 
      this.modalService.open(bulletin);
      this.modalService.getData()
          .pipe(first())
          .subscribe(
            data => {
              if(data.type === "approval") {
                this.bulletinService.getById(id).pipe(first()).subscribe((response: any) => {
                  this.alertService.success(`You booking place ${response._id}`)
                  console.log(response);
                },
                error => this.alertService.error(error)
                )
              }
            }, 
            error => this.alertService.error(error)
          )
    });
  }
}
