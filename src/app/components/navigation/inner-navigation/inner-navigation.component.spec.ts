import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerNavigationComponent } from './inner-navigation.component';

describe('InnerNavigationComponent', () => {
  let component: InnerNavigationComponent;
  let fixture: ComponentFixture<InnerNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnerNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
