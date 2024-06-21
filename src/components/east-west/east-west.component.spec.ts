import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EastWestComponent } from './east-west.component';

describe('EastWestComponent', () => {
  let component: EastWestComponent;
  let fixture: ComponentFixture<EastWestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EastWestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EastWestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
