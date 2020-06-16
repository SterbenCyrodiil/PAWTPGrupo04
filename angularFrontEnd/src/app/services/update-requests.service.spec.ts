import { TestBed } from '@angular/core/testing';

import { UpdateRequestsService } from './update-requests.service';

describe('UpdateRequestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateRequestsService = TestBed.get(UpdateRequestsService);
    expect(service).toBeTruthy();
  });
});
