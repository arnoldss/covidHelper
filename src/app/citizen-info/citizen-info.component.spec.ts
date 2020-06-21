import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenInfoComponent } from './citizen-info.component';

describe('AdminComponent', () => {
  let component: CitizenInfoComponent;
  let fixture: ComponentFixture<CitizenInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitizenInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitizenInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
