import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

//models
import { Bulletin } from 'src/app/_shared/models/bulletin';

//service
import { BulletinService } from 'src/app/_shared/services/bulletin.service';

@Component({
  selector: 'app-bulletin-board-details',
  templateUrl: './bulletin-board-details.component.html',
  styleUrls: ['./bulletin-board-details.component.scss']
})
export class BulletinBoardDetailsComponent implements OnInit {
  id:any;
  bulletin: any;
  slidesShow: boolean = false;

  slides: [] = [];

  slideConfig = {
    "lazyLoad": 'ondemand',
    "centerMode": true,
    "centerPadding": '60px',
    "slidesToShow": 1,
    // "autoplay": true,
    // "autoplaySpeed": 2000,
    "arrows": false,
    // "nextArrow": "<button class='button-slide next-slide'>next</button>",
    // "prevArrow": "<button class='button-slide prev-slide'>prev</button>",
    "dots": true,
    "dotsClass": "custom-dots",
    "infinite": false,
    // "event": {
    //   beforeChange: function (event, slick, currentSlide, nextSlide) {

    //   },
    //   afterChange: function (event, slick, currentSlide, nextSlide) {

    //   }
    // }
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bulletinService: BulletinService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.bulletinsDetails();
  }

  private bulletinsDetails() {
    this.bulletinService.getById(this.id).pipe(first()).subscribe(bulletin => { 
        this.bulletin = bulletin;
        this.slides = this.bulletin.images.map(src => {
          return {img: src};
        });
        if(this.slides.length > 1) {
          this.slidesShow = true;
        }
    });
  }

  private goToBack() {
    this.router.navigate([`/bulletinboard`]);
  }

  private slickInit(event) {
    this.addClassToDots(0, event.slick.$dots[0].children, event.slick.$dots[0]);
  }

  private breakpoint(event) {}

  private beforeChange(event) {}

  private afterChange(event) {
    this.addClassToDots(event.currentSlide, event.slick.$dots[0].children, event.slick.$dots[0]);
  }

  

  private addClassToDots(i: number, arrDots: any, wrap: any) {
    // cleaning class //
    for(let j = 0; j < arrDots.length; j++) {
      arrDots[j].classList.remove("beside", "closest", "custom-active");
    }

    // add left offset to parent points //
    wrap.style.left = `calc(50% - ${arrDots[i].offsetLeft + (arrDots[i].offsetWidth / 2)}px)`;


    arrDots[i].classList.add("custom-active");

    if(arrDots[i - 1]) {
      arrDots[i - 1].classList.add("closest");
    }

    if(arrDots[i + 1]) {
      arrDots[i + 1].classList.add("closest");
    }

    if(arrDots[i + 2]) {
      arrDots[i + 2].classList.add("beside");
    }

    if(arrDots[i - 2]) {
      arrDots[i - 2].classList.add("beside");
    }
  }
}
