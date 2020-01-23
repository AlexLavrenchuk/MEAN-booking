import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulletinBoardDetailsComponent } from './bulletin-board-details.component';

describe('BulletinBoardDetailsComponent', () => {
  let component: BulletinBoardDetailsComponent;
  let fixture: ComponentFixture<BulletinBoardDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulletinBoardDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulletinBoardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
