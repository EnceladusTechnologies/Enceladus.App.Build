import { NgModule } from '@angular/core';
import {
    MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCheckboxModule,
    MdCoreModule,
    MdDatepickerModule,
    MdInputModule,
    MdIconModule,
    MdMenuModule,
    MdProgressBarModule,
    MdNativeDateModule,
    MdOptionModule,
    MdSelectModule,
    MdProgressSpinnerModule,
    MdSnackBarModule,
    MdTableModule,
    MdCardModule,
    MdTooltipModule,
    MdToolbarModule
} from '@angular/material';

@NgModule({
    imports: [
        MdAutocompleteModule,
        MdButtonModule,
        MdButtonToggleModule,
        MdCheckboxModule,
        MdCoreModule,
        MdDatepickerModule,
        MdInputModule,
        MdIconModule,
        MdProgressBarModule,
        MdMenuModule,
        MdNativeDateModule,
        MdOptionModule,
        MdSelectModule,
        MdCardModule,
        MdSnackBarModule,
        MdTableModule,
        MdTooltipModule,
        MdProgressSpinnerModule,
        MdToolbarModule
    ],
    exports: [
        MdAutocompleteModule,
        MdButtonModule,
        MdButtonToggleModule,
        MdCheckboxModule,
        MdCoreModule,
        MdDatepickerModule,
        MdInputModule,
        MdIconModule,
        MdMenuModule,
        MdProgressBarModule,
        MdNativeDateModule,
        MdOptionModule,
        MdCardModule,
        MdSelectModule,
        MdTableModule,
        MdSnackBarModule,
        MdTooltipModule,
        MdProgressSpinnerModule,
        MdToolbarModule
    ]
})
export class MaterialModule { }
