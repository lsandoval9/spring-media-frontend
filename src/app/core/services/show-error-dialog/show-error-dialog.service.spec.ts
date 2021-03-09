import { TestBed } from '@angular/core/testing';

import { ShowErrorDialogService } from './show-error-dialog.service';

describe('ShowErrorDialogService', () => {
  let service: ShowErrorDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowErrorDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
