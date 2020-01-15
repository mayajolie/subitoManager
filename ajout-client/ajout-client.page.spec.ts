import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutClientPage } from './ajout-client.page';

describe('AjoutClientPage', () => {
  let component: AjoutClientPage;
  let fixture: ComponentFixture<AjoutClientPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutClientPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutClientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
