import { TestBed, async, inject } from '@angular/core/testing';

import { RoleGuardService } from './role.guard';

describe('RoleGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoleGuardService]
    });
  });

  it('should ...', inject([RoleGuardService], (guard: RoleGuardService) => {
    expect(guard).toBeTruthy();
  }));
});
