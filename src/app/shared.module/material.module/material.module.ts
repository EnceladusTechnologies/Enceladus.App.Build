import { NgModule } from '@angular/core';
import {

    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule,
    MatNativeDateModule,
    MatOptionModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTableModule,
    MatCardModule,
    MatSidenavModule,
    MatTooltipModule,
    MatToolbarModule
} from '@angular/material';

@NgModule({
    imports: [
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatInputModule,
        MatIconModule,
        MatProgressBarModule,
        MatMenuModule,
        MatNativeDateModule,
        MatOptionModule,
        MatSelectModule,
        MatCardModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatTableModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        MatToolbarModule
    ],
    exports: [
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatInputModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatNativeDateModule,
        MatOptionModule,
        MatCardModule,
        MatSelectModule,
        MatTableModule,
        MatSnackBarModule,
        MatTooltipModule,
        MatSidenavModule,
        MatProgressSpinnerModule,
        MatToolbarModule
    ]
})
export class MaterialModule { }
