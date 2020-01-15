import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailUserPage } from './detail-user.page';

describe('DetailUserPage', () => {
  let component: DetailUserPage;
  let fixture: ComponentFixture<DetailUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailUserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
