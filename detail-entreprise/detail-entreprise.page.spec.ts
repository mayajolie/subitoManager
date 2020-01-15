import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEntreprisePage } from './detail-entreprise.page';

describe('DetailEntreprisePage', () => {
  let component: DetailEntreprisePage;
  let fixture: ComponentFixture<DetailEntreprisePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailEntreprisePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailEntreprisePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
