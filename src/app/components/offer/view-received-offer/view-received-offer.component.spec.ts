import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReceivedOfferComponent } from './view-received-offer.component';

describe('ViewReceivedOfferComponent', () => {
  let component: ViewReceivedOfferComponent;
  let fixture: ComponentFixture<ViewReceivedOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewReceivedOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReceivedOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
