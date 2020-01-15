import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepisePage } from './entrepise.page';

describe('EntrepisePage', () => {
  let component: EntrepisePage;
  let fixture: ComponentFixture<EntrepisePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntrepisePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrepisePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
