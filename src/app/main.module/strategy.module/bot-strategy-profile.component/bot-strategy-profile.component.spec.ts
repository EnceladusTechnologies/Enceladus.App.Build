import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotStrategyProfileComponent } from './bot-strategy-profile.component';

describe('BotStrategyProfileComponent', () => {
  let component: BotStrategyProfileComponent;
  let fixture: ComponentFixture<BotStrategyProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotStrategyProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotStrategyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
