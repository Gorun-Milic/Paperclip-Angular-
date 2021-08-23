import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutterNavigationComponent } from './outter-navigation.component';

describe('OutterNavigationComponent', () => {
  let component: OutterNavigationComponent;
  let fixture: ComponentFixture<OutterNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutterNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutterNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
