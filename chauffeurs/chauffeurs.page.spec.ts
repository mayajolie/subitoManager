import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChauffeursPage } from './chauffeurs.page';

describe('ChauffeursPage', () => {
  let component: ChauffeursPage;
  let fixture: ComponentFixture<ChauffeursPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChauffeursPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChauffeursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
