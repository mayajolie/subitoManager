import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpartPage } from './listpart.page';

describe('ListpartPage', () => {
  let component: ListpartPage;
  let fixture: ComponentFixture<ListpartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListpartPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListpartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
