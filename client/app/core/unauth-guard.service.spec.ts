import { TestBed, inject } from '@angular/core/testing';

import { UnauthGuardService } from './unauth-guard.service';

describe('UnauthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnauthGuardService]
    });
  });

  it('should ...', inject([UnauthGuardService], (service: UnauthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
