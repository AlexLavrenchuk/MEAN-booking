import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
// import { Subscription } from 'rxjs';

import { AlertService } from 'src/app/_shared/services/alert.service';
import { ModalService } from 'src/app/_shared/services/modal.service';
import { BulletinService } from 'src/app/_shared/services/bulletin.service';
import { UserService } from 'src/app/_shared/services/user.service';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent implements OnInit {
  private currentUser;
  // private subscription: Subscription;
  private loadData: boolean = false;
  private loading: boolean = false;
  private bulletinsUser: any;
  private addForm: FormGroup;
  private myGroup: FormGroup;
  private files: any;
  private classDragover: boolean;
  private arrEventName: string[] = ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'];

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private modalService: ModalService,
    private bulletinService: BulletinService,
    private userService: UserService,
    private renderer: Renderer2,
    private router: Router,
  ) { }

  @ViewChild('dragField', { static: false }) dragField: ElementRef;
  @ViewChild('imagesLoaded', { static: false }) imagesLoaded: ElementRef;

  ngOnInit() {
    this.getCurrentUser();
    this.getUserBulletins();

    this.addForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', [Validators.required]],
      file: ['']
    });
  }

  private deleteBulletin(event) {
    let id = event.target.closest("[data-bulletin_id]").dataset.bulletin_id;
    this.bulletinService.getById(id).pipe(first()).subscribe(
      (bulletin: any) => {
        this.modalService.open({question: `Are you sure you want to delete this?`, descriptionText: bulletin.title});
        this.modalService.getData()
          .pipe(first())
          .subscribe(
            data => {
              if(data.type === "approval") {
                this.bulletinService.delete(id).pipe(first()).subscribe((deleteBulletin: any) => {
                  this.alertService.success(`You delete ${deleteBulletin.title}`)
                  this.getUserBulletins();
                },
                error => this.alertService.error(error)
                )
              }
            }, 
            error => this.alertService.error(error)
          )
      }, 
      error=> this.alertService.error(error.error.massage || "Ops...") 
    )
  }

  private getCurrentUser(): void {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if(!this.currentUser) {
      this.alertService.error("ERROR");
      this.router.navigateByUrl("/auth");
      return;
    }
  }

  private getUserBulletins(): void {
    this.loadData = true;
    this.bulletinService.getByCurrentUser().pipe(first()).subscribe(
      bulletinsResponse => {
        this.bulletinsUser = bulletinsResponse;
        this.loadData = false;
      }, 
      error => {
        if(error.status === 401) {
          this.router.navigateByUrl("/auth");
        }
        this.alertService.error(error.error.massage);
        this.loadData = false;
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() { return this.addForm.controls; }

  addPhoto(event) { 
    let target = event.target || event.srcElement;
    this.files = target.files;
    this.forFile(this.files);
  }

  deleteError() {
    this.f.title.setErrors(null)
    this.f.description.setErrors(null)
  }

  onSubmit(e) {
    if (this.addForm.invalid) {
      return;
    }

    let form = {
      title: this.f.title.value, 
      descriptionText: this.f.description.value
    }

    let final_data;
    if (this.files) {
      let files :FileList = this.files;
      const formData = new FormData();
      for(let i = 0; i < files.length; i++){
        formData.append('photo', files[i]);
      }
      formData.append('data', JSON.stringify(form));

      final_data = formData;
    } else {
      final_data = form;
    }

    this.loading = true;
    this.bulletinService.addNew(final_data)
      .pipe(first())
      .subscribe(
        (newBulletin: any) => {
          this.alertService.success(`Congratulation! Your ${newBulletin.title} added to base`);
          this.imagesLoaded.nativeElement.innerHTML = "";
          this.addForm.reset();
          this.deleteError();
          this.loading = false;
          this.getUserBulletins();
        },
        error => {
          this.alertService.error(error.error.massage || "Error don't save");
          this.loading = false;
        });
  }

  //=====================
  private initDragField(): void {
    this.arrEventName.forEach((eventName: string) => {
      this.dragField.nativeElement.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
      })
    });
  }
  private addClass() {
    this.initDragField()
    this.classDragover = true;
  }
   private removeClass(e) {
    this.classDragover = false;
    // let x = e.pageX - this.dragField.nativeElement.offsetLeft;
    // let y = e.pageY - this.dragField.nativeElement.offsetTop;
    // let w = this.dragField.nativeElement.offsetWidth;
    // let h = this.dragField.nativeElement.offsetHeight;
    // console.log(x,y,w,h)
    // if ((x < 0) || (x > w) || (y < 0) || (y > h)) {
    //   this.classDragover = false;
    // };
  }
  private addImages(e) {
    this.classDragover = false;
    this.files = e.dataTransfer.files;
    this.forFile(this.files);
  }

  private forFile(files) {
    this.imagesLoaded.nativeElement.innerHTML = "";
    for(let i = 0; i < files.length; i++) {
      this.readThis(files[i]);
    }
  }
  private readThis(file: any): void {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file)
    reader.onloadend = (e) => {
      let src = reader.result.toString();
      this.createImage(src);
    }
  }
  private createImage(src) {
    const img = this.renderer.createElement('img');
    this.renderer.setAttribute(img, "src", src || "/assets/images/picture/noimage.png");
    this.renderer.appendChild(this.imagesLoaded.nativeElement, img);
  }
}
