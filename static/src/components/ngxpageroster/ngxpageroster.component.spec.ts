import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxpagerosterComponent } from './ngxpageroster.component';

describe('NgxpagerosterComponent', () => {
  let component: NgxpagerosterComponent;
  let fixture: ComponentFixture<NgxpagerosterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxpagerosterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxpagerosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
