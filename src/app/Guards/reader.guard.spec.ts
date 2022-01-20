import { TestBed } from '@angular/core/testing';

import { ReaderGuard } from './admin.guard';

describe('ReaderGuard', () => {
  let guard: ReaderGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ReaderGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
