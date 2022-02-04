import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSteganoComponent } from './create-stegano.component';

describe('CreateSteganoComponent', () => {
  let component: CreateSteganoComponent;
  let fixture: ComponentFixture<CreateSteganoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSteganoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSteganoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
