import { TestBed, inject } from '@angular/core/testing';

import { PollsService } from './polls.service';

describe('PollsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PollsService]
    });
  });

  it('should ...', inject([PollsService], (service: PollsService) => {
    expect(service).toBeTruthy();
  }));
});
