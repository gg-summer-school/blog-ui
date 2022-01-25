import { TestBed } from '@angular/core/testing';

import { PaidArticlesService } from './paid-articles.service';

describe('PaidArticlesService', () => {
  let service: PaidArticlesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaidArticlesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
