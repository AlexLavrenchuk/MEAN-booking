import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  data: any;
  view: boolean = false;
  scrollTop: number = 0;

  constructor(private modalService: ModalService) { }

  ngOnInit() {
    this.subscription = this.modalService.getData().subscribe(data => { 
      this.data = data.data;
      if(data.type === "closed" || data.type === "approval") { 
        this.view = false;
      } else {
        this.view = true;
      }
    });
  }

  areaOutside(e) {
    if(e.target.classList.contains('modal')) {
      this.modalService.closed({});
    }
  }

  close() {
    this.modalService.closed({});
  }

  verification() {
    this.modalService.approval(this.data);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
