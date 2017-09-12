import { NgModule } from '@angular/core';
import {
    MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdCoreModule,
    MdDatepickerModule,
    MdInputModule,
    MdMenuModule,
    MdProgressBarModule,
    MdNativeDateModule,
    MdOptionModule,
    MdSelectModule,
    MdProgressSpinnerModule,
    MdSnackBarModule,
    MdTooltipModule,
    MdToolbarModule
} from '@angular/material';

@NgModule({
    imports: [
        MdAutocompleteModule,
        MdButtonModule,
        MdButtonToggleModule,
        MdCardModule,
        MdCheckboxModule,
        MdCoreModule,
        MdDatepickerModule,
        MdInputModule,
        MdProgressBarModule,
        MdMenuModule,
        MdNativeDateModule,
        MdOptionModule,
        MdSelectModule,
        MdSnackBarModule,
        MdTooltipModule,
        MdProgressSpinnerModule,
        MdToolbarModule
    ],
    exports: [
        MdAutocompleteModule,
        MdButtonModule,
        MdButtonToggleModule,
        MdCardModule,
        MdCheckboxModule,
        MdCoreModule,
        MdDatepickerModule,
        MdInputModule,
        MdMenuModule,
        MdProgressBarModule,
        MdNativeDateModule,
        MdOptionModule,
        MdSelectModule,
        MdSnackBarModule,
        MdTooltipModule,
        MdProgressSpinnerModule,
        MdToolbarModule
    ]
})
export class MaterialModule { }
