import { TestBed, async, inject } from '@angular/core/testing';

import { JwtTokenGuard } from './jwt-token.guard';

describe('JwtTokenGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JwtTokenGuard]
    });
  });

  it('should ...', inject([JwtTokenGuard], (guard: JwtTokenGuard) => {
    expect(guard).toBeTruthy();
  }));
});
