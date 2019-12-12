import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaGuiasPage } from './lista-guias.page';

describe('ListaGuiasPage', () => {
  let component: ListaGuiasPage;
  let fixture: ComponentFixture<ListaGuiasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaGuiasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaGuiasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
