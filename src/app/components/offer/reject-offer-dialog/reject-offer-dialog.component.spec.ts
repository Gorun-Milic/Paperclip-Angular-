import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectOfferDialogComponent } from './reject-offer-dialog.component';

describe('RejectOfferDialogComponent', () => {
  let component: RejectOfferDialogComponent;
  let fixture: ComponentFixture<RejectOfferDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectOfferDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectOfferDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
