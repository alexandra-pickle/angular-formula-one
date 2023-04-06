import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceQualifyingComponent } from './race-qualifying.component';

describe('RaceQualifyingComponent', () => {
  let component: RaceQualifyingComponent;
  let fixture: ComponentFixture<RaceQualifyingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaceQualifyingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaceQualifyingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
