import { TestBed } from '@angular/core/testing';

import { AdminPagesService } from './admin-pages.service';

describe('AdminPagesService', () => {
  let service: AdminPagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminPagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
