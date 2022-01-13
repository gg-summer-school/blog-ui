import { TestBed } from '@angular/core/testing';

import { ServicescustomValidationService } from './servicescustom-validation.service';

describe('ServicescustomValidationService', () => {
  let service: ServicescustomValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicescustomValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
