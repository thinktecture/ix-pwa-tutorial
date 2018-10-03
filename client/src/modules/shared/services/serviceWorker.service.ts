import {Inject, Injectable} from '@angular/core';
import {FeatureService} from './feature.service';
import {BrowserFeatureKey} from '../models/browserFeatureKey.model';
import {WINDOW} from './window.token';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class ServiceWorkerService {
    private _serviceWorkerRegistration = new BehaviorSubject<ServiceWorkerRegistration>(null);

    public get serviceWorkerRegistration(): Observable<ServiceWorkerRegistration> {
        return this._serviceWorkerRegistration;
    }

    constructor(@Inject(WINDOW) private _window: Window, private _featureService: FeatureService) {
    }


    public async register(): Promise<void> {
        if (this._serviceWorkerRegistration.getValue() ||
            !this._featureService.detectFeature(BrowserFeatureKey.ServiceWorker) ||
            !environment.production) {
            return;
        }

        try {
            const registration = await this._window.navigator.serviceWorker.register('serviceWorker.js');
            let serviceWorker;
            if (registration.active) {
                this._serviceWorkerRegistration.next(registration);
            } else {
                if (registration.installing) {
                    serviceWorker = registration.installing;
                } else if (registration.waiting) {
                    serviceWorker = registration.waiting;
                }
                if (serviceWorker) {
                    serviceWorker.addEventListener('statechange', event => {
                        if (event.target.state == 'activated') {
                            this._serviceWorkerRegistration.next(registration);
                        }
                    });
                }
            }
        } catch (e) {
            console.log('ServiceWorker can\'t be registered.', e);
        }
    }

    public async unregister(): Promise<boolean> {
        if (this._serviceWorkerRegistration) {
            const result = await this._serviceWorkerRegistration.subscribe(reg => reg.unregister());
            if (!result) {
                console.log('ServiceWorker unregister failed!');
            }
            return Promise.resolve(true); // TODO
        }
    }
}
