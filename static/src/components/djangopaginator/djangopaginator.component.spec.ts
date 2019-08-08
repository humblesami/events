import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DjangopaginatorComponent } from './djangopaginator.component';

describe('DjangopaginatorComponent', () => {
  let component: DjangopaginatorComponent;
  let fixture: ComponentFixture<DjangopaginatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DjangopaginatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DjangopaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
