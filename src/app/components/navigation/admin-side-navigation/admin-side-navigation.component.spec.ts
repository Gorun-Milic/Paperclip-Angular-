import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSideNavigationComponent } from './admin-side-navigation.component';

describe('AdminSideNavigationComponent', () => {
  let component: AdminSideNavigationComponent;
  let fixture: ComponentFixture<AdminSideNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSideNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSideNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
