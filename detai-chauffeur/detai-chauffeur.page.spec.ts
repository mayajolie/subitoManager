import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaiChauffeurPage } from './detai-chauffeur.page';

describe('DetaiChauffeurPage', () => {
  let component: DetaiChauffeurPage;
  let fixture: ComponentFixture<DetaiChauffeurPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetaiChauffeurPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetaiChauffeurPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
