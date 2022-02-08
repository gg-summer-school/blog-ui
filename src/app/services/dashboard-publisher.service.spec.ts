import { TestBed } from '@angular/core/testing';

import { DashboardPublisherService } from './dashboard-publisher.service';

describe('DashboardPublisherService', () => {
  let service: DashboardPublisherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardPublisherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
