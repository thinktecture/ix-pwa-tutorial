import {WINDOW} from './window.token';
import {Inject} from '@angular/core';

export class InstallBannerService {
    constructor(@Inject(WINDOW) private _window) {
    }

    public start() {
        this._window.addEventListener('beforeinstallprompt', event => {
            event.preventDefault(); // Prevent default for older Chrome versions to prevent double install prompt
            event.prompt();
        });
    }
}
