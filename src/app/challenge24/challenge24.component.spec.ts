import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Challenge24Component } from './challenge24.component';

describe('Challenge24Component', () => {
  let component: Challenge24Component;
  let fixture: ComponentFixture<Challenge24Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Challenge24Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Challenge24Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
