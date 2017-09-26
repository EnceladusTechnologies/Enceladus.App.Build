import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelConfigQuestionComponent } from './model-config-question.component';

describe('ModelConfigQuestionComponent', () => {
  let component: ModelConfigQuestionComponent;
  let fixture: ComponentFixture<ModelConfigQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelConfigQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelConfigQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
