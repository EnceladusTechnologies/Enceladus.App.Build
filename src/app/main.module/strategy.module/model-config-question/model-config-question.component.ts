import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase, ConfigBaseControlType } from './question-types';

@Component({
  selector: 'app-model-config-question',
  templateUrl: './model-config-question.component.html',
  styleUrls: ['./model-config-question.component.scss']
})
export class ModelConfigQuestionComponent {

  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;
  ConfigBaseControlType = ConfigBaseControlType;
  get isValid() {
    if (this.form.controls && this.form.controls[this.question.id]) {
      return this.form.controls[this.question.id].valid;
    } else {
      return true;
    }
  }
}
