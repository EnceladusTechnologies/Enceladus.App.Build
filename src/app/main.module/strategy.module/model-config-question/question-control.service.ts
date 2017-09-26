import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionBase, ConfigBaseControlType } from 'app/main.module/strategy.module/model-config-question/question-types';


@Injectable()
export class QuestionControlService {


    addToFormGroup(questions: QuestionBase<any>[], formGroup: FormGroup, disableControls: boolean) {

        questions.forEach(el => {
            const validators = [];
            if (el.required) {
                validators.push(Validators.required);
            }
            // validators.push(Validators.minLength(el.minLength));
            // validators.push(Validators.maxLength(el.maxLength));
            // switch (el.controlType) {
            //     case ConfigBaseControlType.NUMBER:

            //         break;
            //     case ConfigBaseControlType.PERCENTAGE:
            //         break;
            //     default:
            //         break;
            // }
            const cntrl = new FormControl(el.value || '', validators);
            if (disableControls) {
                cntrl.disable();
            }
            formGroup.registerControl(el.id, cntrl);

        })
    }
}
