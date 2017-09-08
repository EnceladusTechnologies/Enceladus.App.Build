import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

@Injectable()
export class SnackBarService {

    private _errorSnackBarConfig = new MdSnackBarConfig();
    private _infoSnackBarConfig = new MdSnackBarConfig();
    private _successSnackBarConfig = new MdSnackBarConfig();

    constructor(
        private _snackBar: MdSnackBar,
        private _router: Router) {
        this._errorSnackBarConfig.duration = 3000;
        this._errorSnackBarConfig.extraClasses = ['error-snackbar'];
        this._infoSnackBarConfig.duration = 3000;
        this._infoSnackBarConfig.extraClasses = ['info-snackbar'];
        this._successSnackBarConfig.duration = 1000;
        this._successSnackBarConfig.extraClasses = ['success-snackbar'];
    }

    public setContainer(parent: any) {
        this._errorSnackBarConfig.viewContainerRef = parent;
        this._infoSnackBarConfig.viewContainerRef = parent;
        this._successSnackBarConfig.viewContainerRef = parent;
    }

    public open(
        type: string,
        messageText: string,
        actionText?: string,
        overrideDurationLength?: number,
        navigateToUrl?: string) {
        switch (type) {
            case 'info':
                if (overrideDurationLength) {
                    this._infoSnackBarConfig.duration = overrideDurationLength;
                }

                const infoSnackBarRef = this._snackBar.open(messageText, actionText ? actionText : null, this._infoSnackBarConfig);
                if (navigateToUrl) {
                    infoSnackBarRef.onAction()
                        .subscribe(result => this._router.navigate([navigateToUrl]));
                }
                break;
            case 'success':
                if (overrideDurationLength) {
                    this._successSnackBarConfig.duration = overrideDurationLength;
                }
                const successSnackBarRef = this._snackBar.open(messageText, actionText ? actionText : null, this._successSnackBarConfig);
                if (navigateToUrl) {
                    successSnackBarRef.onAction()
                        .subscribe(result => this._router.navigate([navigateToUrl]));
                }
                break;
            case 'error':
                if (overrideDurationLength) {
                    this._errorSnackBarConfig.duration = overrideDurationLength;
                }
                const errorSnackBarRef = this._snackBar.open(messageText, actionText ? actionText : null, this._errorSnackBarConfig);
                if (navigateToUrl) {
                    errorSnackBarRef.onAction()
                        .subscribe(result => this._router.navigate([navigateToUrl]));
                }
                break;
            default:
                throw Error('Unhandled snackbar type "' + type + '" in snackbar service!');
        }
    }
}
