import { TestBed } from '@angular/core/testing';

import { ShowImageDialogService } from './show-image-dialog.service';

describe('ShowImageDialogService', () => {
  let service: ShowImageDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowImageDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
