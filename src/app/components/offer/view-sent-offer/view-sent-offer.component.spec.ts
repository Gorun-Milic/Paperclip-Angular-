import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSentOfferComponent } from './view-sent-offer.component';

describe('ViewSentOfferComponent', () => {
  let component: ViewSentOfferComponent;
  let fixture: ComponentFixture<ViewSentOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSentOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSentOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
