import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaPageComponent } from './persona-page.component';

describe('PersonaPageComponent', () => {
  let component: PersonaPageComponent;
  let fixture: ComponentFixture<PersonaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonaPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
